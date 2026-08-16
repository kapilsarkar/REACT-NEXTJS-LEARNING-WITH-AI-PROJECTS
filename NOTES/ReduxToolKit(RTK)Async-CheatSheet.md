# 📌 Redux Toolkit (RTK) Async Cheat Sheet (`createAsyncThunk`)

## 💡 Core Concept

- **`reducers`**: Handles **synchronous** state changes (e.g., reset, increment).
- **`createAsyncThunk`**: Handles **asynchronous** operations (e.g., API calls, timers).
- **`extraReducers`**: Listens to the 3 promise states dispatched by the thunk:
  - **`.pending`** ➔ Request started (`loading = true`).
  - **`.fulfilled`** ➔ Request succeeded (save `action.payload` to state).
  - **`.rejected`** ➔ Request failed (save `action.error.message` to state).



## 🛠️ Step 1: Create the Thunk (`userThunk.js`)

Defines the asynchronous fetch logic.

```javascript
import { createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk("action_type_prefix", asyncFunction)
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)");
  return await response.json(); // Returned value becomes action.payload in .fulfilled
});
```

## 📄 Step 2: Create the Slice with extraReducers (userSlice.js)

### Imports the thunk and handles its lifecycle.

```js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
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

## 🏬 Step 3: Register in Store (store.js)

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Accessed via state.user in components
  },
});
```

## ⚛️ Step 4: Dispatch in Component (Users.jsx)

```js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/user/userThunk";

const Users = () => {
  const dispatch = useDispatch();
  
  // 1. Read state
  const { users, loading, error } = useSelector((state) => state.user);

  // 2. Trigger fetch on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // 3. Handle UI states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default Users;
```

## 🧠 Memory Rules for Notebook

### 1. Why extraReducers instead of reducers?

- Actions defined outside the slice (like createAsyncThunk) must be handled inside extraReducers.

### 2. Three Promise Lifecycle States

- [thunkName].pending ➔ loading = true

- [thunkName].fulfilled ➔ state.data = action.payload (Success)

- [thunkName].rejected ➔ state.error = action.error.message (Failure)

### 3.  Data Flow Cycle

```js
Component ➔ dispatch(fetchUsers()) ➔ API Request ➔ return data ➔ extraReducers (fulfilled) ➔ Update State ➔ Component Re-renders
```

```js
[ 1. Component ]
       │
       ▼  dispatch(fetchUsers())
[ 2. Async Thunk ]
       │
       ▼  fetch / API call
[ 3. Backend / API ]
       │
       ▼  return data (payload)
[ 4. extraReducers (fulfilled) ]
       │
       ▼  state.users = action.payload
[ 5. Redux Store ]
       │
       ▼  useSelector() triggers re-render
[ 1. Component Updated! ]
```
