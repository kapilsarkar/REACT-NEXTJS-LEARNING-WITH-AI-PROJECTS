# 📖 REACT ROUTER V6 & V7: COMPLETE REVISION MANUAL

## 🔹 PART 1: THE TWO ARCHITECTURES

### 1. Old Syntax: Component-Based Routing (JSX)

- Used `<BrowserRouter>`, `<Routes>`, and `<Route>` wrapped inside JSX. Data fetching was handled imperatively inside components using useEffect.

```js
// Old Way: App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Nested Routes */}
        <Route path="/about" element={<About />}>
          <Route index element={<AboutOne />} />
          <Route path="aboutOne" element={<AboutOne />} />
          <Route path="aboutTwo" element={<AboutTwo />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/:id" element={<DetailedContact />} />

        {/* Redirect */}
        <Route
          path="/login"
          element={<Navigate to="/registration" replace />}
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 2. Modern Syntax: Data Router

`(createBrowserRouter + RouterProvider)`
Introduced in v6.4+ / v7. Routes are defined as JavaScript objects. It enables Data Loaders, Actions, and centralized Error Boundaries.

```js
// Modern Way: App.jsx
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Root Layout Component
    errorElement: <ErrorPage />, // Global Error Boundary (404s + Runtime errors)
    children: [
      {
        index: true, // Default view for "/"
        element: <Home />,
        loader: async () => {
          // Pre-loads data BEFORE component renders
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          if (!res.ok) throw new Error("Failed to load users");
          return res.json();
        },
      },
      {
        path: "about", // Note: Relative path (NO leading slash "/")
        element: <About />,
        children: [
          { index: true, element: <AboutOne /> },
          { path: "aboutOne", element: <AboutOne /> },
          { path: "aboutTwo", element: <AboutTwo /> },
        ],
      },
      { path: "contact", element: <Contact /> },
      { path: "contact/:id", element: <DetailedContact /> },
      { path: "registration", element: <Registration /> },
      { path: "login", element: <Navigate to="/registration" replace /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}
```

## 🔹 PART 2: CORE CONCEPT BREAKDOWN

### Concept 1: Root Layout & Base `<Outlet/>`

- The root layout component holds global UI elements (like `<NavBar/>` and `<Footer/>`) that remain visible on every page.

```js
// Layout.jsx
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar />
      <main className="p-6">
        {/* Dynamic child route content renders here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

### Concept 2: `Links`, `NavLinks` & The `end` Prop

- `<Link to="/path">`: Performs client-side navigation without triggering a full page reload.

- `<NavLink to="/path">`: Extends <Link> by exposing an isActive boolean parameter for active link styling.

### Understanding the end Prop

- By default, `<NavLink>` uses prefix matching (isActive = true if the current URL starts with the link's to path).

```js
// About.jsx (Nested Navigation)
import { Outlet, NavLink } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>About Section</h1>
      <nav className="flex gap-4">
        {/* 
          CRITICAL: 'to=""' points to the parent route /about.
          WITHOUT 'end', visiting /about/aboutTwo keeps this link active because
          /about/aboutTwo starts with /about.
          WITH 'end', it enforces EXACT matching on /about.
        */}
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-slate-300"
          }
        >
          About One
        </NavLink>

        <NavLink
          to="aboutTwo"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-slate-300"
          }
        >
          About Two
        </NavLink>
      </nav>

      {/* Renders AboutOne or AboutTwo */}
      <Outlet />
    </div>
  );
};
```

### Concept 3: Dynamic Routing & useParams

- Dynamic segments allow route parameters to capture dynamic values from the URL.

```js
// Route Definition: { path: "contact/:id", element: <DetailedContact /> }

// DetailedContact.jsx
import { useParams, useNavigate } from "react-router-dom";

const DetailedContact = () => {
  // Extract parameter from URL
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Contact Detail Page</h2>
      <p>
        Parameter ID: <strong>{id}</strong>
      </p>

      {/* Programmatic Navigation */}
      <button onClick={() => navigate("/contact")}>Back to Contacts</button>
    </div>
  );
};
```

### Concept 4: Programmatic Navigation (useNavigate)

- Used to navigate imperatively inside event handlers, functions, or conditionally upon state changes.

```js
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = true;

  const handleNavigate = () => {
    if (isLoggedIn) {
      navigate("/about"); // Basic navigation
    } else {
      navigate("/login", { replace: true }); // Overwrites history stack
    }
  };

  return <button onClick={handleNavigate}>Go to About</button>;
};
```

### Concept 5: Redirects `(<Navigate/>)`

- A declarative component that automatically redirects the browser when rendered.

```js
import { Navigate } from "react-router-dom";

