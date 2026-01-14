//Five Challenges on Conditions in Java Script

//1. Check if a number is greater than another number.
let num1 = 10
let num2 = 20

if (num1 > num2) {
    console.log(`num1 is Greater than num2`)
}

else {
    console.log(`num2 is Greater than num1`)
}

//2. Checking if a striing is equal to another string.
let userName = "Kapil"
let anotherUserName = "Kapil"
if (userName === anotherUserName) {
    console.log("Pick Another UsrName")
}
else {
    console.log("UserName is Available")
}


//3. Check if a variable is a number or not
let score = "56"
if (typeof score === "number") {
    console.log("Score is a number")
}

else {
    console.log("Score is not a number")
}
//4. Check oif a boolean value is true or false.
let isLoggedIn = false
if (isLoggedIn) {
    console.log("User is Logged In")
}
else {
    console.log("User is Not Logged In")
}

//5. Check if a array is empty or not.

let items = ["Sachin", "Kapil", "Rahul"]
console.log(items.length)
if (items.length === 0) {
    console.log("Array is Empty")
}
else {
    console.log("Array is Not Empty")
}