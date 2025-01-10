package ru.denis.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class MissingAuthException extends RuntimeException {

    public MissingAuthException() {
        super("Missing X-User-ID header");
    }

    public MissingAuthException(String message) {
        super(message);
    }
}
