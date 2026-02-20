package com.nexus.tenant.service;

import com.nexus.tenant.model.Tenant;
import com.nexus.tenant.repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;

    public Tenant findById(Long id) {
        return tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
    }

    public Optional<Tenant> findByEmail(String email) {
        return tenantRepository.findByEmail(email);
    }

    public long count() {
        return tenantRepository.count();
    }

    public Tenant save(Tenant tenant) {
        return tenantRepository.save(tenant);
    }
}
