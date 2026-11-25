# PayShield 🛡️
> **Double-Entry Financial Ledger & Idempotent Payment Service**

PayShield is a backend financial transaction engine built with **Node.js, Express, and MySQL 8.0**. It is engineered to enforce strict mathematical accounting invariants, eliminate race conditions, and guarantee idempotent payment execution.

---

## 📌 Current Project Status: Day 3 Milestone

This repository is built and maintained daily. Here is what has been architected and implemented so far:

### ✅ Day 1: Architecture, Double-Entry Design & Schema
- **Mathematical Invariant:** Implemented the fundamental double-entry equation where money cannot be created or destroyed:
  $$\sum \text{Debits} \equiv \sum \text{Credits}$$
- **Relational Data Model:** Created the 5 foundational MySQL tables:
  1. `users` — Customer identity and role access (`CUSTOMER`, `ADMIN`, `AUDITOR`).
  2. `wallets` — Currency-specific account balance containers.
  3. `accounts` — Chart of accounts (`Asset`, `Liability`, `Equity`, `Revenue`, `Expense`).
  4. `transactions` — Atomic financial events with audit timestamps.
  5. `ledger_entries` — Immutable, insert-only records tracking debit and credit legs.
- **Server Foundation:** Express.js application scaffold with security middlewares (`helmet`, `cors`, `morgan`).

### ✅ Day 2: Git Version Control & Engineering Workflow
- **Repository Architecture:** Initialized local Git tracking with `main` branch configuration.
- **Secret & Dependency Isolation:** Configured `.gitignore` rules to protect environment secrets (`.env`) and prevent committing vendor libraries (`node_modules/`).
- **Remote Linking & Upstream Tracking:** Connected local repository to GitHub (`origin`) with permanent branch tracking (`git push -u origin main`).
- **Schema Validation:** Verified and corrected foreign key integrity in migration scripts.

### ✅ Day 3: Data Access Layer (Repository Pattern) & System Seeding
- **Repository Pattern Architecture:** Decoupled raw SQL queries from business logic by introducing dedicated repositories:
  - `user.repository.js` — User creation, ID lookup, email lookup, and paginated listing.
  - `account.repository.js` — Chart of accounts queries for platform reserves and customer wallets.
- **Transaction-Ready Data Layer:** Configured repositories with optional `connection = pool` parameter passing to seamlessly support atomic multi-statement MySQL transactions (`BEGIN ... COMMIT`).
- **Idempotent Database Seeding:** Created `seed.js` with `"seed": "node src/config/seed.js"` to bootstrap foundational platform system accounts (`PLATFORM_CASH_ASSET`, `PLATFORM_FEE_REVENUE`) without duplicating on repeated runs.
- **Data Layer Verification:** Validated end-to-end CRUD operations, parameter binding, and connection pool behavior with live MySQL tests.

---

## 🛠️ Current Tech Stack
- **Runtime:** Node.js v22.14.0 (ES Modules)
- **Framework:** Express.js
- **Database:** MySQL 8.0 (InnoDB engine, strict foreign key constraints)
- **Database Driver:** `mysql2/promise` with connection pooling
- **Security:** `helmet`, `cors`, `dotenv`
- **Version Control:** Git & GitHub

---

## ⚙️ Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/VedantTichkule/payshield.git
cd payshield

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Run database migrations (creates all 5 tables in MySQL)
npm run migrate

# 5. Seed platform system accounts
npm run seed

# 6. Start development server
npm run dev
```

---

## 🔜 Next Milestone: Day 4
- **Authentication Service:** Password hashing with `bcrypt` (salt rounds, rainbow table protection).
- **Session & Identity Tokens:** Generating JWT access and refresh tokens.
- **Auth Routes & Controllers:** Building `/api/auth/register` and `/api/auth/login` endpoints.

---

*Engineered by [Vedant Tichkule](https://github.com/VedantTichkule)*
