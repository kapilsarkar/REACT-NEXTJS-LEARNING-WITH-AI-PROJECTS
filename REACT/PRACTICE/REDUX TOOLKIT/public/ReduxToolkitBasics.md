# 📌 Redux Toolkit (RTK) CheatSheet

## 💡 Core Concept

## Redux holds your app's state in a central location (the Store)

- Slice
 ↓
- Contains:

   • initial state

   • reducers

   • generated action creators

   • reducer logic.

- Dispatch: Sends an Action to run a reducer.

- Selector: Reads data from the store.

## 🛠️ Step 1: Create a Slice (counterSlice.js)

- A slice combines state data and the logic to update it.

```js
import { createSlice } from "@reduxjs/toolkit";

// 1. Initial State
const initialState = {
  value: 0,
  name: "Kapil Sarkar",
};

// 2. Create Slice
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 0) state.value -= 1; // Prevent negative numbers
    },
    reset: (state) => {
      state.value = 0;
    },
    changeByValue: (state, action) => {
      state.value = Math.max(0, Number(action.payload) || 0);
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// 3. Export Actions & Reducer
export const { increment, decrement, reset, changeByValue, changeName } = counterSlice.actions;
export default counterSlice.reducer;
```

## 🏬 Step 2: Configure the Store (store.js)

- The store is the central box containing all slices.

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer, // 'counter' is the key used to read state
  },
});

export default store;
```

## 🔌 Step 3: Provide Store to App (main.jsx or index.js)

- Wrap your entire React app with the Redux Provider.

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

## ⚛️ Step 4: Use Redux in Components

## Use two key hooks:

- useSelector: Read state data.

- useDispatch: Trigger reducer actions.

## Example 1: Counter.jsx

```js
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../features/counter/counterSlice";

const Counter = () => {
  // Read state from Redux
  const storeValue = useSelector((state) => state.counter.value);
  
  // Get dispatch function
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {storeValue}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())} disabled={storeValue <= 0}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
```

## Example 2: Name.jsx (Passing Data with Payload)

```js
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../features/counter/counterSlice";

const Name = () => {
  const stateName = useSelector((state) => state.counter.name);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Name: {stateName}</p>
      <input
        type="text"
        value={stateName}
        onChange={(e) => dispatch(changeName(e.target.value))} // e.target.value is the payload
      />
    </div>
  );
};

export default Name;
```

## ⚡ Quick Memory Rules for Notebook

### 1. useSelector((state) => state.sliceKey.property)

- Reads data.

- Example: state.counter.value

### 2.useDispatch()

- Sends an action to update state.

- Example: dispatch(increment())

### 3.action.payload

- Any argument passed into an action function becomes action.payload.

- Example: dispatch(changeName("Rahul")) → inside slice: action.payload is "Rahul".

### 4. State Mutability in RTK

- RTK uses Immer under the hood, so you can safely modify state directly (state.value += 1).
