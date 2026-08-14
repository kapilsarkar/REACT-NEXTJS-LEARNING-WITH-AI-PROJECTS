# ⚔️ Redux Toolkit vs. Zustand

## 📋 Table of Contents

- [⚔️ Redux Toolkit vs. Zustand](#️-redux-toolkit-vs-zustand)
  - [💡 Core Philosophy](#-core-philosophy)
  - [💻 Code Comparison (Counter Example)](#-code-comparison-counter-example)
    - [🔴 Redux Toolkit Setup (3 Steps)](#-redux-toolkit-setup-3-steps)
      - [Step 1: Create Slice (counterSlice.js)](#step-1-create-slice-counterslicejs)
      - [Step 2: Configure Store & Provide It (store.js + main.jsx)](#step-2-configure-store--provide-it-storejs--mainjsx)
      - [Step 3: Use in Component (Counter.jsx)](#step-3-use-in-component-counterjsx)
    - [🐻 Zustand Setup (1 Step)](#-zustand-setup-1-step)
      - [Step 1: Create Store & Use directly (useCounterStore.js)](#step-1-create-store--use-directly-usecounterstorejs)
      - [Step 2: Use in Component (Counter.jsx)](#step-2-use-in-component-counterjsx)
  - [📊 Summary Comparison Table](#-summary-comparison-table)
  - [🧠 Memory Cheat Sheet for Notebook](#-memory-cheat-sheet-for-notebook)
    - [1. How they mutate state](#1-how-they-mutate-state)
    - [2. Provider Check](#2-provider-check)
    - [3. When to pick which](#3-when-to-pick-which)

## 💡 Core Philosophy

- Redux Toolkit (RTK): Structured & Opinionated. You get a central store, a Provider wrapper, explicit actions, and reducers.  

- Zustand: Minimal & Unopinionated. No Provider needed. You write a single custom hook that holds both state and update functions.

## 💻 Code Comparison (Counter Example)

## 🔴 Redux Toolkit Setup (3 Steps)

## Step 1: Create Slice (counterSlice.js)

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { if (state.value > 0) state.value -= 1; },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

## Step 2: Configure Store & Provide It (store.js + main.jsx)

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});

// main.jsx
import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}>
  <App />
</Provider>
```

## Step 3: Use in Component (Counter.jsx)

```js
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
```

## 🐻 Zustand Setup (1 Step)

- Step 1: Create Store & Use directly (useCounterStore.js)

```js
import { create } from "zustand";

export const useCounterStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
  decrement: () => set((state) => ({ value: Math.max(0, state.value - 1) })),
}));
```

## Step 2: Use in Component (Counter.jsx)

## (No `<Provider>` setup required!)

```js
import { useCounterStore } from "./useCounterStore";

const Counter = () => {
  // Pick what you need directly from the custom hook
  const count = useCounterStore((state) => state.value);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};
```

## 📊 Summary Comparison Table

| Feature | Redux Toolkit (RTK) 🔴 | Zustand 🐻 |
| :--- | :--- | :--- |
| **Boilerplate** | Medium (Slices, Store, Provider) | Almost None (1 function setup) |
| **Provider Component** | Required (`<Provider store={store}>`) | Not Required |
| **Bundle Size** | ~13 KB - 35 KB gzipped | Tiny (~2 KB) |
| **DevTools** | Best-in-class (Time travel, state diffs) | Good (via Redux DevTools middleware) |
| **Server Data Fetching** | Bundled (`RTK Query`) | External tool needed (e.g., TanStack Query) |
| **Best Used For** | Large applications, strict teams, complex data fetching | Medium/Small apps, fast MVPs, UI-heavy state |

## 🧠 Memory Cheat Sheet for Notebook

### 1. How they mutate state

- RTK: Uses Immer internally -> You can write direct mutations like state.value += 1.

- Zustand: Uses a set() function -> You return a new partial object like set(state => ({ value: state.value + 1 })).

## 2. Provider Check

- RTK: Must wrap the app in `<Provider>`.

- Zustand: Zero wrappers; just import the custom hook anywhere.

## 3. When to pick which

- Choose Zustand if you want fast setup, low boilerplate, and simple UI state.  

- Choose RTK if you are on a large team that needs strict conventions, deep debugging, or built-in caching with RTK Query.
