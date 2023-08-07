package com.example.userservice.config;

import com.example.userservice.exception.JwtAccessDeniedHandler;
import com.example.userservice.exception.JwtAuthenticationEntryPoint;
import com.example.userservice.filter.JwtAuthenticationFilter;
import com.example.userservice.model.handler.OAuth2FailHandler;
import com.example.userservice.model.handler.OAuth2SuccessHandler;
import com.example.userservice.service.CustomOAuth2UserService;
import com.example.userservice.service.UserService;
import com.example.userservice.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final UserService userService;
    private final JwtAccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final CustomOAuth2UserService oAuth2UserService;
    private final AuthenticationFailureHandler oAuth2FailHandler;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
//                .cors().configurationSource(corsConfigurationSource())
//                .and()
                .httpBasic().disable()
                .formLogin().disable()
                .authorizeRequests()
                .antMatchers("/favicon**").permitAll()
                .antMatchers("/*/health-check").permitAll()
                .antMatchers("/user/login").permitAll()
                .antMatchers(("/user/find_password")).permitAll()
                .antMatchers("/user/signup").permitAll()
                .antMatchers("/actuator/**").permitAll()
                .antMatchers(("/friend/test")).permitAll()
                .antMatchers("/login/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(accessDeniedHandler)
                        .authenticationEntryPoint(authenticationEntryPoint)
                )
                .oauth2Login()
                .userInfoEndpoint(userInfoEndpointConfig -> userInfoEndpointConfig.userService(oAuth2UserService))
                .failureHandler(oAuth2FailHandler)
                .successHandler(oAuth2SuccessHandler);

    }

    /* Cors Setting */
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource(){
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.addExposedHeader("accessToken");
//        corsConfiguration.setMaxAge(3600L);
//        corsConfiguration.addAllowedOrigin("http://localhost:3000");
//        corsConfiguration.addAllowedOrigin("**");
//
//        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
//        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
//        return urlBasedCorsConfigurationSource;
//    }


}
