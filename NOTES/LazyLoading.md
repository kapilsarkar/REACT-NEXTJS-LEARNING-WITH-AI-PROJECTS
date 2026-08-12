# 📖 CODE SPLITTING & LAZY LOADING

## 📖 TABLE OF CONTENTS — CODE SPLITTING & LAZY LOADING

| Page       | Topic                         |
| ---------- | ----------------------------- |
| **Page 1** | Core Concepts                 |
| **Page 2** | Static vs Dynamic Import      |
| **Page 3** | `React.lazy()`                |
| **Page 4** | `Suspense`                    |
| **Page 5** | Route-Level Lazy Loading      |
| **Page 6** | Code Splitting + Lazy Loading |
| **Page 7** | Important Rules               |
| **Page 8** | Interview Questions           |
| **Page 9** | ⭐ Final 2-Minute Revision     |

## ⭐ Quick Revision Map

```js
Core Concepts
      ↓
Static vs Dynamic Import
      ↓
React.lazy()
      ↓
Suspense
      ↓
Route-Level Lazy Loading
      ↓
Code Splitting + Lazy Loading
      ↓
Important Rules
      ↓
Interview Questions
      ↓
⭐ 2-Minute Revision
```


## 📄 PAGE 1 – CORE CONCEPTS

## 1. What is Code Splitting?

- Code Splitting is the process of dividing a large JavaScript bundle into smaller chunks that can be loaded when needed.

- Without Code Splitting

```js
Application
     ↓
Load All JavaScript
     ↓
Large Initial Bundle
     ↓
Application Starts
```

- With Code Splitting

```js
Application
     ↓
Load Required Code
     ↓
Small Initial Bundle
     ↓
Other Chunks Load When Needed
```

## Memory Trick

```js
Code Splitting
      ↓
Break Large Bundle
      ↓
Smaller Chunks
```

## 2. What is Lazy Loading?

- Lazy Loading means loading a component or module only when it is needed instead of loading it upfront.

```js
Lazy Loading
      ↓
Load Later
      ↓
Only When Needed
```

## Example:

```js
const LazyLoading = React.lazy(
  () => import("./pages/LazyLoading.jsx")
);
```

## 3. Why do we need Lazy Loading?

✅ Reduces initial JavaScript

✅ Improves initial loading performance

✅ Loads large/less frequently used features when required

✅ Works especially well with route-based applications

## 📄 PAGE 2 – STATIC vs DYNAMIC IMPORT

## Static Import

```js
import Profile from "./pages/Profile.jsx";
```

- The module is included in the normal dependency graph and is available as part of the initial application loading strategy.

## Dynamic Import

```js
import("./pages/Profile.jsx");
```

- The module can be loaded asynchronously as a separate chunk.

## Memory Trick

```js
Static Import
     ↓
import Component
     ↓
Normal Loading


Dynamic Import
     ↓
import()
     ↓
Load Asynchronously
```

## 📄 PAGE 3 – React.lazy()

## What is React.lazy()?

- React.lazy() lets you render a dynamically imported component as a React component.

## Syntax

```js
const Component = React.lazy(
  () => import("./Component.jsx")
);
```

- Profile Project Example

```js
const LazyLoading = React.lazy(
  () => import("./pages/LazyLoading.jsx")
);
```

## Flow

```js
React.lazy()
      ↓
Dynamic import()
      ↓
Component code loaded
      ↓
Component rendered
```

## 📄 PAGE 4 – Suspense

## What is Suspense?

- Suspense provides a fallback UI while a lazy component is waiting to load.

## Syntax

```js
<Suspense fallback={<p>Loading...</p>}>
  <LazyLoading />
</Suspense>
```

## Flow

```js
Lazy Component
      ↓
Still Loading?
      ↓
YES
 ↓
Fallback UI
 ↓
"Loading..."
      ↓
Component Loaded
      ↓
Actual Component
```

## Memory Trick

```js
React.lazy()
     ↓
Load Component Later

Suspense
     ↓
Show Fallback While Loading
```

## 📄 PAGE 5 – ROUTE-LEVEL LAZY LOADING

- Profile System example:

## 1. Lazy import

