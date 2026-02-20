package com.nexus.ticket.controller;

import com.nexus.ticket.dto.TicketRequest;
import com.nexus.ticket.dto.TicketResponse;
import com.nexus.ticket.mapper.TicketMapper;
import com.nexus.ticket.model.Ticket;
import com.nexus.ticket.repository.TicketRepository;
import com.nexus.ticket.service.TicketService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*") // Allow React Native/Web to access this
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    private final TicketRepository ticketRepository;

    @GetMapping
    public List<TicketResponse> getAllTickets() {
        return ticketRepository.findAll()
                .stream().map(TicketMapper::toResponse).toList();
    }

    @GetMapping("/tenant/{tenantId}")
    public List<TicketResponse> getTenantTickets(@PathVariable Long tenantId) {
        return ticketRepository.findByTenantId(tenantId)
                .stream().map(TicketMapper::toResponse).toList();
    }

    @PostMapping
    public TicketResponse create(
            HttpServletRequest req,
            @RequestBody TicketRequest request) {

        Long tenantId = (Long) req.getAttribute("tenantId");

        return TicketMapper.toResponse(
                ticketService.createTicket(request, tenantId));
    }

    @GetMapping("/{id}")
    public TicketResponse getById(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        return TicketMapper.toResponse(ticket);
    }
}
