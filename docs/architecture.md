# System Architecture

> Nexus Platform — Microservices Architecture & Component Design

---

## Future Architecture (Target State)

Nexus follows a **microservices architecture** with three independently deployable services communicating over REST APIs, fronted by a cross-platform mobile client.

```mermaid
graph TB
    subgraph Client["Client Layer"]
        MA["📱 Mobile App<br/>React Native · Expo"]
        WP["🖥️ Web Portal<br/>React (Next.JS) - Staff/Contractor/Admin Dashboards,Authentication etc (Phase 2)"]
    end

    subgraph Gateway["API Gateway (Phase 3)"]
        AG["🔀 API Gateway<br/>Spring Cloud Gateway"]
    end

    subgraph Services["Service Layer"]
        BE["☕ Backend API<br/>Spring Boot 3 · Java 21"]
        AI["🤖 AI Service<br/>FastAPI · Python 3.11"]
        NS["📨 Notification Service<br/>(Phase 3)"]
        IOT["📡 IoT Ingestion Service<br/>(Phase 4)"]
    end

    subgraph Data["Data Layer"]
        PG["🐘 PostgreSQL<br/>Primary Database"]
        RD["⚡ Redis<br/>Session Cache (Phase 2)"]
        TS["📊 TimescaleDB<br/>IoT Time-Series (Phase 4)"]
    end

    subgraph External["External Integrations"]
        HM["🏠 HomeMaster ERP<br/>(Phase 2)"]
        PS["🔔 Push Notifications<br/>FCM / APNs"]
    end

    MA --> BE
    WP --> AG
    AG --> BE
    AG --> AI
    BE --> PG
    BE --> AI
    BE --> NS
    NS --> PS
    IOT --> TS
    IOT --> AI
    BE --> HM

    style MA fill:#61DAFB,color:#000
    style WP fill:#61DAFB,color:#000
    style BE fill:#6DB33F,color:#fff
    style AI fill:#009688,color:#fff
    style PG fill:#4169E1,color:#fff
    style AG fill:#FF6B35,color:#fff
    style NS fill:#9C27B0,color:#fff
    style IOT fill:#FF9800,color:#fff
```

---

## Current MVP Architecture

The MVP consists of the core active services: the mobile client, backend API, AI classification service, and the primary database.

```mermaid
graph TB
    subgraph Client["Client Layer"]
        MA["📱 Mobile App<br/>React Native · Expo"]
        WA["🌐 Web Portal<br/>React (NextJS) initial Setup"]
    end

    subgraph Services["Service Layer"]
        BE["☕ Backend API<br/>Spring Boot 3 · Java 21"]
        AI["🤖 AI Service<br/>FastAPI · Python 3.11"]
    end

    subgraph Data["Data Layer"]
        PG["🐘 PostgreSQL<br/>Primary Database"]
    end

    MA -->|JWT + HTTPS| BE
    WA -->|NextAuth + HTTPS| BE
    BE -->|HTTP| AI
    BE -->|JDBC| PG

    style MA fill:#61DAFB,color:#000
    style BE fill:#6DB33F,color:#fff
    style AI fill:#009688,color:#fff
    style PG fill:#4169E1,color:#fff
```

---

## MVP System Flow (Interaction Diagram)

The MVP implements the core interaction loop: **Tenant → Mobile App → Backend → AI → Response**.

```mermaid
sequenceDiagram
    participant T as 📱 Tenant
    participant M as Mobile App
    participant B as Backend API
    participant A as AI Service
    participant D as PostgreSQL

    T->>M: Describes issue in plain English
    M->>B: POST /tickets {description}
    B->>A: POST /analyze {text}
    
    alt AI Service is available
        Note over A: NLP Pipeline:<br/>1. spaCy tokenisation<br/>2. Lemmatisation<br/>3. Urgency classification<br/>4. Category detection<br/>5. Confidence scoring<br/>6. Action recommendation
        A-->>B: {urgency, category, confidence,<br/>score, action, explanation}
    else AI Service is down / timeout
        Note over B: Fallback triggered:<br/>Urgency: LOW<br/>Category: GENERAL<br/>Confidence: 0<br/>Action: Manual review required
    end
    
    B->>D: INSERT ticket + analysis
    B-->>M: TicketResponse DTO
    M-->>T: AI analysis result card
```

---

## Service Communication Matrix

| Source | Target | Protocol | Auth | Purpose |
|--------|--------|----------|------|---------|
| Mobile App | Backend | HTTPS/REST | JWT Bearer | All client operations |
| Backend | AI Service | HTTP/REST | Internal (network) | Ticket text analysis |
| Backend | PostgreSQL | JDBC | Credentials | Data persistence |
| Web Portal | Backend | HTTPS/REST | JWT Bearer | Staff operations (Phase 2) |
| IoT Sensors | IoT Service | MQTT/HTTPS | API Key (Phase 4) | Sensor data ingestion |

