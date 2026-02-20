package com.nexus.shared.config;

import com.nexus.tenant.model.Tenant;
import com.nexus.tenant.service.TenantService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(TenantService tenantService) {
        return args -> {
            // Check if our dummy tenant exists. If not, create him.
            if (tenantService.count() == 0) {
                Tenant t = new Tenant();
                t.setName("John Doe");
                t.setPassword_hash("$2a$12$i/OWsvSv7LqyHozQ5zHuSOIQny1f7fhg4UDbSKwiau/GytvFufaKi");
                t.setEmail("john@example.com");
                tenantService.save(t);
                System.out.println("✅ Dummy Tenant Created: ID " + t.getId());
            }
        };
    }
}
