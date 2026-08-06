# 📖 ZUSTAND NOTEBOOK

## 📄 PAGE 1 – CORE CONCEPTS

`1. What is Zustand?`

- Zustand is a lightweight, fast, and scalable state management library for React.

- It helps us manage Global State without Prop Drilling.

`2.Why do we need Zustand?`

- Without Zustand

```js
App

↓

Parent

↓

Child

↓

GrandChild

↓

Button
```

- Passing data through multiple components is called :

### Prop Drilling

- Problems :

  - Difficult to maintain
  - Repeated Props
  - Hard to scale

- With Zustand

```js
          STORE

        ↗  ↑  ↖
      App Child Button
```

- Every component can directly access the store.

- No Prop Drilling.

## Advantages

✅ No Provider Required

✅ Very Small Bundle Size

✅ Easy Syntax

✅ Minimal Boilerplate

✅ Fast Performance

✅ Supports Middleware

✅ Works Great with React

## Installation

```js
npm install zustand
```

## Basic Store Structure

```js
import { create } from "zustand";

const useStore = create((set, get) => ({

    // State

    // Actions

}));
```

## Store Consists of

```js
Store

│

├── State

└── Actions

State

↓

Data

Examples

- count
- user
- cart
- theme

Actions

↓

Functions

Examples

- increment()
- login()
- logout()
- addToCart()
```

## Flow

```js
Component

↓

Calls Action

↓

set()

↓

Store Updates

↓

React Re-renders
```

## Memory Trick

```js
create()

↓

Creates Store

```

## 📄 PAGE 2 – API CHEAT SHEET

### create()

- Purpose

- Creates a Global Store.

Syntax

```js
const useStore = create((set, get) => ({

}));
```

- Remember

```js
create()

↓

Create Store
```

### set()

- Purpose

- Updates State

Example

```js
set({

count:10

});
```

- Functional Update

```js
set((state)=>({

count:state.count+1

}));
```

- Remember

```js
set()

↓

Write / Update
```

### get()

- Purpose

- Reads Current State

- Example

```js
const count = get().count;
```

- Remember

```js
get()

↓

Read
```

### useStore()

- Purpose

- Subscribe Component to Store

- Example

```js
const count = useStore((state)=>state.count);

const increment = useStore((state)=>state.increment);
```

- Remember

```js
useStore()

↓

Use State
```

### State Example

```js
count:0,

theme:"light",

user:null
```

### Action Example

```js
increment:()=>{

set((state)=>({

count:state.count+1

}));

}
```

### Difference

| Method     | Purpose                    |
| ---------- | -------------------------- |
| create()   | Create Store               |
| set()      | Update Store               |
| get()      | Read Store                 |
| useStore() | Use Store inside Component |

## 📄 PAGE 3 – MIDDLEWARE

### `What is Middleware?`

- Middleware provides extra capabilities to a Zustand store.

```js
Store

↓

Middleware

↓

Extra Features
```

### 1. persist ⭐⭐⭐⭐⭐

- Purpose
- Stores State in Local Storage or Session Storage.

- Example

```js
persist(

(set,get)=>({

theme:"dark"

}),

{

name:"theme-storage"

}

)
```

- Use Cases

  - Theme

  - Login

  - Cart

  - User Data

- Memory Trick

```js
persist()

↓

Save State
```

### createJSONStorage()

- Used with persist.

```js
storage:createJSONStorage(()=>localStorage)
```

- Can also use

```js
sessionStorage
```

### 2. devtools ⭐⭐⭐⭐⭐

- Purpose

- Debug Store using Redux DevTools

- Debug Store using Redux DevTools

- Example

```js
devtools(

(set)=>({

count:0

})

)
```

### Benefits

✅ Action History

✅ State History

✅ Time Travel

✅ Debugging

- Memory Trick

```js
devtools()

↓

Debug Store
```

### 3. subscribeWithSelector ⭐⭐⭐⭐☆

