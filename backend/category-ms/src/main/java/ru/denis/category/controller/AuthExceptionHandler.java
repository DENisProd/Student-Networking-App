package ru.denis.category.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.denis.auth.MissingAuthException;

@ControllerAdvice
public class AuthExceptionHandler {
    @ExceptionHandler(MissingRequestHeaderException.class)
    public ResponseEntity<String> handleMissingUserIdException(MissingRequestHeaderException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
