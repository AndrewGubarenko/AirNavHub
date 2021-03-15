package com.airnavigation.tradeunion.domain;

import org.springframework.security.core.GrantedAuthority;

/**
 * The enumeration of roles for user
 */
public enum Role implements GrantedAuthority {
    USER, ADMINISTRATOR;

    @Override
    public String getAuthority() {
        return "ROLE_" + name();
    }
}
