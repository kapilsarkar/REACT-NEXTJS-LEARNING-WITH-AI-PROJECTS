# 📖 REACT HOOK FORM + ZOD NOTEBOOK

## 📄 PAGE 1 – CORE CONCEPTS

## What is React Hook Form?

- React Hook Form is a library for building forms in React.

- It provides easy form handling with better performance and less re-rendering.

## Without React Hook Form

```js
Input

↓

useState()

↓

onChange()

↓

Validation

↓

Errors

↓

Submit
```

Lots of code.

## With React Hook Form

```js
Input

↓

register()

↓

Validation

↓

handleSubmit()

↓

Submit
```

Much cleaner.

## Why use React Hook Form?

✅ Less Boilerplate

✅ Better Performance

✅ Easy Validation

✅ Minimal Re-rendering

✅ Easy Error Handling

✅ Works Great with Zod

## Installation

```js
npm install react-hook-form
```

## Basic Setup

```js
import { useForm } from "react-hook-form";

const {

register,

handleSubmit,

formState:{errors}

}=useForm();
```

## Flow

```js
Input

↓

register()

↓

Validation

↓

handleSubmit()

↓

Submit Function
```

### Memory Trick

```js
register()

↓

Connect Input
```

## 📄 PAGE 2 – API CHEAT SHEET

## useForm()

## Purpose : Creates Form

```js
const {

register,

handleSubmit,

reset,

watch,

control,

formState:{errors}

}=useForm();
```

## register()

## Purpose : Connect Input

```js
<input

{...register("name")}

/>
```

## Remember

```js
register()

↓

Register Input
```

## handleSubmit()

## Purpose : Handles Form Submission

```js
<form

onSubmit={handleSubmit(onSubmit)}

>
```

## Remember

```js
handleSubmit()

↓

Validate

↓

Submit
```

## errors

## Purpose : Shows Validation Errors

```js
errors.name?.message
```

## reset()

## Purpose : Clears Form

```js
reset();
```

## watch()

## Purpose : Watch Form Values

```js
watch("name")
```

## useWatch()

## Purpose : Efficiently watch specific fields

```js
const value = useWatch({

control,

name:"experience"

});
```

Use when continuous updates are needed.

## 📄 PAGE 3 – ZOD VALIDATION

## What is Zod?

- Zod is a TypeScript-first validation library.

- It validates form data.

## Installation

```js
npm install zod
```

## React Hook Form + Zod

```js
npm install @hookform/resolvers
```

## Setup

```js
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
```

## Schema

```js
const schema = z.object({

name:z.string(),

email:z.string().email(),

age:z.number()

});
```

## Connect Schema

```js
useForm({

resolver:zodResolver(schema)

})
```

## Flow

```js
Input

↓

register()

↓

Zod Schema

↓

Errors

↓

Submit
```

## 📄 PAGE 4 – MOST COMMON ZOD METHODS

## String

```js
z.string()
```

## Required

```js
.min(1,"Required")
```

## Minimum Length

```js
.min(3)
```

## Maximum Length

```js
.max(20)
```

## Email

```js
.email()
```

## Number

```js
z.number()
```

## Convert String to Number

```js
z.coerce.number()
```

## Boolean

```js
z.boolean()
```

## Array

```js
z.array(z.string())
```

## Optional

```js
.optional()
```

## Regex

```js
.regex(/[A-Z]/)

.regex(/[a-z]/)

.regex(/[0-9]/)
```

## File Validation

```js
.any()

.refine(...)
```

## Custom Validation

```js
.refine(...)
```

## Password Match

```js
.refine(

(data)=>{

return data.password===data.confirmPassword

},

{

path:["confirmPassword"]

}

)
```

## 📄 PAGE 5 – COMPLETE FLOW

```js
User

↓

Input

↓

register()

↓

React Hook Form

↓

Zod Schema

↓

Validation

↓

errors

↓

handleSubmit()

↓

Submit Function

↓

API / Zustand / Backend

```

## 📄 PAGE 6 – INTERVIEW QUESTIONS

Q. What is React Hook Form?

- A lightweight library for handling forms in React.

Q. Why React Hook Form?

- Better Performance

- Less Re-rendering

- Less Boilerplate

- Easy Validation

Q. What is register()?

- Connects an input field with React Hook Form.

Q. What is handleSubmit()?

- Validates the form and calls the submit function.

Q. What is reset()?

- Clears the form.

Q. What is errors?

- Stores validation errors.

Q. What is watch()?

- Observes form field values.

Q. Difference between watch() and useWatch()

| watch()            | useWatch()             |
| ------------------ | ---------------------- |
| Watches whole form | Watches selected field |
| More re-renders    | Better performance     |

Q. What is Zod?

- A schema validation library.

Q. Why Zod?

- Easy Validation

- Better Error Messages

- Strong Type Safety

Q. What is zodResolver()?

- Connects React Hook Form with Zod.

Q. Difference between HTML Validation and Zod

| HTML               | Zod                   |
| ------------------ | --------------------- |
| Browser Validation | JavaScript Validation |
| Limited            | Powerful              |
| Less Flexible      | Highly Customizable   |

Q. Difference between Yup and Zod

| Yup              | Zod                          |
| ---------------- | ---------------------------- |
| Older            | Newer                        |
| More Boilerplate | Cleaner Syntax               |
| Good             | Excellent TypeScript Support |

## 📄 PAGE 7 – Common Zod Methods

| Method          | Purpose                 |
| --------------- | ----------------------- |
| string()        | String                  |
| number()        | Number                  |
| coerce.number() | Convert String → Number |
| boolean()       | Boolean                 |
| email()         | Validate Email          |
| min()           | Minimum                 |
| max()           | Maximum                 |
| regex()         | Pattern                 |
| array()         | Array                   |
| optional()      | Optional                |
| refine()        | Custom Validation       |

## ⭐ FINAL ONE-PAGE REVISION (2 Minutes)

```js
useForm()

↓

Create Form

register()

↓

Connect Input

handleSubmit()

↓

Validate + Submit

errors

↓

Show Errors

reset()

↓

Clear Form

watch()

↓

Watch Values

useWatch()

↓

Watch Specific Field

Zod

↓

Validation

zodResolver()

↓

Connect RHF + Zod

Schema

↓

Rules

refine()

↓

Custom Validation

React Hook Form

↓

Fast

↓

Less Boilerplate

↓

Less Re-render

↓

Easy Validation
```
