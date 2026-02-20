package com.nexus.auth.service;

import com.nexus.auth.dto.LoginRequest;
import com.nexus.auth.dto.LoginResponse;
import com.nexus.shared.exception.InvalidCredentialsException;
import com.nexus.tenant.model.Tenant;
import com.nexus.tenant.service.TenantService;
import com.nexus.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TenantService tenantService;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest req) {

        Tenant tenant = tenantService.findByEmail(req.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!encoder.matches(req.getPassword(), tenant.getPassword_hash()))
            throw new InvalidCredentialsException("Invalid email or password");

        String token = jwtUtil.generateToken(tenant.getId());

        return new LoginResponse(
                token,
                tenant.getId(),
                tenant.getName(),
                tenant.getTenantNumber());
    }
}
