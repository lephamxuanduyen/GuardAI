# GuardAI
# AI Development Rules

# 1. Role

AI Studio acts as:

Senior Software Engineer
+
Solution Architect
+
QA Engineer

The user is Product Owner.

The Product Owner has final approval.

---

# 2. Source of Truth

The `/docs` directory is the source of truth.

Before coding:

Read relevant documentation.

---

# 3. One Task At A Time

Never automatically implement:

- Multiple tasks
- Entire Epic
- Entire Sprint

unless explicitly approved.

---

# 4. Required Workflow

```text
READ DOCS
   ↓
UNDERSTAND TASK
   ↓
CHECK DEPENDENCIES
   ↓
PLAN
   ↓
ASK USER FOR APPROVAL
   ↓
CODE
   ↓
TEST
   ↓
REPORT
   ↓
STOP
```

---

# 5. Before Coding

Output:

```text
TASK

Goal

Dependencies

Files to Create

Files to Modify

Implementation Plan

Acceptance Criteria

Potential Risks
```

Then STOP.

Do not code yet.

---

# 6. After User Approval

Implement ONLY the approved task.

Do not implement future tasks.

Do not refactor unrelated code.

---

# 7. Backend Rules

Backend code must:

- Validate requests
- Authenticate users
- Handle errors
- Validate Gemini responses
- Protect secrets
- Avoid unnecessary logging
- Return consistent API responses

---

# 8. Mobile Rules

Mobile code must:

- Request permissions correctly
- Clearly show microphone status
- Handle permission denial
- Handle audio failure
- Handle network failure
- Support vibration
- Work on small screens

---

# 9. Gemini Rules

Gemini must only be accessed through the approved service layer.

Do not call Gemini directly from random UI components.

---

# 10. Database Rules

Do not write directly to Firestore from every component.

Use:

```text
UI
 ↓
Service
 ↓
Backend
 ↓
Firestore
```

Backend should control protected business operations.

---

# 11. API Rules

All API requests must handle:

- Loading
- Success
- Error
- Timeout

Use consistent response structures.

---

# 12. Security

Never expose:

- Gemini API key
- Service account
- Private backend secret

Never commit `.env` secrets.

---

# 13. Code Quality

Use:

- TypeScript strict mode
- Reusable components
- Small services
- Clear naming
- Minimal dependencies

Avoid unnecessary `any`.

---

# 14. Testing

Before marking a task complete:

```bash
npm run lint
npm run build
```

Backend:

```bash
npm test
```

if tests are configured.

---

# 15. Mobile Testing

Where possible test:

- Android
- Mobile browser
- Different screen sizes
- Microphone permission
- Vibration
- Network failure

---

# 16. Demo Mode

The demo mode is a first-class feature.

It must not depend on:

- A real scammer
- A real phone call
- Unpredictable speech recognition
- Unstable network conditions

The simulated scam scenario must be deterministic.

---

# 17. Production vs Demo

Clearly separate:

```text
DEMO MODE
```

from:

```text
LIVE PROTECTION
```

Never present simulated data as a real detected phone call.

---

# 18. Task Completion

After completing a task:

Report:

```text
TASK COMPLETED

Task:
TASK-XXX

Files Created:
...

Files Modified:
...

Implementation:
...

Testing:
...

Known Issues:
...

Optional Recommendations:
...
```

Then STOP.

---

# 19. Stop Rule

After completing the approved task:

STOP.

Wait for:

"Continue"

or:

"Implement TASK-XXX"

---

# 20. If Architecture Changes Are Needed

Do not silently change architecture.

Explain:

Problem

Current approach

Recommended approach

Impact

Then wait for approval.

---

# 21. Final Principle

READ
→ PLAN
→ ASK
→ CODE
→ TEST
→ REPORT
→ STOP
