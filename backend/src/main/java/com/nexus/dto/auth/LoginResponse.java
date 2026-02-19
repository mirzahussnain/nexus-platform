package com.nexus.dto.auth;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private Long tenantId;
    private String name;
    private String tenantNumber;

    public LoginResponse(String token, long id, String name, String tenantNumber) {
        this.token = token;
        this.tenantId = id;
        this.tenantNumber=tenantNumber;
        this.name = name;
    }
}
