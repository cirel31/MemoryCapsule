package com.santa.projectservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("PROJECT - DEV - API")
                        .version("1.0.0")
                        .description("뭐야뭐야")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("Testing")
                .pathsToMatch("/project/**")
                .build();
    }
//
//    @Bean
//    public GroupedOpenApi privateApi() {
//        return GroupedOpenApi.builder()
//                .setGroup("Private")
//                .pathsToMatch("/private/**")
//                .build();
//    }
}
