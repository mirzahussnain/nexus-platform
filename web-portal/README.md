# Nexus Web Portal (Staff & Contractor Dashboard)

> React.js 19 · Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui

---

## 🖥️ Overview

The **Nexus Web Portal** serves as the command centre for housing operations. It provides role-specific dashboards for **Housing Staff** and **External Contractors** to manage tickets, tenants, and maintenance jobs.

> **Phase 2 Status:** This portal is currently in active development. It interfaces with the Spring Boot Backend via REST APIs.

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | React framework for production |
| **Language** | TypeScript 5 | Type safety & developer experience |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **UI Library** | shadcn/ui + Radix UI | Accessible, headless component primitives |
| **State** | React Query (TanStack) | Server state management & caching |
| **Auth** | NextAuth.js (v5) | Authentication & Session Management |
| **Forms** | React Hook Form + Zod | Form validation & schema enforcement |
| **Icons** | Lucide React | Consistent icon set |

---

## 🔐 Authentication & Security

### Architecture: BFF (Backend-for-Frontend)
The portal uses **NextAuth.js** (Auth.js) to bridge the client and the Spring Boot backend.

1.  **Login UI**: User enters credentials.
2.  **NextAuth**: Sends `POST /auth/login` to the **Spring Boot Backend**.
3.  **Backend**: Validates credentials and returns a **JWT**.
4.  **Session**: NextAuth receives the JWT and encrypts it into a secure, HTTP-only session cookie.
5.  **Middleware**: `middleware.ts` decodes the session to protect routes (RBAC).
6.  **API Handler**: Client-side API calls attach the JWT (from the session) to the Authorization header.

### Role-Based Access Control (RBAC)

| Role | Access Level | Route Pattern |
|------|-------------|---------------|
| **ADMIN** | System-wide access | `/dashboard/admin/**` |
| **STAFF** | Operational access | `/dashboard/staff/**` |
| **CONTRACTOR** | Job-specific access | `/dashboard/contractor/**` |

---

## 📂 Project Structure

```
web-portal/
├── app/
│   ├── (auth)/                 # Public auth routes (login, register)
│   ├── (dashboard)/            # Protected dashboard layout
│   │   ├── admin/              # Admin-specific pages
│   │   ├── staff/              # Staff-specific pages
│   │   └── contractor/         # Contractor-specific pages
│   ├── api/auth/[...nextauth]/ # NextAuth handler
│   ├── globals.css             # Tailwind base styles
│   └── layout.tsx              # Root layout + Providers
│
├── components/
│   ├── ui/                     # shadcn/ui primitives (button, input, etc.)
│   ├── manual-ui/              # Custom domain components
│   └── dashboard-sidebar.tsx   # Role-aware navigation
│
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   └── utils.ts                # Helper functions (cn, formatters)
│
└── public/                     # Static assets
```

---

## 🚦 Current State & Visual Roadmap

The Web Portal is currently in **Phase 2 (Dashboard UI & Auth Setup)**. 
We have successfully built the frontend UI shell, but it currently lacks real backend integration and authentication.

### 📊 Current Progress Snapshot

| Component / Feature | Status | Notes |
|---------------------|:------:|-------|
| **Core Framework** | 🟢 | Next.js 16 App Router, Tailwind v4, Typescript setup complete. |
| **Design System** | 🟢 | `shadcn/ui` installed with dark mode & 25+ base components. |
| **Layout Shell** | 🟢 | Responsive Sidebar (`dashboard-sidebar.tsx`) & Header built. |
| **Mock Dashboards** | 🔴 | Only empty route groups `(admin)`, `(staff)`, `(contractor)` exist. No UI built yet. |
| **Complex UI Components**| 🟢 | Generic `maintenance-table.tsx` and `chatbot-widget.tsx` UIs built. |
| **Authentication Flow**| 🔴 | `next-auth` is **NOT** installed. `/login` is a static placeholder. |
| **RBAC Middleware** | 🔴 | No route protection. Users can navigate anywhere. |
| **Backend Integration**| 🔴 | No live data fetching. All tables use mock generic data. |

*(Legend: 🟢 Complete | 🟡 In Progress | 🔴 Not Started)*

---

## 🧪 Testing Strategy

- **Frameworks:** Vitest + React Testing Library
- **Unit Testing:** Validating utility functions and Zod form schemas.
- **Component Testing:** Rendering `shadcn/ui` components in isolation, simulating form submissions, and asserting generic layouts.
- **Integration Testing:** Mocking `NextAuth` sessions to verify RBAC middleware redirects (Admin vs Staff routing). Mocking API HTTP calls using MSW (Mock Service Worker) to ensure tables render correct backend data.
- **E2E Testing (Phase 3):** Playwright will be introduced to automate full browser journeys (e.g., login, create ticket, assign contractor).

---

### 🗺️ Future Implementation Phases

#### **Phase 2B: Authentication & RBAC (Next Immediate Goal)**
- Install and configure NextAuth.js (Auth.js v5).
- Create a Custom Credentials Provider pointing to `Spring Boot POST /auth/login`.
- Implement JWT session decoding in Next.js `middleware.ts`.
- Secure routes (`/dashboard/admin`, etc.) based on decoded JWT roles.
- Wire up the static `/login` page to actually call `signIn()`.

#### **Phase 2C: Live Data & Operational Dashboards**
- **Staff:** Integrate `maintenance-table.tsx` with live `/tickets` backend API.
- **Contractor:** Build the "My Jobs" view and photo upload integration for ticket completion.
- **Admin:** Build user management screens to invite Staff/Contractors.

#### **Phase 4: IoT & AI Integration**
- **Real-time Sensor Dashboard:** Display TimescaleDB IoT data (Temp/Humidity) via charts.
- **AI Alerts:** Integrate with Python FastAPI service to display Mould/Damp risk alerts on the dashboard.

---

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+
- Backend running on `http://localhost:8080` (or configured URL)

### Installation

```bash
cd web-portal
npm install
# or
pnpm install
```

### Environment Variables (.env.local)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Run Locally

```bash
npm run dev
# -> http://localhost:3000
```
