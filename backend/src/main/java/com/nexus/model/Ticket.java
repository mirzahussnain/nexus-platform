package com.nexus.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Generated;
import org.hibernate.generator.EventType;

import java.time.LocalDateTime;
@Entity
@Data
@Table(name="tickets")
public class Ticket {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "ticket_number", insertable = false, updatable = false,unique = true)
    @Generated(event = {EventType.INSERT}) // Automatically fetches the value after save
    private String ticketNumber;
    private String description;
    private String status;  // OPEN, CLOSED
    private LocalDateTime createdAt = LocalDateTime.now();

    // The Foreign Key
    @ManyToOne
    @JoinColumn(name = "tenant_id")
    @JsonIgnore
    private Tenant tenant;

    @OneToOne(mappedBy="ticket", cascade=CascadeType.ALL)
    @JsonManagedReference
    private TicketAnalysis analysis;
}
