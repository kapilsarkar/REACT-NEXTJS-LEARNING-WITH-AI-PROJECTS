

document.addEventListener("DOMContentLoaded", () => {

  /* Product Data */

  const products = [
    { id: 1, name: "Wireless Mouse", price: 29.99, image: "images/mouse.png" },
    { id: 2, name: "Keyboard", price: 19.99, image: "images/keyboard.png" },
    { id: 3, name: "Headphones", price: 59.99, image: "images/headphone.png" }
  ];


  /* Load Cart From LocalStorage */

  let cart = JSON.parse(localStorage.getItem("cart")) || [];


  /* DOM Elements */

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");


  /* Render Products */

  function renderProducts() {

    productList.innerHTML = "";

    products.forEach(product => {

      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
<img src="${product.image}" alt="${product.name}"
onerror="this.onerror=null; this.src='images/default.png';">

<h3>${product.name}</h3>
<p>$${product.price.toFixed(2)}</p>
<button data-id="${product.id}">Add to Cart</button>
`;

      productList.appendChild(card);

    });

  }

  renderProducts();


  /* Add To Cart */

  productList.addEventListener("click", (e) => {

    if (e.target.matches("button")) {

      const id = parseInt(e.target.dataset.id);

      const product = products.find(p => p.id === id);

      if (product) {
        addToCart(product);
      }

    }

  });


  function addToCart(product) {

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    renderCart();

  }


  /* Render Cart */

  function renderCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = "$0.00";

      return;

    }

    emptyCartMessage.classList.add("hidden");
    cartTotalMessage.classList.remove("hidden");


    cart.forEach(item => {

      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement("div");

      div.innerHTML = `
<img src="${item.image}" width="40"
onerror="this.onerror=null; this.src='images/default.png';">

<span>${item.name}</span>

<button class="decrease" data-id="${item.id}">-</button>
<span>${item.quantity}</span>
<button class="increase" data-id="${item.id}">+</button>

<button class="remove" data-id="${item.id}">x</button>

<span>$${itemTotal.toFixed(2)}</span>
`;

      cartItems.appendChild(div);

    });

    totalPriceDisplay.textContent = `$${total.toFixed(2)}`;

  }


  /* Cart Controls */

  cartItems.addEventListener("click", (e) => {

    const id = parseInt(e.target.dataset.id);

    if (!id) return;

    const item = cart.find(p => p.id === id);

    if (!item) return;


    if (e.target.classList.contains("increase")) {
      item.quantity++;
    }

    if (e.target.classList.contains("decrease")) {
      item.quantity--;

      if (item.quantity <= 0) {
        removeItem(id);
      }
    }

    if (e.target.classList.contains("remove")) {
      removeItem(id);
    }

    saveCart();
    renderCart();

  });


  function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
  }


  /* Checkout */

  checkOutBtn.addEventListener("click", () => {

    cart = [];

    saveCart();
    renderCart();

    alert("Checkout Successful");

  });


  /* Save Cart */

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }


  /* Initialize Cart */

  renderCart();

});


