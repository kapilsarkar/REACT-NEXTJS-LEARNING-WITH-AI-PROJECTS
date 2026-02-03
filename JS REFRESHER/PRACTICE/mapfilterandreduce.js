//map,filter and reduce functions implementation

// Map function
const nums = [1, 2, 3, 4, 5];

const square = nums.map(n => n * n);
console.log(square);


// Filter function
const evenNums = nums.filter(n => n % 2 === 0);
console.log(`Even Numbers: ${evenNums}`);

// Reduce function
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum);

//Double only even numbers
const evenArray = [1, 2, 3, 4, 5];

const resultEvenArray = evenArray.filter(n => n % 2 === 0).map(n => n * 2);
console.log(resultEvenArray);

//Get names of users older than 18
const users = [
    { name: "A", age: 17 },
    { name: "B", age: 22 },
    { name: "C", age: 19 }
];

const adultAge = users.filter(n => n.age > 18).map(n => n.name);
console.log(adultAge);

//Find total price
const cart = [
    { item: "Book", price: 200 },
    { item: "Pen", price: 50 }
];

const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price
}, 0)
console.log(totalPrice);