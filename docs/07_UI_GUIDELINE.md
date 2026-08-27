# GuardAI
# UI Design Guideline

# 1. Design Direction

GuardAI is NOT a hacker/cybersecurity dashboard.

It is a family safety application.

Visual personality:

- Safe
- Modern
- Friendly
- Trustworthy
- AI-powered
- Accessible

---

# 2. Primary Theme

Light mode is the default.

Main background:

#FFFFFF

Secondary background:

#F8FAFC

Text:

#172033

Secondary text:

#64748B

Border:

#E2E8F0

---

# 3. Brand Colors

Primary:

#4F46E5

Secondary:

#06B6D4

Accent:

#8B5CF6

---

# 4. Gradient

Use:

Indigo → Cyan

or

Indigo → Purple → Cyan

Use gradients primarily for:

- Branding
- Hero
- Primary CTA
- AI elements

Do not use gradients everywhere.

---

# 5. Risk Colors

SAFE

Green

#16A34A

SUSPICIOUS

Amber

#D97706

HIGH

Orange

#EA580C

CRITICAL

Red

#DC2626

---

# 6. Critical Alert

Do NOT turn the entire application red.

Instead:

White background
+
Large red alert card
+
Red icon
+
Clear text
+
Immediate actions

Example:

🚨 POSSIBLE SCAM

Risk 92%

This conversation shows strong scam indicators.

Detected:

• Authority
• Fear
• Urgency
• Financial Request

[ STOP PROTECTION ]

[ CONTACT FAMILY ]

---

# 7. Mobile First

Primary target:

Phone.

Minimum touch target:

44x44px

Recommended primary button:

48-56px

Large readable text.

---

# 8. Home Screen

```text
GuardAI

Your AI safety companion

[ 🛡 Start Protection ]

Quick Check

[ Screenshot ]
[ Audio ]

Recent Alerts

Family Shield
```

---

# 9. Protection Screen

```text
← Protection

🟢 Listening

Risk

72%

HIGH

------------------

Live Transcript

"Your account has..."

------------------

Detected Manipulation

⚠ Authority
⚠ Urgency
⚠ Fear

------------------

Timeline

09:12 Authority
09:14 Fear
09:16 Money Request

------------------

Recommended Action

Do not transfer money.
```

---

# 10. Recording Indicator

When microphone is active:

Show clearly:

🔴 Listening

or

🎙 Microphone active

Never hide microphone status.

---

# 11. Risk Gauge

Must show:

- Number
- Risk level
- Text explanation

Do not rely only on color.

---

# 12. Vibration

When risk becomes CRITICAL:

Mobile:

VIBRATE

UI:

CRITICAL ALERT

The alert should be prominent but not visually chaotic.

---

# 13. Family UI

Family Shield should feel warm.

Preferred:

- Blue
- Purple
- Cyan
- White

Do not use danger red unless an actual alert exists.

---

# 14. Accessibility

Target audience includes elderly users.

Requirements:

- 16px minimum body text
- Large buttons
- High contrast
- Clear labels
- Simple Vietnamese
- Color + text + icon
- Screen reader support where applicable

---

# 15. Animation

200-300ms.

Use:

- Risk transitions
- Microphone pulse
- Alert entrance
- Page transitions

Avoid:

- Flashing
- Excessive movement
- Distracting animations

---

# 16. Icons

Use one icon system consistently.

Preferred:

Lucide Icons.

---

# 17. Mobile Navigation

Primary navigation:

- Home
- Protection
- History
- Family

---

# 18. UI States

Every major screen must support:

- Loading
- Success
- Error
- Empty
- Offline / network failure

---

# 19. Core Design Principle

Normal state:

CALM

Suspicious:

ATTENTION

High:

CAUTION

Critical:

ACTION

The UI should help users know what to do,
not only tell them what happened.
