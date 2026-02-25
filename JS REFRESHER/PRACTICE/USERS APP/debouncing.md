## Debouncing :

----

```js
function debounce(callback, delay) {
    let timer;

    return function (event) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(event);
        }, delay);
    };
}
```
- Debounce is:

   - Debounce is a higher-order function that delays the execution of a callback until a specified delay has passed without the function being called again.

   - Debounce is a higher-order function that delays the execution of a callback until after a specified delay has passed without further calls.


### Step 1

- `debounce()` runs once when you attach it:

```js
searchInput.addEventListener("input", debounce(handleSearch, 300));
```

- This returns a new function.

### Step 2

- Why timer Works

- `timer` is preserved because of `closure`.

- The returned function remembers the timer variable even after `debounce()` has finished executing.


 ### Step 3

- Every time user types:

```js
clearTimeout(timer);
```
- Cancels previous timer.

### Step 4

- Start new timer:

```js
timer = setTimeout(...)
```
- If user stops typing → after 300ms → run:

```js
callback(event);
```

- That means:

- 👉 `handleSearch(event)` runs once.

### In Simple Terms

- User types → Wait 300ms
If typing continues → Reset waiting
If typing stops → Run function

### Visual Timeline

```js
Typing:  k   → timer starts
Typing:  ka  → timer resets
Typing:  kap → timer resets
Stop typing  → after 300ms → callback runs
```