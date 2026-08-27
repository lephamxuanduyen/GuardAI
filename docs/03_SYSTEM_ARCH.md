# GuardAI Voice Shield
# System Architecture

# 1. Architecture

```text
                    ┌──────────────────┐
                    │   Android / iOS  │
                    │    GuardAI App   │
                    └────────┬─────────┘
                             │
                       HTTPS / API
                             │
                             ▼
                    ┌──────────────────┐
                    │    Cloud Run     │
                    │     Backend      │
                    └────────┬─────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
       ┌─────────┐     ┌───────────┐    ┌─────────┐
       │ Gemini  │     │ Firestore │    │   FCM   │
       └─────────┘     └───────────┘    └─────────┘
```

---

# 2. Mobile Flow

```text
Phone Call
    ↓
Speakerphone
    ↓
Device Speaker
    ↓
GuardAI Microphone
    ↓
Audio Capture
    ↓
Speech-to-Text
    ↓
Transcript Chunk
    ↓
Cloud Run
```

The application does not directly intercept cellular call audio.

---

# 3. Audio Architecture

The mobile application captures microphone audio only after
explicit permission.

Audio processing should use an abstraction:

```text
AudioService
     ↓
SpeechService
```

This allows the implementation to change between:

- Browser speech capability
- Native speech capability
- Google speech service
- Gemini multimodal/live processing

without changing the rest of the application.

---

# 4. Realtime Pipeline

```text
Microphone
    ↓
Audio Buffer
    ↓
Speech Recognition
    ↓
Partial Transcript
    ↓
Transcript Buffer
    ↓
Cloud Run
    ↓
Gemini
    ↓
Structured Analysis
    ↓
Risk State
    ↓
Mobile UI
```

---

# 5. Backend Architecture

```text
HTTP Request
     ↓
Authentication Middleware
     ↓
Validation
     ↓
Controller
     ↓
Service
     ↓
Gemini / Firestore / FCM
     ↓
Response
```

---

# 6. Backend Responsibilities

Backend owns:

- Authentication verification
- Session management
- Transcript processing
- Gemini requests
- Gemini response validation
- Risk classification
- Report creation
- Firestore persistence
- Guardian notification
- Rate limiting
- Error handling

---

# 7. Gemini Service

GeminiService should provide:

```ts
analyzeTranscript()
analyzeScreenshot()
analyzeAudio()
generateRecommendations()
```

All prompts must be maintained separately from controllers.

---

# 8. Risk Engine

Risk engine receives AI analysis.

Example:

```text
Technique detected
        ↓
Evidence detected
        ↓
Financial request
        ↓
Risk recalculation
        ↓
Risk Level
```

The system should avoid large unexplained jumps based on a
single weak signal.

---

# 9. Alert Engine

```text
Risk < 61
    ↓
No Alert

Risk 61-80
    ↓
Warning

Risk 81-89
    ↓
Critical UI Alert

Risk >= 90
    ↓
Critical UI Alert
+
Optional Guardian Notification
```

---

# 10. Database Architecture

Firestore:

```text
users
sessions
reports
guardians
notifications
```

---

# 11. User

```json
{
  "uid": "",
  "name": "",
  "email": "",
  "photoURL": "",
  "createdAt": ""
}
```

---

# 12. Session

```json
{
  "id": "",
  "userId": "",
  "status": "ACTIVE",
  "startedAt": "",
  "endedAt": "",
  "finalRisk": 0
}
```

---

# 13. Report

```json
{
  "id": "",
  "sessionId": "",
  "userId": "",
  "risk": 0,
  "riskLevel": "",
  "summary": "",
  "scamType": "",
  "transcript": [],
  "techniques": [],
  "evidence": [],
  "timeline": [],
  "recommendations": [],
  "createdAt": ""
}
```

---

# 14. Guardian

```json
{
  "id": "",
  "ownerId": "",
  "guardianUid": "",
  "relationship": "",
  "notificationEnabled": true,
  "createdAt": ""
}
```

---

# 15. Notification

```json
{
  "id": "",
  "recipientUid": "",
  "type": "SCAM_ALERT",
  "risk": 92,
  "sessionId": "",
  "read": false,
  "createdAt": ""
}
```

---

# 16. Data Flow

```text
User
 ↓
Start Session
 ↓
Create Session in Firestore
 ↓
Audio
 ↓
Transcript
 ↓
Backend
 ↓
Gemini
 ↓
Analysis
 ↓
Firestore
 ↓
Mobile UI
```

---

# 17. Privacy

The application must:

- Clearly indicate when microphone is active.
- Request microphone permission.
- Avoid unnecessary permanent audio storage.
- Store transcript only when required for history/report.
- Allow users to stop protection immediately.

The MVP should avoid storing raw audio by default.

---

# 18. Failure Handling

If Gemini fails:

Mobile should continue showing transcript.

Display:

"AI analysis is temporarily unavailable."

If Speech-to-Text fails:

Display:

"Unable to recognize audio."

If network fails:

Display:

"Connection lost."

The app must never silently fail.
