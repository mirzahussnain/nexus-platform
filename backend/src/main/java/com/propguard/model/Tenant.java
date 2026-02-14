package com.propguard.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="tenants")
public class Tenant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String email;

    // One Tenant -> Many Tickets
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.ALL)
    private List<Ticket> tickets;
}
