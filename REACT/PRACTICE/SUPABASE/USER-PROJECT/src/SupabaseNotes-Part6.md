# 📘 Supabase Notes — Home.jsx

## 1. Get the Current User ⭐

```js
const {
  data: { user },
  error: useError,
} = await supabase.auth.getUser();
```

## Core API

```js
supabase.auth.getUser()
```

- It retrieves the currently authenticated user.

- You then use:

```js
user.id
```

- to identify whose data should be fetched.

## Mental model

```js
Logged-in User
      ↓
getUser()
      ↓
user.id
      ↓
Fetch that user's records
```

## 2. Fetch Data from a Table ⭐⭐⭐

## Your main database query:

```js
const { data, error } = await supabase
  .from("newuser")
  .select()
  .eq("user_id", user.id)
  .order(orderBy, { ascending: false });
```

- This is very important. It demonstrates the basic Supabase database query chain.

## Breakdown

```js
.from("newuser")
```

## Selects the newuser table.

```js
.select()
```

## Fetches the columns/records.

```js
.eq("user_id", user.id)
```

## Filters the results so the user gets only records belonging to them.

```js
.order(orderBy, { ascending: false })
```

## Sorts the results.

## 3. .eq() ⭐⭐⭐

```js
.eq("user_id", user.id)
```

## Means:

- Return rows where user_id equals the current user's ID.

## Conceptually:

```js
newuser table

user_id = A
user_id = B
user_id = A
user_id = C

        ↓ .eq("user_id", A)

Only:
user_id = A
user_id = A
```

- This is one of the most important Supabase query methods to remember.

## 4. .order() ⭐⭐

```js
.order(orderBy, { ascending: false })
```

## Sorts the returned records.

## Your UI allows:

```js
created_at
title
rating
```

## And changes:

```js
setOrderBy("title");
```

- which causes the useEffect to run again.

## 5. useEffect Dependency

```js
useEffect(() => {
   fetchNewUser();
}, [orderBy]);
```

## Because orderBy is a dependency:

```js
User clicks "Title"
       ↓
setOrderBy("title")
       ↓
orderBy changes
       ↓
useEffect runs
       ↓
Supabase query runs again
       ↓
Data sorted by title
```

## 6. User-Specific Data + RLS ⭐⭐⭐

## Your code filters:

```js
.eq("user_id", user.id)
```

- But remember something extremely important from what you learned earlier:

- The frontend filter is NOT the security mechanism.

- You also created RLS policies using:

```js
auth.uid()
```

## So

```js
Frontend
.eq("user_id", user.id)
        ↓
Requests user's records
        ↓
Supabase RLS
        ↓
Checks auth.uid()
        ↓
Only authorized rows returned
```

- This is a very important concept for your future projects.

## 7. Error Handling

- You handle errors from both Auth and Database:

```js
if (useError || !user) {
  setFetchError("You must be logged in...");
  return;
}
```

- and:

```js
if (error) {
  setFetchError("Could not fetch data");
  return;
}
```

## General Supabase pattern:

```js
const { data, error } = await supabase...
```

- Then check error.

## 8. Delete from UI

## You have:

```js
const handleDelete = (id) => {
  setNewUser((prevNewUser) =>
    prevNewUser.filter((item) => item.id !== id)
  );
};
```

- This only removes the item from React state/UI.

- The actual Supabase DELETE operation is handled elsewhere in your project.

- So for Supabase notes, don't treat this as the database DELETE API.

## ⭐ Main Query to Remember

## This is probably the most valuable piece from Home.jsx:

```js
const { data, error } = await supabase
  .from("newuser")
  .select()
  .eq("user_id", user.id)
  .order(orderBy, { ascending: false });
```

## Think

```js
.from()   → Which table?
.select() → What data?
.eq()     → Which rows?
.order()  → In what order?
```

## 🔑 APIs Learned Here


| API                       | Purpose                        |
| ------------------------- | ------------------------------ |
| `supabase.auth.getUser()` | Get current authenticated user |
| `.from()`                 | Choose database table          |
| `.select()`               | Read data                      |
| `.eq()`                   | Filter by equality             |
| `.order()`                | Sort results                   |

## 🧠 One-line revision

- getUser() identifies the current user; .from().select().eq().order() fetches that user's filtered and sorted database records.