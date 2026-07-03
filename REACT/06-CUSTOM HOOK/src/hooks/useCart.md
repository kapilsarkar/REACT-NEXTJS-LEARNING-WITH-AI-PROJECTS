# `useCart` Custom Hook - Revision Notes

## Overview

`useCart` is a **custom React Hook** used to manage shopping cart logic.

It handles:

* Adding products to cart
* Removing products
* Updating quantity
* Calculating total price
* Saving cart data in `localStorage`
* Syncing cart across browser tabs

---

## Full Flow Diagram

```text
Component Uses useCart()
        |
        v
Initialize cart from localStorage
        |
        v
User Actions:
(Add / Remove / Update)
        |
        v
setCart() updates state
        |
        v
useEffect saves updated cart to localStorage
        |
        v
Other tabs detect changes via storage event
        |
        v
Cart syncs automatically
        |
        v
useMemo calculates total
```

---

## 1. Importing Hooks

```js
import { useState, useEffect, useMemo } from "react";
```

We import:

### `useState`

Used for storing cart items.

### `useEffect`

Used for side effects like:

* saving cart to localStorage
* syncing across tabs

### `useMemo`

Used for optimizing total calculation.

---

## 2. Creating Custom Hook

```js
export function useCart() {
```

This creates a reusable hook.

Now any component can do:

```js
const { cart, addToCart } = useCart();
```

---

## 3. Initializing Cart State

```js
const [cart, setCart] = useState(() => {
```

Important:

This uses **lazy initialization**.

Instead of running on every render, it runs only once.

---

## Inside It-

```js
const savedCart = localStorage.getItem('cart');
```

Reads cart from browser storage.

Example:

```js
[
 {id:1,name:"Shoes",price:2000,quantity:2}
]
```

---

### Parsing JSON

```js
return savedCart ? JSON.parse(savedCart) : [];
```

If cart exists:

Convert string → array

Otherwise:

Return empty array.

---

### Error Handling

```js
catch (error) {
```

If JSON is corrupted:

```js
return [];
```

Prevents app crash.

---

## Why use lazy initialization?

Bad:

```js
useState(JSON.parse(localStorage.getItem('cart')))
```

Runs every render.

Good:

```js
useState(() => {...})
```

Runs only once.

Better performance.

---

## 4. Persist Cart to LocalStorage

```js
useEffect(() => {
```

This runs whenever `cart` changes.

Dependency:

```js
[cart]
```

---

Inside:

```js
localStorage.setItem('cart', JSON.stringify(cart))
```

Converts array → string and saves.

Example:

Before:

```js
[{id:1, quantity:2}]
```

Stored as:

```js
"[{"id":1,"quantity":2}]"
```

---

Flow:

```text
Cart State Changed
       |
       v
useEffect Triggered
       |
       v
Save to localStorage
```

---

## 5. Sync Across Tabs

This is advanced and important.

If user opens:

Tab 1 → adds product

Tab 2 → should update automatically.

---

Code:

```js
window.addEventListener('storage', handleStorage);
```

Listens for localStorage changes.

---

Event Object:

```js
if (e.key === 'cart')
```

Checks if cart changed.

---

Then:

```js
const newCart = JSON.parse(e.newValue || '[]')
```

Gets latest cart.

---

Updates state:

```js
setCart(newCart)
```

Now UI updates.

---

Cleanup:

```js
return () => window.removeEventListener('storage', handleStorage)
```

Removes listener when component unmounts.

Very important to avoid memory leaks.

---

Flow:

```text
Tab 1 Updates Cart
        |
localStorage changes
        |
storage event fires
        |
Tab 2 catches event
        |
setCart(newCart)
        |
UI updates
```

---

## 6. Add To Cart

```js
const addToCart = (product) => {
```

Receives product.

Example:

```js
{
 id:1,
 title:"Shoes",
 price:1200
}
```

---

Uses functional update:

```js
setCart(currentCart => {
```

Why?

Because it gives latest state safely.

---

Check if product exists:

```js
const existingItem = currentCart.find(
 item => item.id === product.id
)
```

---

If exists:

```js
quantity: item.quantity + 1
```

Increase quantity.

Example:

Before:

```js
Shoes x2
```

After:

```js
Shoes x3
```

---

If not exists:

```js
return [...currentCart, { ...product, quantity: 1 }]
```

Adds new product.

---

Flow:

```text
Click Add
   |
Check Exists?
 /      \
Yes      No
 |        |
Increase  Add New
```

---

## 7. Remove From Cart

```js
const removeFromCart = (productId) => {
```

Uses filter:

```js
currentCart.filter(item => item.id !== productId)
```

Removes matching item.

Example:

Before:

```js
[1,2,3]
```

Remove 2:

After:

```js
[1,3]
```

---

## 8. Update Quantity

```js
const updateQuantity = (productId, quantity) => {
```

Used for manual quantity update.

Example:

```js
updateQuantity(1,5)
```

Product quantity becomes 5.

---

Validation:

```js
if (quantity < 1) return
```

Prevents invalid values.

---

Updates:

```js
map()
```

Finds item and replaces quantity.

---

## 9. Calculating Total

```js
const total = useMemo(() => {
```

Calculates total price.

Formula:

```js
price × quantity
```

Example:

```js
Shoes = 1000 × 2 = 2000
Shirt = 500 × 3 = 1500
Total = 3500
```

---

Logic:

```js
cart.reduce((sum, item) => {
```

Loops through all items.

---

Inside:

```js
const itemTotal = item.price * (item.quantity || 0)
```

Gets each product total.

---

Then:

```js
return sum + itemTotal
```

Adds to total.

---

Fix decimal:

```js
.toFixed(2)
```

Example:

```js
99.999 → 100.00
```

---

Why `useMemo`?

Without it:

Total recalculates every render.

With it:

Recalculates only when cart changes.

Dependency:

```js
[cart]
```

---

Note:

In **React**, compiler optimizations reduce the need for `useMemo` in some cases.

---

## 10. Returning Values

```js
return {
 cart,
 addToCart,
 removeFromCart,
 updateQuantity,
 total
}
```

Makes everything available outside.

Example:

```js
const {
 cart,
 addToCart,
 removeFromCart,
 total
} = useCart();
```

---

## Final Summary

| Function         | Purpose           |
| ---------------- | ----------------- |
| `useState`       | Store cart        |
| `useEffect`      | Save cart         |
| `useEffect`      | Sync tabs         |
| `addToCart`      | Add/increase item |
| `removeFromCart` | Remove item       |
| `updateQuantity` | Change quantity   |
| `useMemo`        | Optimize total    |

---

## Key Concepts You Revised

✅ Custom Hook
✅ Lazy Initialization
✅ LocalStorage
✅ useEffect
✅ Cleanup Function
✅ Storage Event
✅ Functional Updates
✅ map()
✅ filter()
✅ find()
✅ reduce()
✅ useMemo
✅ Immutability
✅ State Persistence
✅ Cross-tab Sync

---

## Interview Questions

### Why functional update?

Because state updates are asynchronous.

```js
setCart(currentCart => ...)
```

Uses latest state safely.

---

### Why use localStorage?

To persist cart after refresh.

---

### Why use cleanup?

To prevent memory leaks.

---

### Difference between map and filter?

`map()` → modifies items

`filter()` → removes items

---

### Why useMemo?

To optimize expensive calculations.
