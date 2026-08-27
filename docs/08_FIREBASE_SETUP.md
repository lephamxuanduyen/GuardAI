# GuardAI
# Firebase + Database Setup

# 1. Firebase Services

Required:

- Firestore
- Firebase Authentication
- Firebase Hosting

P1:

- Firebase Cloud Messaging

---

# 2. Firestore Collections

```text
users
sessions
reports
guardians
notifications
```

---

# 3. Users

Path:

```text
/users/{uid}
```

Schema:

```json
{
  "uid": "",
  "displayName": "",
  "email": "",
  "photoURL": "",
  "createdAt": ""
}
```

---

# 4. Sessions

Path:

```text
/users/{uid}/sessions/{sessionId}
```

Schema:

```json
{
  "status": "ACTIVE",
  "startedAt": "",
  "endedAt": "",
  "finalRisk": 0
}
```

---

# 5. Reports

Path:

```text
/users/{uid}/reports/{reportId}
```

Schema:

```json
{
  "sessionId": "",
  "risk": 0,
  "riskLevel": "CRITICAL",
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

# 6. Guardians

Path:

```text
/users/{uid}/guardians/{guardianId}
```

Schema:

```json
{
  "guardianUid": "",
  "relationship": "",
  "notificationEnabled": true,
  "createdAt": ""
}
```

---

# 7. Notifications

Path:

```text
/users/{uid}/notifications/{notificationId}
```

Schema:

```json
{
  "type": "SCAM_ALERT",
  "risk": 92,
  "sessionId": "",
  "read": false,
  "createdAt": ""
}
```

---

# 8. Security Rules

Users can only read/write their own data.

Concept:

```text
request.auth.uid == userId
```

Guardian access must be explicitly authorized.

Do not expose all user reports.

---

# 9. Authentication

MVP:

Anonymous

P1:

Google Login

Authentication should not block the main demo if
anonymous access is enabled.

---

# 10. FCM

FCM is used for guardian alerts.

Flow:

```text
Risk >= 90
      ↓
Cloud Run
      ↓
Verify Guardian
      ↓
FCM
      ↓
Guardian Device
```

---

# 11. Firebase Hosting

Used for:

- Web application
- Landing page
- Demo dashboard

---

# 12. Cloud Run

Cloud Run is the backend.

Responsibilities:

- Gemini
- Authentication verification
- Session processing
- Report processing
- FCM
- Business logic

---

# 13. Secrets

Gemini API key must NOT be stored in:

- React
- Capacitor
- Android app
- iOS app
- Git repository

Store backend secrets securely.

---

# 14. Data Retention

MVP should avoid permanent raw audio storage.

Store:

- Transcript
- AI analysis
- Report

Only store raw audio if explicitly required by a future feature.

---

# 15. Firebase Deployment

Hosting:

```bash
firebase deploy --only hosting
```

Firestore rules:

```bash
firebase deploy --only firestore
```

---

# 16. Backend Deployment

Backend:

Cloud Run

Production configuration must use secure environment variables.

---

# 17. Local Development

Recommended:

```text
Mobile
 ↓
Local backend
 ↓
Firebase emulator / development project
```

Production:

```text
Mobile
 ↓
Cloud Run
 ↓
Firebase
```
