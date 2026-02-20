package com.nexus.ticket.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TicketResponse {

    private Long id;
    private String ticketNumber;
    private String description;
    private String status;
    private String urgency;
    private String category;
    private Double confidence;
    private Integer score;
    private String recommendedAction;
    private String explanationJson;
    private LocalDateTime createdAt;
}
