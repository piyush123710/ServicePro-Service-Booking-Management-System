# ServicePro – Enterprise Service Booking & Field Operations Management System

[![Framework](https://img.shields.io/badge/Frontend-Angular%2017%2B%20%7C%20TypeScript-DD0031?style=flat&logo=angular)](https://angular.io)
[![Backend](https://img.shields.io/badge/Backend-.NET%208%20%7C%20ASP.NET%20Core%20Web%20API-512BD4?style=flat&logo=dotnet)](https://dotnet.microsoft.com)
[![ORM](https://img.shields.io/badge/ORM-Entity%20Framework%20Core%208-512BD4?style=flat)](https://learn.microsoft.com/ef/core/)
[![Database](https://img.shields.io/badge/Database-Microsoft%20SQL%20Server-CC292B?style=flat&logo=microsoftsqlserver)](https://www.microsoft.com/sql-server)
[![Cloud](https://img.shields.io/badge/Cloud-Microsoft%20Azure-0078D4?style=flat&logo=microsoftazure)](https://azure.microsoft.com)
[![Security](https://img.shields.io/badge/Security-JWT%20Bearer%20%26%20RBAC-000000?style=flat&logo=jsonwebtokens)](https://jwt.io)

---

## 📌 Resume Description & Technical Highlights

> **ServicePro – Service Booking & Management System**  
> *Enterprise Full-Stack Architecture for Field Service Operations*  
> • **Frontend & Backend**: Built a full-stack enterprise service booking platform using **Angular 17+** and **ASP.NET Core 8 Web API**.  
> • **RESTful APIs**: Developed modular RESTful APIs for service catalog management, online appointment scheduling, technician dispatch assignment, and real-time status tracking.  
> • **Database & ORM**: Implemented **Microsoft SQL Server** relational database integration using **Entity Framework Core (EF Core 8)** with Code-First migrations, automated indexing, and LINQ compiled queries.  
> • **Security & RBAC**: Integrated **JSON Web Token (JWT)** authentication and role-based authorization for customers, certified field service providers, and enterprise administrators.  
> • **Cloud Infrastructure**: Deployed and monitored application resources on **Microsoft Azure**, utilizing Azure App Service (Linux), Azure SQL Database, Azure Key Vault for secret management, and Azure Communication Services for transactional email dispatch.

---

## 📖 Project Overview

**ServicePro** is an enterprise-grade service booking and dispatch management platform engineered for residential and commercial facility maintenance trades, including:
- **HVAC & Precision AC Repair** (refrigerant diagnostics, coil flush, capacitor calibration)
- **Master Plumbing** (acoustic leak detection, hydrostatic pressure audits, valve replacement)
- **Certified Electrical Maintenance** (FLIR thermal infrared breaker scans, GFCI safety verification)
- **Hospital-Grade Deep Cleaning** (210°F pressurized steam sanitation, HEPA air purification)
- **Commercial Appliance Care** (OEM motor diagnostics, error code resets)
- **Architectural Carpentry** (laser-leveled door alignment, high-security lock fitting)

The platform bridges customers needing transparent service appointments with certified field technicians and enterprise dispatchers who oversee resource allocation, SLA compliance, and financial reporting.

---

## 🚀 Key Features

### 1. Customer & Service-Provider Registration
- Self-service onboarding for customers and certified trade contractors.
- Technician profile management with skill taxonomies, verified state trade licenses (e.g., EPA Universal 608, State Master Plumbing, NEC Certified), phone numbers, and emergency availability toggles.

### 2. Service Listing & Category Management
- Categorized service catalog with base prices, estimated job durations, and guaranteed response SLAs.
- Modular diagnostic add-on packages (e.g., Hospital-Grade HEPA MERV-13 Filters, High-Pressure Chemical Evaporator Flush).
- Admin controls to publish new trade offerings, modify pricing, and toggle active catalog visibility.

### 3. Online Appointment Booking Wizard
- Multi-step booking experience:
  1. **Scope Selection**: Select base service and configure optional performance add-ons.
  2. **Scheduling**: Choose calendar date and preferred arrival window (Morning, Midday, Afternoon).
  3. **Location & Access**: Input street address, unit/suite, city, and gate/keycard access notes.
  4. **Guaranteed Quote Review**: Real-time calculation of base price + add-ons + 8.0% state tax with a guaranteed total price.

### 4. Booking Approval & Cancellation Workflow
- Strict lifecycle state transitions: `Requested` $\rightarrow$ `Approved` $\rightarrow$ `Assigned` $\rightarrow$ `In Progress` $\rightarrow$ `Completed` (or `Cancelled`).
- Mandatory audit logging of cancellation reasons for dispute prevention and refund management.
- Admin and provider approval queues for incoming customer requests.

### 5. Service-Provider Assignment & Dispatch Fleet
- Live technician roster displaying real-time dispatch load (e.g., `2 / 4 Max Jobs`).
- Direct technician assignment to pending work orders based on trade qualifications, geographic proximity, and customer ratings.

### 6. Booking Status Tracking & Milestone Progression
- Visual milestone progress stepper showing real-time job execution state.
- **Milestone Simulator**: Allows dispatchers and test users to advance work orders step-by-step through each phase.
- **Field Checklist Execution**: Technicians verify digital safety and completion items; updates sync to the customer portal.
- **Technician Field Notes**: Technicians record manifold pressure readings, voltage drop measurements, and digital signatures.
- **Ratings & Reviews**: 5-star customer review submission with written feedback.
- **Digital Tax Invoice**: Generates itemized tax receipts and certificates of work completion.

### 7. Admin Dashboard & Executive Reports
- Real-time KPI summaries: Gross Revenue, Total Work Orders, Active Jobs, SLA Fulfillment Rate, and CSAT (Customer Satisfaction).
- Category revenue distribution metrics and technician dispatch utilization charts.
- **One-Click CSV Export**: Download complete work order records formatted for ERP/BI systems.

### 8. Transactional Email Notifications
- Real-time in-app notification center with unread badges.
- Transactional HTML email dispatch simulation for:
  - `Booking Confirmed (#SP-XXXXX)`
  - `Technician Dispatched & En Route`
  - `Work Order Completed & Tax Invoice`
- Clean email client viewer showing sender relay headers and rendered HTML templates.

### 9. JWT Authentication & Role-Based Access Control (RBAC)
- Token-based stateless authentication using HMAC-SHA256 signed JSON Web Tokens.
- Built-in **JWT Inspector** displaying raw tokens, decoded headers, and claims (`sub`, `email`, `role`, `tenant_id`, `permissions`, `exp`).
- Role definitions:
  - `Customer`: Book services, view owned appointments, cancel requested bookings, submit reviews.
  - `ServiceProvider`: View assigned work orders, advance statuses, execute checklists, append field notes.
  - `Admin`: Full access to fleet dispatch, technician assignment, catalog pricing, and analytics reports.

### 10. Microsoft Azure Cloud Architecture & REST API Explorer
- Decoupled enterprise topology using Azure App Service, Azure SQL Database, Azure Key Vault, and Azure Communication Services.
- Interactive Swagger/OpenAPI REST API console enabling live execution of simulated endpoints.

---

## 🏛️ System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT LAYER (SPA)                              │
│         Angular 17+ / TypeScript / Reactive Forms / Tailwind CSS            │
│                 Hosted on Azure Static Web Apps / CDN                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / HTTPS (Bearer JWT Token)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY / MIDDLEWARE                          │
│     Azure App Service (Linux) - ASP.NET Core 8 Web API Runtime Engine       │
│  - JwtBearerAuthentication Middleware                                       │
│  - MediatR CQRS Pipeline & FluentValidation                                 │
│  - Global Exception Handling & Serilog Structured Logging                   │
└──────────────────┬──────────────────────────────────────┬───────────────────┘
                   │                                      │
                   ▼                                      ▼
┌─────────────────────────────────────┐  ┌────────────────────────────────────┐
│      PERSISTENCE LAYER (ORM)        │  │       CLOUD SECURITY & COMM        │
│  Entity Framework Core 8 (EF Core)  │  │  Azure Key Vault                   │
│  - Code-First Schema Migrations     │  │  - Master JWT Signing Secrets      │
│  - LINQ Compiled Queries            │  │  - SQL Connection Strings          │
│  - ChangeTracker & UnitOfWork       │  │                                    │
│                                     │  │  Azure Communication Services      │
│  Microsoft SQL Server (Azure SQL)   │  │  - Transactional Email Dispatch    │
│  - Relational Schema & Foreign Keys │  │  - SMS Dispatch Alert Relay        │
│  - Row-Level Multi-Tenant Security  │  │                                    │
└─────────────────────────────────────┘  └────────────────────────────────────┘
```

---

## 🗄️ Relational Database Schema (SQL Server / EF Core)

The schema is managed via EF Core Code-First migrations with strong referential integrity:

```sql
-- 1. Users & Personas Table
CREATE TABLE Users (
    Id NVARCHAR(64) PRIMARY KEY,
    FullName NVARCHAR(150) NOT NULL,
    Email NVARCHAR(200) UNIQUE NOT NULL,
    Role NVARCHAR(50) NOT NULL, -- 'Customer', 'ServiceProvider', 'Admin'
    PhoneNumber NVARCHAR(50),
    CreatedAt DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET()
);

-- 2. Service Catalog Table
CREATE TABLE Services (
    Id NVARCHAR(64) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Category NVARCHAR(100) NOT NULL,
    ShortDescription NVARCHAR(500) NOT NULL,
    FullDescription NVARCHAR(MAX) NOT NULL,
    BasePrice DECIMAL(10,2) NOT NULL,
    DurationMinutes INT NOT NULL,
    SlaHours INT NOT NULL,
    Rating DECIMAL(3,2) DEFAULT 5.0,
    IsActive BIT DEFAULT 1
);

-- 3. Service Add-ons Table
CREATE TABLE ServiceAddons (
    Id NVARCHAR(64) PRIMARY KEY,
    ServiceId NVARCHAR(64) FOREIGN KEY REFERENCES Services(Id),
    Name NVARCHAR(150) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Description NVARCHAR(300)
);

-- 4. Service Providers / Technicians Table
CREATE TABLE ServiceProviders (
    Id NVARCHAR(64) PRIMARY KEY,
    UserId NVARCHAR(64) FOREIGN KEY REFERENCES Users(Id),
    TradeRole NVARCHAR(100) NOT NULL,
    Rating DECIMAL(3,2) DEFAULT 5.0,
    CompletedJobs INT DEFAULT 0,
    IsAvailable BIT DEFAULT 1,
    Certifications NVARCHAR(MAX) -- Serialized JSON array of licenses
);

-- 5. Bookings / Work Orders Table
CREATE TABLE Bookings (
    Id NVARCHAR(64) PRIMARY KEY,
    BookingCode NVARCHAR(20) UNIQUE NOT NULL, -- e.g. 'SP-94810'
    ServiceId NVARCHAR(64) FOREIGN KEY REFERENCES Services(Id),
    CustomerId NVARCHAR(64) FOREIGN KEY REFERENCES Users(Id),
    AssignedProviderId NVARCHAR(64) NULL FOREIGN KEY REFERENCES ServiceProviders(Id),
    Address NVARCHAR(250) NOT NULL,
    Unit NVARCHAR(50) NULL,
    City NVARCHAR(100) NOT NULL,
    ScheduledDate DATE NOT NULL,
    ScheduledTimeSlot NVARCHAR(50) NOT NULL,
    Status NVARCHAR(30) NOT NULL, -- 'Requested', 'Approved', 'Assigned', 'In Progress', 'Completed', 'Cancelled'
    BasePrice DECIMAL(10,2) NOT NULL,
    AddonsTotal DECIMAL(10,2) NOT NULL,
    TaxAmount DECIMAL(10,2) NOT NULL,
    TotalPrice DECIMAL(10,2) NOT NULL,
    SpecialInstructions NVARCHAR(MAX) NULL,
    CancellationReason NVARCHAR(MAX) NULL,
    Rating INT NULL,
    FeedbackText NVARCHAR(MAX) NULL,
    CreatedAt DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET(),
    UpdatedAt DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET()
);

-- 6. Checklist Execution & Field Notes
CREATE TABLE BookingChecklistItems (
    Id NVARCHAR(64) PRIMARY KEY,
    BookingId NVARCHAR(64) FOREIGN KEY REFERENCES Bookings(Id) ON DELETE CASCADE,
    TaskDescription NVARCHAR(300) NOT NULL,
    IsCompleted BIT DEFAULT 0
);
```

---

## 📡 RESTful API Endpoints Specification

All endpoints are secured via JWT bearer tokens and organized by route controller:

| Method | Endpoint | Authorization | Description |
|---|---|---|---|
| `GET` | `/api/v1/services` | Public / All | Returns list of active service catalog items and diagnostic packages |
| `POST` | `/api/v1/services` | `Admin` | Publishes a new certified trade service offering |
| `PATCH` | `/api/v1/services/{id}/status` | `Admin` | Activates or deactivates a service offering |
| `GET` | `/api/v1/bookings` | `Customer`, `ServiceProvider`, `Admin` | Returns work orders filtered by the requester's identity |
| `POST` | `/api/v1/bookings` | `Customer` | Submits an appointment booking with atomic price calculation |
| `GET` | `/api/v1/bookings/{id}` | All Authenticated | Fetches full booking details, checklist items, and technician notes |
| `PUT` | `/api/v1/bookings/{id}/assign` | `Admin` | Assigns or reassigns a certified field technician |
| `PATCH` | `/api/v1/bookings/{id}/status` | `ServiceProvider`, `Admin` | Transitions status (`Approved`, `In Progress`, `Completed`) |
| `POST` | `/api/v1/bookings/{id}/cancel` | `Customer`, `Admin` | Cancels appointment and logs audit cancellation reason |
| `POST` | `/api/v1/bookings/{id}/review` | `Customer` | Submits customer star rating and feedback text |
| `GET` | `/api/v1/technicians` | All Authenticated | Returns technician fleet roster, trade skills, and active job load |
| `POST` | `/api/v1/auth/token` | Anonymous | Authenticates credentials and returns signed JWT Bearer token |
| `GET` | `/api/v1/admin/reports/analytics` | `Admin` | Aggregated executive revenue velocity, CSAT, and utilization metrics |

---

## 🔐 JWT Authentication & Authorization Deep Dive

### 1. Token Structure
Every API request transmits an `Authorization: Bearer <token>` header composed of three Base64URL-encoded segments:

```json
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload (Claims)
{
  "iss": "https://auth.servicepro.azure.net",
  "sub": "piyushnagbansi500@gmail.com",
  "aud": "https://api.servicepro.azure.net",
  "email": "piyushnagbansi500@gmail.com",
  "name": "Piyush Nagbansi",
  "role": "Customer",
  "tenant_id": "AZURE-TENANT-PROD-092",
  "permissions": ["services.read", "bookings.create", "bookings.read_own"],
  "iat": 1731140000,
  "exp": 1731744800
}
```

### 2. ASP.NET Core 8 Web API Implementation Pattern

```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Azure:Jwt:Issuer"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["AzureKeyVault:JwtSecret"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
    options.AddPolicy("RequireFieldProvider", policy => policy.RequireRole("ServiceProvider", "Admin"));
});
```

---

## 💻 Tech Stack Summary

| Layer | Technology | Key Capabilities |
|---|---|---|
| **Frontend** | Angular 17+ / React 19 / TypeScript | Reactive forms, clean UI architecture, tabular numerals, unboxed metadata |
| **Styling** | Tailwind CSS v4 | High-density data grid formatting, zero-pill discipline, WCAG AA compliance |
| **Backend API** | ASP.NET Core 8 Web API (.NET 8) | RESTful API controllers, MediatR CQRS, FluentValidation, Serilog |
| **Database** | Microsoft SQL Server | Relational normalization, foreign keys, row-level multi-tenancy |
| **ORM** | Entity Framework Core 8 | Code-First migrations, DbContext pooling, LINQ optimization |
| **Security** | JWT (JSON Web Tokens) | HMAC-SHA256 signature, claims validation, RBAC policies |
| **Cloud** | Microsoft Azure | App Service, Azure SQL Database, Azure Key Vault, Azure Communication Services |

---

## 🛠️ Local Development & Execution

### Prerequisites
- Node.js 20+ & npm
- .NET 8 SDK (for backend development)
- SQL Server 2022 or Azure SQL instance

### Running the Application
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The application will be served at `http://localhost:3000`.

### Key Commands
- `npm run build`: Compiles production distribution files.
- `npm run lint`: Runs TypeScript validation checks (`tsc --noEmit`).

---

## 📄 License & Attribution

This project is licensed under the Apache 2.0 License. Built for enterprise portfolio presentation and technical system design demonstration.
