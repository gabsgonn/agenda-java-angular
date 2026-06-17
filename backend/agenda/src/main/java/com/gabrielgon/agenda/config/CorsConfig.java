package com.gabrielgon.agenda.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Libera todas as rotas da API
                        .allowedOrigins("http://localhost:4200") // Permite o Angular
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // Libera o PATCH do status
                        .allowedHeaders("*") // Permite qualquer Content-Type enviado pelo Angular
                        .allowCredentials(true);
            }
        };
    }
}

