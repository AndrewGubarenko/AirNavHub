package com.airnavigation.tradeunion.security;

import com.airnavigation.tradeunion.Repositories.UserRepository;
import com.airnavigation.tradeunion.domain.Role;
import com.airnavigation.tradeunion.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {

    final private UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImplementation (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt = Optional.ofNullable(userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Користувач з таким eMail не знайдений.")));
        User user = userOpt.get();
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        for(Role role: user.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getAuthority()));
        }
        CustomUserDetails userDetails = new CustomUserDetails(user.getUsername(), user.getPassword(), grantedAuthorities);
        userDetails.setId(user.getId());
        return userDetails;
    }
}
