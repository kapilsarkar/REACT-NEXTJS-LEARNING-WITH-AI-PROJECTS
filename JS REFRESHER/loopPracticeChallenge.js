//1.  for loop + break

// Write a for loop that iterates through
// ["apple", "banana", "mango", "orange", "grapes"]
// Stop the loop when "orange" is found and store all fruits before it in an array called freshFruits./

let  fruits = ["apple", "banana", "mango", "orange", "grapes"];
let freshFruits = [];
for(let i =0; i< fruits.length;i++){
    if(fruits[i] === "orange"){
        break;
    }
    freshFruits.push(fruits[i]);
}

console.log(freshFruits);

// 2. for loop + continue

// Iterate through [10, 15, 20, 25, 30]
// Skip numbers greater than 20 and store the rest in validNumbers

let number = [10, 15, 20, 25, 30];
let validNumbers = [];
for(let i =0; i< number.length; i++){
    if(number[i] > 20){
        continue;
    }
  validNumbers.push(number[i])
}

console.log(validNumbers);

//3. for-of loop

// Use a for-of loop on
// ["react", "angular", "vue", "svelte"]
// Stop when "vue" is found and store previous frameworks in learnedFrameworks.

let frameworks = ["react", "angular", "vue", "svelte"];
let learnedFrameworks = [];

for(const lang of frameworks){
    if(lang === "vue"){
        break;
    }

    learnedFrameworks.push(lang)
}
console.log(learnedFrameworks);

//4. for-of + condition

// Iterate over [3, 6, 9, 12, 15]
// Skip numbers divisible by 3 and store the rest in filteredNumbers.

let numArray = [3, 6, 9, 12, 15];
let filteredNumbers = [];

for(const newNum of numArray){
    if(newNum %3 === 0){
        continue;
    }
    filteredNumbers.push(newNum)
}

console.log(filteredNumbers);

//5. for-in with object

// Given:

// let studentMarks = {
//   Math: 85,
//   English: 72,
//   Science: 90,
//   History: 65
// };
// Loop through the object and store only subjects with marks above 80 in a new object called topSubjects.

let studentMarks = {
  Math: 85,
  English: 72,
  Science: 90,
  History: 65
};

let topSubjects = {}

for(const sub in studentMarks){
    if(studentMarks[sub] <= 80){
        continue;
    }

    topSubjects[sub] = studentMarks[sub];
}

console.log(topSubjects);

// 6. for-in + break

// Using the same studentMarks object,
// stop looping when "Science" is encountered and store previous subjects in checkedSubjects.



//7. forEach (understanding limitation)

// Iterate through
// ["html", "css", "javascript", "react"]
// Skip "css" and store the rest in webSkills.

// 💡 Reminder: forEach does not support break.

// 8. forEach + numbers

// Loop through [1, 2, 3, 4, 5, 6]
// Skip even numbers and store odd numbers in oddNumbers.




// 9. for loop + transformation

// Iterate through [5, 10, 15, 20]
// Skip 10, divide the rest by 5, and store results in dividedValues.




// 10. for-of + string length

// Iterate through
// ["pen", "notebook", "eraser", "calculator"]
// Stop when the word length exceeds 6 and store previous items in stationery.


// 11. Mixed Logic

// Using a loop of your choice:

// Iterate through [100, 200, 300, 400, 500]

// Skip 300

// Stop the loop if value is greater than 400

// Store results in finalValues



// Intermediate Loop Practice

// 1. The Double Break: Write a for loop that iterates through [1, 2, 3, 4, 5, 6, 7, 8, 9]. Skip the number 3, and stop the loop entirely when you hit 7. Store the valid numbers in filteredNumbers.
 
// 2. Object Filtering: Given an object let gadgetPrices = { "laptop": 800, "phone": 500, "tablet": 300, "watch": 200 };, use a for...in loop to create a new object affordableGadgets containing only gadgets that cost less than 600.

// 3. The Reverse Loop: Write a standard for loop that iterates through ["apple", "banana", "cherry"] backwards and stores them in a new array reversedFruits.

// 4. Length Watcher: Use a for...of loop to iterate through ["pineapple", "peach", "plum", "pomegranate"]. Stop the loop if the tea name starts with the letter "p" AND has more than 5 characters. Store the results in longPTeas.

// 5. Nested Data: Given an array of arrays let matrix = [[1, 2], [3, 4], [5, 6]];, use a for...of loop to flatten this into a single array flatArray containing [1, 2, 3, 4, 5, 6].

// 6. The Step Counter: Write a for loop that iterates from 0 to 20, but only stores every 3rd number (0, 3, 6...) in an array called steps.

// 7. Key-Value Flip: Use a for...in loop to take an object { a: 1, b: 2, c: 3 } and create a new object where the keys and values are swapped (e.g., { 1: "a", 2: "b", 3: "c" }).

// 8. The "Only Strings" Challenge: Iterate through [1, "hello", true, "world", 42, "js"] using any loop you prefer. Skip everything that isn't a string and store the strings in stringOnly.

// 9. Early Exit with forEach (Logic Check): Use a forEach loop to iterate through [10, 20, 30, 40]. Multiply each number by 2 and push it to results. However, if the number is 30, don't multiply it—just skip it (simulating a continue).

// 10. The Accumulator: Use a for...of loop to iterate through [5, 10, 15]. Instead of storing them in an array, create a variable totalSum that adds the numbers together as the loop runs.