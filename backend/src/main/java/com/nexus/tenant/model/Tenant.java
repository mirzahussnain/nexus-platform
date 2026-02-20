package com.nexus.tenant.model;

import com.nexus.ticket.model.Ticket;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Generated;
import org.hibernate.generator.EventType;

import java.util.List;

@Entity
@Data
@Table(name = "tenants")
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "tenant_number", insertable = false, updatable = false, unique = true)
    @Generated(event = { EventType.INSERT })
    private String tenantNumber;
    private String name;
    private String email;
    private String password_hash;

    // One Tenant -> Many Tickets
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL)
    private List<Ticket> tickets;
}
