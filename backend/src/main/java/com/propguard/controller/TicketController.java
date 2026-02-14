package com.propguard.controller;

import com.propguard.dto.TicketRequest;
import com.propguard.model.Tenant;
import com.propguard.model.Ticket;
import com.propguard.repository.TenantRepository;
import com.propguard.repository.TicketRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*") // Allow React Native/Web to access this
public class TicketController {

    private final TicketRepository ticketRepository;
    private final TenantRepository tenantRepository;
    public TicketController(TicketRepository ticketRepository,TenantRepository tenantRepository){
        this.ticketRepository=ticketRepository;
        this.tenantRepository=tenantRepository;
    }

    // 1. GET ALL (For Admin Dashboard)
    // URL: http://localhost:8080/api/tickets

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // 2. GET MINE (For Mobile App)
    // URL: http://localhost:8080/api/tickets/tenant/1
    @GetMapping("/tenant/{tenantId}")
    public List<Ticket> getTicketsByTenant(@PathVariable Long tenantId) {
        return ticketRepository.findByTenantId(tenantId);
    }

    // 3. CREATE (For Mobile App)
    // URL: http://localhost:8080/api/tickets
    @PostMapping
    public Ticket createTicket(@RequestBody TicketRequest request) {
        // Find the Tenant from the ID passed in the JSON
        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        Ticket ticket = new Ticket();
        ticket.setDescription(request.getDescription());
        ticket.setUrgency(request.getUrgency());
        ticket.setStatus("OPEN");
        ticket.setTenant(tenant);
        return ticketRepository.save(ticket);
    }


}