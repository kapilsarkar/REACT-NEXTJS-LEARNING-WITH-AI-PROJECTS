# 📌 RTK Async (createAsyncThunk) — Notebook CheatSheet

## 💡 Core Concept & Lifecycle States

1. reducers: Handles synchronous local actions (e.g., reset, increment).

2. extraReducers: Handles asynchronous thunks across 3 automatic promise states:

- .pending $\rightarrow$ Request starts (loading = true, error = null).

- .fulfilled $\rightarrow$ Request succeeds (loading = false, state.users = action.payload)

- .rejected $\rightarrow$ Request fails (loading = false, state.error = action.error.message)

```js
$$\text{Component} \xrightarrow{\text{dispatch(fetchUsers())}} \text{Async Thunk (API)} \xrightarrow{\text{return data}} \text{extraReducers (.fulfilled)} \xrightarrow{\text{State Update}} \text{UI Re-renders}$$
```

## 1. Create Thunk (userThunk.js)

```js
import { createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk("action_prefix", asyncCallback)
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return await res.json(); // Value returned here becomes action.payload in .fulfilled
});
```

## 2. 2. Create Slice with extraReducers (userSlice.js)

```js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: { users: [], loading: false, error: null },
  reducers: {}, // Synchronous actions go here
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Received from thunk return
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

## 3. Store Setup & Component Usage

- store.js

```js
export const store = configureStore({
  reducer: { user: userReducer }, // Accessed via state.user
});
```

- Users.jsx

```js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userThunk";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
};
```

## ⚡ 4 Golden Memory Rules

1. reducers vs extraReducers: Synchronous slice actions go inside reducers. External or async actions (createAsyncThunk) must go inside extraReducers.

1. Payload Destination: The value returned by async () => { return data } automatically lands inside action.payload in the .fulfilled case.

1. Automatic Error Catching: When an unhandled error throws in the thunk, RTK automatically routes to .rejected and places the error text in action.error.message.

1. Builder Chaining Pattern: Always use builder.addCase(thunk.state, (state, action) => { ... }) for type-safe state updates.




