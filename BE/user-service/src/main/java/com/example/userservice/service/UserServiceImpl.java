package com.example.userservice.service;

import com.example.userservice.model.Enum.UserRole;
import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.Access;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.AccessRepository;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
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

    @Override
    @Transactional
    public TokenDto login(UserDto.RequestLogin requestLogin) throws Exception {
        User user = userRepository.findByEmail(requestLogin.getEmail());
        if (user == null) throw new UsernameNotFoundException("Not found");
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
        ops.getAndDelete(userIdx)
        log.info("user logout - {}", userIdx);
    }

    @Override
    public List<User> findByAllFriends(final Long userId, final int confrimType) throws Exception {
        //TODO: userId의 친구정보를 주는 서비스
        //  - type
        //  0 :

        User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new Exception("user not found - " + userId));


        return null;
    }

    @Override
    public boolean deleteFirend(Long hostId, Long guestId) {
        return false;
    }

    @Override
    public boolean userAddFriend(Long hostId, Long guestId) {
        return false;
    }

    @Override
    public User findByUserId(Long hostId) {
        return null;
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
                .email(user.getEmail())
                .nickname(user.getNickName())
                .totalFriend(user.getFriendList().size())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(userEmail);
        if (user == null) throw new UsernameNotFoundException("user Not found");
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getName())
                .accountExpired(user.isDeleted())
                .password(user.getPassWord())
                .roles(user.getRole().name())
                .build();
    }
}
