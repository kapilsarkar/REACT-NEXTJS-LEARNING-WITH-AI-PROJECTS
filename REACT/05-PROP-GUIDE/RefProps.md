# Ref Props in React (Revision Notes)

## Overview

This file teaches:

* `useRef`
* `forwardRef`
* Direct DOM access
* Parent controlling child input

Main idea:

```text
Parent → Child → DOM
```

Ref allows parent to directly access child DOM.

---

## Concepts Covered

* `useRef`
* `forwardRef`
* DOM Manipulation
* Focus Input
* Get Input Value
* Clear Input
* Optional Chaining

---

## File Structure

```text
RefProps
│
├── inputRef
├── secondInputRef
│
└── CustomInput
     └── input element
```

---

## 1. useRef

Creates a reference.

```jsx
const inputRef = useRef(null);
```

Initial:

```js
inputRef.current = null
```

After render:

```js
inputRef.current = input DOM element
```

---

## 2. forwardRef

Allows parent ref to pass into child.

Syntax:

```jsx
forwardRef((props, ref) => {})
```

Without it:

```jsx
<CustomInput ref={inputRef} />
```

won’t work.

---

## 3. CustomInput Component

Receives:

```jsx
({ label, placeholder, className }, ref)
```

Props:

* label
* placeholder
* className
* ref

---

## 4. Attaching ref

```jsx
<input ref={ref} />
```

Most important line.

Connects parent ref to child DOM.

---

## 5. displayName

```jsx
CustomInput.displayName = "CustomInput";
```

Used for React DevTools debugging.

---

## 6. focusInput()

```jsx
inputRef.current?.focus();
```

Focuses first input.

---

## 7. getInputValue()

```jsx
inputRef.current.value
```

Reads input value.

---

## 8. clearInput()

```jsx
inputRef.current.value = "";
inputRef.current.focus();
```

Clears input and focuses again.

---

## 9. focusSecondInput()

```jsx
secondInputRef.current?.focus();
```

Focuses second input.

---

## JSX Structure

```text
RefProps
│
├── Heading
├── Description
├── First CustomInput
├── Second CustomInput
├── Buttons
└── Info Section
```

---

## Button Actions

| Button                | Action             |
| --------------------- | ------------------ |
| Focus First Input     | Focus first input  |
| Focus Second Input    | Focus second input |
| Get First Input Value | Show alert         |
| Clear First Input     | Clear value        |

---

## Data Flow

```text
Parent creates ref
       ↓
Passes ref to child
       ↓
Child attaches ref to input
       ↓
Parent accesses input directly
```

---

## Real World Uses

Refs are used for:

* input focus
* text selection
* media playback
* scroll control
* animations
* third-party libraries

---

## Golden Rule

Normal props:

```jsx
<Component name="Kapil" />
```

Ref props:

```jsx
<Component ref={myRef} />
```

Normal props send data.

Refs give direct DOM access.
