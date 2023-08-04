package com.example.userservice.service;

import com.example.userservice.model.Enum.UserRole;
import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.Access;
import com.example.userservice.model.entity.ConnectId;
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
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
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
    public UserDto.ResponseLogin login(UserDto.RequestLogin requestLogin) throws Exception {
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

        String imgUrl = "https://www.computerhope.com/jargon/g/guest-user.png"; // Default Img
        // User ImgURl 처리
        if(multipartFile != null){
            String fileName = fileService.upload(multipartFile);
            imgUrl = defaultUrl + fileName;
        }

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
                        .imgUrl(imgUrl)
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
    public List<User> findByAllFriends(final Long userId) throws Exception {
        //TODO: userId의 친구정보를 주는 서비스
        return userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new Exception("user not found - " + userId))
                .getFriendList();
    }

    @Override
    @Transactional
    public boolean deleteFirend(Long hostId, Long guestId) {
        ConnectId connectId = new ConnectId();
        connectId.setRequesterId(hostId);
        connectId.setRequesteeId(guestId);

        boolean present = connectedRepository.findById(connectId).isPresent();
        log.info("첫번째 {}", present);
        if(present){
            log.info("분기는 탄다");
            connectedRepository.deleteById(connectId);
            log.info("딜리트 됐나?");
        }
        connectId.setRequesterId(guestId);
        connectId.setRequesteeId(hostId);
        boolean present1 = connectedRepository.findById(connectId).isPresent();
        log.info("두번쨰 {}", present1);
        if(present1){
            connectedRepository.deleteById(connectId);
        }
//        connectedRepository.deleteConnection(connectId);
        return true;
    }

    @Override
    public boolean userAddFriend(Long hostId, Long guestId) {
        return false;
    }

    @Override
    public boolean checkEmailDuplicated(String email) throws Exception {
        return false;
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
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        return UserDto.Detail.builder()
                .email(user.getEmail())
                .point(user.getPoint().intValue())
                .nickname(user.getNickName())
                .admin(user.getRole().equals(UserRole.ADMIN))
                .totalFriend(user.getFriendList().size())
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
}
