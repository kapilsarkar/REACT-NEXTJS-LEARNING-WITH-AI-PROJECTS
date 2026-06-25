# Complex Props in React (Revision Notes)

## Overview

This file demonstrates **Complex/Nested Props** in React.

Instead of passing simple props like:

```jsx
<User name="Kapil" age={35} />
```

we pass complex nested objects:

```jsx
<UserProfileCard
  user={userObject}
  theme={themeObject}
  actions={actionsObject}
/>
```

This is useful in real-world apps where components need lots of related data.

---

## Concepts Covered

* `useState`
* Complex Props
* Nested Objects
* Function as Props
* Conditional Rendering
* Array Mapping
* Object.entries()
* Spread Operator
* Dynamic Tailwind Classes
* Reusable Components

---

## File Structure

```text
ComplexProps
│
├── useState (message state)
├── users array (complex nested data)
│
└── UserProfileCard
    │
    ├── Avatar
    ├── User Info
    ├── Stats Section
    └── Action Buttons
```

---

## 1. Importing useState

```jsx
import { useState } from "react";
```

Used to create state.

Purpose:

* Store dynamic values
* Update UI when state changes

Example:

```jsx
const [message, setMessage] = useState("");
```

Initial value:

```js
message = ""
```

---

## 2. UserProfileCard Component

```jsx
function UserProfileCard({ user, theme, actions })
```

This is a reusable child component.

It accepts 3 props:

| Prop    | Type   |
| ------- | ------ |
| user    | object |
| theme   | object |
| actions | object |

Example:

```jsx
<UserProfileCard
  user={...}
  theme={...}
  actions={...}
/>
```

---

## 3. Main Card Wrapper

```jsx
<div className={`p-6 rounded-xl shadow-lg ${theme.backgroundColor} ${theme.textColor}`}>
```

Creates the card.

Static classes:

```text
p-6
rounded-xl
shadow-lg
```

Dynamic classes:

```jsx
theme.backgroundColor
theme.textColor
```

These make card colors customizable.

---

## 4. Avatar Section

```jsx
{user.avatar}
```

Reads avatar from user object.

Example:

```js
avatar: "👩‍💼"
```

Renders:

```text
👩‍💼
```

---

## 5. User Information

Displays:

```jsx
{user.name}
{user.email}
```

Example:

```text
Alice Johnson
alice@example.com
```

---

## 6. Role and Status Badges

```jsx
{user.role}
{user.status}
```

Example:

```text
Admin
Active
```

Uses:

```jsx
theme.badgeBg
```

for badge styling.

---

## 7. Conditional Rendering (Stats)

```jsx
{user.stats && (
```

Meaning:

Render stats only if stats exist.

Equivalent:

```js
if(user.stats){
   show stats
}
```

---

## 8. Object.entries()

Used to loop through object properties.

Example:

```js
stats = {
 posts: 145,
 followers: 2834,
 following: 421
}
```

Converts into:

```js
[
 ["posts",145],
 ["followers",2834],
 ["following",421]
]
```

Then:

```jsx
.map(([key, value]) => (
```

renders each item.

Output:

```text
145 posts
2834 followers
421 following
```

---

## 9. Actions Section

Conditional rendering:

```jsx
{actions && (
```

Shows buttons only if actions exist.

Contains:

* Primary button
* Secondary button

---

## 10. Function as Props

Very important.

Example:

```js
onClick: () => setMessage("Viewing Alice's profile")
```

This function is passed as a prop.

Used inside child:

```jsx
onClick={actions.primary.onClick}
```

Flow:

```text
Parent → passes function
Child → executes function
Parent state updates
UI rerenders
```

This is how child can trigger parent logic.

---

## 11. Parent Component (ComplexProps)

Main component:

```jsx
export default function ComplexProps()
```

Responsibilities:

* Store state
* Store users data
* Render cards

---

## 12. State Management

```jsx
const [message, setMessage] = useState("");
```

Purpose:

Store action messages.

Before click:

```text
""
```

After click:

```text
Viewing Alice's profile
```

---

## 13. users Array

Main data source.

Structure:

```js
[
 {
   user:{},
   theme:{},
   actions:{}
 }
]
```

Each user contains:

---

## user object

```js
{
 name,
 email,
 avatar,
 role,
 status,
 stats
}
```

Stores profile data.

---

## theme object

```js
{
 backgroundColor,
 textColor,
 avatarBg,
 badgeBg
}
```

Stores UI styling.

This allows custom themes per user.

---

## actions object

```js
{
 primary:{},
 secondary:{}
}
```

Each action contains:

```js
{
 label,
 onClick,
 className
}
```

This controls button behavior and styles.

---

## 14. Message Alert

Conditional:

```jsx
{message && (
```

Only shows when message has value.

Example:

```text
Viewing Alice's profile
```

---

## 15. Rendering Cards

Using map:

```jsx
{users.map((userData, index) => (
```

Loops through all users.

Example:

```text
1st → Alice
2nd → Bob
```

Creates one card for each.

---

## 16. Spread Operator

Very important.

```jsx
<UserProfileCard key={index} {...userData} />
```

Equivalent to:

```jsx
<UserProfileCard
  user={userData.user}
  theme={userData.theme}
  actions={userData.actions}
/>
```

Shortcut for passing multiple props.

---

## Data Flow

```text
ComplexProps (Parent)
        │
        │ sends props
        ▼
UserProfileCard (Child)
        │
        │ button click
        ▼
setMessage()
        │
        ▼
Parent rerenders
```

---

## Parent → Child Communication

Passing data:

```jsx
<UserProfileCard {...userData} />
```

Child receives:

```jsx
function UserProfileCard({ user, theme, actions })
```

---

## Child → Parent Communication

Passing function:

```js
onClick: () => setMessage(...)
```

Child calls:

```jsx
onClick={actions.primary.onClick}
```

Parent updates.

---

## Important React Patterns Used

## Prop Destructuring

```jsx
function UserProfileCard({ user, theme, actions })
```

Cleaner than:

```jsx
props.user
props.theme
props.actions
```

---

## Conditional Rendering

```jsx
{condition && (...) }
```

Used for:

* stats
* actions
* messages

---

## Dynamic Styling

```jsx
${theme.backgroundColor}
```

Allows different styles dynamically.

---

## Reusable Components

Same component:

```jsx
<UserProfileCard />
```

used for multiple users.

Only data changes.

---

## Real World Usage

This pattern is used in:

* Dashboard cards
* User profile systems
* SaaS admin panels
* CRM apps
* Team management apps
* Analytics panels

---

## Key Takeaways

✔ Complex props can hold nested objects
✔ Components become reusable with props
✔ Functions can be passed as props
✔ Child components can trigger parent logic
✔ Spread operator makes props cleaner
✔ Conditional rendering makes UI flexible
✔ Object.entries helps render object data dynamically

---

## Golden Rule

Simple props:

```jsx
<User name="Kapil" />
```

Complex props:

```jsx
<User user={userObject} />
```

Nested props:

```jsx
user.name
user.email
user.role
```

Function props:

```jsx
onClick={handleClick}
```

Master these and you can build real-world React apps confidently.
