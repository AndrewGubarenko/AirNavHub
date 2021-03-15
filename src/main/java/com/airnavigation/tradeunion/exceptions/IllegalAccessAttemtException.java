package com.airnavigation.tradeunion.exceptions;

/**
 * @author Andrii Hubarenko
 * Custom exception for reporting about attemptions to get unauthorized access to the datas
 */
public class IllegalAccessAttemtException extends RuntimeException {
    public IllegalAccessAttemtException (String message) {
        super(message);
    }
}
