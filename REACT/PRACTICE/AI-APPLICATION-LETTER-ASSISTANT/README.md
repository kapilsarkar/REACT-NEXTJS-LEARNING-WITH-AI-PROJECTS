# AI-APPLICATION LETTER ASSISTANT

```js
                    Landing Page
                         ↓
                  "Create Application"
                         ↓
                  Choose Category
                         ↓
                  Choose Document
                         ↓
                   Guided Form
                         ↓
                   Generate AI
                         ↓
                ✨ Generated Document
                    ↙          ↘
                 Edit          Improve
                    ↓
             ┌──────┴───────┐
             ↓              ↓
           Copy          Download
             ↓
       Save Application
             ↓
       🔐 Login / Register
             ↓
          My Documents
```

## AUTHENTICATION : 

- It becomes necessary when the user wants persistent personal data.

## For example:

### Guest user

### CAN

Can:

- visit website
- choose category
- fill guided form
- generate a document
- edit it
- improve it
- potentially copy/download it

### Authenticated user

### Can additionally:

- save documents

- see application history

- edit saved documents

- delete documents

- access documents from another device

- maintain their profile

That fits database architecture extremely well

- So authentication has a real purpose rather than being a gate placed in front of the product.

## Our architecture:

```js
                  PUBLIC
                    │
                    ▼
              Landing Page
                    │
                    ▼
            Create Application
                    │
                    ▼
             Guided Workflow
                    │
                    ▼
              AI Generation
                    │
                    ▼
            Generated Document
                    │
             ┌──────┼──────┐
             ▼      ▼      ▼
           Edit    Copy   Download
                    │
                    ▼
                  Save
                    │
                    ▼
              Authentication
                    │
                    ▼
              User Dashboard
                    │
                    ▼
             Saved Applications
```

### Conceptually:

```js
PUBLIC
│
├── Landing
│
└── Create
      │
      └── Generate
            │
            ├── Copy
            ├── Download
            └── Save ──────► LOGIN
                              │
                              ▼
                         DASHBOARD
                              │
                              ▼
                       MY APPLICATION
```

## V1 user experience

```js
Landing
   ↓
Try the product
   ↓
Guided Application Builder
   ↓
AI Generation
   ↓
Edit / Improve
   ↓
Copy / Download
   ↓
        ┌───────────────┐
        │ Want to Save? │
        └───────┬───────┘
                ↓
             Login
                ↓
           Dashboard
                ↓
        My Applications
```