- Purpose

- Listen only to specific state changes.

- Example

```js
store.subscribe(

(state)=>state.count,

(count)=>{

console.log(count);

}

);
```

- Use Cases

  - Analytics

  - Logging

  - Notifications

  - Performance Optimization

- Memory Trick

```js
subscribe()

↓

Listen State
```

### 4. immer ⭐⭐⭐⭐☆

- Purpose

- Write immutable updates in a mutable style.

- Without Immer

```js
set((state)=>({

count:state.count+1

}));
```

- With Immer

```js
state.count++;
```

- Immer converts mutable-looking code into immutable updates.

- Memory Trick

```js
immer()

↓

Easy Updates
```

### Middleware Combination

```js
create(

devtools(

persist(

(set,get)=>({

count:0

}),

{

name:"counter-storage"

}

)

)

)
```

## 📄 PAGE 4 – COMPLETE STORE EXAMPLE

```js
import { create } from "zustand";

import { persist } from "zustand/middleware";

const useCounterStore = create(

persist(

(set,get)=>({

count:0,

name:"Kapil",

increment:()=>{

set((state)=>({

count:state.count+1

}));

},

decrement:()=>{

set((state)=>({

count:state.count-1

}));

},

reset:()=>{

set({

count:0

});

},

changeName:(newName)=>{

set({

name:newName

});

}

}),

{

name:"counter-storage"

}

)

);

export default useCounterStore;
```

### Using Store

```js
import useCounterStore from "./store";

function App(){

const count=useCounterStore(

(state)=>state.count

);

const increment=useCounterStore(

(state)=>state.increment

);

return(

<>

<h1>{count}</h1>

<button onClick={increment}>

Increment

</button>

</>

);

}
```

## 📄 PAGE 5 – INTERVIEW QUESTIONS

Q. `What is Zustand?`

- A lightweight React State Management Library.

Q. `Why use Zustand?`

- To manage Global State without Prop Drilling.

Q. `Why is Zustand popular?`

- Easy to learn
- Small Bundle Size
- No Provider
- Less Boilerplate
- High Performance

Q. `Difference between Context API and Zustand?`

| Context API                      | Zustand                                               |
| -------------------------------- | ----------------------------------------------------- |
| Requires Provider                | No Provider                                           |
| Can cause unnecessary re-renders | Better state selection reduces unnecessary re-renders |
| Best for simple shared state     | Better for complex global state                       |

Q. `Difference between set() and get()?`

```js
set()

↓

Update State

get()

↓

Read State
```

Q. `What does persist middleware do?`

Stores Zustand State inside

- Local Storage

or

- Session Storage

Q. `What does devtools middleware do?`

- Connects Zustand Store to Redux DevTools for debugging.

Q. `What is subscribeWithSelector?`

- Listens only to selected state changes.

- Improves performance.

Q. `What is Immer?`

- A middleware that lets us write immutable updates in a mutable-looking way.

Q. `When should you choose Zustand over Redux Toolkit?`

- Choose Zustand when:

  - Your application needs simple to moderately complex global state.

  - You want less boilerplate and a smaller API.
  
  - You don't need Redux-specific features such as extensive middleware ecosystems or strict action/reducer patterns.

- For very large applications with complex workflows, Redux Toolkit can still be an excellent choice.

## ⭐ FINAL ONE-PAGE REVISION (Revise in 2 Minutes)

```js
create()
      ↓
Creates Store

set()
      ↓
Updates State

get()
      ↓
Reads State

useStore()
      ↓
Uses Store in Components

persist()
      ↓
Saves State

devtools()
      ↓
Debug Store

subscribeWithSelector()
      ↓
Listen Selected State

immer()
      ↓
Easy Immutable Updates

State
      ↓
Data

Actions
      ↓
Functions

Store
      ↓
Global State

Zustand
      ↓
No Provider
Less Boilerplate
Fast
Lightweight
Easy
```
