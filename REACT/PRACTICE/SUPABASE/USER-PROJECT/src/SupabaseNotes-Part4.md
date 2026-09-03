# 📘 Supabase Notes — SignUp.jsx

## 1. Supabase Auth Sign Up

## The most important part

```js
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      fullName: fullName,
    },
  },
});
```

## Core API

```js
supabase.auth.signUp()
```

## Used to create a new user account

## The basic version is

```js
supabase.auth.signUp({
  email,
  password
});
```

## 2. User Metadata

## Your project also sends:

```js
options: {
  data: {
    fullName: fullName,
  },
}
```

- This stores additional information as user metadata associated with the authenticated user.

## So:

```js
Sign Up
   ↓
email + password
   +
fullName metadata
   ↓
Supabase Auth
```

## Important distinction

## Don't confuse this with your own database table.

```js
Supabase Auth
   ↓
User account + metadata

Your PostgreSQL table
   ↓
Application-specific user data
```

- Your project later uses a database table (newuser) for application data.

## 3. Form State

## You use React state:

```js
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

- These hold the values entered into the form.

- For example:

```js
value={email}
onChange={(e) => setEmail(e.target.value)}
```

- This is standard React controlled-form logic, not specifically Supabase, so don't spend notebook space on it.

## 4. Prevent Default Form Submission

```js
e.preventDefault();
```

- Prevents the browser from refreshing the page when the form is submitted.

- Again, this is React/JavaScript knowledge, not a Supabase concept

## 5. Error Handling

```js
if (error) {
  console.error(error);
  setFormError(error.message);
  return;
}
```

- Supabase APIs return an object containing:

```js
data
error
```

- A useful pattern to remember:

```js
const { data, error } = await supabase...
```

- Then:

```js
if (error) {
   // handle error
}
```

## 6. Email Confirmation

- Your application displays:

- Registration successful! Please check your email to confirm your account.

- This reflects the email-confirmation flow configured for your Supabase project.

- So the basic flow you learned is:

```js
User enters
email + password
       ↓
supabase.auth.signUp()
       ↓
Account created
       ↓
Email confirmation
       ↓
User confirms email
       ↓
User can log in
```

## ⭐ Most Important Mental Model

```js
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      fullName,
    },
  },
});
```

## Remember:

- supabase.auth.signUp() creates a Supabase Auth user using email/password.

- options.data can be used to attach additional user metadata such as fullName.

## 🔑 APIs / Concepts to Remember

| Concept                  | Purpose                  |
| ------------------------ | ------------------------ |
| `supabase.auth.signUp()` | Register a user          |
| `email`                  | User's login email       |
| `password`               | User's password          |
| `options.data`           | Additional user metadata |
| `data`                   | Successful response      |
| `error`                  | Error information        |
| `error.message`          | Human-readable error     |

## 🧠 One-line revision

- Sign Up = supabase.auth.signUp({ email, password, options: { data } })

