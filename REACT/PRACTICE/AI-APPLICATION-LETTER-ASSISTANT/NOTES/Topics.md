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