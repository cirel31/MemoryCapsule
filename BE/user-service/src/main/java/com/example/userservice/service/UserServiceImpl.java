package com.example.userservice.service;

import com.example.userservice.model.Enum.UserRole;
import com.example.userservice.model.dto.TokenDto;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
import java.time.ZonedDateTime;
import java.util.ArrayList;
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

    @Value("${S3Url}")
    private String defaultUrl;

    @Override
    @Transactional
    public TokenDto login(UserDto.RequestLogin requestLogin) throws Exception {
        User user = userRepository.findByEmail(requestLogin.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Not found"));
        if (!passwordEncoder.matches(requestLogin.getPassword(), user.getPassWord()))
            throw new Exception("Password Not Matched!");

        ArrayList<SimpleGrantedAuthority> author = new ArrayList<>();
        if (UserRole.ADMIN.equals(user.getRole())) author.add(new SimpleGrantedAuthority("ADMIN"));
        else author.add(new SimpleGrantedAuthority("USER"));
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getIdx(), user.getPassWord(), author);
        // refresh Token && access Token 생성
        String refreshToken = tokenProvider.createRefreshToken(auth);
        String accessToken = tokenProvider.createToken(auth);

        // Redis 저장
        ops.set(user.getIdx().toString(), refreshToken);

        // Logging 처리
        LocalDate now = LocalDateTime.now().toLocalDate();
        List<Access> byIdxAndAccessedAtIsBetween = accessRepository.findByIdxAndAccessedAtIsBetween(user.getIdx(), now.atStartOfDay(), now.atTime(LocalTime.MAX));
        if(byIdxAndAccessedAtIsBetween == null || byIdxAndAccessedAtIsBetween.isEmpty()){
            accessRepository.save(Access.builder()
                            .user(user)
                            .accessedAt(LocalDateTime.now())
                    .build());
        }

        return TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void logout(Authentication authentication) {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String userIdx = principal.getUsername();
        // 유효 회원 check
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        ops.getAndDelete(userIdx);
        log.info("user logout - {}", userIdx);
    }

    @Override
    public UserDto.Basic signup(UserDto.SignUp signUpDto, MultipartFile multipartFile) throws Exception {
        //TODO: User 회원가입
        // - 이메일 중복체크
        userRepository.findByEmail(signUpDto.getEmail()).ifPresent(m -> {
            throw new IllegalStateException("이미 존재하는 회원");
        });

//        String imgUrl = "https://www.computerhope.com/jargon/g/guest-user.png"; // Default Img
//        // User ImgURl 처리
//        if(multipartFile != null){
//            String fileName = fileService.upload(multipartFile);
//            imgUrl = defaultUrl + fileName;
//        }

        // 회원가입 처리
        User saved = userRepository.save(
                User.builder()
                        .email(signUpDto.getEmail())
                        .name(signUpDto.getName())
                        .nickName(signUpDto.getNickName())
                        .phone(signUpDto.getPhone())
                        .point(0L)
                        .role(UserRole.USER)
                        .createdAt(ZonedDateTime.now())
                        .updatedAt(ZonedDateTime.now())
                        .imgUrl(getImgUrl(multipartFile))
                        .passWord(passwordEncoder.encode(signUpDto.getPassword()))
                        .build()
        );

        return UserDto.Basic.builder()
                .idx(saved.getIdx())
                .email(saved.getEmail())
                .nickname(saved.getNickName())
                .name(saved.getName())
                .build();
    }

    @Override
    public boolean checkEmailDuplicated(String email) throws Exception {
        return userRepository.findByEmail(email).isPresent();
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
        List<Access> accessList = accessRepository.findByIdxAndAccessedAtIsBetween(userId, start, end);

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
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        return UserDto.Detail.builder()
                .userId(user.getIdx())
                .email(user.getEmail())
                .nickname(user.getNickName())
                .totalFriend(user.getFriendList().size())
                .imgurl(user.getImgUrl())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("user Not found"));
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getName())
                .accountExpired(user.isDeleted())
                .password(user.getPassWord())
                .roles(user.getRole().name())
                .build();
    }

    @Transactional
    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).get();
        user.deleteUser();
    }

    @Transactional
    @Override
    public void modifyUser(UserDto.modify info, MultipartFile multipartFile) throws Exception {
        User user = userRepository.findById(info.getUserId()).get();

        user.modifyUser(info.getNickName(), info.getPassword(), getImgUrl(multipartFile));
    }

    private String getImgUrl(MultipartFile multipartFile) throws IOException {
        String imgUrl = "https://www.computerhope.com/jargon/g/guest-user.png"; // Default Img
        // User ImgURl 처리
        if(multipartFile != null){
            String fileName = fileService.upload(multipartFile);
            imgUrl = defaultUrl + fileName;
        }

        return imgUrl;
    }

    @Override
    public String generateRandomPassword() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[TMP_PWD_LENGTH];
        secureRandom.nextBytes(randomBytes);

        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
