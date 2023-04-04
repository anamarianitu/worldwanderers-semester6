package com.backend.apigateway;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.reactive.ServerHttpRequest;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path("/posts/**")
                        .filters(f -> f.filter(filterFunction()))
                        .uri("lb://post-service"))
                .route(r -> r.path("/likes/**")
                        .filters(f -> f.filter(filterFunction()))
                        .uri("lb://like-service"))
                .route(r -> r.path("/comments/**")
                        .filters(f -> f.filter(filterFunction()))
                        .uri("lb://comment-service"))
                .route(r -> r.path("/tags/**")
                        .filters(f -> f.filter(filterFunction()))
                        .uri("lb://post-service"))
                .route(r -> r.path("/users/**")
                        .filters(f -> f.filter(filterFunction()))
                        .uri("lb://user-service"))
                .route(r -> r.path("/auth/**")
                        .filters(f -> f.filter(filterFunction()))
                        .uri("lb://security-service"))
                .build();

    }

    private GatewayFilter filterFunction() {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest().mutate()
                    .header("X-Custom-Header", "API Gateway Header").build();
            return chain.filter(exchange.mutate().request(request).build());
        };
    }
}
