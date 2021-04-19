package com.airnavigation.tradeunion.security;

import com.airnavigation.tradeunion.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationProviderImplementation implements AuthenticationProvider {

    private static final Logger LOGGER = Logger.getLogger(UserService.class);

    private final UserDetailsServiceImplementation userService;
    private final PasswordEncoder passwordEncoder;
    //private final Cryptographer cryptographer;

    @Autowired
    public AuthenticationProviderImplementation(UserDetailsServiceImplementation userService/*, Cryptographer cryptographer*/) {
        this.userService = userService;
        this.passwordEncoder = new BCryptPasswordEncoder();
        //this.cryptographer = cryptographer;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getName().toLowerCase();
        String password = authentication.getCredentials().toString();

        if(userService == null) {
            LOGGER.error("AUTHENTICATION PROVIDER: User service is null");
            throw new InternalAuthenticationServiceException("User service is null");
        }

        UserDetails user = userService.loadUserByUsername(username);

        if(user == null) {
            throw new AuthenticationCredentialsNotFoundException("Такого користувача не знайдено");
        }

        if(passwordEncoder.matches(password, user.getPassword())) {
            return new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());
        } else {
            throw new AuthenticationServiceException("Помилка авторизації. Перевірте eMail та пароль.");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
