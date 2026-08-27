# 🛡️ GuardAI Voice Shield
> **AI-powered Real-time Scam Detection & Family Protection**
> 
> *"Protect users before they become victims."*

---

## 📌 Project Overview

Online scams are evolving rapidly and increasingly targeting vulnerable demographics such as seniors, parents, and non-technical users. During high-pressure scam calls, victims are subjected to intense psychological manipulation and rarely realize they are being scammed until it's too late.

**GuardAI Voice Shield** provides **proactive real-time conversation defense**:
- Continuous speech-to-text transcript processing during live calls or audio inputs.
- Real-time manipulation pattern detection powered by Gemini AI (Authority impersonation, Urgency creation, Fear tactics, Isolation pressure, Financial requests).
- Immediate visual risk indicators (Risk Score & Threat Levels) and automated emergency push notifications to designated family Guardians.

---

## 🚀 Core Features

| Feature | Description |
| :--- | :--- |
| 🛡️ **Conversation Shield** | Real-time audio stream analysis from microphone, uploaded audio, or simulated calls with live risk scoring. |
| 🧠 **Psychological Detection** | Identifies 9 manipulation techniques: *Authority, Fear, Urgency, Isolation, Trust Building, Greed, Financial Request, Identity Theft, Credential Harvesting*. |
| ⏳ **Scam Attack Timeline** | Constructs a chronological event timeline detailing threat progression and escalation points. |
| 🔍 **Evidence Panel** | Automatically extracts suspicious evidence including phone numbers, URLs, bank accounts, QR codes, and government impersonation claims. |
| 💡 **Smart Action Guidance** | Delivers actionable emergency guidance (e.g., Hang up immediately, Do NOT transfer money, Call official hotline). |
| 👨‍👩‍👧 **Family Shield** | Triggers automated alerts to trusted guardians when risk score exceeds safety thresholds ($\ge 90\%$). |
| 📄 **Investigation Report** | Generates detailed case investigation reports (PDF/JSON) with complete evidence and timelines. |

---

## 🏗️ Architecture & Tech Stack

### Technology Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS (Google Material 3 Design)
- **AI Engine**: Gemini 2.5 Flash API (Structured JSON Mode)
- **Speech Processing**: Google Speech-to-Text API
- **Database & Auth**: Firebase Firestore & Firebase Auth
- **Notification**: Firebase Cloud Messaging (FCM)
- **Deployment**: Firebase Hosting & Cloud Run

### AI Processing Pipeline
```
Audio Input ──► Speech-to-Text ──► Gemini Flash AI ──► Structured JSON ──► Risk Engine & Alert ──► FCM Notification
```

---

## 📲 Hướng Dẫn Tải & Cài Đặt Ứng Dụng (App Installation)

### Cách 1: Cài đặt trực tiếp dạng Web App / PWA trên điện thoại (Nhanh nhất)
Ứng dụng đã hỗ trợ đầy đủ tiêu chuẩn **Progressive Web App (PWA)**, cho phép cài đặt và chạy toàn màn hình với icon riêng như app native:
1. Mở đường link ứng dụng trên trình duyệt điện thoại (Safari trên iOS, Chrome/Cốc Cốc trên Android).
2. Thao tác cài đặt:
   - **iOS (iPhone / iPad - Safari)**: Nhấn nút **Chia sẻ (Share)** (biểu tượng ⬆️) ➔ Chọn **"Thêm vào Màn hình chính" (Add to Home Screen)** ➔ Nhấn **Thêm (Add)**.
   - **Android (Chrome / Cốc Cốc)**: Nhấn biểu tượng menu **3 chấm (⋮)** ➔ Chọn **"Cài đặt ứng dụng" (Install app)** hoặc **"Thêm vào Màn hình chính" (Add to Home screen)**.
3. Ứng dụng GuardAI sẽ xuất hiện trên màn hình chính và có thể sử dụng ngay lập tức.

