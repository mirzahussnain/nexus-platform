package com.propguard.dto;

import lombok.Data;

@Data
public class TicketRequest {
    private String description;
    private String urgency;
    private Long tenantId;
}
