# 📘 Supabase Notes — App.jsx

## 1. Supabase Client

```JS
import { supabase } from "./supabse-client.js";
```

## The supabase client is used to communicate with Supabase services such as

```JS
Supabase
 ├── Auth
 ├── Database
 └── Storage
```

## 2. Session State

```JS
const [session, setSession] = useState(null);
```

## session stores the currently logged-in user's session.

```js
session === null
      ↓
User not logged in

session !== null
      ↓
User is logged in
```

## We use this state throughout the application to determine authentication status.

## 3. Loading State

```js
const [loading, setLoading] = useState(true);
```

## Why?

- When the application starts, we don't immediately know whether a user is logged in.

- So: 

```js
App starts
   ↓
Checking Supabase session
   ↓
loading = true
   ↓
Session found / not found
   ↓
loading = false
```

## This prevents the protected routes from redirecting the user before Supabase finishes checking the session

## 4. Get Existing Session

```js
const { data, error } = await supabase.auth.getSession();
```

## Purpose:

- Checks whether a session already exists when the application loads.

- Then:

```js
setSession(data.session);
```

- stores that session in React state.

## Remember:

- getSession() → Get the current session when the app starts.

## 5. Listen for Authentication Changes

```js
const { data: authListener } =
  supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);
  });
```

## This listens for authentication events such as

```js
SIGN_IN
SIGN_OUT
SIGNED_IN
SIGNED_OUT
TOKEN_REFRESHED
```

## The important idea:

- onAuthStateChange() keeps React's session state synchronized with Supabase Auth.

## For example:

```js
User logs out
     ↓
Supabase session becomes null
     ↓
onAuthStateChange()
     ↓
setSession(null)
     ↓
React re-renders
```

## 6. Cleanup Auth Listener

```js
return () => {
  authListener.subscription.unsubscribe();
};
```

- When App is unmounted, we unsubscribe from the authentication listener.

## Why?

- To prevent unnecessary listeners and potential memory/resource problems

## 7. Logout

```js
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }
};
```

## API

```js
supabase.auth.signOut()
```

## Purpose:

- Logs the current user out and removes the active authentication session.

- After logout, onAuthStateChange() updates:

```js
session → null
```

## 8. Conditional Login / Logout UI

```js
{!session && <Link to="/login">Login</Link>}
```

## Show Login when there is no session.

```js
{session && (
  <button onClick={handleLogout}>
    Logout
  </button>
)}
```

- Show Logout when a session exists.

- So:

```js
No session → Login
Session    → Logout
```

## 9. Protected Routes

- Your protected routes use:

```js
<ProtectedRoute
  session={session}
  loading={loading}
>
  <Home />
</ProtectedRoute>
```

- Same concept for:

```js
Home
Create
Storage
Update
```

- The ProtectedRoute checks:

```js
loading?
   ↓
Yes → "Checking authentication..."

No
   ↓
session?
   ↓
No → /login
Yes → allow page
```

- This is the bridge between Supabase Authentication and React Router.

## ⭐ Most Important App.jsx Mental Model

```js
                    SUPABASE AUTH
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
        getSession()          onAuthStateChange()
             │                       │
             └───────────┬───────────┘
                         ↓
                    setSession()
                         │
                         ↓
                 React session state
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
        ProtectedRoute        Login / Logout UI
              │
       ┌──────┼──────┐
       ↓      ↓      ↓
     Home   Create  Storage
```

## 🧠 APIs to Remember from App.jsx

| API                                       | Purpose                 |
| ----------------------------------------- | ----------------------- |
| `supabase.auth.getSession()`              | Get existing session    |
| `supabase.auth.onAuthStateChange()`       | Listen for auth changes |
| `supabase.auth.signOut()`                 | Logout                  |
| `authListener.subscription.unsubscribe()` | Cleanup listener        |

## One-line revision

- getSession() checks the session initially, onAuthStateChange() keeps it updated, and signOut() logs the user out.

- That's all we need to extract from App.jsx. No need to memorize the Tailwind styling or React Router syntax as part of the Supabase notes.
