# 📘 Supabase Notes — Login.jsx

## 1. Login with Email & Password ⭐

## The most important part:

```js
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

## Core API

```js
supabase.auth.signInWithPassword()
```

## Used to authenticate an existing user with email and password.

## Flow

```js
Email + Password
       ↓
signInWithPassword()
       ↓
Supabase verifies credentials
       ↓
 ┌───────────────┐
 │               │
Success         Error
 ↓               ↓
Session        error.message
```

## 2. Login Response

## On successful login:

```js
data.user
data.session
```

- Your code demonstrates this:

```js
console.log("USER:", data.user);
console.log("SESSION:", data.session);
```

## Remember:

```js
data.user
   ↓
Information about authenticated user

data.session
   ↓
Current authentication session
```

## 3. Error Handling

```js
if (error) {
  console.error(error);
  setFormError(error.message);
  return;
}
```

## Again, the standard Supabase pattern:

```js
const { data, error } = await supabase...
```

## Then

```js
if (error) {
   // handle error
}
```

## 4. getSession() — Checking Current Session

## Login component also contains:

```js
const { data, error } = await supabase.auth.getSession();
```

## This checks the currently stored authentication session.

```js
getSession()
     ↓
Current session
     ↓
data.session
```

## Remember

- getSession() → retrieves the current session.

## 5. onAuthStateChange() — Listen for Auth Changes

- You also have:

```js
supabase.auth.onAuthStateChange((event, session) => {
  console.log("AUTH EVENT:", event);
  console.log("AUTH SESSION:", session);
});
```

- This listens for authentication changes.

- For example:

```js
Login
 ↓
AUTH EVENT
 ↓
New session

Logout
 ↓
AUTH EVENT
 ↓
session = null
```

## ⭐ What You Actually Need to Remember

## For Login.jsx, the new concept is primarily:

```js
supabase.auth.signInWithPassword({
  email,
  password
});
```

- Your authentication APIs now form a very nice little set:

```js
┌─────────────────────────────────────┐
│          SUPABASE AUTH              │
├─────────────────────────────────────┤
│ signUp()             → Register     │
│ signInWithPassword() → Login        │
│ getSession()         → Get session  │
│ onAuthStateChange()  → Listen       │
│ signOut()            → Logout       │
└─────────────────────────────────────┘
```

## 🧠 One-line revision

- signUp() creates an account, signInWithPassword() logs in, getSession() retrieves the current session, onAuthStateChange() listens for changes, and signOut() logs out.