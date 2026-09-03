# 📘 Supabase Notes — ProtectedRoute.jsx

## 1. Purpose

- ProtectedRoute prevents unauthenticated users from accessing protected pages.

- In your application

```js
Protected:
Home
Create
Update
Storage

Public:
Login
Sign Up
```

## 2. Receive Props

```js
const ProtectedRoute = ({ session, loading, children }) => {
```

- It receives three things:

| Prop       | Purpose                                             |
| ---------- | --------------------------------------------------- |
| `session`  | Tells whether the user is logged in                 |
| `loading`  | Tells whether authentication is still being checked |
| `children` | The page/component we want to protect               |

## 3. First Check loading

```js
if (loading) {
  return <p>Checking authentication...</p>;
}
```

- This is important because when the application starts, Supabase may still be checking the existing session.

```js
App starts
   ↓
loading = true
   ↓
"Checking authentication..."
   ↓
Session check finishes
   ↓
loading = false
```

- Without this check, the app could incorrectly redirect a logged-in user to /login before getSession() finishes.

## 4. Check Session

```js
if (!session) {
  return <Navigate to="/login" replace />;
}
```

- If there is no session, the user is redirected to Login.

```js
session?
 ├── YES → Allow access
 └── NO  → /login
 ```

- replace

```js
<Navigate to="/login" replace />
```

- replace replaces the current browser history entry instead of adding another one.

## 5. Allow the Protected Page

```js
return children;
```

- If:

```js
loading = false
AND
session exists
```

- the requested component is rendered.

- For example:

```js
<ProtectedRoute session={session} loading={loading}>
  <Home />
</ProtectedRoute>
```

- Then:

```js
Authenticated user
       ↓
ProtectedRoute
       ↓
<Home />
```

## ⭐ Most Important Mental Model

```js
ProtectedRoute
      │
      ↓
Is authentication still loading?
      │
   YES → Show "Checking authentication..."
      │
      NO
      ↓
Is session available?
   │          │
  NO         YES
   ↓          ↓
/login    return children
```

## 🔑 One-line revision

- ProtectedRoute checks loading first, then checks session; unauthenticated users go to /login, authenticated users get the protected component.

## APIs/concepts to remember

```js
Navigate
session
loading
children
```
