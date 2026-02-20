package com.nexus.ticket.repository;

import com.nexus.ticket.model.TicketAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalysisRepository extends JpaRepository<TicketAnalysis, Long> {
}
