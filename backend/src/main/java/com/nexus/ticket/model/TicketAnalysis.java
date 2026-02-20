package com.nexus.ticket.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ticket_analysis")
@Data
public class TicketAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String urgency;
    private String category;
    private Double confidence;
    private Integer score;
    private String recommendedAction;

    @Column(columnDefinition = "TEXT")
    private String explanationJson;

    @OneToOne
    @JoinColumn(name = "ticket_id")
    @JsonBackReference
    private Ticket ticket;
}