---

## Backend Component Architecture

```mermaid
graph LR
    subgraph Controller["Controller Layer"]
        AC[AuthController]
        TC[TicketController]
        CC["ContractorController<br/>(Phase 2)"]
        SC["StaffController<br/>(Phase 2)"]
    end

    subgraph Security["Security Layer"]
        JF[JwtFilter]
        JU[JwtUtil]
        PE[PasswordEncoder<br/>BCrypt]
    end

    subgraph Service["Service Layer"]
        AS[AuthService]
        TS[TicketService]
        AIC[AIClient]
    end

    subgraph Data["Data Access Layer"]
        TM[TicketMapper<br/>Entity → DTO]
        TR[TenantRepository]
        TKR[TicketRepository]
        AR[AnalysisRepository]
    end

    subgraph Models["Domain Model"]
        T[Tenant]
        TK[Ticket]
        TA[TicketAnalysis]
    end

    AC --> AS
    TC --> TS
    TC --> TKR
    TS --> AIC
    TS --> TKR
    TS --> AR
    AS --> TR
    JF --> JU
    TKR --> TM
    
    style Security fill:#ef4444,color:#fff
    style Controller fill:#3b82f6,color:#fff
    style Service fill:#10b981,color:#fff
```

---

## Mobile App Screen Architecture

```mermaid
graph TB
    subgraph Auth["Auth Flow"]
        LS[Login Screen]
        US[Unlock Screen<br/>Biometric]
    end

    subgraph Tabs["Tab Navigation"]
        HD[Home Dashboard]
        SV[Services<br/>Repairs · Bills]
        CM[Community]
        SH[Smart Home<br/>IoT - Phase 4]
    end

    subgraph Ticket["Ticket Flow"]
        CR[Create Ticket<br/>AI Analysis]
        DT[Ticket Detail]
    end

    subgraph Components["Reusable Components"]
        SC[SectionCard]
        CB[ConfidenceBar]
        RA[RecommendedActionCard]
        AR[AIReasoningSection]
        UH[UrgencyHeroCard]
    end

    LS -->|JWT| Tabs
    US -->|Biometric| Tabs
    SV --> CR
    SV --> DT
    CR --> DT
    DT --> SC & CB & RA & AR & UH

    style Auth fill:#f59e0b,color:#000
    style Tabs fill:#3b82f6,color:#fff
    style Ticket fill:#10b981,color:#fff
    style Components fill:#8b5cf6,color:#fff
```

---

## Data Flow Architecture

```mermaid
flowchart LR
    subgraph Input["Data Sources"]
        TI["Tenant Input<br/>(Natural Language)"]
        IOT["IoT Sensors<br/>(Phase 4)"]
        ERP["HomeMaster ERP<br/>(Phase 2)"]
    end

    subgraph Processing["Processing Layer"]
        NLP["NLP Engine<br/>spaCy Tokeniser"]
        CL["Classifier<br/>Rule-Based → ML"]
        AE["Action Engine<br/>Recommendation"]
        ML["ML Models<br/>(Phase 3)"]
    end

    subgraph Storage["Storage Layer"]
        PG["PostgreSQL<br/>Transactional"]
        TS["TimescaleDB<br/>Time-Series (Phase 4)"]
    end

    subgraph Output["Output Layer"]
        APP["Mobile App"]
        DASH["Staff Dashboard<br/>(Phase 2)"]
        RPT["Reports &<br/>Analytics (Phase 3)"]
    end

    TI --> NLP --> CL --> AE --> PG --> APP
    IOT --> TS --> ML --> DASH
    ERP --> PG --> RPT
    CL --> ML

    style Processing fill:#009688,color:#fff
    style Storage fill:#4169E1,color:#fff
```

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Mobile framework** | React Native (Expo) | Cross-platform iOS/Android from single codebase; strong ecosystem |
| **Backend** | Spring Boot 3 + Java 21 | Enterprise-grade, JPA/Hibernate ORM, mature security tooling |
| **AI service** | FastAPI + Python | Best ecosystem for NLP (spaCy), async-ready, separate scaling |
| **Database** | PostgreSQL | ACID compliance for financial data (rent), JSON support for analysis |
| **Auth** | JWT + BCrypt | Stateless for mobile clients, industry-standard password hashing |
| **AI approach** | Rule-based → ML | Start with explainable rules, evolve to ML as training data accumulates |
| **Architecture** | Microservices | Independent scaling, polyglot (Java + Python), isolated failure domains |
| **DB Migrations** | Flyway | Version-controlled schema evolution; auto-applied at startup for consistent environments |
