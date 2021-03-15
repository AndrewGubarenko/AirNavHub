package com.airnavigation.tradeunion.exceptions;

/**
 * @author Andrii Hubarenko
 * Custom exception for reporting about missed obligatory fields
 */
public class EmptyDataFieldsException extends RuntimeException {
    public EmptyDataFieldsException (String message) {
        super(message);
    }
}
