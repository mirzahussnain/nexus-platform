package com.propguard.config;

import com.propguard.model.Tenant;
import com.propguard.repository.TenantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(TenantRepository repository) {
        return args -> {
            // Check if our dummy tenant exists. If not, create him.
            if (repository.count() == 0) {
                Tenant t = new Tenant();
                t.setName("John Doe");
                t.setEmail("john@example.com");
                repository.save(t);
                System.out.println("✅ Dummy Tenant Created: ID " + t.getId());
            }
        };
    }
}