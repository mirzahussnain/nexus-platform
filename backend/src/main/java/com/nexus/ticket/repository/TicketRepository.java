package com.nexus.ticket.repository;

import com.nexus.ticket.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByTenantId(Long tenantId);

    Optional<Ticket> findByTicketNumber(String ticketNumber);
}
