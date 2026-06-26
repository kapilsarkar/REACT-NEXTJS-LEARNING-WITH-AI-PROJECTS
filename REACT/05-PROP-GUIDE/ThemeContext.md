# Theme Toggler using Context API (Complete Revision Notes)

## Overview

This project demonstrates:

* `createContext`
* `useContext`
* `useState`
* Custom Hooks
* Shared Theme State
* Avoiding Prop Drilling
* Combining Context + Props

Main idea:

Instead of passing theme through every component manually:

```text id="iy0v56"
App → Parent → Child → Grandchild
```

Context allows:

```text id="4vc0wd"
App → Any Component directly
```

This solves:

```text id="0vh0h2"
Prop Drilling
```

---

## Concepts Covered

✔ `createContext()`
✔ `useContext()`
✔ `useState()`
✔ Context Provider
✔ Custom Hooks
✔ Global State
✔ Theme Switching
✔ Conditional Styling
✔ Reusable Components
✔ Props + Context Together

---

## Project Structure

```text id="xfrj6u"
ThemeProvider
│
├── ThemeContext
│
├── ThemeToggleButton
├── ThemedCard
├── ThemedButton
│
└── ThemeToggler
```

---

## 1. Importing Hooks

```jsx id="1jxj3j"
import { createContext, useContext, useState } from "react";
```

Three hooks:

---

## createContext()

Creates global state container.

---

## useContext()

Reads context value.

---

## useState()

Stores state.

---

## 2. Creating Theme Context

```jsx id="od4iq0"
const ThemeContext = createContext();
```

Creates context object.

Think:

```text id="a4esml"
ThemeContext = global theme storage
```

Initially empty.

---

## 3. Theme Provider Component

```jsx id="v3l3zz"
export function ThemeProvider({ children })
```

Provider wraps app and gives theme data.

Example:

```jsx id="hzjlwm"
<ThemeProvider>
   <App />
</ThemeProvider>
```

Everything inside gets theme access.

---

## 4. Theme State

```jsx id="htrn8m"
const [theme, setTheme] = useState("light");
```

Initial:

```js id="k26z5j"
theme = "light"
```

Possible values:

```js id="5e1gfh"
"light"
"dark"
```

---

## 5. Toggle Theme Function

```jsx id="3mew2a"
const toggleTheme = () => {
```

Changes theme.

Logic:

```jsx id="sycf8v"
setTheme((prevTheme) =>
  prevTheme === "light" ? "dark" : "light"
);
```

Flow:

```text id="ov20s9"
light → dark
dark → light
```

Ternary:

```js id="q9t4hf"
condition ? true : false
```

---

## 6. Context Value Object

```jsx id="5jjl0g"
const value = {
  theme,
  toggleTheme,
  isDark: theme === "dark",
};
```

This object is shared globally.

Contains:

---

## theme

Current theme.

Example:

```js id="ktvry8"
"light"
```

---

## toggleTheme

Function to switch theme.

---

## isDark

Boolean shortcut.

Example:

If:

```js id="6u4b4t"
theme = "dark"
```

Then:

```js id="p7njf2"
isDark = true
```

If:

```js id="jl6n83"
theme = "light"
```

Then:

```js id="95fgzk"
isDark = false
```

---

## 7. Providing Context

```jsx id="uhs0d6"
<ThemeContext.Provider value={value}>
  {children}
</ThemeContext.Provider>
```

This gives all child components access.

Flow:

```text id="g00xot"
Provider
   ↓
Children
   ↓
Context available
```

---

## 8. Custom Hook

```jsx id="s9v0ic"
export function useTheme()
```

Custom reusable hook.

Used to access theme.

Inside:

```jsx id="gmj6nq"
const context = useContext(ThemeContext);
```

Reads context.

---

Safety check:

```jsx id="nkv3d8"
if (!context) {
```

Throws error if used outside provider.

Good practice.

---

Returns:

```jsx id="gmv2g0"
return context;
```

So anywhere:

```jsx id="mqu6p1"
const { isDark } = useTheme();
```

works.

---

## 9. Theme Toggle Button

```jsx id="l5j3mn"
function ThemeToggleButton()
```

Uses theme:

```jsx id="hmh5ew"
const { theme, toggleTheme, isDark } = useTheme();
```

Gets:

* theme
* toggle function
* dark mode boolean

---

Button click:

```jsx id="ddn8ff"
onClick={toggleTheme}
```

Switches theme.

---

Dynamic button background:

```jsx id="z8d3f5"
${isDark ? "bg-blue-600" : "bg-gray-300"}
```

Dark:

blue.

Light:

