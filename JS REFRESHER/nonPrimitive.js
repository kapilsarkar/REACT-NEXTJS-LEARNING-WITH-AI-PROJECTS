const userName = {
    firstName:"Kapil",
    isLoggedIn:true,
    age:25,
}
userName.firstName ="Kapil Sarkar"
userName.newName = "KS "

console.log(userName)   // { firstName: 'Kapil Sarkar', isLoggedIn: true, age: 25, newName: 'KS ' }
console.log(typeof userName)    // object
console.log(userName.firstName)  // Kapil Sarkar
console.log(userName.newName)  // KS

//It means non-primitive data type is mutable (can be changed) and primitive data type is immutable (cannot be changed)

//Array
let myFriends = ["John", "Jane", "Doe"]
console.log(myFriends) // [ 'John', 'Jane', 'Doe' ]
console.log(typeof myFriends) // object
console.log(myFriends[0]) // John

let anotherUser =  ["Hrithik", true, 30]

console.log(anotherUser) // [ 'Hrithik', true, 30 ]
console.log(typeof anotherUser) // object
console.log(anotherUser[1]) // true

//Type Conversion
console.log(1 + "1")
// "11" (number 1 is converted to string "1" and concatenated)
console.log(1 + Number(2)); 
// 3 (string "2" is converted to number 2 and added)

let isValue = "123abc";
console.log(Number(isValue)); 
// NaN (string "123abc" cannot be converted to a valid number)
console.log(typeof Number(isValue)) // number
console.log(Number(null))   
// 0 (null is converted to number 0)
console.log(typeof Number(null)) // number
console.log(Number(undefined)) // NaN (undefined cannot be converted to a valid number)
console.log(typeof Number(undefined)) // number

console.log(Boolean(1)); 
// true (non-zero number is converted to true)
console.log(Boolean(0));
// false (zero is converted to false)
console.log(Boolean("Hello"));

// true (non-empty string is converted to true)
console.log(Boolean(""));
// false (empty string is converted to false)

console.log(Boolean([]));  
// true (empty array is converted to true)
console.log(Boolean({})); 
// true (empty object is converted to true) 
console.log(Boolean(null)); 
// false (null is converted to false)
console.log(Boolean(undefined)); 
// false (undefined is converted to false)
console.log(Boolean(NaN)); 
// false (NaN is converted to false)
console.log(typeof Boolean("Hello")) // boolean
console.log(typeof Boolean(0)) // boolean
console.log(typeof Boolean([])) // boolean