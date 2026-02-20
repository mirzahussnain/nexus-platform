package com.nexus.ticket.mapper;

import com.nexus.ticket.dto.TicketResponse;
import com.nexus.ticket.model.Ticket;

public class TicketMapper {

    public static TicketResponse toResponse(Ticket ticket) {

        if (ticket.getAnalysis() == null) {
            return TicketResponse.builder()
                    .id(ticket.getId())
                    .ticketNumber(ticket.getTicketNumber())
                    .description(ticket.getDescription())
                    .status(ticket.getStatus())
                    .createdAt(ticket.getCreatedAt())
                    .build();
        }

        return TicketResponse.builder()
                .id(ticket.getId())
                .ticketNumber(ticket.getTicketNumber())
                .description(ticket.getDescription())
                .status(ticket.getStatus())
                .createdAt(ticket.getCreatedAt())
                .urgency(ticket.getAnalysis().getUrgency())
                .category(ticket.getAnalysis().getCategory())
                .confidence(ticket.getAnalysis().getConfidence())
                .score(ticket.getAnalysis().getScore())
                .recommendedAction(ticket.getAnalysis().getRecommendedAction())
                .explanationJson(ticket.getAnalysis().getExplanationJson())
                .build();
    }
}
