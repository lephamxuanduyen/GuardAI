# GuardAI Voice Shield
# MVP Tasks

Priority:

P0 = Must have
P1 = Important
P2 = Optional
P3 = Future

---

# EPIC 1 - Project Foundation

## TASK-001

Create monorepo structure.

Requirements:

- mobile
- web
- backend
- firebase
- docs

Priority: P0

---

## TASK-002

Configure React + TypeScript + Tailwind.

Priority: P0

---

## TASK-003

Configure Capacitor.

Requirements:

- Android
- iOS
- Capacitor configuration

Priority: P0

---

# EPIC 2 - Firebase

## TASK-010

Configure Firebase project.

Services:

- Firestore
- Authentication
- Hosting
- FCM

Priority: P0

---

## TASK-011

Implement Firebase Authentication.

Providers:

- Google
- Anonymous

Priority: P1

---

## TASK-012

Implement Firestore security rules.

Priority: P0

---

# EPIC 3 - Backend

## TASK-020

Create Cloud Run backend.

Requirements:

- Node.js
- TypeScript
- API routing
- Environment configuration

Priority: P0

---

## TASK-021

Implement Firebase ID Token verification.

Priority: P0

---

## TASK-022

Create API error handling.

Requirements:

- Validation
- Error response
- Logging
- Timeout

Priority: P0

---

## TASK-023

Deploy backend to Cloud Run.

Priority: P0

---

# EPIC 4 - Mobile Audio

## TASK-030

Implement microphone permission.

Priority: P0

---

## TASK-031

Implement audio capture.

Acceptance:

- Start
- Stop
- Permission denied
- Device unavailable
- Recording state

Priority: P0

---

## TASK-032

Implement Speech-to-Text.

Acceptance:

- Partial transcript
- Final transcript
- Timestamp
- Error handling

Priority: P0

---

## TASK-033

Implement transcript buffering.

Requirements:

- Chunk transcript
- Debounce
- Send to backend

Priority: P0

---

# EPIC 5 - Gemini

## TASK-040

Implement GeminiService.

Priority: P0

---

## TASK-041

Implement transcript analysis.

Output:

- Risk
- Risk level
- Summary
- Scam type
- Techniques
- Evidence
- Timeline
- Recommendations

Priority: P0

---

## TASK-042

Implement manipulation detection.

Detect:

- Authority
- Fear
- Urgency
- Isolation
- Trust Building
- Greed
- Financial Request
- Identity Theft
- Credential Harvesting

Priority: P0

---

## TASK-043

Implement risk engine.

Priority: P0

---

# EPIC 6 - Protection UI

## TASK-050

Home screen.

Priority: P0

---

## TASK-051

Protection screen.

Priority: P0

---

## TASK-052

Realtime transcript.

Priority: P0

---

## TASK-053

Risk Gauge.

Priority: P0

---

## TASK-054

Manipulation cards.

Priority: P0

---

## TASK-055

Timeline.

Priority: P1

---

## TASK-056

Evidence panel.

Priority: P1

---

## TASK-057

Recommendation panel.

Priority: P0

---

## TASK-058

Critical alert.

Requirements:

- Full-screen/modal warning
- Vibration
- Red danger state
- Stop Protection
- Contact Family

Priority: P0

---

# EPIC 7 - Session & Database

## TASK-060

Create protection session.

Priority: P0

---

## TASK-061

Persist analysis results.

Priority: P0

---

## TASK-062

Create report.

Priority: P0

---

## TASK-063

History screen.

Priority: P1

---

# EPIC 8 - Family Shield

## TASK-070

Guardian management.

Priority: P1

---

## TASK-071

FCM device registration.

Priority: P1

---

## TASK-072

Critical scam notification.

Trigger:

Risk >= 90

Priority: P1

---

# EPIC 9 - Multimodal

## TASK-080

Screenshot analysis.

Priority: P2

---

## TASK-081

Audio upload analysis.

Priority: P2

---

# EPIC 10 - Mobile Packaging

## TASK-090

Android build.

Acceptance:

- Debug APK
- Microphone permission
- Vibration
- App icon
- Splash screen

Priority: P0

---

## TASK-091

iOS build preparation.

Acceptance:

- iOS project generated
- Permission descriptions
- Build configuration

Priority: P1

---

## TASK-092

Mobile production optimization.

Priority: P0

---

# EPIC 11 - Deployment

## TASK-100

Firebase Hosting.

Priority: P0

---

## TASK-101

Cloud Run production deployment.

Priority: P0

---

## TASK-102

Firestore production rules.

Priority: P0

---

# EPIC 12 - Demo

## TASK-110

Create simulated scam conversation.

Scenarios:

- Fake police
- Fake bank
- Fake family emergency

Priority: P0

---

## TASK-111

Create demo mode.

Requirements:

- Play sample audio
- Show transcript
- Trigger progressive risk
- Trigger vibration
- Trigger critical warning

Priority: P0

---

## TASK-112

End-to-end demo test.

Priority: P0