### Cách 2: Đóng gói thành ứng dụng Mobile Native (Android APK & iOS App)
Dự án đã tích hợp sẵn cấu hình **Capacitor** (`capacitor.config.ts`), cho phép xuất bản file cài đặt native:
```bash
# 1. Cài đặt dependencies
npm install

# 2. Biên dịch gói ứng dụng
npm run build

# 3. Đóng gói cho Android Studio (Xuất file APK)
npx cap add android
npx cap sync
npx cap open android

# 4. Đóng gói cho Xcode (iOS - chạy trên macOS)
npx cap add ios
npx cap sync
npx cap open ios
```
*Chi tiết các quyền hệ thống (Microphone, Rung cảnh báo, Thông báo đẩy) vui lòng xem tại [11_MOBILE_APP_GUIDE.md](./docs/11_MOBILE_APP_GUIDE.md).*

---

## 📁 Repository Structure

```text
docs/                          # Technical Documentation
├── 01_PRODUCT_SPEC.md         # Product Specs & Problem Statement
├── 02_BUILD_SPEC.md           # Build Architecture & Tech Stack
├── 03_SYSTEM_ARCH.md          # System Architecture & Data Flow Diagrams
├── 04_TASKS.md                # Development Task Breakdown (Epics 1-10)
├── 05_SPRINT_PLAN.md          # 8-Sprint Development Roadmap
├── 06_APP_PROMPTS.md          # GuardAI Development Prompt & AI Guidelines
├── 07_UI_GUIDELINE.md         # UI & Material Design System Guidelines
├── 08_FIREBASE_SETUP.md       # Coding Conventions & Firebase Configuration
├── 09_AI_RULES.md             # Coding & Architecture Rules
└── 10_DEFINITION_OF_DONE.md   # Task Completion Criteria

src/
├── frontend/                  # React + Vite Frontend Application
└── backend/                   # Backend API Services & Cloud Run Integration
```

---

## 📖 Specification Documentation Index

Access detailed specifications inside `docs/`:

1. **[01_PRODUCT_SPEC.md](./docs/01_PRODUCT_SPEC.md)** — Product Vision, User Personas, Core Features & Demo Scenario.
2. **[02_BUILD_SPEC.md](./docs/02_BUILD_SPEC.md)** — Technical Architecture, Folder Structure, Page Views & AI JSON Schemas.
3. **[03_SYSTEM_ARCH.md](./docs/03_SYSTEM_ARCH.md)** — System Component Diagram, Data Flow & Firestore Collection Schemas.
4. **[04_TASKS.md](./docs/04_TASKS.md)** — Comprehensive Task Backlog (Epics 1 to 10).
5. **[05_SPRINT_PLAN.md](./docs/05_SPRINT_PLAN.md)** — 8-Sprint Development Schedule.
6. **[06_APP_PROMPTS.md](./docs/06_APP_PROMPTS.md)** — GuardAI Development Prompt & Workflow Guidelines.
7. **[07_UI_GUIDELINE.md](./docs/07_UI_GUIDELINE.md)** — UI Styling Rules, Material 3 Color Schemes & Animation Guidelines.
8. **[08_FIREBASE_SETUP.md](./docs/08_FIREBASE_SETUP.md)** — TypeScript Coding Standards & Firebase Setup Guidelines.
9. **[09_AI_RULES.md](./docs/09_AI_RULES.md)** — Coding & Architecture Rules.
10. **[10_DEFINITION_OF_DONE.md](./docs/10_DEFINITION_OF_DONE.md)** — Quality & Task Definition of Done Checklist.
11. **[11_MOBILE_APP_GUIDE.md](./docs/11_MOBILE_APP_GUIDE.md)** — Native Mobile Deployment Guide (Android APK & iOS Setup).

---

## 🎯 MVP Development Roadmap (15 Days)

- **Sprint 1**: Project Foundation (React + Vite + TypeScript + TailwindCSS)
- **Sprint 2**: Authentication (Google Login & Guest Sessions)
- **Sprint 3**: Audio & Speech-to-Text Service Integration
- **Sprint 4**: Gemini Scam Analysis Engine & JSON Schema Validation
- **Sprint 5**: Real-time Protection Dashboard (Risk Gauge, Live Transcript, Timeline, Alerts)
- **Sprint 6**: Firestore Data Persistence (Users, Reports, History)
- **Sprint 7**: FCM Family Shield & Push Emergency Notifications
- **Sprint 8**: Production Build & Cloud Deployment

---

© 2026 **GuardAI Team**. Built with Google AI Studio & Gemini API.
