# 📖 useMemo + useCallback NOTEBOOK

## 📖 TABLE OF CONTENTS

## useMemo + useCallback

| Page        | Topic                                      |
| ----------- | ------------------------------------------ |
| **Page 1**  | Core Concepts                              |
| **Page 2**  | `useMemo()` API Cheat Sheet                |
| **Page 3**  | When to Use `useMemo()`                    |
| **Page 4**  | `useCallback()` API Cheat Sheet            |
| **Page 5**  | `useCallback()` + `React.memo()`           |
| **Page 6**  | `useMemo` vs `useCallback` vs `React.memo` |
| **Page 7**  | Practical Project / Practice Example       |
| **Page 8**  | Common Mistakes                            |
| **Page 9**  | Interview Questions                        |
| **Page 10** | ⭐ Final 2-Minute Revision                  |

## ⭐ Quick Memory Map

```js
useMemo
   ↓
VALUE

useCallback
   ↓
FUNCTION

React.memo
   ↓
COMPONENT
```


## 📄 PAGE 1 – CORE CONCEPTS

## 1. What is useMemo()?

- useMemo is a React Hook used to memoize a calculated value between renders.

```js
const result = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

## Memory Trick

```js
useMemo() -> Memoize VALUE
```

## 2. Why do we need useMemo()?

- Normally, when a component re-renders:

```js
Component Re-renders

↓

Calculation runs again

↓

New result
```

- With useMemo():

```js
Component Re-renders

↓

Dependencies unchanged?

       YES
        ↓
Use previous result

       NO
        ↓
Calculate again
```

## Important

- useMemo is mainly a performance optimization.

- It does NOT make every calculation faster.

## 3. What is useCallback()?

- useCallback is a React Hook used to memoize a function reference between renders.

```js
const handleClick = useCallback(() => {
  // logic
}, [dependency]);
```

## Memory Trick


```js
useCallback()

↓

Memoize FUNCTION
```

### 4. The Most Important Difference ⭐⭐⭐⭐⭐

```js
useMemo
   ↓
Memoizes a VALUE


useCallback
   ↓
Memoizes a FUNCTION
```

- Example:

```js
const value = useMemo(() => {
  return calculateSomething();
}, [data]);
```

- vs

```js
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

## 📄 PAGE 2 – useMemo API CHEAT SHEET

## Syntax

```js
const value = useMemo(() => {

  return calculation;

}, [dependencies]);
```

## Parts

```js
useMemo(
   ↓
Function that calculates value

   ↓
Dependency Array
)
```

## Example

```js
const isEven = useMemo(() => {

  return count % 2 === 0;

}, [count]);
```

- When count changes:

```js
count changes

↓

useMemo recalculates

↓

new isEven value
```

- If another state changes:

```js
count2 changes

↓

count unchanged

↓

reuse previous isEven value
```

## 3. Expensive Calculation Example

```js
const result = useMemo(() => {

  return expensiveCalculation(data);

}, [data]);
```

- The calculation runs again only when data changes.

## 4.  Dashboard Project Example

- You currently have:

```js
const filteredUsers = users.filter((user) =>
  user.name?.toLowerCase()
    .includes(searchTerm.toLowerCase())
);
```

- This can be memoized:


```js
const filteredUsers = useMemo(() => {

  return users.filter((user) =>
    user.name?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

}, [users, searchTerm]);
```

## Flow

```js
users
  +
searchTerm
  ↓
useMemo()
  ↓
filteredUsers
```

## Important

- For your current 10-user API response, useMemo isn't necessary.

- The example is useful for learning, but not because filtering 10 users is expensive.

## 📄 PAGE 3 – WHEN TO USE useMemo

## Use useMemo when:

## 1. Expensive calculations

```js
Large calculation
        ↓
useMemo
```

## 2. Large filtering/sorting operations

```js
Large Array
    ↓
filter()
sort()
reduce()
    ↓
useMemo
```

## 3. Maintaining stable calculated values

- When another optimized component depends on the value's reference.

## When NOT to use useMemo

- Don't automatically do:

```js
const result = useMemo(() => {
  return 10 + 20;
}, []);
```

- That's unnecessary.

## Remember:

- Don't optimize something that isn't a performance problem.

## 📄 PAGE 4 – useCallback API CHEAT SHEET

## Syntax

```js
const functionName = useCallback(() => {

  // function logic

}, [dependencies]);
```

## Example

```js
const increment = useCallback(() => {

  setCount((prev) => prev + 1);

}, []);
```

- Because the function doesn't depend on an external changing value, the dependency array can remain:

```js
[]
```

## 2. With Dependencies

```js
const handleClick = useCallback(() => {

  console.log(userId);

}, [userId]);
```

- Because the function uses userId, it belongs in the dependency array.

```js
userId changes

↓

useCallback creates updated function
```

## 📄 PAGE 5 – useCallback + React.memo ⭐⭐⭐⭐⭐

- This is the most important practical relationship.

- Suppose:

```js
const Button = React.memo(({ handleClick }) => {

  return <button onClick={handleClick}>
    Click
  </button>;

});
```

- Parent:

