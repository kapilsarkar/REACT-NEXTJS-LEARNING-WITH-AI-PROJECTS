# 🛒 Mini Store – Shopping Cart (Vanilla JavaScript)

This project is a **simple e-commerce shopping cart system** built using **HTML, CSS, and Vanilla JavaScript**.
It demonstrates how a real frontend application manages:

* Product rendering
* Cart state
* Quantity updates
* LocalStorage persistence
* Dynamic UI updates

This document explains the **entire JavaScript logic step-by-step** for future revision.

---

# 1️⃣ Application Initialization

```javascript
document.addEventListener("DOMContentLoaded", () => {
```

### Purpose

This ensures the JavaScript runs **only after the HTML document has fully loaded**.

Why this is important:

* Prevents JavaScript from trying to access elements that are not yet loaded.
* Ensures all DOM elements exist before manipulation.

---

# 2️⃣ Product Data

```javascript
const products = [
{ id: 1, name: "Wireless Mouse", price: 29.99, image: "images/mouse.png" },
{ id: 2, name: "Keyboard", price: 19.99, image: "images/keyboard.png" },
{ id: 3, name: "Headphones", price: 59.99, image: "images/headphones.png" }
];
```

### Purpose

This array acts as a **mock database** for the store.

Each product object contains:

| Property | Description               |
| -------- | ------------------------- |
| id       | Unique product identifier |
| name     | Product name              |
| price    | Product price             |
| image    | Path to product image     |

In real applications this data would come from a **backend API or database**.

---

# 3️⃣ Loading Cart from LocalStorage

```javascript
let cart = JSON.parse(localStorage.getItem("cart")) || [];
```

### Purpose

This line loads saved cart data from **LocalStorage**.

Explanation:

| Part                         | Meaning                                     |     |                                       |
| ---------------------------- | ------------------------------------------- | --- | ------------------------------------- |
| localStorage.getItem("cart") | Retrieves saved cart data                   |     |                                       |
| JSON.parse()                 | Converts JSON string into JavaScript object |     |                                       |
| `                            |                                             | []` | If no data exists, use an empty array |

This allows the cart to **persist even after refreshing the page**.

---

# 4️⃣ Selecting DOM Elements

```javascript
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart");
const cartTotalMessage = document.getElementById("cart-total");
const totalPriceDisplay = document.getElementById("total-price");
const checkOutBtn = document.getElementById("checkout-btn");
```

### Purpose

These variables store references to **HTML elements** so JavaScript can manipulate them.

Example:

| Element           | Purpose                          |
| ----------------- | -------------------------------- |
| productList       | Displays all products            |
| cartItems         | Displays items inside cart       |
| emptyCartMessage  | Shows message when cart is empty |
| cartTotalMessage  | Shows cart total section         |
| totalPriceDisplay | Displays total price             |
| checkOutBtn       | Checkout button                  |

---

# 5️⃣ Rendering Products

```javascript
function renderProducts() {
```

This function **dynamically creates product cards** and displays them in the UI.

Steps performed:

1. Clear existing product list

```javascript
productList.innerHTML = "";
```

2. Loop through products

```javascript
products.forEach(product => {
```

3. Create product card

```javascript
const card = document.createElement("div");
card.classList.add("product-card");
```

4. Add product details

```javascript
card.innerHTML = `
<img src="${product.image}" alt="${product.name}">
<h3>${product.name}</h3>
<p>$${product.price.toFixed(2)}</p>
<button data-id="${product.id}">Add to Cart</button>
`;
```

5. Add card to page

```javascript
productList.appendChild(card);
```

---

# 6️⃣ Event Delegation for Add to Cart

```javascript
productList.addEventListener("click", (e) => {
```

### Why Event Delegation?

Instead of adding event listeners to each button individually, we attach **one listener to the parent container**.

Advantages:

* Better performance
* Handles dynamically created elements

---

### Detect Button Click

```javascript
if (e.target.matches("button"))
```

Checks if the clicked element is a button.

---

### Get Product ID

```javascript
const id = parseInt(e.target.dataset.id);
```

`data-id` attribute stores the product ID.

---

### Find Product

```javascript
const product = products.find(p => p.id === id);
```

This retrieves the product from the product array.

---

# 7️⃣ Add to Cart Logic

```javascript
function addToCart(product)
```

This function manages cart state.

---

### Check if product already exists

```javascript
const existing = cart.find(item => item.id === product.id);
```

If the product exists:

```javascript
existing.quantity++;
```

Otherwise:

```javascript
cart.push({...product, quantity:1});
```

---

### Save cart and update UI

```javascript
saveCart();
renderCart();
```

---

# 8️⃣ Rendering Cart

```javascript
function renderCart()
```

This function updates the **cart UI**.

Steps:

### Clear cart container

```javascript
cartItems.innerHTML="";
```

---

### If cart is empty

```javascript
if (cart.length === 0)
```

Show message:

```javascript
emptyCartMessage.classList.remove("hidden");
```

Hide total section.

---

### Loop through cart items

```javascript
cart.forEach(item=>{
```

Calculate item total:

```javascript
const itemTotal=item.price*item.quantity;
```

Add to total price.

---

### Create cart row

```javascript
div.innerHTML = `
<img src="${item.image}" width="40">
<span>${item.name}</span>

<button class="decrease">-</button>
<span>${item.quantity}</span>
<button class="increase">+</button>

<button class="remove">x</button>

<span>$${itemTotal.toFixed(2)}</span>
`;
```

---

### Display final total

```javascript
totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
```

---

# 9️⃣ Cart Controls

```javascript
cartItems.addEventListener("click",(e)=>{
```

Handles:

* Increase quantity
* Decrease quantity
* Remove item

---

### Increase quantity

```javascript
if (e.target.classList.contains("increase"))
item.quantity++;
```

---

### Decrease quantity

```javascript
item.quantity--;
```

If quantity becomes **0**, remove item.

---

### Remove item

```javascript
removeItem(id);
```

---

# 🔟 Remove Item Function

```javascript
function removeItem(id){
cart = cart.filter(item => item.id !== id);
}
```

This removes the item from cart array.

---

# 1️⃣1️⃣ Checkout

```javascript
checkOutBtn.addEventListener("click", ()=>{
```

Actions performed:

1. Clear cart

```javascript
cart = [];
```

2. Save empty cart

3. Re-render cart UI

4. Show success message

---

# 1️⃣2️⃣ Saving Cart to LocalStorage

```javascript
function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}
```

### Purpose

Stores cart data so it **remains after page refresh**.

---

# 1️⃣3️⃣ Initial Cart Render

```javascript
renderCart();
```

This ensures saved cart items are **displayed when page loads**.

---

# 🎯 Key Concepts Demonstrated

This project demonstrates important frontend concepts:

| Concept               | Description               |
| --------------------- | ------------------------- |
| DOM Manipulation      | Dynamically updating UI   |
| Event Delegation      | Efficient event handling  |
| State Management      | Managing cart data        |
| LocalStorage          | Persistent data storage   |
| Dynamic Rendering     | UI updates based on state |
| Defensive Programming | Error prevention          |

---