```js
const LazyLoading = React.lazy(
  () => import("./pages/LazyLoading.jsx")
);
```

## 2. Route

```js
{
  path: "lazy-loading",
  element: <LazyLoading />,
}
```

## 3. Suspense

```js
<Suspense
  fallback={
    <div>Loading...</div>
  }
>
  <RouterProvider router={appRouter} />
</Suspense>
```

## Complete Flow

```js
/lazy-loading
      ↓
React Router
      ↓
<LazyLoading />
      ↓
React.lazy()
      ↓
Dynamic import()
      ↓
LazyLoading.jsx
      ↓
Component Loaded
```

## 📄 PAGE 6 – CODE SPLITTING + LAZY LOADING

```js
                Application
                     ↓
              Code Splitting
                     ↓
          ┌──────────┴──────────┐
          ↓                     ↓
     Initial Chunk         Lazy Chunk
          ↓                     ↓
      Login/Home          Dashboard/Profile
                                ↓
                         Load When Needed
```

## Important Difference

| Concept            | Meaning                             |
| ------------------ | ----------------------------------- |
| **Code Splitting** | Divides code into smaller chunks    |
| **Lazy Loading**   | Loads a chunk/component when needed |
| `import()`         | Creates a dynamic import            |
| `React.lazy()`     | Creates a lazy React component      |
| `Suspense`         | Provides fallback UI while loading  |


## 📄 PAGE 7 – IMPORTANT RULES

## Rule 1

- Lazy component:

```js
const Page = React.lazy(
  () => import("./Page.jsx")
);
```

## Rule 2

- Lazy components should be rendered inside a Suspense boundary.

```js
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>
```

## Rule 3

- Don't use lazy loading everywhere.

- Good candidates:

```js
Dashboard
Admin Panel
Reports
Settings
Large Feature Pages
Rarely Used Features
```

## Rule 4

- Lazy Loading does not mean:

```js
"The component renders slowly."
```

- It means:

```js
The component's code can be loaded later when needed.
```

## 📄 PAGE 8 – INTERVIEW QUESTIONS

## Q1. What is Code Splitting?

- Dividing a large JavaScript bundle into smaller chunks that can be loaded separately.

## Q2. What is Lazy Loading?

- Loading code or a component only when it is needed.

## Q3. What is React.lazy()?

- A React API for rendering a dynamically imported component.

## Q4. Why do we need Suspense?

- To provide fallback UI while a lazy component is loading.

## Q5. Difference between React.lazy() and Suspense?

```js
React.lazy()
     ↓
Loads lazy component

Suspense
     ↓
Handles fallback UI
```

## Q6. What is dynamic import?

```js
import("./Component.jsx")
```

- It loads a module asynchronously and can enable code splitting.

## Q7. What is the benefit of Code Splitting?

- It can reduce the amount of JavaScript required for the initial load.

## Q8. Does Lazy Loading improve every application?

- Not necessarily. It is most useful when splitting meaningful or larger parts of an application reduces unnecessary initial code.

## ⭐ PAGE 9 – FINAL 2-MINUTE REVISION

```js
CODE SPLITTING
      ↓
Break Large Bundle
      ↓
Smaller Chunks


LAZY LOADING
      ↓
Load Code Later
      ↓
When Needed


Dynamic Import
      ↓
import("./Page.jsx")


React.lazy()
      ↓
Lazy React Component


Suspense
      ↓
Fallback UI
```

## Profile System Example

```js
const LazyLoading = React.lazy(
  () => import("./pages/LazyLoading.jsx")
);
```

```js
<Suspense fallback={<div>Loading...</div>}>
  <RouterProvider router={appRouter} />
</Suspense>
```

```js
{
  path: "lazy-loading",
  element: <LazyLoading />,
}
```

## ⭐ Final Memory Trick

```js
import()
   ↓
LOAD LATER

React.lazy()
   ↓
LAZY COMPONENT

Suspense
   ↓
LOADING UI

Code Splitting
   ↓
SMALLER CHUNKS
```

- Code Splitting = divide the code.

- Lazy Loading = load it when needed.

- React.lazy() = lazy component.

- Suspense = fallback while loading.