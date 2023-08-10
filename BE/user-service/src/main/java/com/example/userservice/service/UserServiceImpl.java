package com.example.userservice.service;

import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.Access;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.AccessRepository;
import com.example.userservice.repository.ConnectedRepository;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.security.SecureRandom;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private static final int TMP_PWD_LENGTH = 8;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, String> redisTemplate;
    private final TokenProvider tokenProvider;
    private final AccessRepository accessRepository;
    private final FileService fileService;
    private final ConnectedRepository connectedRepository;
    private final Environment env;

    @Value("${S3Url}")
    private String defaultUrl;

    @Override
    @Transactional
    public UserDto.ResponseLogin login(UserDto.RequestLogin requestLogin) throws Exception {
        User user = userRepository.findByEmail(requestLogin.getEmail()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디 입니다."));

        if (user.isDeleted())
            throw new Exception("탈퇴한 회원입니다.");
        if (!passwordEncoder.matches(requestLogin.getPassword(), user.getPassWord()))
            throw new Exception("비밀번호가 맞지 않습니다. 다시 로그인 해주세요!");

        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        // refresh Token && access Token 생성
        String refreshToken = tokenProvider.createRefreshToken(user.getIdx());
        String accessToken = tokenProvider.createAccessToken(user.getIdx());

        // Redis 저장
        ops.set(user.getIdx().toString(), refreshToken);

        // Logging 처리
        LocalDate now = LocalDateTime.now().toLocalDate();
        List<Access> byIdxAndAccessedAtIsBetween = accessRepository.findByUser_IdxAndAccessedAtIsBetween(user.getIdx(), now.atStartOfDay(), now.atTime(LocalTime.MAX));
        if(byIdxAndAccessedAtIsBetween == null || byIdxAndAccessedAtIsBetween.isEmpty()){
            accessRepository.save(Access.builder()
                            .user(user)
                            .accessedAt(LocalDateTime.now())
                    .build());
        }

        return UserDto.ResponseLogin.builder()
                .userIdx(user.getIdx())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void logout(final Long userId) {
        // user Logout
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String andDelete = ops.getAndDelete(String.valueOf(userId));
        if(andDelete != null)
            log.info("{} - logout!!", userId);
    }

    @Override
    public int emailCheck(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            if (userOptional.get().isDeleted()) {
                return 0;
            }
            return 1;
        }
        return -1;
    }

    @Transactional
    @Override
    public UserDto.Basic signup(UserDto.SignUp signUpDto, MultipartFile multipartFile) throws Exception {
        //TODO: User 회원가입
        // - 이메일 중복체크
        Optional<User> userOptional = userRepository.findByEmail(signUpDto.getEmail());
        User saved;
        Long initPoint = Long.valueOf(env.getProperty("point.init"));
        if (userOptional.isPresent()) {
            saved = userOptional.get();
            if (!saved.isDeleted()) {
                if(saved.isOAuthUser()) throw new IllegalStateException("Kakao로 로그인한 회원입니다.");
                else throw new IllegalStateException("이미 회원가입한 회원입니다.");
            }
            saved.deletedSignUpDtoToUser(signUpDto, getImgUrl(multipartFile), passwordEncoder.encode(signUpDto.getPassword()));
            log.info("탈퇴한 회원 재가입 입니다.");
        } else {
            User newed = new User().newSignUpDtoToUser(signUpDto, getImgUrl(multipartFile), passwordEncoder.encode(signUpDto.getPassword()));
            newed.setPoint(initPoint);
            saved = userRepository.save(newed);
            log.info("새로운 유저 회원가입 입니다.");
        }
        log.info(saved.toString());



        return UserDto.Basic.builder()
                .idx(saved.getIdx())
                .email(saved.getEmail())
                .nickname(saved.getNickName())
                .name(saved.getName())
                .build();
    }

    @Override
    public UserDto.Detail getUserDetail(Long userId, int year, int month) throws Exception {
        //TODO: AccessList 추가
        UserDto.Detail result = getUserDetail(userId);


        LocalDateTime date;
        if (year == 0 && month == 0) date = LocalDateTime.now();
        else date = LocalDateTime.of(year, month, 1, 0, 0);
        log.info(date.toString());
        LocalDateTime start = date.withDayOfMonth(1);
        LocalDateTime end = start.withDayOfMonth(date.toLocalDate().lengthOfMonth());
        List<Access> accessList = accessRepository.findByUser_IdxAndAccessedAtIsBetween(userId, start, end);

        result.setAccessList(
                accessList.stream().map(
                        e -> {
                            return Timestamp.valueOf(e.getAccessedAt());
                        }
                ).collect(Collectors.toList())
        );

        return result;
    }

    @Override
    public UserDto.Detail getUserDetail(Long userId) throws Exception {
        User user = getUserById(userId);
        return UserDto.Detail.builder()
                .userId(user.getIdx())
                .email(user.getEmail())
                .point(user.getPoint())
                .nickname(user.getNickName())
                .totalFriend(user.getFriendList().size())
                .imgUrl(user.getImgUrl())
                .build();
    }

    @Transactional
    @Override
    public void deleteUser(Long userId) throws Exception {
        User user = getUserById(userId);
        user.deleteUser();
    }

    @Transactional
    @Override
    public void modifyUser(UserDto.modify info, MultipartFile multipartFile) throws Exception {
        User user = getUserById(info.getUserId());
        if (info.getNickName() != null)  user.setNickName(info.getNickName());
        if (info.getPassword() != null)  user.setPassWord(info.getPassword());
        if (multipartFile != null)   user.setImgUrl(getImgUrl(multipartFile));
    }

    @Override
    public boolean checkEmailDuplicated(UserDto.RequestFindPass userInfo) {
        User user = userRepository.findByEmail(userInfo.getEmail()).orElse(null);
        if (user != null && user.getPhone().equals(userInfo.getPhone())) {
            return true;
        }
        return false;
    }

    @Override
    public String generateRandomCode() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[TMP_PWD_LENGTH];
        secureRandom.nextBytes(randomBytes);

        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    @Override
    public void modifyPassword(String userEmail, String code) {
        User user = getUserByEmail(userEmail);
        user.modifyPassword(passwordEncoder.encode(code));
    }

    @Transactional
    @Override
    public Boolean updatePoint(Long userId, Long point) throws Exception {
        User user = getUserById(userId);
        if (user.getPoint() + point < 0) return false;
        user.setPoint(user.getPoint() + point);
        return true;
    }

    @Override
    public Long getPoint(Long userId) throws Exception {
        return getUserById(userId).getPoint();
    }

    private String getImgUrl(MultipartFile multipartFile) throws IOException {
        String imgUrl = "https://ssafysanta.s3.ap-northeast-2.amazonaws.com/stamp_best.svg"; // Default Img
        // User ImgURl 처리
        if(!multipartFile.isEmpty()){
            String fileName = fileService.upload(multipartFile);
            imgUrl = defaultUrl + fileName;
        }

        return imgUrl;
    }

    private User getUserById(Long userId) throws Exception {
        return userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
    }

    private User getUserByEmail(String userEmail) throws IllegalArgumentException {
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("user Not found"));
    }
}
