# 📖 CUSTOM HOOKS

📖 TABLE OF CONTENTS — CUSTOM HOOKS

| Page       | Topic                     |
| ---------- | ------------------------- |
| **Page 1** | Core Concepts             |
| **Page 2** | Basic Structure           |
| **Page 3** | `useFetch()` Example      |
| **Page 4** | `useFetch()` Flow         |
| **Page 5** | Component Usage           |
| **Page 6** | Important Rules           |
| **Page 7** | Interview Questions       |
| **Page 8** | ⭐ Final 2-Minute Revision |

## Quick Revision Map

```js
Core Concepts
      ↓
Basic Structure
      ↓
useFetch()
      ↓
useFetch() Flow
      ↓
Component Usage
      ↓
Important Rules
      ↓
Interview Questions
      ↓
⭐ 2-Minute Revision
```


## 📄 PAGE 1 – CORE CONCEPTS

## 1. What is a Custom Hook?

- A Custom Hook is a reusable JavaScript function that uses React Hooks to share stateful logic between components.

- Example

```js
const useFetch = (url) => {
  // React logic
};
```

## Memory Trick

```js
Custom Hook
     ↓
Reusable React Logic
     ↓
Multiple Components
```

## 2. Why do we need Custom Hooks?

- Without Custom Hook:

```js
Component A
 ↓
useState
useEffect
fetch
loading
error


Component B
 ↓
useState
useEffect
fetch
loading
error
```

## Repeated logic

## With Custom Hook:

```js
             useFetch()
             ↙       ↘
      Component A   Component B
```

- Benefits

✅ Reusable Logic
✅ Less Duplicate Code
✅ Cleaner Components
✅ Separation of Concerns
✅ Easier Maintenance

## 3. Custom Hook Naming Rule

- A Custom Hook should start with:

```js
use
```

- Examples:

```js
useFetch()
useAuth()
useLocalStorage()
useDebounce()
```

## Memory Trick

```js
use
 ↓
Custom Hook
```

## 📄 PAGE 2 – BASIC STRUCTURE

## Custom Hook

```js
const useFetch = (url) => {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // React Logic

  return {
    data,
    loading,
    error
  };
};
```

## Using Custom Hook

```js
const {
  data,
  loading,
  error
} = useFetch(url);
```

## Flow

```js
Component
    ↓
useFetch(url)
    ↓
React Logic
    ↓
data / loading / error
    ↓
Component
```

## 📄 PAGE 3 – useFetch() EXAMPLE

```js
export const useFetch = (url) => {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      try {

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const result = await res.json();

        setData(result);
        setError(null);

      } catch (err) {

        setError(
          err.message || "Failed to fetch data"
        );

        setData(null);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, [url]);

  return {
    data,
    loading,
    error
  };
};
```

## 📄 PAGE 4 – useFetch() FLOW

```js
useFetch(url)
      ↓
useState()
      ↓
data / loading / error
      ↓
useEffect()
      ↓
fetch(url)
      ↓
Check response
      ↓
JSON Data
      ↓
setData()
      ↓
return
      ↓
Component
```

## When URL changes

```js
url changes
    ↓
useEffect runs
    ↓
New API request
    ↓
New data
```

## Because:

```js
}, [url]);
```

## 📄 PAGE 5 – COMPONENT USAGE

```js
const Destination = () => {

  const {
    data,
    loading,
    error
  } = useFetch(
    "https://picsum.photos/v2/list?page=1&limit=10"
  );

  if (loading)
    return <p>Loading Data...</p>;

  if (error)
    return <p>Error - {error}</p>;

  return (
    <>
      {data?.map((item) => (
        <div key={item.id}>
          {item.author}
        </div>
      ))}
    </>
  );
};
```

## Important

- The component doesn't need to know how fetching works.

- It only receives:

```js
data
loading
error
```

## 📄 PAGE 6 – IMPORTANT RULES

## Rule 1

- Custom Hook name must start with:

```js
use
```

## Rule 2

- Custom Hooks can use other React Hooks.

```js
useState()
useEffect()
useRef()
```

## Rule 3

- Custom Hooks share logic, not UI.

```js
❌ Share Components

✅ Share Logic
```

## Rule 4

- Custom Hooks should be used when logic is reusable.

- Don't create a Custom Hook just to shorten a simple function.

## 📄 PAGE 7 – INTERVIEW QUESTIONS

## Q1. What is a Custom Hook?

- A reusable function that uses React Hooks to share stateful logic between components.

## Q2. Why use Custom Hooks?

- To reuse logic and avoid duplicate code.

## Q3. Why must Custom Hooks start with use?

- It follows React's Hook naming convention and allows React's Hook rules/linting to recognize them.

## Q4. Can Custom Hooks use other Hooks?

- Yes.

```js
useState()
useEffect()
useRef()
```

## Q5. Do Custom Hooks share state?

- They share logic, not one common state instance. Each component calling the hook gets its own hook state.

## Q6. What does useFetch() return?

- In your implementation:

```js
{
  data,
  loading,
  error
}
```

## Q7. What happens when the URL changes?

- The useEffect runs again because url is included in the dependency array.

## ⭐ PAGE 8 – FINAL 2-MINUTE REVISION

```js
CUSTOM HOOK
     ↓
Reusable React Logic
     ↓
Function starting with "use"
```

## Example

```js
const useFetch = (url) => {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch
  }, [url]);

  return {
    data,
    loading,
    error
  };
};
```

## Remember

```js
useFetch(url)
      ↓
useState
      ↓
useEffect
      ↓
API
      ↓
data / loading / error
      ↓
Component

```

## Final Memory Trick

```js
Custom Hook
     ↓
REUSE LOGIC

useFetch()
     ↓
FETCH LOGIC

useState()
     ↓
STORE DATA

useEffect()
     ↓
SIDE EFFECT

return
     ↓
EXPOSE LOGIC
```

## Custom Hooks = Reusable React Logic, not reusable UI.


