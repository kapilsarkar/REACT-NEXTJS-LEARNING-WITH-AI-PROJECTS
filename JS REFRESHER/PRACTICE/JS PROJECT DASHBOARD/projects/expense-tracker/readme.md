# Expense Tracker (JavaScript)

## Project Overview

This project is a simple **Expense Tracker Web Application** built using **Vanilla JavaScript, HTML, and CSS**.
It allows users to:

* Add expenses
* Delete expenses
* Automatically calculate total expenses
* Store data using **LocalStorage** so that the expenses remain saved even after refreshing the page.

The application dynamically updates the UI using **DOM manipulation and event listeners**.

---

# Application Flow

1. The application waits until the **DOM is fully loaded**.
2. It retrieves previously saved expenses from **LocalStorage**.
3. Expenses are displayed on the screen.
4. Users can add new expenses using the form.
5. Each expense can be deleted.
6. The total expense amount updates automatically.

---

# Main JavaScript Concepts Used

* DOM Manipulation
* Event Listeners
* Array Methods (`push`, `reduce`, `filter`)
* LocalStorage
* Form Handling
* Dynamic Rendering

---

# Code Explanation

## 1. DOMContentLoaded Event

```javascript
document.addEventListener("DOMContentLoaded", () => {
```

This ensures that the JavaScript code runs **only after the HTML document is fully loaded**.

Without this, JavaScript might try to access elements that are not yet created in the DOM.

---

# 2. Selecting DOM Elements

```javascript
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");
```

Here we select important HTML elements:

| Variable           | Purpose                               |
| ------------------ | ------------------------------------- |
| expenseForm        | Form used to submit new expenses      |
| expenseNameInput   | Input field for expense name          |
| expenseAmountInput | Input field for expense amount        |
| expenseList        | List where expenses will be displayed |
| totalAmountDisplay | Displays total expense                |

---

# 3. Loading Data from LocalStorage

```javascript
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
```

Explanation:

* `localStorage.getItem("expenses")` retrieves saved expenses.
* `JSON.parse()` converts the stored string back into a JavaScript array.
* If no expenses exist, an empty array `[]` is used.

---

# 4. Calculating Initial Total

```javascript
let totalAmount = calculateTotal();
```

This calculates the total of all saved expenses when the page loads.

---

# 5. Rendering Expenses on Page Load

```javascript
renderExpenses();
updateTotal();
```

These functions:

* Display all saved expenses
* Show the correct total amount

---

# 6. Form Submission (Adding New Expense)

```javascript
expenseForm.addEventListener("submit", (e) => {
```

When the user submits the form:

### Prevent Page Reload

```javascript
e.preventDefault();
```

Normally forms refresh the page.
`preventDefault()` stops this behavior.

---

### Getting User Input

```javascript
const name = expenseNameInput.value.trim();
const amount = parseFloat(expenseAmountInput.value.trim());
```

* `trim()` removes extra spaces.
* `parseFloat()` converts input into a number.

---

### Validation Check

```javascript
if (name !== "" && !isNaN(amount) && amount > 0)
```

This ensures:

* Expense name is not empty
* Amount is a valid number
* Amount is greater than 0

---

### Creating a New Expense Object

```javascript
const newExpense = {
    id: Date.now(),
    name: name,
    amount: amount,
}
```

Each expense has:

| Property | Purpose           |
| -------- | ----------------- |
| id       | Unique identifier |
| name     | Expense name      |
| amount   | Expense value     |

`Date.now()` generates a unique timestamp.

---

### Adding Expense to Array

```javascript
expenses.push(newExpense)
```

The new expense is added to the `expenses` array.

---

### Saving to LocalStorage

```javascript
saveExpensesToLocal()
```

This saves the updated expenses list to the browser storage.

---

### Updating UI

```javascript
renderExpenses()
updateTotal()
```

* Re-renders the expense list
* Updates the total amount

---

### Clearing Input Fields

```javascript
expenseNameInput.value = "";
expenseAmountInput.value = "";
```

After adding an expense, the input fields are reset.

---

# 7. Rendering Expenses

```javascript
function renderExpenses() {
```

This function displays the expense list.

### Clear Existing List

```javascript
expenseList.innerHTML = "";
```

This prevents duplicate entries.

---

### Loop Through Expenses

```javascript
expenses.forEach(expense => {
```

Each expense in the array is displayed.

---

### Creating List Item

```javascript
const li = document.createElement("li")
```

A new `<li>` element is created.

---

### Displaying Expense Data

```javascript
li.innerHTML = `${expense.name} - $${expense.amount}
<button data-id="${expense.id}">Delete</button>`;
```

Each item shows:

* Expense name
* Expense amount
* Delete button

The `data-id` attribute stores the expense ID.

---

# 8. Calculating Total Expense

```javascript
function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}
```

`reduce()` loops through the expenses array and adds all amounts together.

Example:

```
Food = 20
Taxi = 10
Coffee = 5

Total = 35
```

---

# 9. Saving Expenses to LocalStorage

```javascript
function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses))
}
```

Explanation:

* `JSON.stringify()` converts the array into a string
* The string is stored in the browser's local storage

This ensures expenses persist after page refresh.

---

# 10. Updating Total Display

```javascript
function updateTotal() {
    totalAmount = calculateTotal()
    totalAmountDisplay.textContent = totalAmount.toFixed(2)
}
```

* Calls `calculateTotal()`
* Displays the result
* `toFixed(2)` ensures two decimal places.

Example:

```
45 → 45.00
```

---

# 11. Deleting an Expense

```javascript
expenseList.addEventListener("click", (e) => {
```

Instead of adding an event listener to each button, we use **event delegation**.

---

### Checking Button Click

```javascript
if (e.target.tagName === "BUTTON")
```

This ensures the user clicked a **Delete button**.

---

### Getting Expense ID

```javascript
const expenseId = parseInt(e.target.getAttribute("data-id"))
```

The button's `data-id` attribute contains the expense ID.

---

### Removing Expense

```javascript
expenses = expenses.filter(expense => expense.id !== expenseId)
```

`filter()` creates a new array **without the deleted expense**.

---

### Update Storage and UI

```javascript
saveExpensesToLocal();
renderExpenses();
updateTotal();
```

This ensures:

* LocalStorage is updated
* UI refreshes
* Total amount updates

---

# Features of This Application

✔ Add expenses
✔ Delete expenses
✔ Auto total calculation
✔ Persistent storage with LocalStorage
✔ Dynamic UI updates

---

# Future Improvements (Advanced Features)

Possible upgrades:

* Edit expense
* Expense categories
* Expense charts
* Monthly reports
* Export to CSV
* Search expenses

---

# Technologies Used

* HTML
* CSS
* JavaScript (Vanilla JS)
* Browser LocalStorage

---

# Learning Outcome

This project helps practice:

* DOM manipulation
* JavaScript arrays
* Event handling
* LocalStorage
* Dynamic UI rendering

It is a great **beginner portfolio project for JavaScript developers**.

---
