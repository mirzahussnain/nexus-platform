package com.nexus.repository;

import com.nexus.model.TicketAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalysisRepository extends JpaRepository<TicketAnalysis, Long> {
}
