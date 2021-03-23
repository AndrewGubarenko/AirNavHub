package com.airnavigation.tradeunion.controllers;

import com.airnavigation.tradeunion.exceptions.EmptyDataFieldsException;
import com.airnavigation.tradeunion.exceptions.IllegalAccessAttemtException;
import org.apache.poi.openxml4j.exceptions.NotOfficeXmlFileException;
import org.apache.poi.poifs.filesystem.OfficeXmlFileException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;

import javax.mail.MessagingException;
import javax.persistence.NonUniqueResultException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.NoSuchElementException;

/**
 * @author Andrii Hubarenko
 * Exception Handler
 */
@RestControllerAdvice
public class CustomSpringExceptionHandler extends ExceptionHandlerExceptionResolver {

    @ExceptionHandler
    public ResponseEntity<String> onOfficeFileException(OfficeXmlFileException ex) {
        return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Нам потрібен файл EXCEL!")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onNotOfficeFileException(NotOfficeXmlFileException ex) {
        return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Нам потрібен файл OFFICE!")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onWrongMediaTypeException(HttpMediaTypeNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Щось не так з media type вашого файлу!")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onIOException(IOException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Якась проблема з файлом!")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onNoSuchElementException(NoSuchElementException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Елемент, що запитується, не було знайдено!")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onConflictUserNameException(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Здається, це ім'я користувача вже зайняте!")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onEmptyFieldException(EmptyDataFieldsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Здається, у нас проблема: ")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onIllegalAccessAttemtException(IllegalAccessAttemtException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Здається, у нас проблема. Неможливо отримати доступ до даних: ")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onSQLException(SQLException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Здається, у нас проблема. Щось не так із вхідними даними: ")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onNullPointerException(NullPointerException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Здається, у нас проблема! Можливо, дані, що запитуються, не існують: ")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onArrayIndexOutOfBoundsException(ArrayIndexOutOfBoundsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Здається, у нас проблема! Ви намагаєтеся отримати більше даних, ніж є: ")
                .append("\n")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! ")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onInternalAuthenticationServiceException(InternalAuthenticationServiceException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! ")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }
    @ExceptionHandler
    public ResponseEntity<String> onAuthenticationCredentialsNotFoundException(AuthenticationCredentialsNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! ")
                .append(ex.fillInStackTrace().getMessage())
                .toString());
    }
    @ExceptionHandler
    public ResponseEntity<String> onAccessDeniedException(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ОТ ХАЛЕПА! Доступ заборонено!");
    }

    @ExceptionHandler
    public ResponseEntity<String> onIncorrectResultSizeDataAccessException(IncorrectResultSizeDataAccessException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Duplicate firstName and lastName in DB")
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onNonUniqueResultException(NonUniqueResultException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Duplicate firstName and lastName in DB ")
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onMessagingException(MessagingException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Неможливо відправити листа! ")
                .toString());
    }

    @ExceptionHandler
    public ResponseEntity<String> onMailSendException(MailSendException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new StringBuilder()
                .append("ОТ ХАЛЕПА! Щось не так із eMail адресою! ")
                .toString());
    }
}
