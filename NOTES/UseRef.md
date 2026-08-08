# 📖 useRef NOTEBOOK

## 📌 TABLE OF CONTENTS

- [📄 PAGE 1 – CORE CONCEPTS](#page-1--core-concepts)
  - [1. What is useRef()?](#1-what-is-useref)
  - [2. What does useRef() return?](#2-what-does-useref-return)
  - [Memory Trick](#memory-trick)
  - [3. Two Major Uses of useRef](#3-two-major-uses-of-useref)
  - [4. useRef vs useState ⭐⭐⭐⭐⭐](#4-useref-vs-usestate-)
- [📄 PAGE 2 – API CHEAT SHEET](#page-2--api-cheat-sheet)
  - [useRef()](#useref-1)
  - [.current](#current)
  - [Memory Trick](#memory-trick-1)
  - [ref={}](#ref)
- [📄 PAGE 3 – DOM MANIPULATION](#page-3--dom-manipulation)
  - [Example – Focus Input ⭐⭐⭐⭐⭐](#example--focus-input-)
  - [Auto Focus with useEffect](#auto-focus-with-useeffect)
  - [Important](#important)
- [📄 PAGE 4 – PERSISTENT VALUE](#page-4--persistent-value)
  - [Why useRef for persistent values?](#why-useref-for-persistent-values)
  - [Render Counter Example](#render-counter-example)
- [📄 PAGE 5 – PREVIOUS VALUE](#page-5--previous-value)
  - [Important](#important-1)
- [📄 PAGE 6 – REAL PROJECT EXAMPLE](#page-6--real-project-example)
  - [Dashboard Search](#dashboard-search)
  - [What happens?](#what-happens)
  - [Search Functionality](#search-functionality)
- [📄 PAGE 7 – useRef vs useState](#page-7--useref-vs-usestate)
  - [Memory Trick ⭐](#memory-trick--1)
- [📄 PAGE 8 – When NOT to Use useRef](#page-8--when-not-to-use-useref)
- [📄 PAGE 9 – INTERVIEW QUESTIONS](#page-9--interview-questions)
- [📄 PAGE 10 – FINAL 2-MINUTE REVISION ⭐](#page-10--final-2-minute-revision-)

---

## 📄 PAGE 1 – CORE CONCEPTS

## 1. What is useRef()?

- `useRef` is a React Hook that lets us store a value that persists across renders without causing a re-render when it changes.

- It is also commonly used to create a reference to a DOM element.

```js
import { useRef } from "react";

const myRef = useRef(null);
```

## 2. What does useRef() return?

```js
const myRef = useRef(null);
```

- It returns an object:

```js
{
  current: null;
}
```

- The important property is:

```js
myRef.current;
```

## Memory Trick

```js
useRef()

↓

Returns Object

↓

.current

↓

Stored Value / DOM Element
```

## 3. Two Major Uses of useRef

- Use 1 – DOM Reference

```js
useRef

↓

DOM Element

↓

focus()
```

- Example:

```js
const inputRef = useRef(null);

<input ref={inputRef} />;

inputRef.current.focus();
```

- Use 2 – Persistent Value

- A value stored inside a ref survives component re-renders.

```js
const countRef = useRef(0);

countRef.current += 1;
```

- Changing current does not cause React to re-render.

## 4. useRef vs useState ⭐⭐⭐⭐⭐

- This is one of the most important things to remember.

```js
useState

↓

State Changes

↓

React Re-renders

↓

UI Updates
```

- Whereas:

```js
useRef

↓

.current Changes

↓

NO Re-render

↓

UI Does NOT Automatically Update
```

- Example

```js
const [count, setCount] = useState(0);

setCount(10);
```

- React re-renders.

- But:

```js
const countRef = useRef(0);

countRef.current = 10;
```

- React does not re-render.

## 📄 PAGE 2 – API CHEAT SHEET

## useRef()

## Syntax

```js
const ref = useRef(initialValue);
```

- Examples:

```js
const inputRef = useRef(null);

const countRef = useRef(0);

const previousValue = useRef();
```

## .current

- Used to access or modify the value stored inside the ref.

```js
ref.current;
```

- Example:

```js
countRef.current += 1;
```

- DOM example:

```js
inputRef.current.focus();
```

## Memory Trick

```js
.current

↓

Read / Write Ref Value
```

## ref={}

- Attach a ref to a DOM element.

```js
const inputRef = useRef(null);

<input ref={inputRef} />;
```

- After rendering:

```js
inputRef.current

↓

<input> DOM Element
```

## 📄 PAGE 3 – DOM MANIPULATION

## Example – Focus Input ⭐⭐⭐⭐⭐

```js
import { useRef } from "react";

const inputRef = useRef(null);

const handleFocus = () => {
  inputRef.current?.focus();
};
```

- Input:

```js
<input ref={inputRef} />
```

- Button:

```js
<button onClick={handleFocus}>Focus</button>
```

- Flow

```js
Button Click

↓

handleFocus()

↓

inputRef.current

↓

<input>

↓

focus()
```

## Auto Focus with useEffect

```js
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

<input ref={inputRef} />;
```

- Flow

```js
Component Mounts

↓

useEffect()

↓

inputRef.current.focus()

↓

Input Gets Focus

```

## Important

- A ref must be attached to an element.

- ❌ Wrong

```js
const focusRef = useRef(null);

{
  focusRef;
}
```

- A ref is not UI.

- ✅ Correct

```js
<input ref={focusRef} />
```

## 📄 PAGE 4 – PERSISTENT VALUE

## Why useRef for persistent values?

- A normal local variable resets on every render.

```js
let count = 0;
```

- But:

```js
const countRef = useRef(0);
```

- persists between renders.

```js
Render 1

countRef.current = 0

↓

Render 2

countRef.current = previous value

↓

Render 3

countRef.current = previous value
```

## Render Counter Example

```js
const renderCountRef = useRef(0);

useEffect(() => {
  renderCountRef.current += 1;

  console.log(`Component rendered ${renderCountRef.current} times`);
});
```

- Important:

```js
renderCountRef.current++

↓

Does NOT cause another render
```

## 📄 PAGE 5 – PREVIOUS VALUE

- One common use of useRef is storing the previous value of state.

```js
const previousCount = useRef();

useEffect(() => {
  previousCount.current = count;
}, [count]);
```

- Concept:

```js
Current State

↓

Render

↓

Store value in Ref

↓

Next Render

↓

Ref contains previous value
```

- Example:

```js
<p>Current Count: {count}</p>

<p>Previous Count: {previousCount.current}</p>
```

## Important

- useRef can store the previous value because changing .current doesn't trigger another render.

## 📄 PAGE 6 – REAL PROJECT EXAMPLE

## Dashboard Search

- In your Profile System you used:

```js
const focusRef = useRef(null);
```

- Then:

```js
useEffect(() => {
  focusRef.current?.focus();
}, []);
```

- And:

```js
<input ref={focusRef} type="text" placeholder="Search Users By Name..." />
```

## What happens?

```js
Dashboard Mounts

↓

useEffect()

↓

focusRef.current

↓

Search Input

↓

focus()

↓

Cursor Automatically Appears
```

## Search Functionality

- You correctly used useState for the search term:

```js
const [searchTerm, setSearchTerm] = useState("");
```

- Because the search value affects the UI.

- Then:

```js
const filteredUsers = users.filter((user) =>
  user.name?.toLowerCase().includes(searchTerm.toLowerCase()),
);
```

- This gives you an excellent example of useRef + useState working together:

```js
useRef
 ↓
Focus Search Input

useState
 ↓
Store Search Term

filter()
 ↓
Calculate Matching Users
```

## 📄 PAGE 7 – useRef vs useState

| `useRef`                              | `useState`                 |
| ------------------------------------- | -------------------------- |
| Stores persistent value               | Stores state               |
| Changing `.current` doesn't re-render | Changing state re-renders  |
| Commonly used for DOM references      | Used for UI data           |
| Access through `.current`             | Access directly            |
| Good for previous values              | Good for current UI values |
| Doesn't automatically update UI       | Updates UI                 |

## Memory Trick ⭐

```js
Does this value need to change the UI?

        YES
         ↓
    useState()

        NO
         ↓
    useRef()
```

- Exception: useRef is also commonly used when you need a DOM reference.

## 📄 PAGE 8 – When NOT to Use useRef

- Don't use useRef simply because it can store a value.

- ❌ Don't do this for UI state

```js
const count = useRef(0);

count.current++;
```

- if you expect:

```js
<h1>{count.current}</h1>
```

- to automatically update.

- Use:

```js
const [count, setCount] = useState(0);
```

- instead.

- ❌ Don't use useRef for everything

```js
Button clicked?
        ↓
useState

Modal open?
        ↓
useState

Search text?
        ↓
useState

Form value affecting UI?
        ↓
useState
```

- Whereas:

```js
Focus input?
        ↓
useRef

Access DOM element?
        ↓
useRef

Previous value?
        ↓
useRef

Persistent value that doesn't need UI update?
        ↓
useRef
```

## 📄 PAGE 9 – INTERVIEW QUESTIONS

## Q1. What is useRef()?

- useRef is a React Hook used to store a mutable value that persists across renders without causing a re-render when changed. It is also commonly used to reference DOM elements.

## Q2. What does useRef() return?

- An object containing a current property.

```js
const ref = useRef(null);
```

- Conceptually:

```js
{
  current: null;
}
```

## Q3. What is .current?

- .current stores the value or DOM element associated with the ref.

## Q4. Does changing ref.current cause a re-render?

- No.

```js
ref.current = newValue;
```

- does not trigger a React render.

## Q5. Difference between useRef and useState?

```js
useState
↓

Change → Re-render → UI Update


useRef
↓

Change .current → No Re-render
```

## Q6. How do you focus an input using useRef?

```js
const inputRef = useRef(null);

<input ref={inputRef} />;

inputRef.current?.focus();
```

## Q7. Can useRef store previous values?

- Yes.

```js
const previousValue = useRef();

useEffect(() => {
  previousValue.current = value;
}, [value]);
```

## Q8. Why use useRef instead of a normal variable?

- A ref value persists across renders.

- A normal local variable is recreated during each render.

## Q9. Does useRef cause re-render?

- No

- That's one of its main characteristics.

## Q10. When should you use useRef?

- Use it when:
  - Accessing DOM elements
  - Focusing inputs
  - Storing previous values
  - Keeping mutable values between renders without triggering UI updates

## 📄 PAGE 10 – FINAL 2-MINUTE REVISION ⭐

```js
                    useRef()
                       ↓
                { current: value }
                   ↙       ↘
                  ↓         ↓
              DOM Ref    Persistent
                         Value
                  ↓         ↓
              focus()    survives
              click()    renders
              value         ↓
                        No re-render
```

- Remember:

```js
useRef()
    ↓
Creates Ref

.current
    ↓
Access / Modify Value

ref={}
    ↓
Attach to DOM

focus()
    ↓
Focus Element

useRef
    ↓
Persists Between Renders

useRef change
    ↓
NO Re-render

```

- The most important comparison:

```js
                 React Data

              ┌───────────────┐
              │               │
              ↓               ↓
         useState()        useRef()
              ↓               ↓
        UI needs update?   UI doesn't
              ↓             need update
          Re-render        No re-render
```
