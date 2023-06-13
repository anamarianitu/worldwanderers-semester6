package com.backend.apigateway.filter;

import com.backend.apigateway.dto.UserDTO;
import org.apache.http.HttpHeaders;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<Object> {
    private final WebClient.Builder webClientBuilder;

    public AuthFilter(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    public GatewayFilter apply(Object config) {
        return (exchange, chain) -> {
            String requestPath = exchange.getRequest().getPath().toString();
            if (requestPath.equals("/api/auth/register") || requestPath.equals("/api/auth/login") || requestPath.equals("/api/auth/validate")) {
                // Bypass Authorization header check and proceed with the request
                return chain.filter(exchange);
            }

            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Missing Authorization header");
            }

            String authHeader = Objects.requireNonNull(exchange.getRequest().getHeaders().get(org.springframework.http.HttpHeaders.AUTHORIZATION)).get(0);
            String[] parts = authHeader.split(" ");
            if (parts.length != 2 || !"Bearer".equals(parts[0])) {
                throw new RuntimeException("Incorrect Authorization structure");
            }

            Mono<UserDTO> originalRequest = webClientBuilder.build()
                    .get()
                    .uri("http://security-service/api/auth/validate?token=" + parts[1])
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + parts[1])
                    .retrieve()
                    .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(), resp -> Mono.error(new RuntimeException("Unexpected status")))
                    .bodyToMono(UserDTO.class);

            return originalRequest
                    .map(userDTO -> {
                        exchange.getRequest()
                                .mutate()
                                .header("x-auth-user-id", String.valueOf(userDTO.getId()));
                        return exchange;
                    })
                    .flatMap(chain::filter);
        };
    }
}
