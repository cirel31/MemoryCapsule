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

            StringBuilder sb = new StringBuilder();
            sb.append("\n+-----Global Filter baseMessage: ").append(config.getBaseMessage()).append("\n");

            if(config.isRequestLogger()) {
                sb.append("|Method: ").append(request.getMethod()).append("\n");
                sb.append("|URI: ").append(request.getURI()).append("\n");
                sb.append("|Headers:\n\t").append(request.getHeaders()).append("\n");
                sb.append("|Cookies:\n\t").append(request.getCookies()).append("\n");
                sb.append("|Query Params:\n\t").append(request.getQueryParams()).append("\n");
                sb.append("|Path: ").append(request.getPath()).append("\n");
                sb.append("|Remote Address: ").append(request.getRemoteAddress()).append("\n");
                sb.append("|Local Address: ").append(request.getLocalAddress()).append("\n");
                sb.append("|SslInfo: ").append(request.getSslInfo()).append("\n");
                sb.append("|Id: ").append(request.getId()).append("\n");
            }
            sb.append("+---------------------------> response : ").append(response.getStatusCode()).append("\n");
            return chain.filter(exchange).then(Mono.fromRunnable(()->{
                log.info("{}", sb.toString());
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
