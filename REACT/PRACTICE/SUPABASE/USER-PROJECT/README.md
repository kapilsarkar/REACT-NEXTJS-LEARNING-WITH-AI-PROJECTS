# 📘 Supabase Master Notes

> **Purpose:** A single navigation file for all Supabase learning notes
> in this project.
>
> The original notes remain separated into Parts 1--10. This master file
> links them in the recommended learning order so you can jump directly
> to any topic.

------------------------------------------------------------------------

## 🧭 Table of Contents

1.  [App.jsx --- Authentication State & Session
    Management](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part1.md)
2.  [supabase-client.js --- Supabase Client & Environment
    Variables](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part2.md)
3.  [ProtectedRoute.jsx --- Protected
    Routes](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part3.md)
4.  [SignUp.jsx --- User
    Registration](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part4.md)
5.  [Login.jsx --- User
    Login](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part5.md)
6.  [Part 6 --- Database / User
    Data](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part6.md)
7.  [Part 7 --- Database Operations / Related
    Concepts](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part7.md)
8.  [Part 8 --- Database / Security
    Concepts](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part8.md)
9.  [Part 9 ---
    Storage](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part9.md)
10. [Part 10 --- RLS / Security & Final Supabase
    Concepts](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupaBaseNotes-Part10.md)

------------------------------------------------------------------------

# 🗺️ Recommended Learning Order

``` text
supabase-client.js
       ↓
App.jsx
       ↓
SignUp.jsx
       ↓
Login.jsx
       ↓
ProtectedRoute.jsx
       ↓
Database
       ↓
RLS / Security
       ↓
Storage
       ↓
Final Supabase Mental Model
```

------------------------------------------------------------------------

# 📚 Quick Topic Map

  ----------------------------------------------------------------------------
  Part                    File                        Main Area
  ----------------------- --------------------------- ------------------------
  1                       `SupabaseNotes-Part1.md`    App
                                                      authentication/session
                                                      management

  2                       `SupabaseNotes-Part2.md`    Supabase client +
                                                      environment variables

  3                       `SupabaseNotes-Part3.md`    Protected routes

  4                       `SupabaseNotes-Part4.md`    Sign Up / Auth
                                                      registration

  5                       `SupabaseNotes-Part5.md`    Login / Auth

  6                       `SupabaseNotes-Part6.md`    Database concepts

  7                       `SupabaseNotes-Part7.md`    Database operations

  8                       `SupabaseNotes-Part8.md`    Database/security
                                                      concepts

  9                       `SupabaseNotes-Part9.md`    Supabase Storage

  10                      `SupaBaseNotes-Part10.md`   RLS / security / final
                                                      concepts
  ----------------------------------------------------------------------------

------------------------------------------------------------------------

# ⭐ Core Supabase Mental Model

``` text
                    SUPABASE
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      AUTH          DATABASE        STORAGE
        │              │              │
        ↓              ↓              ↓
   Users/Session     Tables          Files
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                  React App
```

## Authentication

``` text
signUp()
   ↓
Create account

signInWithPassword()
   ↓
Login

getSession()
   ↓
Get current session

onAuthStateChange()
   ↓
Listen for auth changes

signOut()
   ↓
Logout
```

## Database

``` text
supabase
   ↓
.from("table")
   ↓
.select()
.insert()
.update()
.delete()
```

## Security

``` text
Authenticated User
       ↓
    auth.uid()
       ↓
     RLS
       ↓
Only authorized rows
```

## Storage

``` text
User
 ↓
Storage Bucket
 ↓
User-specific folder
 ↓
Upload / List / Signed URL
```

------------------------------------------------------------------------

# 🔗 Original Notes

For completeness, the individual notes are preserved in the repository:

-   [Part
    1](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part1.md)
-   [Part
    2](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part2.md)
-   [Part
    3](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part3.md)
-   [Part
    4](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part4.md)
-   [Part
    5](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part5.md)
-   [Part
    6](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part6.md)
-   [Part
    7](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part7.md)
-   [Part
    8](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part8.md)
-   [Part
    9](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupabaseNotes-Part9.md)
-   [Part
    10](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/REACT/PRACTICE/SUPABASE/USER-PROJECT/src/SupaBaseNotes-Part10.md)

------------------------------------------------------------------------

## 📝 Important

This file is intentionally a **navigation master**, not a rewritten
replacement for the original notes. The source notes remain unchanged,
while this file gives you one place from which to navigate the complete
Supabase module.
