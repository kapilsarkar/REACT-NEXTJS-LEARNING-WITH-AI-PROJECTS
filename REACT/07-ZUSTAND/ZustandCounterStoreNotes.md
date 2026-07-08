# Zustand Counter Store Notes

## Store Code

``` javascript
import { create } from 'zustand'

export const useCounterStore = create((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 })
}))
```

## What is `create()`?

`create()` is used to create a global state store in Zustand.

``` javascript
import { create } from "zustand";
```

Think of it as:

- `useState()` → creates local state
- `create()` → creates global state

------------------------------------------------------------------------

## Creating the Store

``` javascript
export const useCounterStore = create(...)
```

This creates a store named `useCounterStore`.

The store contains:

- State
- Actions (functions that update state)

------------------------------------------------------------------------

## Understanding `set`

``` javascript
create((set) => ({
```

`set` is provided by Zustand.

Its job is to update the store.

React:

``` javascript
setCount(count + 1)
```

Zustand:

``` javascript
set({ count: 1 })
```

------------------------------------------------------------------------

## Initial State

``` javascript
count: 0
```

This is the initial value of `count`.

Equivalent React code:

``` javascript
const [count, setCount] = useState(0);
```

------------------------------------------------------------------------

## Increase Function

``` javascript
increase: () => set((state) => ({
    count: state.count + 1
}))
```

### Flow

Current State:

``` text
count = 5
```

After clicking increase:

``` text
count = 6
```

`state` represents the current store state.

------------------------------------------------------------------------

## Decrease Function

``` javascript
decrease: () => set((state) => ({
    count: state.count - 1
}))
```

Current value:

``` text
count = 5
```

After clicking decrease:

``` text
count = 4
```

------------------------------------------------------------------------

## Reset Function

``` javascript
reset: () => set({ count: 0 })
```

This does not depend on the previous state.

Therefore we directly write:

``` javascript
set({ count: 0 })
```

------------------------------------------------------------------------

## Why `state =>` in Increase but not Reset?

### Increase

Depends on previous state.

``` javascript
count: state.count + 1
```

### Reset

Does not depend on previous state.

``` javascript
count: 0
```

------------------------------------------------------------------------

## Final Store Structure

``` javascript
{
    count: 0,
    increase: function,
    decrease: function,
    reset: function
}
```

------------------------------------------------------------------------

## Using the Store in Components

``` javascript
import { useCounterStore } from "./store";

function App() {
    const count = useCounterStore((state) => state.count);
    const increase = useCounterStore((state) => state.increase);

    return (
        <>
            <h1>{count}</h1>
            <button onClick={increase}>+</button>
        </>
    );
}
```

------------------------------------------------------------------------

## Data Flow

``` text
Component
   ↓
useCounterStore()
   ↓
Global Store
   ↓
Action Called
   ↓
set() updates state
   ↓
Component re-renders
```

------------------------------------------------------------------------

## React State Management Comparison

A quick reference guide comparing local component state using React's `useState` hook with global state management using `Zustand`.

## React useState vs Zustand

| Feature / Aspect | React `useState` | Zustand |
| :--- | :--- | :--- |
| **State Scope** | Local State | Global State |
| **Initialization** | `useState(0)` | `create()` |
| **State Updater** | `setCount()` | `set()` |
| **Data Flow** | Props drilling required | Accessible anywhere |
| **Architecture** | Component state | Shared state |

------------------------------------------------------------------------

## Revision Notes

- `create()` creates a global store.
- The object returned from `create()` becomes the store.
- State and actions live together.
- `set()` updates the store.
- Use `set((state) => ...)` when new state depends on previous state.
- Use `set({...})` when assigning fixed values.
- Components subscribe only to the state they need.

------------------------------------------------------------------------

## Next Topics to Learn

1. Selecting multiple values from store.
2. Updating arrays and objects.
3. Async actions.
4. Store slices.
5. Middleware (`persist`, `devtools`).
