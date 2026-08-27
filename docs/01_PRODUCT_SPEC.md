# GuardAI Voice Shield
# Product Specification

## 1. Product Overview

GuardAI is an AI-powered scam prevention assistant for detecting
social engineering and fraud during suspicious conversations.

The core product focuses on phone scam scenarios.

GuardAI listens to a conversation through the device microphone
with explicit user permission, converts speech into transcript,
analyzes the conversation with Gemini, calculates scam risk,
detects psychological manipulation, and warns the user.

---

# 2. Core Problem

Phone scams are particularly dangerous because the victim is
actively manipulated in real time.

Typical examples:

- Fake police officers
- Fake bank employees
- Fake government officials
- Fake family emergencies
- Investment scams
- Account verification scams
- OTP / credential harvesting
- Emergency money requests

The victim may be pressured by:

- Fear
- Authority
- Urgency
- Secrecy
- Threats
- Financial pressure

Traditional scam checkers require the user to manually submit
messages or screenshots.

That is often too late during a phone conversation.

---

# 3. Product Solution

GuardAI provides real-time conversational protection.

Core flow:

User receives suspicious call
        ↓
User turns on speakerphone
        ↓
User opens GuardAI
        ↓
User starts Protection
        ↓
GuardAI microphone captures surrounding conversation
        ↓
Speech-to-Text
        ↓
Backend
        ↓
Gemini
        ↓
Risk Analysis
        ↓
Risk Score
        ↓
Manipulation Detection
        ↓
Warning
        ↓
Recommended Action

---

# 4. Important Platform Limitation

The MVP does NOT claim to directly intercept or record
cellular phone calls at the operating-system level.

The supported MVP demonstration is:

Phone call
    ↓
Speakerphone
    ↓
GuardAI microphone
    ↓
Speech-to-Text
    ↓
Gemini

This approach is intentionally used to avoid claiming
unsupported OS-level call interception.

The application must clearly request microphone permission
and inform the user when audio is being captured.

---

# 5. Target Users

## Primary

Elderly people.

The UI must therefore be:

- Simple
- Large
- High contrast
- Easy to understand
- Vietnamese-first
- Low cognitive load

---

## Secondary

Family members.

Examples:

- Children
- Spouses
- Relatives
- Caregivers

They can optionally act as guardians.

---

# 6. Platforms

## Primary MVP

Mobile application.

Target:

- Android
- iOS

Implementation:

React
+
Capacitor

The application should also be usable as a responsive web application.

---

# 7. MVP Features

P0:

- Mobile application
- Microphone permission
- Audio capture
- Speech-to-Text
- Realtime / near-realtime transcript
- Gemini scam analysis
- Risk Score
- Risk Level
- Manipulation detection
- Evidence extraction
- Timeline
- Critical warning
- Vibration
- Recommendation
- Session history
- Firestore persistence
- Backend API
- Firebase Authentication
- Production deployment

---

# 8. WOW Feature

The main demo experience is live detection.

Example:

Caller:

"I am calling from the police."

AI:

Authority detected.

Risk:

25 → 42

---

Caller:

"Your bank account is involved in an investigation."

AI:

Authority + Fear detected.

Risk:

42 → 67

---

Caller:

"You must transfer money immediately."

AI:

Urgency + Financial Request detected.

Risk:

67 → 91

---

Phone:

VIBRATE

Screen:

🚨 POSSIBLE SCAM

Risk 91%

DO NOT TRANSFER MONEY.

---

# 9. Risk Levels

SAFE

0-30

SUSPICIOUS

31-60

HIGH

61-80

CRITICAL

81-100

---

# 10. Manipulation Techniques

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

---

# 11. Main Screens

## Home

- Start Protection
- Quick Screenshot Check
- Audio Check
- Recent Alerts
- Family Shield
- History

---

## Protection

- Recording indicator
- Risk Score
- Risk Level
- Live Transcript
- Detected Techniques
- Evidence
- Timeline
- Recommendations

---

## Critical Alert

Display:

🚨 POSSIBLE SCAM

Risk: 92%

Do NOT:

- Transfer money
- Share OTP
- Share password
- Follow suspicious instructions

Actions:

[ STOP PROTECTION ]

[ CONTACT FAMILY ]

---

## History

Show:

- Date
- Risk
- Scam type
- Summary

---

## Report

Show:

- Risk
- Timeline
- Techniques
- Evidence
- Recommendations
- Transcript

---

# 12. Family Shield

Optional MVP/P1 feature.

User can add a guardian.

When a critical scam is detected:

GuardAI
    ↓
Backend
    ↓
Firestore
    ↓
FCM
    ↓
Guardian phone

Guardian receives:

"GuardAI detected a high-risk conversation involving your
family member."

---

# 13. Screenshot Check

Optional P2.

User uploads screenshot.

Gemini analyzes:

- Phone number
- URL
- QR code
- Bank account
- Payment request
- Organization
- Government agency
- Suspicious wording

---

# 14. Audio Upload

Optional P2.

User uploads previously recorded audio.

GuardAI:

Audio
 ↓
Transcript
 ↓
Gemini
 ↓
Report

---

# 15. Product Differentiation

GuardAI does not only ask:

"Is this message a scam?"

It asks:

"What is the scammer doing to manipulate the victim?"

The product combines:

Conversation
+
Psychological manipulation
+
Risk scoring
+
Real-time warning
+
Family protection

---

# 16. MVP Success Criteria

A judge can:

1. Open GuardAI on a phone.
2. Start Protection.
3. Allow microphone.
4. Play a simulated scam call.
5. See transcript appear.
6. See risk increase.
7. See manipulation techniques.
8. See critical warning.
9. Feel the phone vibrate.
10. View the generated report.
11. See the report saved to history.

---

# 17. Explicit Non-Goals

Not required for MVP:

- Direct cellular call interception
- Automatic call recording
- Background monitoring of all phone calls
- Native telecom integration
- Deepfake voice detection
- Community blacklist
- Large-scale scam database
- Full production healthcare-style monitoring
