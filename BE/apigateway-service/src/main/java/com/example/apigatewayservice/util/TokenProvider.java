package com.example.apigatewayservice.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class TokenProvider implements InitializingBean {
    private static final String AUTHORITIES_KEY = "auth";

    @Value("${jwt.secret}")
    private  String secret;

    @Value("${jwt.token-validity-in-milliseconds}")
    private  long tokenValidityInMilliseconds; // AccessToken

    @Value("${jwt.refresh-token}")
    private long refreshTokenTime;

    @Value("${jwt.refresh-token-limit-days}")
    private long limitDays;

    private Key key;

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }


    public String createRefreshToken(Long userId){
        return createToken(userId, refreshTokenTime);
    }

    public String createAccessToken(Long userId){
        return createToken(userId, tokenValidityInMilliseconds);
    }


    public String createToken(Long userId, Long term_mili_seconds) {
        String authorities = "USER";

        long now = (new Date()).getTime();
        Date validity = new Date(now + term_mili_seconds);

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public String refreshCheckExpire(String token, Long userId){
        Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);

        // 현재 시간 갖고 오기
        LocalDateTime d_day = LocalDateTime.now().minusDays(limitDays);
        if (claimsJws.getBody().getExpiration().after(Timestamp.valueOf(d_day))) {
            log.info("refreshToken low expiration - regenerate refresh-token");
            return createRefreshToken(userId);
        } else {
            return token;
        }
    }

    public boolean validateToken(String token) throws Exception {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException  e) {
            throw new MalformedJwtException("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(getHeaders(token), parse(token), "만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            throw new UnsupportedJwtException("지원하지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e ) {
            throw new IllegalArgumentException("JWT 토큰이 잘못되었습니다.");
        }
    }


    public Claims parse(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public JwsHeader getHeaders(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getHeader();
    }
}
