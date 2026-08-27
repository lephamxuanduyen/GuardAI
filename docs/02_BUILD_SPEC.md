# GuardAI Voice Shield
# Build Specification

# 1. Technology Stack

## Mobile

React
Vite
TypeScript
Capacitor

Target:

- Android
- iOS

---

## Web

React
Vite
TypeScript
TailwindCSS

---

## Backend

Google Cloud Run

Runtime:

Node.js
TypeScript

Backend framework:

Express or equivalent lightweight framework.

---

## AI

Gemini API

All Gemini calls should be routed through the backend.

---

## Database

Firebase Firestore

---

## Authentication

Firebase Authentication

Providers:

- Google
- Anonymous

---

## Notifications

Firebase Cloud Messaging

---

## Hosting

Firebase Hosting

---

# 2. High-Level Architecture

```text
                Mobile App
                    │
                    │ HTTPS
                    ▼
              Cloud Run API
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       Gemini    Firestore    FCM
          │
          ▼
      AI Analysis
```

---

# 3. Mobile Architecture

```text
React UI
   │
   ├── Audio Manager
   ├── Transcript Manager
   ├── Risk Manager
   ├── Alert Manager
   └── API Client
          │
          ▼
      Cloud Run
```

---

# 4. Project Structure

```text
guardai/
│
├── docs/
│
├── mobile/
│   ├── src/
│   ├── android/
│   ├── ios/
│   └── capacitor.config.ts
│
├── web/
│   └── src/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── prompts/
│   │   └── utils/
│   │
│   ├── Dockerfile
│   └── package.json
│
└── firebase/
    ├── firestore.rules
    └── firebase.json
```

---

# 5. Mobile Services

Required services:

- AudioService
- SpeechService
- ApiService
- AuthService
- NotificationService
- VibrationService
- StorageService

---

# 6. Backend Services

Required:

- GeminiService
- ScamAnalysisService
- TranscriptService
- RiskService
- ReportService
- FirestoreService
- NotificationService
- AuthenticationService

---

# 7. API

Base:

```text
/api/v1
```

Endpoints:

```text
POST /sessions
POST /sessions/:id/transcript
POST /sessions/:id/analyze
POST /sessions/:id/end
GET  /reports
GET  /reports/:id
POST /guardians
DELETE /guardians/:id
```

---

# 8. Session

A protection session represents one monitoring session.

Example:

```json
{
  "sessionId": "session_123",
  "userId": "user_123",
  "status": "ACTIVE",
  "startedAt": "...",
  "endedAt": null
}
```

---

# 9. Transcript Processing

Do not send every individual word to Gemini.

Use chunks.

Example:

```text
Audio
 ↓
Transcript Chunk
 ↓
Buffer
 ↓
Backend
 ↓
Gemini
```

Use configurable chunk size and debounce.

Goal:

- Low latency
- Lower API usage
- Stable analysis

---

# 10. Gemini Response

Backend must validate Gemini output.

Expected:

```json
{
  "risk": 82,
  "riskLevel": "CRITICAL",
  "summary": "...",
  "scamType": "...",
  "techniques": [],
  "evidence": [],
  "timeline": [],
  "recommendations": []
}
```

---

# 11. Risk Engine

Backend is the authoritative source for risk classification.

Client should not independently determine the final risk.

---

# 12. Alert Engine

When:

```text
risk >= 81
```

Backend returns:

```json
{
  "alert": true,
  "severity": "CRITICAL"
}
```

Mobile app:

- Vibrates
- Displays warning
- Updates risk UI
- Offers emergency actions

---

# 13. Family Alert

When:

```text
risk >= 90
```

and guardian notification is enabled:

Backend
↓
FCM
↓
Guardian

---

# 14. Security

Gemini API credentials must NOT be stored in the mobile application.

Do not expose:

- Gemini secret keys
- Service account credentials
- Private backend secrets

Mobile app only communicates with backend APIs.

---

# 15. Authentication

Every protected backend endpoint should validate Firebase ID Token.

Flow:

```text
Mobile
 ↓
Firebase Auth
 ↓
ID Token
 ↓
Cloud Run
 ↓
Verify Token
 ↓
Allow Request
```

---

# 16. Environment

Mobile:

```env
VITE_API_BASE_URL=
VITE_FIREBASE_PROJECT_ID=
```

Backend:

```env
GEMINI_API_KEY=
FIREBASE_PROJECT_ID=
```

Secrets must be managed securely.

---

# 17. Deployment

Mobile:

- Android build
- iOS build

Web:

Firebase Hosting

Backend:

Cloud Run

Database:

Firestore

Notifications:

FCM

---

# 18. 15-Day Constraint

The architecture must prioritize:

P0:

- Mobile
- Audio
- Transcript
- Gemini
- Risk
- Alert
- Backend
- Firestore

P1:

- Authentication
- FCM
- History

P2:

- Screenshot
- Audio upload
- Advanced family features

P3:

- Native call integration
- Community blacklist
