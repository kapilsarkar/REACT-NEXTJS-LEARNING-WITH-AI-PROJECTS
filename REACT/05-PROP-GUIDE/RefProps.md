# Ref Props in React (Complete Revision Notes)

## Overview

This file teaches one of the most important advanced React concepts:

* `useRef`
* `forwardRef`
* DOM manipulation
* Parent controlling child components

Normally React data flows like this:

```text
Parent → Child (Props)
```

But with refs:

```text
Parent → Child → Direct DOM Access
```

This allows the parent to:

* Focus input
* Get input value
* Clear input
* Control DOM directly

---

## Concepts Covered

✔ `useRef()`
✔ `forwardRef()`
✔ DOM Access
✔ Optional Chaining
✔ Parent → Child Ref Passing
✔ Custom Reusable Input Component
✔ Event Handling
✔ Imperative Programming in React

---

## Project Structure

```text
RefProps
│
├── inputRef
├── secondInputRef
│
├── focusInput()
├── getInputValue()
├── clearInput()
├── focusSecondInput()
│
└── CustomInput
     └── input element
```

---

## 1. Importing Hooks

```jsx
import { useRef, forwardRef } from "react";
```

We import:

---

## useRef

Used to create references.

Example:

```jsx
const inputRef = useRef(null);
```

Initial value:

```js
inputRef.current = null
```

After rendering:

```js
inputRef.current = actual input DOM
```

---

## forwardRef

Used to pass ref from parent to child.

Without this:

```jsx
<CustomInput ref={inputRef} />
```

React will not allow ref on custom components.

Because:

```text
ref works directly on DOM elements
```

Not normal function components.

So:

```jsx
forwardRef()
```

acts like a bridge.

---

## 2. Creating CustomInput Component

```jsx
const CustomInput = forwardRef(({ label, placeholder, className }, ref) => {
```

This creates a reusable input component.

It receives:

---

## Normal props

```jsx
label
placeholder
className
```

---

## Special prop

```jsx
ref
```

Important:

Normal component:

```jsx
function Component(props)
```

With forwardRef:

```jsx
(props, ref)
```

---

## 3. Input Wrapper

```jsx
<div className="mb-4">
```

Adds margin-bottom.

Used for spacing.

---

## 4. Label

```jsx
<label>{label}</label>
```

Dynamic label.

Example:

```jsx
label="First Input"
```

Output:

```text
First Input
```

---

## 5. Input Element

```jsx
<input
  ref={ref}
  type="text"
  placeholder={placeholder}
/>
```

Most important line:

```jsx
ref={ref}
```

This attaches parent ref to actual DOM input.

Flow:

```text
Parent creates ref
        ↓
Parent sends ref
        ↓
Child receives ref
        ↓
Child attaches ref
        ↓
Parent controls input directly
```

---

## 6. Dynamic className

```jsx
${className}
```

Allows extra styles.

Makes component reusable.

Example:

```jsx
<CustomInput className="bg-red-100" />
```

Adds extra styling.

---

## 7. displayName

```jsx
CustomInput.displayName = "CustomInput";
```

Used for debugging.

Without:

```text
ForwardRef
```

With:

```text
CustomInput
```

Visible in React DevTools.

---

## 8. Main Parent Component

```jsx
export default function RefProps()
```

This is the parent.

Responsibilities:

* Create refs
* Pass refs
* Control inputs

---

## 9. Creating Refs

First input:

```jsx
const inputRef = useRef(null);
```

Second input:

```jsx
const secondInputRef = useRef(null);
```

Initial:

```js
null
```

After render:

```js
input DOM
```

---

## 10. focusInput()

```jsx
const focusInput = () => {
  inputRef.current?.focus();
};
```

Focuses first input.

Example:

Before click:

```text
cursor inactive
```

After click:

```text
cursor active in first input
```

---

## Optional Chaining

```jsx
?.
```

Means:

Only execute if exists.

Equivalent:

```js
if(inputRef.current){
   inputRef.current.focus()
}
```

---

## 11. getInputValue()

```jsx
const getInputValue = () => {
```

Gets current input value.

Logic:

```jsx
if (inputRef.current) {
```

Check input exists.

Then:

```jsx
inputRef.current.value
```

Example:

User types:

```text
Kapil
```

Alert:

```text
Input value: Kapil
```

---

## 12. clearInput()

```jsx
inputRef.current.value = "";
```

Clears text.

Example:

Before:

```text
Kapil
```

After:

```text
(empty)
```

Then:

```jsx
inputRef.current.focus();
```

Focuses input again.

---

## 13. focusSecondInput()

```jsx
secondInputRef.current?.focus();
```

Focuses second input.

Same logic.

---

## JSX Structure

```text
RefProps
│
├── Section
│
├── Heading
├── Description
│
├── CustomInput 1
├── CustomInput 2
│
├── Buttons
│   ├── Focus First
│   ├── Focus Second
│   ├── Get Value
│   └── Clear Input
│
└── Info Box
```

---

## 14. Section Wrapper

```jsx
<section>
```

Main container.

Styles:

* padding
* white background
* shadow
* rounded corners

---

## 15. Heading

```jsx
<h2>Ref Props</h2>
```

Section title.

---

## 16. Description

Explains:

```text
Refs allow direct DOM access
```

Mentions:

```jsx
<code>forwardRef</code>
```

---

## 17. First Input

```jsx
<CustomInput
  ref={inputRef}
  label="First Input (with ref)"
  placeholder="Type something..."
/>
```

Passes:

* ref
* label
* placeholder

---

## 18. Second Input

```jsx
<CustomInput
  ref={secondInputRef}
```

Uses second ref.

Independent input.

---

## 19. Buttons

---

## Focus First Input

```jsx
<button onClick={focusInput}>
```

Action:

Focus first input.

---

## Focus Second Input

```jsx
<button onClick={focusSecondInput}>
```

Action:

Focus second input.

---

## Get First Input Value

```jsx
<button onClick={getInputValue}>
```

Action:

Show input value.

---

## Clear First Input

```jsx
<button onClick={clearInput}>
```

Action:

Clear input.

---

## 20. Info Section

Displays when refs are useful.

Examples:

* Managing focus
* Media control
* Animations
* DOM measurements
* Third-party libraries

---

## Data Flow

```text
RefProps
│
├── creates refs
│
├── passes refs
│
▼
CustomInput
│
├── receives ref
│
▼
<input ref={ref}>
│
▼
Parent accesses DOM
```

---

## Parent → Child Communication

Normal props:

```jsx
label
placeholder
className
```

Special ref prop:

```jsx
ref={inputRef}
```

---

## Why forwardRef is needed

Without:

```jsx
<CustomInput ref={inputRef} />
```

Error:

```text
Function components cannot be given refs
```

Because:

```text
Refs work on DOM elements
```

Solution:

```jsx
forwardRef()
```

---

## Real World Uses of Refs

Used in:

✔ Search bars
✔ Login forms
✔ OTP input boxes
✔ Modal focus
✔ Auto-focus forms
✔ Video players
✔ Scroll-to-section
✔ Drag and drop libraries
✔ Measuring element height/width

---

## Golden Rule

Normal props:

```jsx
<Component name="Kapil" />
```

Used for data flow.

---

Ref props:

```jsx
<Component ref={myRef} />
```

Used for DOM access.

---

## Final Summary

This project teaches:

✔ How to create refs
✔ How to pass refs to child components
✔ How to attach refs to DOM
✔ How to control DOM directly
✔ Why forwardRef exists
✔ When refs should be used

Main idea:

```text
Props = send data
Refs = control DOM
```

Remember this forever.
