// <!-- Example 1: Accessing DOM Elements -->
//     <section id="example-1">
//       <h2>Accessing DOM Elements</h2>
//       <p id="myParagraph">
//         This is a paragraph. Click the button to change me!
//       </p>
//       <button id="changeTextButton">Change Text</button>
//     </section>

const changeTextButton = document.getElementById('changeTextButton');
changeTextButton.addEventListener("click", () => {
    const myParagraph = document.getElementById("myParagraph");;
    myParagraph.textContent = "The text has been changed!";

})

// <!-- Example 2: Traversing the DOM -->
//     <section id="example-2">
//       <h2>Traversing the DOM</h2>
//       <ul id="citiesList">
//         <li class="chai">New York</li>
//         <li>Tokyo</li>
//         <li>Paris</li>
//         <li>London</li>
//       </ul>
//       <button id="highlightFirstCity">Highlight First City</button>
//     </section>

const citiesList = document.getElementById("citiesList");
const highlightFirstCity = document.getElementById("highlightFirstCity");


highlightFirstCity.addEventListener("click", () => {
    const firstCity = citiesList.firstElementChild;
    firstCity.style.backgroundColor = "yellow";
    firstCity.style.color = "green";
})

//  <!-- Example 3: Manipulating DOM Elements -->
//     <section id="example-3">
//       <h2>Manipulating DOM Elements</h2>
//       <div id="coffeeOrder">Order: <span id="coffeeType">Latte</span></div>
//       <button id="changeOrder">Change Order to Espresso</button>
//     </section>

const coffeeType = document.getElementById("coffeeOrder");
const changeOrderBtn = document.getElementById("changeOrder");

changeOrderBtn.addEventListener("click", () => {
    coffeeType.textContent = "Order: Espresso";
})

// <!-- Example 4: Creating and Inserting Elements -->
//     <section id="example-4">
//       <h2>Creating and Inserting Elements</h2>
//       <button id="addNewItem">Add a New Item to the Shopping List</button>
//       <ul id="shoppingList">
//         <li>Bread</li>
//         <li>Milk</li>
//       </ul>
//     </section>

const shoppingList = document.getElementById("shoppingList");
const addNewItemBtn = document.getElementById("addNewItem");
addNewItemBtn.addEventListener("click", () => {
    const newItem = document.createElement("li");
    newItem.textContent = "Eggs";
    shoppingList.appendChild(newItem);
})

//  <!-- Example 5: Removing DOM Elements -->
//     <section id="example-5">
//       <h2>Removing DOM Elements</h2>
//       <ul id="taskList">
//         <li>Task 1</li>
//         <li>Task 2</li>
//         <li>Task 3</li>
//       </ul>
//       <button id="removeLastTask">Remove Last Task</button>
//     </section>

const taskList = document.getElementById("taskList");
const removeLastTaskBtn = document.getElementById("removeLastTask");
removeLastTaskBtn.addEventListener("click", () => {
    const lastTask = taskList.lastElementChild;
    taskList.removeChild(lastTask);
})

//  <!-- Example 6: Event Handling in the DOM -->
//     <section id="example-6">
//       <h2>Event Handling in the DOM</h2>
//       <button id="clickMeButton">Click Me!</button>
//     </section>

const clickMeButton = document.getElementById("clickMeButton");
clickMeButton.addEventListener("click", () => {
    alert("Button was clicked!");
})

// <!-- Example 7: Event Delegation -->
//     <section id="example-7">
//       <h2>Event Delegation</h2>
//       <ul id="teaList">
//         <li class="teaItem">Green Tea</li>
//         <li class="teaItem">Black Tea</li>
//         <li class="teaItem">Oolong Tea</li>
//       </ul>
//       <p>Click on any tea to select it!</p>
//     </section>

