package com.airnavigation.tradeunion.security;

import com.airnavigation.tradeunion.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AuthenticationProviderImplementation authenticationProvider;
    private final UserDetailsServiceImplementation userDetailsService;
    private final RESTAuthenticationSuccessHandler authenticationSuccessHandler;
    private final RESTAuthenticationEntryPoint authenticationEntryPoint;
    private final RESTAuthenticationFailureHandler authenticationFailureHandler;

    @Autowired
    public WebSecurityConfiguration (AuthenticationProviderImplementation authenticationProvider,
                                     UserDetailsServiceImplementation userDetailsService,
                                     RESTAuthenticationSuccessHandler authenticationSuccessHandler,
                                     RESTAuthenticationEntryPoint authenticationEntryPoint,
                                     RESTAuthenticationFailureHandler authenticationFailureHandler) {
        this.authenticationProvider = authenticationProvider;
        this.userDetailsService = userDetailsService;
        this.authenticationSuccessHandler = authenticationSuccessHandler;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.authenticationFailureHandler = authenticationFailureHandler;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider)
            .eraseCredentials(false);
    }

    @Override
    public void configure(WebSecurity web){
        web.debug(false);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .requiresChannel()
            .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.GET, "/administrator/**").authenticated()
                .antMatchers(HttpMethod.POST, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.POST, "/administrator/**").authenticated()
                .antMatchers(HttpMethod.PUT, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.PUT, "/administrator/**").authenticated()
                .antMatchers(HttpMethod.DELETE, "/administrator/**").hasRole(Role.ADMINISTRATOR.name())
                .antMatchers(HttpMethod.DELETE, "/administrator/**").authenticated()

                .antMatchers(HttpMethod.GET, "/user/**").hasRole(Role.USER.name())
                .antMatchers(HttpMethod.GET, "/user/**").authenticated()
                .antMatchers(HttpMethod.PUT, "/user/**").hasRole(Role.USER.name())
                .antMatchers(HttpMethod.PUT, "/user/**").authenticated()
                .antMatchers(HttpMethod.GET, "/full_main/{\\d+}").hasRole(Role.USER.name())
                .antMatchers(HttpMethod.GET, "/full_main/{\\d+}").authenticated()
                .antMatchers(HttpMethod.POST, "/feedback/{\\d+}").hasRole(Role.USER.name())
                .antMatchers(HttpMethod.POST, "/feedback/{\\d+}").authenticated()

                .antMatchers("/css/**", "/js/**", "/index*", "/json/**", "/*.ico", "/images/**", "/public/**", "/static/**", "/console/**").permitAll()
                .antMatchers(HttpMethod.GET, "/main").permitAll()
                .antMatchers(HttpMethod.PUT, "/password").permitAll()
            .and()
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
            .and()
                .formLogin()
                .loginPage("/main")
                .loginProcessingUrl("/user/authentication").permitAll()
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler)
            .and()
                .rememberMe()
                .key("s733BY4h8HPhXmi")
                .tokenValiditySeconds(604800)
            .and()
                .logout()
                .logoutUrl("/user/logout").permitAll()
            .and()
                .csrf().disable()
                .cors().disable()//configurationSource(corsConfiguration())
        ;
    }

/*    //TODO: repair the origins, methods, headers
    @Bean
    CorsConfigurationSource corsConfiguration() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("*"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }*/

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }
}
