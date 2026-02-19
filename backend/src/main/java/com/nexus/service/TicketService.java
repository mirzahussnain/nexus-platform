package com.nexus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nexus.dto.AIResponse;
import com.nexus.dto.ticket.TicketRequest;
import com.nexus.integration.ai.AIClient;
import com.nexus.model.Tenant;
import com.nexus.model.Ticket;
import com.nexus.model.TicketAnalysis;
import com.nexus.repository.AnalysisRepository;
import com.nexus.repository.TenantRepository;
import com.nexus.repository.TicketRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TenantRepository tenantRepository;
    private final AnalysisRepository analysisRepository;
    private final AIClient aiClient;

    public Ticket createTicket(TicketRequest request, Long tenantId) {

        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        AIResponse ai;

        try {
            ai = (AIResponse) aiClient.analyze(request.getDescription());
        } catch (Exception e) {
            System.err.println("AI Service Error: " + e.getMessage());
            e.printStackTrace();
            ai = new AIResponse();
            ai.setUrgency("LOW");
            ai.setCategory("GENERAL");
            ai.setConfidence(0);
            ai.setScore(0);
            ai.setRecommended_action("Manual review required");
            ai.setExplanation("AI service unavailable");
        }

        Ticket ticket = new Ticket();
        ticket.setDescription(request.getDescription());
        ticket.setStatus("OPEN");
        ticket.setTenant(tenant);

        Ticket saved = ticketRepository.save(ticket);

//        // %04d ensures at least 4 digits (e.g., 1 becomes 0001)
//        String formattedId = String.format("#TR-%04d", saved.getId());
//        // Update the ticket with the custom number
//        saved.setTicketNumber(formattedId);

        TicketAnalysis analysis = new TicketAnalysis();
        analysis.setTicket(saved);
        analysis.setUrgency(ai.getUrgency());
        analysis.setCategory(ai.getCategory());
        analysis.setConfidence(ai.getConfidence());
        analysis.setScore(ai.getScore());
        analysis.setRecommendedAction(ai.getRecommended_action());

        try {
            ObjectMapper mapper = new ObjectMapper();
            analysis.setExplanationJson(mapper.writeValueAsString(ai.getExplanation()));
        } catch (Exception e) {
            analysis.setExplanationJson("{}");
        }

        analysisRepository.save(analysis);

        saved.setAnalysis(analysis);

        return saved;
    }
}
