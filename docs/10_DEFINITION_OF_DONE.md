# GuardAI
# Definition of Done

# 1. Functional

- [ ] Task goal implemented
- [ ] Acceptance criteria satisfied
- [ ] Main flow works
- [ ] Error states work
- [ ] Loading states work

---

# 2. Mobile

For mobile-related tasks:

- [ ] Responsive UI
- [ ] Microphone permission handled
- [ ] Recording state visible
- [ ] Vibration works where required
- [ ] Android build works
- [ ] iOS project builds where applicable

---

# 3. Backend

For backend tasks:

- [ ] API endpoint works
- [ ] Authentication verified
- [ ] Input validated
- [ ] Error handling implemented
- [ ] Timeout handled
- [ ] Secrets protected

---

# 4. Gemini

- [ ] Prompt follows APP_PROMPTS
- [ ] JSON response validated
- [ ] Invalid output handled
- [ ] Risk is 0-100
- [ ] Risk level is valid
- [ ] No fabricated evidence

---

# 5. Database

- [ ] Firestore schema follows architecture
- [ ] Security rules configured
- [ ] User data isolated
- [ ] Reports persist correctly
- [ ] Session lifecycle works

---

# 6. Security

- [ ] No API key in frontend
- [ ] No secret in Git
- [ ] Firebase rules configured
- [ ] Backend authentication enabled
- [ ] Sensitive data not unnecessarily logged

---

# 7. UI

- [ ] Light theme
- [ ] Mobile-first
- [ ] Elderly-friendly
- [ ] Large touch targets
- [ ] High contrast
- [ ] Risk communicated using text + icon + color
- [ ] Critical state is visually obvious

---

# 8. Audio

- [ ] Microphone permission
- [ ] Start
- [ ] Stop
- [ ] Error handling
- [ ] Transcript appears
- [ ] Transcript chunks reach backend
- [ ] Analysis updates UI

---

# 9. Realtime Experience

Target:

```text
Audio
 ↓
Transcript
 ↓
AI
 ↓
Risk
 ↓
Alert
```

The system should feel realtime / near-realtime.

Latency should be measured during testing.

---

# 10. Critical Alert

When risk >= 81:

- [ ] Critical alert displayed
- [ ] Risk shown
- [ ] Explanation shown
- [ ] Recommendations shown
- [ ] Vibration triggered
- [ ] User can stop protection

---

# 11. Family Alert

When enabled and risk >= 90:

- [ ] Guardian exists
- [ ] Guardian notification token exists
- [ ] FCM notification sent
- [ ] Notification contains safe summary
- [ ] No unnecessary sensitive data exposed

---

# 12. Demo

The complete demo must work:

```text
Start GuardAI
 ↓
Allow Microphone
 ↓
Start Protection
 ↓
Play Simulated Scam
 ↓
Transcript
 ↓
AI Analysis
 ↓
Risk Increase
 ↓
Manipulation Detection
 ↓
Critical Risk
 ↓
Phone Vibration
 ↓
Critical Alert
 ↓
Recommendation
 ↓
End Session
 ↓
Report Saved
 ↓
History
```

---

# 13. Deployment

- [ ] Firebase Hosting deployed
- [ ] Cloud Run deployed
- [ ] Firestore configured
- [ ] Authentication configured
- [ ] FCM configured if enabled
- [ ] Production environment variables configured

---

# 14. Final QA

Test:

- [ ] Happy path
- [ ] Microphone denied
- [ ] Network disconnected
- [ ] Gemini unavailable
- [ ] Invalid Gemini response
- [ ] User stops session
- [ ] Empty transcript
- [ ] Critical alert
- [ ] Report persistence
- [ ] Mobile layout

---

# 15. Final MVP Definition

GuardAI MVP is DONE when a real phone can demonstrate:

```text
Microphone
    ↓
Speech
    ↓
Transcript
    ↓
Gemini
    ↓
Risk
    ↓
Manipulation
    ↓
Warning
    ↓
Vibration
    ↓
Report
    ↓
Firestore
```

The judge must be able to understand the value
without technical explanation.

---

# 16. Explicitly NOT Required

The MVP is NOT considered incomplete because it does not have:

- Direct cellular call interception
- Background call monitoring
- Deepfake detection
- Community blacklist
- Native telecom integration
- Full production-scale fraud database

These are future features.
