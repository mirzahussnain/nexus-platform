package com.nexus.tenant.repository;

import com.nexus.tenant.model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TenantRepository extends JpaRepository<Tenant, Long> {
    Optional<Tenant> findByEmail(String email);

    Optional<Tenant> findByTenantNumber(String tenantNumber);
}
