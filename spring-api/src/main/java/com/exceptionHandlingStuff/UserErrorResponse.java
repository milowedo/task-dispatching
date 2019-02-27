package com.exceptionHandlingStuff;

import lombok.Data;

@Data
class UserErrorResponse {

    private int status;
    private String message;
    private long timeStamp;
}
