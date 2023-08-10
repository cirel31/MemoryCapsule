package com.example.apigatewayservice.filter;

import com.example.apigatewayservice.util.TokenProvider;
import com.google.common.net.HttpHeaders;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@Slf4j
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
    Environment env;
    TokenProvider tokenProvider;

    public AuthorizationHeaderFilter(Environment env, TokenProvider tokenProvider) {
        super(Config.class);
        this.env = env;
        this.tokenProvider = tokenProvider;
    }

    public static class Config {
        // Put configuration properties here
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                log.info("{} - RequestPath : {} / Token empty", request.getId(), request.getURI().toString());
                return onError(exchange, "No authorization header", HttpStatus.UNAUTHORIZED);
            }

            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0).toString();
            String jwt = authorizationHeader.replace("Bearer", "");
            String subject = tokenProvider.parse(jwt).getSubject();

            // Token Validating
            if (!tokenProvider.validateToken(jwt)){
                log.info("{} - RequestPath : {} / Token Validation failed", request.getId(), request.getURI().toString());
                return onError(exchange, "Token validation failed", HttpStatus.CONFLICT);
            }

            log.info("{} - RequestPath : {} , userIdx : {}", request.getId(), request.getURI().toString(), subject);
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