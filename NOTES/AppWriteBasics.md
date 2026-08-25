# ✍️ Appwrite Authentication — Complete Cheatsheet & Notes

---

## 📄 Page 1 — What is Appwrite?

### **Appwrite = Backend-as-a-Service (BaaS)**

```text
React App
    │
    ↓
 Appwrite
 ┌───────────────┐
 │ Authentication│
 │ Database      │
 │ Storage       │
 │ Permissions   │
 └───────────────┘
 ```

## For our project

```js
Appwrite
   ↓
Authentication
   ↓
Register → Login → Session → Logout
```

### ⭐ Golden Rule: Appwrite handles backend authentication; React handles the UI and user state.


## 📄 Page 2 — Appwrite Configuration

```js
 src/appwrite/config.js


import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export { client };
```

## Breakdown of each part

1. Client → Connects React to Appwrite

1. setEndpoint() → Specifies your Appwrite API URL

1. setProject() → Specifies your Appwrite Project ID

1. Account(client) → Initializes the Authentication service

## Environment Variables (.env)

- VITE_APPWRITE_ENDPOINT → Appwrite API Endpoint

- VITE_APPWRITE_PROJECT_ID → Appwrite Project ID

## ⭐ Tip: Keep configuration separate from UI components. In your components, simply import

```js
import { account } from "../appwrite/config.js";
```

## 📄 Page 3 — Register / Create Account

### Basic Flow:

```js
User fills form → account.create() → User created → createEmailPasswordSession() → User logged in → Dashboard
```

## Register Syntax

```js
import { ID } from "appwrite";

await account.create({
  userId: ID.unique(),
  email: formData.email,
  password: formData.password,
  name: formData.name,
});
```

## Remember

- account.create() creates the User, but does not log them in.

- Create a session immediately afterward to authenticate:

```js
await account.createEmailPasswordSession({
  email: formData.email,
  password: formData.password,
});
```

## ⭐ Mental Rule: Create account $\neq$ Create session

## 📄 Page 4 — Login + Session

### Login Syntax

```js
await account.createEmailPasswordSession({
  email,
  password,
});
```

- Logic Flow:

```js
Email + Password
       ↓
Appwrite Verification
 ┌─────┴─────┐
 ↓           ↓
YES         NO
 ↓           ↓
Session     Error
 ↓
Navigate to Dashboard
```

## What is a Session?

- A session represents: "This user is currently authenticated on this client/device."

```js
User logs in → Session exists → account.get() → Retrieves current user data
```

## 📄 Page 5 — account.get() & Protected Dashboard

### Get Current User

```js
const currentUser = await account.get();
console.log(currentUser);
```

- Returns profile data for the active user:

  - user.name
  - user.email
  - user.$id 

## Dashboard Guard Logic

```js
Dashboard mounts
       ↓
account.get()
 ┌─────┴─────┐
 ↓           ↓
Success     Failed / No session
 ↓           ↓
Show UI     Redirect to /login
```

## Simple Route Protection in Component

```js
try {
  const currentUser = await account.get();
  setUser(currentUser);
} catch {
  navigate("/login");
}
```

### ⭐ Note: account.get() does not create anything. It answers: "Who is currently logged in?"

## 📄 Page 6 — Logout

### Logout Syntax

```js
await account.deleteSession({
  sessionId: "current",
});

navigate("/login");
```

- Logic Flow:

```js
Dashboard → Click Logout → deleteSession("current") → Session removed → Redirect to Login
```

The 4 Core Methods:

1. REGISTER: account.create(...)

1. LOGIN: account.createEmailPasswordSession(...)

1. CURRENT USER: account.get()

1. LOGOUT: account.deleteSession(...)

## 📄 Page 7 — Complete Authentication Flow

```js
APPWRITE AUTH

                       START
                         │
                         ↓
                    REGISTER
                         │
                 account.create()
                         │
                         ↓
                  USER CREATED
                         │
                         ↓
                       LOGIN
                         │
        createEmailPasswordSession()
                         │
                         ↓
                    SESSION
                         │
                         ↓
                   account.get()
                         │
                         ↓
                    DASHBOARD
                         │
                         ↓
                      LOGOUT
                         │
        account.deleteSession({ sessionId: "current" })
                         │
                         ↓
                  SESSION REMOVED
                         │
                         ↓
                      LOGIN
```

## 📄 Page 8 — Common Errors & Syntax Rules

- ⚠️ Error: "Creation of a session is prohibited when a session is active."
- Cause: A user is already logged in and the browser still has an active session.

- Fix: Log out of the current session first before attempting a new login.

- ⚠️ Modern Object-Style Syntax (Appwrite SDK v14+)

- Account Creation:

```js
await account.create({
  userId: ID.unique(),
  email,
  password,
  name,
});
```

## Session Creation

```js
await account.createEmailPasswordSession({
  email,
  password,
});
```

## Session Deletion

```js
await account.deleteSession({
  sessionId: "current",
});
```

## 📄 Page 9 — React Responsibilities vs. Appwrite Responsibilities

```js
REGISTER / LOGIN PAGE

        ┌────────────────────────────────┐
        │             REACT              │
        │                                │
        │ • Form inputs & UI layout      │
        │ • Local state (useState)       │
        │ • Loading indicators           │
        │ • Error messages rendering     │
        │ • Routing (useNavigate)        │
        └───────────────┬────────────────┘
                        │
                        ↓ (API Calls)
        ┌────────────────────────────────┐
        │            APPWRITE            │
        │                                │
        │ • account.create()             │
        │ • createEmailPasswordSession() │
        │ • account.get()                │
        │ • account.deleteSession()      │
        └────────────────────────────────┘
```

## 📄 Page 10 — Quick Revision Table

## Appwrite Authentication Methods

| Method                                 | Purpose                          |
| -------------------------------------- | -------------------------------- |
| `account.create()`                     | Create Appwrite user account     |
| `account.createEmailPasswordSession()` | Authenticate and create session  |
| `account.get()`                        | Get currently authenticated user |
| `account.deleteSession()`              | Delete session / logout          |



## Appwrite Learning Path:

```js
✅ 1. Configuration (.env & client setup)
       ↓
✅ 2. Register (account.create)
       ↓
✅ 3. Login (createEmailPasswordSession)
       ↓
✅ 4. Session & User State (account.get)
       ↓
✅ 5. Logout (deleteSession)
       ↓
➡️ 6. Databases & Collections
       ↓
➡️ 7. CRUD Operations (Documents)
       ↓
➡️ 8. Storage & File Buckets
```
