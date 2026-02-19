package com.nexus.service;

import com.nexus.dto.auth.LoginRequest;
import com.nexus.dto.auth.LoginResponse;
import com.nexus.exception.InvalidCredentialsException;
import com.nexus.model.Tenant;
import com.nexus.repository.TenantRepository;
import com.nexus.utility.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TenantRepository tenantRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest req) {

        Tenant tenant = tenantRepository.findByEmail(req.getEmail())
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