```js
const handleClick = useCallback(() => {

  console.log("Clicked");

}, []);
```

- Then:

```js
<Button handleClick={handleClick} />
```

- Flow

```js
Parent Re-renders

↓

useCallback

↓

Same function reference

↓

React.memo(Button)

↓

Props appear unchanged

↓

Button can skip unnecessary render
```

## Why is this necessary?

- Functions are recreated during normal renders.

- Without useCallback:

```js
const handleClick = () => {};
```

- Each render can create a new function reference.

- Conceptually:

```js
Render 1
handleClick → Function A

Render 2
handleClick → Function B

A !== B
```

- With useCallback:

```js
Render 1
handleClick → Function A

Render 2
handleClick → Function A
```

- as long as dependencies remain unchanged.

## 📄 PAGE 6 – useMemo vs useCallback vs React.memo

- This is your most important revision table.

| Tool          | Memoizes  | Main Purpose                    |
| ------------- | --------- | ------------------------------- |
| `useMemo`     | Value     | Avoid unnecessary calculations  |
| `useCallback` | Function  | Preserve function reference     |
| `React.memo`  | Component | Avoid unnecessary child renders |

- Memory Trick ⭐

```js
useMemo
   ↓
VALUE


useCallback
   ↓
FUNCTION


React.memo
   ↓
COMPONENT
```

## 📄 PAGE 7 – YOUR PRACTICE PROJECT

- You created:

```js
HookLearning2
      │
      ├── Button
      │
      ├── ShowCount
      │
      └── HookLearning2Title
```

## Parent

```js
const incrementByOne = useCallback(() => {
  setCount1((prev) => prev + 1);
}, []);

const incrementByFive = useCallback(() => {
  setCount2((prev) => prev + 5);
}, []);
```

## Memoized Button

```js
export default React.memo(Button);
```

## Memoized ShowCount

```js
export default React.memo(ShowCount);
```

## Memoized Calculation

```js
const isEvenOrOdd = useMemo(() => {

  return count1 % 2 === 0;

}, [count1]);
```

- Your project demonstrates:

```js
Parent
  ↓
useCallback()
  ↓
Stable Function
  ↓
React.memo()
  ↓
Child
```

- and:

```js
count1
  ↓
useMemo()
  ↓
isEvenOrOdd
```

## 📄 PAGE 8 – COMMON MISTAKES

## Mistake 1

- Thinking:

```js
useMemo = automatically make everything faster
```

- ❌ Wrong.

- It is a performance optimization, not something every calculation needs.

## Mistake 2

- Thinking:

```js
useCallback = prevent function execution
```

- ❌ Wrong.

- It stabilizes the function reference

- The function can still execute normally.

## Mistake 3

- Using useCallback without a reason

```js
const add = useCallback(() => {
  return a + b;
}, [a, b]);
```

- If nothing benefits from the stable reference, useCallback may add unnecessary complexity.

## Mistake 4

- Thinking useCallback alone prevents child rendering.

```js
useCallback
   ≠
prevent child render
```

- It becomes particularly useful when combined with things such as:

```js
React.memo()
```

## 📄 PAGE 9 – INTERVIEW QUESTIONS

## Q1. What is useMemo()?

- useMemo memoizes the result of a calculation between renders.

## Q2. What is useCallback()?

- useCallback memoizes a function reference between renders.

## Q3. Difference between useMemo and useCallback?

```js
useMemo
→ Memoizes VALUE

useCallback
→ Memoizes FUNCTION
```

## Q4. Is useMemo always necessary?

- No.

- It should be used when memoization provides a meaningful performance benefit.

## Q5. Is useCallback always necessary?

- No.

- It is useful particularly when stable function references matter, such as when passing callbacks to memoized child components.

## Q6. What is React.memo()?

- React.memo is a higher-order component that allows React to skip re-rendering a component when its props have not changed.

## Q7. How are useCallback and React.memo related?

- useCallback can provide a stable function reference so that a memoized child receiving that function as a prop can avoid an unnecessary render.

## Q8. Does useMemo prevent component re-rendering?

- No.

- It memoizes a value/calculation. The component itself can still re-render.

## Q9. Does useCallback prevent component re-rendering?

- No.

- It memoizes a function reference. It doesn't automatically prevent component renders.

## Q10. What happens when a dependency changes?

- React recalculates the memoized value or creates the updated callback.


```js
Dependency Changes
       ↓
Memoization Invalidated
       ↓
New Value / Function
```

📄 PAGE 10 – FINAL 2-MINUTE REVISION ⭐

```js
                 MEMOIZATION
                      ↓
          Avoid unnecessary work
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
      useMemo                 useCallback
          ↓                       ↓
       VALUE                   FUNCTION
          ↓                       ↓
   Expensive result        Stable reference
          │                       │
          │                       ↓
          │                  React.memo
          │                       ↓
          │                 Memoized Child
          │
          ↓
     Dependencies
          ↓
   Recalculate when
   dependencies change
```

## Final Memory Trick

```js
useMemo()

↓

"I remember this VALUE."


useCallback()

↓

"I remember this FUNCTION."


React.memo()

↓

"I remember this COMPONENT's PROPS."
```


