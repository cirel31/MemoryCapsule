package com.example.userservice.service;

import com.example.userservice.model.Enum.UserRole;
import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
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

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, String> redisTemplate;
    private final TokenProvider tokenProvider;
    @Override
    public TokenDto login(UserDto.RequestLogin requestLogin) throws Exception {
        User user = userRepository.findByEmail(requestLogin.getEmail());
        if(user == null) throw new UsernameNotFoundException("Not found");
        if(!passwordEncoder.matches(requestLogin.getPassword(), user.getPassWord())) throw new Exception("Password Not Matched!");

        ArrayList<SimpleGrantedAuthority> author = new ArrayList<>();
        if(UserRole.ADMIN.equals(user.getRole())) author.add(new SimpleGrantedAuthority("ADMIN"));
        else author.add(new SimpleGrantedAuthority("USER"));
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getIdx(), user.getPassWord(), author);
        // refresh Token && access Token 생성
        String refreshToken = tokenProvider.createRefreshToken(auth);
        String accessToken = tokenProvider.createToken(auth);

        // Redis 저장
        ops.set(user.getIdx().toString(), refreshToken);

        return TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void logout() {

    }

    @Override
    public List<User> findByAllFriends(int userId) {
        return null;
    }

    @Override
    public boolean deleteFirend(int hostId, int guestId) {
        return false;
    }

    @Override
    public boolean userAddFriend(int hostId, int guestId) {
        return false;
    }

    @Override
    public User findByUserId(int hostId) {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(userEmail);
        if(user == null) throw new UsernameNotFoundException("user Not found");
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getName())
                .accountExpired(user.isDeleted())
                .password(user.getPassWord())
                .roles(user.getRole().name())
                .build();
    }
}
