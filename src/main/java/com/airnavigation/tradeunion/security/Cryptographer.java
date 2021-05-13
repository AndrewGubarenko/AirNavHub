package com.airnavigation.tradeunion.security;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

@Component
public class Cryptographer {

    public enum DataTypeEnum {
        HEX,
        BASE64
    }

    private static final Logger LOGGER = Logger.getLogger(Cryptographer.class);

    private final int keySize = 128;
    private final int iterationCount = 125;
    private final String passwordPhrase = "yHZ724fk2E";
    private final Cipher cipher;
    private DataTypeEnum dataType;

    public Cryptographer() {
        this.dataType = DataTypeEnum.BASE64;
        try {
            cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        }
        catch (NoSuchAlgorithmException | NoSuchPaddingException e) {
            LOGGER.warn(e.fillInStackTrace().getMessage());
            throw fail(e);
        }
    }

    private String decrypt(String salt, String iv, String passphrase, String cipheredText) {
        try {
            SecretKey key = generateKey(salt, passphrase);
            byte[] decrypted = doFinal(Cipher.DECRYPT_MODE, key, iv, byteToBase64String(cipheredText));
            return new String(decrypted, "UTF-8");
        }
        catch (UnsupportedEncodingException e) {
            LOGGER.warn(e.fillInStackTrace().getMessage());
            return null;
        }catch (Exception e){
            LOGGER.warn(e.fillInStackTrace().getMessage());
            return null;
        }
    }

    private String encrypt(String salt, String iv, String passPhrase, String plainText) {
        try {
            SecretKey key = generateKey(salt, passPhrase);
            byte[] encrypted = doFinal(Cipher.ENCRYPT_MODE, key, iv, plainText.getBytes(StandardCharsets.UTF_8));
            String cipherText;
            if (dataType.equals(DataTypeEnum.HEX)) {
                cipherText = stringToHexByte(encrypted);
            } else {
                cipherText = stringToBase64Bytes(encrypted);
            }
            return cipherText;
        } catch (Exception e) {
            LOGGER.error(e);
            return null;
        }
    }

    private byte[] doFinal(int encryptMode, SecretKey key, String iv, byte[] bytes) {
        try {
            cipher.init(encryptMode, key, new IvParameterSpec(byteToHexString(iv)));
            return cipher.doFinal(bytes);
        }
        catch (InvalidKeyException
                | InvalidAlgorithmParameterException
                | IllegalBlockSizeException
                | BadPaddingException e) {
            LOGGER.warn(e.fillInStackTrace().getMessage());
            return null;
        }
    }

    private byte[] generateRandom(int length) {
        SecureRandom random = new SecureRandom();
        byte[] randomBytes = new byte[length];
        random.nextBytes(randomBytes);
        return randomBytes;
    }

    private SecretKey generateKey(String salt, String passphrase) {
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            KeySpec spec = new PBEKeySpec(passphrase.toCharArray(), byteToHexString(salt), iterationCount, keySize);
            SecretKey key = new SecretKeySpec(factory.generateSecret(spec).getEncoded(), "AES");
            return key;
        }
        catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            LOGGER.warn(e.fillInStackTrace().getMessage());
            return null;
        }
    }

    private byte[] byteToBase64String(String str) {
        return Base64.decodeBase64(str);
    }

    private String stringToBase64Bytes(byte[] ba) {
        return DatatypeConverter.printBase64Binary(ba);
    }

    private byte[] byteToHexString(String str) {
        try {
            return Hex.decodeHex(str.toCharArray());
        }
        catch (DecoderException e) {
            LOGGER.warn(e.fillInStackTrace().getMessage());
            throw new IllegalStateException(e);
        }
    }

    private String stringToHexByte(byte[] ba) {
        return DatatypeConverter.printHexBinary(ba);
    }

    private IllegalStateException fail(Exception e) {
        LOGGER.warn(e.fillInStackTrace().getMessage());
        return null;
    }

    @SuppressWarnings("SpellCheckingInspection")
    public String decode(String encodedString) {
        String decryptedString =  new String(java.util.Base64.getDecoder().decode(encodedString));
        String[] splitted = decryptedString.split("::");
        if (decryptedString != null && splitted.length == 3) {
            String decodedString = decrypt(splitted[1], splitted[0], passwordPhrase, splitted[2]);
            return decodedString;
        } else {
            LOGGER.warn("Incorrect encrypted data");
            return null;
        }
    }

    public String encode(String stringToEncode) {
        try {
            String salt = stringToHexByte(generateRandom(128 / 8));
            String iv = stringToHexByte(generateRandom(128 / 8));
            String cipherText = encrypt(salt, iv, passwordPhrase, stringToEncode);
            String encryptedToSalt =  iv + "::" + salt + "::" + cipherText;
            return new String(java.util.Base64.getEncoder().encode(encryptedToSalt.getBytes()));
        } catch (Exception e) {
            LOGGER.error(e);
            return null;
        }
    }
}
