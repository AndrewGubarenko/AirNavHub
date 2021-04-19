package com.airnavigation.tradeunion.utilities;

import org.passay.*;
import org.springframework.stereotype.Component;

/**
 * @author Andrii Hubarenko
 * The utility for generation of temporary password
 */
@Component
public class TemporaryPasswordGenerator {

    public String generateTemporaryPassword(int length) {
        PasswordGenerator gen = new PasswordGenerator();
        CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
        CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
        lowerCaseRule.setNumberOfCharacters(2);

        CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
        CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
        upperCaseRule.setNumberOfCharacters(2);

        CharacterData digitChars = EnglishCharacterData.Digit;
        CharacterRule digitRule = new CharacterRule(digitChars);
        digitRule.setNumberOfCharacters(2);

        CharacterData specialChars = new CharacterData() {
            public String getErrorCode() {
                return DictionaryRule.ERROR_CODE;
            }

            public String getCharacters() {
                //return "!@#$%^&*()_+";
                return "!@$*()_~";
            }
        };
        CharacterRule splCharRule = new CharacterRule(specialChars);
        splCharRule.setNumberOfCharacters(2);

        return gen.generatePassword(length, splCharRule, lowerCaseRule,
                upperCaseRule, digitRule);
    }
}