// Inside route definitions:
{
  path: "login",
  element: <Navigate to="/registration" replace />
}
```

### Concept 6: Data Fetching Before Render `(loader + useLoaderData)`

- Data Routers allow data fetching to occur before the component mounts, eliminating `useEffect` loading spinners inside page components.

```js
// 1. Home.jsx
import { useLoaderData } from "react-router-dom";

const Home = () => {
  // Access data pre-loaded by route loader
  const users = useLoaderData();

  return (
    <div>
      <h1>User Directory</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
```

### Concept 7: Route Error Handling `(errorElement + useRouteError)`

- Catches missing routes (404s) as well as any runtime or fetch errors thrown by loaders.

```js
// ErrorPage.jsx
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl text-red-500">{error?.status || "404"}</h1>
      <h2>Oops! Something went wrong.</h2>
      <p>{error?.statusText || error?.message || "Page not found"}</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default ErrorPage;
```

## 🔹 PART 3: REVISION CHEAT SHEET

| Concept                      | Key Tool / Hook                             | Core Purpose                                                   |
| :--------------------------- | :------------------------------------------ | :------------------------------------------------------------- |
| **Data Router Setup**        | `createBrowserRouter` + `<RouterProvider/>` | Modern object-based route architecture.                        |
| **Outlet Placeholder**       | `<Outlet/>`                                 | Renders nested child elements inside a parent layout.          |
| **Exact Link Match**         | `<NavLink end>`                             | Prevents parent/index links from staying active on sub-routes. |
| **URL Parameters**           | `useParams()`                               | Extracts dynamic values from path segments (`:id`).            |
| **Imperative Route Switch**  | `useNavigate()`                             | Triggers route navigation programmatically inside functions.   |
| **Declarative Forwarding**   | `<Navigate replace to="..."/>`              | Automatically redirects user to a different route.             |
| **Pre-render Data Fetching** | `loader` + `useLoaderData()`                | Fetches data prior to page render (no `useEffect` needed).     |
| **Error Handling**           | `errorElement` + `useRouteError()`          | Handles 404s and network/runtime exceptions gracefully.        |

## 🔹 PART 4: GOLDEN RULES FOR WRITING CODE

- Child Paths NEVER start with /:
  - ❌ `{ path: "/aboutOne", element: <AboutOne/> }` (Breaks nesting, points to root)

  - ✅ `{ path: "aboutOne", element: <AboutOne/> }` (Correctly nests under parent)

- Always place `<Outlet/>` inside parent wrappers:
  - Parent routes `(Layout, About)` MUST render `<Outlet/>`, otherwise child routes will not display on screen.

- Use end on Index `<NavLink>`:
  - Prevents root links (to="" or to="/") from staying highlighted when users visit nested sub-paths.

## ❓ React Router Interview & Revision FAQ

### 1. Difference between Link and NavLink?

| Feature          | `<Link>`                                        | `<NavLink>`                                                                                      |
| :--------------- | :---------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **Primary Role** | Standard client-side navigation.                | Navigation with built-in active state awareness.                                                 |
| **Styling**      | Accepts standard static `className` or `style`. | Accepts a render function for dynamic `className` or `style` based on `isActive` or `isPending`. |
| **Use Case**     | General links (footers, inline text, cards).    | Navigation bars, tabs, and menus where active tabs require visual highlighting.                  |

```js
// Link (Static)
<Link to="/about">About</Link>

// NavLink (Dynamic Active Style)
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-400"}
>
  About
</NavLink>
```

### 2. Difference between `useNavigate()` and `<Navigate/>`?

- `useNavigate()` (Imperative Hook): Returns a function `(navigate)` that lets you trigger navigation programmatically inside event handlers, async functions, or callbacks.

- `<Navigate/>` (Declarative Component): A React component that triggers navigation when rendered during the component lifecycle. Ideal for conditional rendering like protected routes or automatic redirects.

```js
// 1. Imperative (useNavigate) inside an event handler
const navigate = useNavigate();
const handleLogin = () => {
  // perform auth logic
  navigate("/dashboard");
};

// 2. Declarative (<Navigate />) inside component JSX
if (!isAuthenticated) {
  return <Navigate to="/login" replace />;
}
```

### 3. What is Dynamic Routing?

- Dynamic Routing allows you to define routes with variable segments `(placeholders starting with a colon, like :id or :slug)` rather than hardcoded URLs. A single dynamic route configuration can match thousands of unique URLs and load content based on the parameter passed in the path.

```js
// Definition
{ path: "products/:category/:id", element: <ProductDetail /> }

// Matches: /products/electronics/101, /products/books/402, etc.
```

### 4. What is Nested Routing?

- Nested Routing is the practice of defining routes inside other routes. It allows sub-sections of a page to change based on the URL while keeping parent layouts (like sidebars, navigation bars, or tab structures) mounted without re-rendering the whole page.

```js
{
  path: "dashboard",
  element: <DashboardLayout />, // Parent layout remains mounted
  children: [
    { index: true, element: <Overview /> },  // /dashboard
    { path: "settings", element: <Settings /> }, // /dashboard/settings
  ],
}
```

### 5. Why is `<Outlet/>` required?

- `<Outlet/>` is a layout placeholder component provided by React Router. It tells the parent route where to render its child route components. Without `<Outlet/>` inside a parent component, child routes will match in the URL but will not display on the screen.

```js
// Layout.jsx
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <Navbar />
    {/* Child routes (Home, About, Contact) render inside this slot */}
    <Outlet />
    <Footer />
  </div>
);
```

### 6. What are URL parameters?

- URL parameters (or Route Parameters) are dynamic segments prefixed with a colon (:) in a route path. They allow data to be passed cleanly through the URL path structure instead of using query parameters or hidden state.

- Example Path: /users/:id

- Example URL: /users/42

- Captured Parameter: { id: "42" }

### 7. What is useParams()?

- `useParams()` is a custom React Router hook that returns an object containing key/value pairs of dynamic route parameters extracted from the current URL.

```js
// Route: path="contact/:id"
// URL: /contact/alpha

import { useParams } from "react-router-dom";

const DetailedContact = () => {
  const { id } = useParams(); // id = "alpha"
  return <h2>Contact ID: {id}</h2>;
};
```

### 8. What is useParams() vs Loader ?

### When should I use useParams()?

- `useParams()` is used to extract dynamic values directly inside a component.

```js
Example:

Route

{
path:"user/:id",
element:<UserDetails/>
}

Component

const { id } = useParams();

console.log(id);

Output

/user/5

↓

id = "5"
```

### What if I am using a Loader?

- When using a Loader, React Router provides the route parameters to the loader function.

```js
{
  path:"user/:id",

  element:<UserDetails/>,

  loader: async ({ params }) => {

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${params.id}`
      );

      return res.json();

  }

}
```

- Inside the component

```js
const user = useLoaderData();
```

- No fetch is needed.

- Flow

```js
URL

↓

user/:id

↓

Loader receives params.id

↓

Fetch Data

↓

Return Data

↓

useLoaderData()

↓

Component Renders
```

### Important Note

- If the Loader already uses params.id to fetch the data, calling useParams() inside the component is usually optional.

- You may still use it if you need access to the URL parameter for display or other logic.

### 9. What is a Loader?

- A Loader is an asynchronous function attached directly to a route object in Data Routers `(createBrowserRouter)`. It executes before the route component mounts, pre-fetching the necessary data for that route so the component receives its data immediately upon rendering.

```js
{
  path: "users",
  element: <UserList />,
  loader: async () => {
    const res = await fetch("/api/users");
    return res.json();
  },
}
```

### 10. Difference between useEffect() fetching and React Router Loader?

| Metric             | `useEffect()` Fetching                                                      | React Router `loader`                                                  |
| :----------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Fetch Timing**   | Fetches after the component mounts (creates UI waterfalls).                 | Fetches before or in parallel as the route is matched.                 |
| **Initial State**  | Requires loading state handling and initial `null`/`undefined` data checks. | Component renders directly with pre-loaded data via `useLoaderData()`. |
| **Code Splitting** | Data fetching starts after JavaScript code for the component loads.         | Data fetch and component bundle download happen in parallel.           |
| **Error Handling** | Requires manual `try/catch` block and state management per component.       | Unhandled errors automatically trigger the route's `errorElement`.     |

### 11. When would you use replace: true in navigate()?

- `replace: true` replaces the current entry in the browser history stack instead of pushing a new entry. You should use it when:

1. Redirects after Authentication `/ Login:` When sending a user from `/login to /dashboard`, using `replace: true` prevents them from hitting the browser's "Back" button and landing back on the login form.

1. Form Submissions / Wizards: After completing a multi-step form, replacing the history entry prevents users from accidentally re-submitting data via browser back navigation.

1. Canonical Automatic Forwarding: Forwarding paths like `/login` to `/registration` directly so the user doesn't get stuck in a redirect loop when pressing "Back".
