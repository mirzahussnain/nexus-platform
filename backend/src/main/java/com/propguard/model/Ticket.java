package com.propguard.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Entity
@Data
@Table(name="tickets")
public class Ticket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private String urgency; // HIGH, MEDIUM, LOW
    private String status;  // OPEN, CLOSED
    private LocalDateTime createdAt = LocalDateTime.now();

    // The Foreign Key
    @ManyToOne
    @JoinColumn(name = "tenant_id")
    @JsonIgnore
    private Tenant tenant;
}
