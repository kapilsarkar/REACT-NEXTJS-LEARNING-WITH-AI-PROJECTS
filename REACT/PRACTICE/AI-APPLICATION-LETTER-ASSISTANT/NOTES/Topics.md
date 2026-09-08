# TOPICS -SEQUENCE

## ✅ PART 1 — Project Foundation

- Status

🟢 Completed

## ✅ PART 2 — React Component Fundamentals

```js
NavBar
Hero
HowItWorks
Features
Footer
```

- Status

🟢 Completed / practiced

## ✅ PART 3 — Page-Level Composition

```js
LandingPage
├── Hero
├── HowItWorks
└── Features
```

- Components provide reusable pieces; pages compose those pieces into an actual screen.

- Status

🟢 Completed

## ✅ PART 4 — React Router

- Status

🟢 Completed

## ✅ PART 5 — Shared Layout Architecture

```js
Layout
├── NavBar
├── Outlet
└── Footer
```

- This means the Navbar and Footer don't have to be manually placed on every page.

- Layout.jsx doesn't need to be visually complicated.

- Status

🟢 Completed

## ✅ PART 6 — Navigation

- Navigation understands

```js
Home
How It Works
Features
Create an Application
```

- and can visually indicate the active landing-page section.

- Status

🟢 Completed

## ✅ PART 7 — Landing Page UI

- Hero
  
  - Main headline
  - Supporting text
  - CTA
  - Document preview
  - Responsive layout

- How It Works

  - 3-step process
  - Data-driven cards
  - Responsive grid
  - Semantic `<ol>`

- Features

  - 6 feature cards
  - Responsive grid
  - Hover states

- Footer

  - Branding
  - CTA
  - Copyright
  - Back-to-top

- Status

  🟢 Essentially completed

### 🟢 CURRENT CHECKPOINT

- So  project has reached:

```js
FOUNDATION
     ↓
REACT COMPONENTS
     ↓
PAGE COMPOSITION
     ↓
ROUTING
     ↓
LAYOUT
     ↓
NAVIGATION
     ↓
LANDING PAGE UI
     ↓
━━━━━━━━━━━━━━━━━━━━
YOU ARE HERE
━━━━━━━━━━━━━━━━━━━━
     ↓
CREATE WORKFLOW
```

## 🚀 PART 8 — Create Application Workflow

- The intended flow is:

```js
Create Application
       ↓
Choose Category
       ↓
Choose Document Type
       ↓
Guided Questions
       ↓
Language
       ↓
Generate with AI
       ↓
Generated Document
       ↓
Edit / Improve / Translate
       ↓
Save
       ↓
Download / Print
```

## PART 9 — Category Selection

- First, /create needs to allow the user to choose a category.

- Defining Category

```js
Education
Workplace
Banking
Government / Official
Housing / Society
Healthcare
Complaint / Request
General Letter
```

- Status

🔴 Not started

## PART 10 — Document Type Selection

- After selecting a category:

```js
Banking
   ↓
Mobile Number Change
   ↓
Account-related request
   ↓
...
```

- The available document types will depend on the selected category.

- This introduces a very important concept:

- Dependent UI / state-driven UI

## For example:

```js
category = Banking
        ↓
show Banking document types
```

- rather than showing every possible document type.

- Status

🔴 Not started

## PART 11 — Guided Questions

- This is one of the most important parts of the entire project.

- Instead of:

- "Write a prompt for the AI."

- The user gets structured questions.

### For example:

```js
Name
Account number
Current mobile number
New mobile number
Reason
Preferred language
Tone
```

- The answers become structured application data.

- Status

🔴 Not started

### PART 12 — Form Validation

- Once the guided forms work, we need to make sure the information is valid before generation.

- We'll eventually deal with:

  - Required fields
  - Empty values
  - Basic validation
  - User-friendly error messages

- Status

🔴 Not started

### PART 13 — Application State

- At some point we'll need to manage information such as:

```js
selectedCategory
selectedDocumentType
formData
language
tone
generatedContent
```

- Status

🔴 Not started

## PART 14 — Supabase

- After the frontend workflow is working, we'll introduce the backend/data layer.

```js
Supabase Auth
        ↓
PostgreSQL
        ↓
Applications
        ↓
Row Level Security
```

- The V1 data model includes:

```js
profiles
applications
```

- with applications belonging to individual users.

We'll learn:

- Authentication
- Login/register
- Persistent sessions
- Protected routes
- PostgreSQL
- CRUD
- RLS
- User-specific data

- Status

🔴 Not started

## PART 15 — AI Integration

- Only after the application data flow is understood.

- Architecture

```js
React
  ↓
Supabase Edge Function
  ↓
AI Provider
  ↓
Generated document
  ↓
React
```

- The AI API key must not be placed directly in the React frontend.

We'll cover:

- Structured AI input
- Prompt construction
- AI response handling
- Preventing invented facts
- Loading states
- Error handling
- Improve Draft
- Translation

- Status

🔴 Not started

## PART 16 — Generated Document Editor

- After generation:

```js
AI output
   ↓
Editable document
```

- The user should be able to modify the generated content before saving.

- Then:

```js
Improve
Translate
Save
Copy
```

- Status

🔴 Not started

## PART 17 — History / Saved Applications

- We'll implement

```js
My Applications
       ↓
Saved documents
       ↓
Open
Edit
Delete
Filter
Sort
```

- This connects directly to Supabase CRUD.

- Status

🔴 Not started

## PART 18 — PDF / Print / Download

- V1 also requires:

- Copy
- Download PDF
- Print

- This comes later, once the document itself works.

- Status

🔴 Not started

## PART 19 — Authentication & Protected Routes

- We'll eventually have:

```js
Landing
   ↓
Login / Register
   ↓
Dashboard
   ↓
Create Application
```

- and users shouldn't be able to access another user's applications.

- This connects authentication with database security/RLS.

- Status

🔴 Not started

## PART 20 — Dashboard

- The dashboard becomes the user's central workspace:

```js
Dashboard
├── Create New
├── Recent Applications
└── My Applications
```

- Status

🔴 Not started

## PART 21 — Testing, Polish & Deployment

- Only after the V1 functionality works:

- Responsive testing
- Error handling
- Empty states
- Loading states
- Accessibility checks
- UI polish
- Build testing
- Git/GitHub
- Vercel deployment

- Status

🔴 Not started

## 🗺️  Complete Roadmap

- Here's the sequence

```js
                    COMPLETED
                        │
                        ▼
              1. Project Foundation
                        ↓
              2. React Components
                        ↓
              3. Page Composition
                        ↓
              4. React Router
                        ↓
              5. Layout + Outlet
                        ↓
              6. Navigation
                        ↓
              7. Landing Page UI
                        │
════════════════════════════════════
                    YOU ARE HERE
════════════════════════════════════
                        │
                        ▼
                  NEXT
                        │
              8. Create Workflow
                        ↓
              9. Category Selection
                        ↓
             10. Document Type
                        ↓
             11. Guided Questions
                        ↓
             12. Form Validation
                        ↓
             13. Application State
                        ↓
             14. Authentication
                        ↓
             15. Supabase Database
                        ↓
             16. CRUD + RLS
                        ↓
             17. AI Integration
                        ↓
             18. Generated Document
                        ↓
             19. Improve / Translate
                        ↓
             20. History / Dashboard
                        ↓
             21. PDF / Print / Copy
                        ↓
             22. Testing + Polish
                        ↓
             23. Deployment
                        ↓
                    V1 COMPLETE
                        │
                        ▼
                    V2 LATER
```
