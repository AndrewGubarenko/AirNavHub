package com.airnavigation.tradeunion.domain.PlainDomain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePassword {

    private String currentPassword;
    private String newPassword;
}
