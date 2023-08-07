package com.example.apigatewayservice.filter;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.OrderedGatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.cloud.gateway.support.ipresolver.RemoteAddressResolver;
import org.springframework.cloud.gateway.support.ipresolver.XForwardedRemoteAddressResolver;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class GlobalFilter extends AbstractGatewayFilterFactory<GlobalFilter.Config> {
    public GlobalFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            log.info("Global Filter baseMessage: {}, {}", config.getBaseMessage(), request.getRemoteAddress());
            if (config.isPreLogger()) {
                log.info("Global Filter Start: request id -> {}", request.getId());
            }

            if(config.isRequestLogger()) {
                log.warn("요청이 들어와서 로깅을 시작합니다.");

                log.info("메서드 정보 " + request.getMethod().toString());
                log.info("요청 Id : " + request.getId().toString());

                HttpHeaders headers = request.getHeaders();
                log.info("Headers: {}", headers);

                MultiValueMap<String, HttpCookie> cookies = request.getCookies();
                log.info("Cookies: {}", cookies);

                MultiValueMap<String, String> queryParams = request.getQueryParams();
                log.info("Request Parameters: {}", queryParams);
                if(request.getURI() != null) {
                    log.info("URI: {}", request.getURI().toString());
                }
                if (null != request.getLocalAddress()) {
                    log.info("LocalAddress: {}", request.getLocalAddress().toString());
                }
                if(request.getPath() != null) {
                    log.info("RequestPath: {}", request.getPath().toString());
                }
                if(request.getSslInfo() != null) {
                    log.info("SSLInfo: {}", request.getSslInfo().toString());
                }
                if(request.getRemoteAddress() != null) {
                    log.info("RemoteAddress: {}", request.getRemoteAddress().toString());
                }
            }
            return chain.filter(exchange).then(Mono.fromRunnable(()->{
                if (config.isPostLogger()) {
                    log.info("Global Filter End: response code -> {}", response.getStatusCode());
                }
            }));
        });
    }

    @Data
    public static class Config {
        private String baseMessage;
        private boolean preLogger;
        private boolean postLogger;
        private boolean requestLogger;
    }
}
