package com.example.apigatewayservice.filter;

import com.example.apigatewayservice.util.TokenProvider;
import com.google.common.net.HttpHeaders;
import io.jsonwebtoken.Jwts;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {

    private final Environment env;
    private final TokenProvider tokenProvider;

    @Data
    public static class Config {
        // Put configuration properties here
        private String baseMessage;
    }

    @Override
    public GatewayFilter apply(Config config) {
        log.info("AuthorizationHeaderFilter - {}", config.getBaseMessage());
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "No authorization header", HttpStatus.UNAUTHORIZED);
            }

            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String jwt = authorizationHeader.replace("Bearer", "");
            String subject = tokenProvider.parse(jwt).getSubject();
            // Create a cookie object
//            ServerHttpResponse response = exchange.getResponse();
//            ResponseCookie c1 = ResponseCookie.from("my_token", "test1234").maxAge(60 * 60 * 24).build();
//            response.addCookie(c1);

            // Token Validating
            if(!tokenProvider.validateToken(jwt)) return onError(exchange, "JWT token 이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);

            ServerWebExchange modified = exchange.mutate()
                    .request(exchange.getRequest().mutate()
                            .headers(httpHeaders -> httpHeaders.add("userIdx", String.valueOf(subject)))
                            .build()
                    ).build();
            return chain.filter(modified);
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.error(err);
        return response.setComplete();
    }


}