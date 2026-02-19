-- Create Tenants Table
CREATE TABLE tenants (
                         id BIGSERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         email VARCHAR(255) UNIQUE NOT NULL,
                         password_hash VARCHAR(255) NOT NULL,
                         tenant_number VARCHAR(20) GENERATED ALWAYS AS ('TEN-' || LPAD(id::text, 4, '0')) STORED UNIQUE
);

-- Create Tickets Table
CREATE TABLE tickets (
                         id BIGSERIAL PRIMARY KEY,
                         description TEXT,
                         status VARCHAR(50) DEFAULT 'OPEN',
                         created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         tenant_id BIGINT REFERENCES tenants(id) ON DELETE CASCADE,
                         ticket_number VARCHAR(20) GENERATED ALWAYS AS ('TR-' || LPAD(id::text, 4, '0')) STORED UNIQUE
);

-- Create Ticket Analysis Table
CREATE TABLE ticket_analysis (
                                 id BIGSERIAL PRIMARY KEY,
                                 urgency VARCHAR(50),
                                 category VARCHAR(100),
                                 confidence DOUBLE PRECISION,
                                 score INTEGER,
                                 recommended_action VARCHAR(255),
                                 explanation_json TEXT,
                                 ticket_id BIGINT UNIQUE REFERENCES tickets(id) ON DELETE CASCADE
);