gray.

---

Icon:

```jsx id="owu7mu"
{isDark ? "🌙" : "☀️"}
```

Dark → moon

Light → sun

---

Knob movement:

```jsx id="r0on5w"
${isDark ? "transform translate-x-8" : ""}
```

Moves switch.

---

## 10. ThemedCard Component

```jsx id="c7dzzs"
function ThemedCard({ title, children })
```

Receives:

* title
* children

Uses:

```jsx id="4rkg67"
const { isDark } = useTheme();
```

Reads global theme.

---

Dynamic styles:

```jsx id="u0vyyj"
${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}
```

Changes card colors.

---

Displays:

```jsx id="mk8x8f"
{title}
{children}
```

Reusable.

---

## 11. ThemedButton Component

```jsx id="dy7y16"
function ThemedButton({ children, variant = "primary", onClick })
```

Receives props:

* children
* variant
* onClick

---

Default:

```jsx id="9oqqgv"
variant = "primary"
```

if no variant given.

---

Uses:

```jsx id="v0fkca"
getButtonClasses()
```

Returns different styles based on:

* theme
* variant

---

Example:

Primary + Dark:

```text id="0p7q9u"
blue button
```

Secondary + Light:

```text id="mpy6bi"
gray button
```

---

## 12. Main ThemeToggler Component

```jsx id="8lcg6j"
export default function ThemeToggler()
```

Main demo component.

---

Uses:

```jsx id="8it7h8"
const { isDark } = useTheme();
```

Gets theme.

---

Local state:

```jsx id="4ydl4f"
const [clickCount, setClickCount] = useState(0);
```

Stores button clicks.

Initial:

```js id="u4d2mn"
0
```

---

## JSX Structure

```text id="jttj4x"
ThemeToggler
│
├── Header
│   ├── Title
│   ├── Theme Status
│   └── Toggle Button
│
├── Description
│
├── User Card
│   ├── User Info
│   └── Buttons
│
├── Statistics Card
│
├── Interactive Demo Card
│
└── Info Section
```

---

## 13. Header Section

Displays:

```jsx id="8v8v1n"
Theme Toggler
```

Shows:

```jsx id="1snjck"
Dark Mode / Light Mode
```

Uses:

```jsx id="ujlt0m"
<ThemeToggleButton />
```

---

## 14. Description

Explains:

```text id="hjhrjv"
Theme state shared without prop drilling
```

---

## 15. First Card (User Information)

Uses:

```jsx id="5kto5q"
<ThemedCard title="User Information">
```

Inside:

Displays:

```text id="kgc0wo"
Name
Email
Role
```

Buttons:

```jsx id="x2v9qn"
<ThemedButton />
```

Click:

```jsx id="t4jhjx"
setClickCount(clickCount + 1)
```

Counter increases.

---

## 16. Statistics Card

Shows:

```jsx id="3h63r6"
Total Clicks
Theme
Status
```

Reads:

```jsx id="b12q1d"
clickCount
isDark
```

Dynamic.

---

## 17. Interactive Demo Card

Buttons:

* Primary Action
* Secondary Action
* Reset Counter

Actions:

```jsx id="o5ggn0"
setClickCount(clickCount + 1)
```

or:

```jsx id="2mx52p"
setClickCount(0)
```

---

## 18. Final Info Box

Explains benefits:

✔ Avoid prop drilling
✔ Global theme access
✔ Normal props still work
✔ Mix global + local state

---

## Data Flow

```text id="yjlwm1"
ThemeProvider
      │
      ▼
ThemeContext
      │
      ▼
useTheme()
      │
 ┌────┼────┬────┐
 ▼    ▼    ▼    ▼
Toggle Card Button ThemeToggler
```

All components share same theme.

---

## Props vs Context

Props:

```jsx id="kvw0zw"
<ThemedCard title="User Info" />
```

Used for local data.

---

Context:

```jsx id="bctzcr"
const { isDark } = useTheme();
```

Used for global data.

---

## Why Context API?

Without context:

```text id="us30yy"
App → Parent → Child → Grandchild
```

Theme passed manually.

Bad.

With context:

```text id="y2rmji"
Any component → useTheme()
```

Easy.

---

## Real World Uses

Context API used for:

✔ Theme
✔ Authentication
✔ Language
✔ User profile
✔ Shopping cart
✔ Notifications

---

## Golden Rule

Props:

```text id="xtm7u2"
For local component data
```

Context:

```text id="qhz2gb"
For global shared data
```

Remember:

```text id="xftnry"
Props = pass data
Context = share data globally
```

This is the foundation before learning Zustand or Redux.
