package com.pharmazeal.PharmaZeal.config;

import com.pharmazeal.PharmaZeal.exceptions.CustomAccessDeniedHandler;
import com.pharmazeal.PharmaZeal.filters.TokenAuthenticationFilter;
import com.pharmazeal.PharmaZeal.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;


@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final ObjectMapper objectMapper;

    private final JwtUtil jwtUtil;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    protected TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter(jwtUtil);
    }
    
    private static final String[] WHITE_LIST_URL = {
            "/users/hello",
            "/users/login",
            "/users/create"
    };

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(WHITE_LIST_URL)
                .mvcMatchers(HttpMethod.POST, "/users");
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().httpBasic().disable().cors().disable()
                .authorizeHttpRequests(req ->
                            req
                                // User endpoints
                                .mvcMatchers(HttpMethod.GET, "/users").hasAnyAuthority("admin")
                                    .mvcMatchers(HttpMethod.GET, "/users/create").hasAnyAuthority("admin")

                                // customer endpoints
                                .mvcMatchers(HttpMethod.POST, "/customer").hasAnyAuthority("admin")
                                .mvcMatchers(HttpMethod.GET, "/customer").hasAnyAuthority("admin", "employee")
                                .mvcMatchers(HttpMethod.GET, "/customer/{id}").hasAnyAuthority("admin", "employee")
                                .mvcMatchers(HttpMethod.PUT, "/customer/{id}").hasAnyAuthority("admin")
                                .mvcMatchers(HttpMethod.DELETE, "/customer/{id}").hasAnyAuthority("admin")

                                // drug endpoints
                                .mvcMatchers(HttpMethod.POST, "/drug").hasAnyAuthority("admin")
                                .mvcMatchers(HttpMethod.GET, "/drug").hasAnyAuthority("admin", "employee")
                                .mvcMatchers(HttpMethod.GET, "/drug/{id}").hasAnyAuthority("admin", "employee")
                                .mvcMatchers(HttpMethod.PUT, "/drug/{id}").hasAnyAuthority("admin")
                                .mvcMatchers(HttpMethod.DELETE, "/drug/{id}").hasAnyAuthority("admin")

                                    // drug_stock endpoints
                                    .mvcMatchers(HttpMethod.POST, "/drug_stock").hasAnyAuthority("admin")
                                    .mvcMatchers(HttpMethod.GET, "/drug_stock").hasAnyAuthority("admin", "employee")
                                    .mvcMatchers(HttpMethod.GET, "/drug_stock/{id}").hasAnyAuthority("admin", "employee")
                                    .mvcMatchers(HttpMethod.PUT, "/drug_stock/{id}").hasAnyAuthority("admin")
                                    .mvcMatchers(HttpMethod.DELETE, "/drug_stock/{id}").hasAnyAuthority("admin")

                                    // sale endpoints
                                    .mvcMatchers(HttpMethod.POST, "/sale").hasAnyAuthority("admin", "employee")
                                    .mvcMatchers(HttpMethod.GET, "/sale").hasAnyAuthority("admin")
                                    .mvcMatchers(HttpMethod.GET, "/sale/{id}").hasAnyAuthority("admin", "employee")
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().accessDeniedHandler(accessDeniedHandler());

        return http.build();
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new CustomAccessDeniedHandler(objectMapper);
    }
}
