# Buster Core

Buster Core is a field service reporting and accountability system designed to eliminate communication breakdowns and operational inefficiencies.

---

## 🎯 Phase: Early Adopter Program (EAP)

This repository is focused ONLY on building the **Buster Core MVP** for a 6-week Early Adopter Program.

Goal:
Deliver a working system that improves communication, accountability, and job clarity for field service teams.

---

## 🧱 Core Principles

1. Communication breakdowns are the root of operational failure  
2. Reporting must be simple, structured, and consistent  
3. Accountability must be visible and enforced  
4. Data must be clean for future AI analysis  
5. Do not overbuild — ship fast, iterate later  

---

## 🧾 Core Features (EAP Scope ONLY)

### Worker Side
- Create and view work orders  
- View job history (client/location awareness)  
- Submit report using **3 C’s**:
  - Concern
  - Cause
  - Correction  
- Upload evidence (photos + video up to 90 seconds)  
- Set job status:
  - Complete
  - Incomplete
  - On Hold (with required reason)  
- Append reports (timestamped, non-editable history)  
- Trigger Heat Case manually  

---

### Manager Side
- Dashboard with **Heat Cases prioritized (🔥)**  
- View all work orders  
- Filter by:
  - Worker
  - Team
  - Manager
  - Status
  - Date range  
- Open Heat Case and:
  - Coordinate externally (call/text/email)  
  - Submit required **3 C’s manager report**  
  - Append dispatch instructions  
  - Close Heat Case with resolution summary  
- Flag client as **Heat Case Potential**  

---

## 🔁 Data Integrity Rules

- Original reports are **immutable after submission**  
- All updates must be **appended**  
- Heat Case reports do NOT overwrite worker reports  
- Full audit trail must always be preserved  

---

## 🚫 Out of Scope (DO NOT BUILD YET)

- Real-time chat or messaging  
- AI-driven reporting or analysis  
- Automated escalation rules  
- Advanced analytics dashboards  
- Over-engineered filtering systems  

---

## 🧠 Future Phases

### Mid Tier
- Structured analysis
- Pattern detection
- Performance insights

### High Tier
- AI agent-driven workflows
- Conversational reporting
- Predictive issue detection

---

## ⚙️ Tech Stack

- Frontend: (TBD - Vercel deployment)
- Backend: Supabase
- Auth: Supabase Auth
- Storage: Supabase Storage (for media)

---

## 🚨 Development Rule

Every feature must be:
- Clearly defined
- Scoped to EAP
- Built as a small, testable unit

No freeform building. No feature drift.

---

## 👤 Product Owner

Neil Abbott

---
