//Number

let balance = 120;
console.log(typeof (balance)); // number

let anotherBalance = new Number(140);
console.log(anotherBalance); // [Number: 140]
console.log(anotherBalance.valueOf()); // 140
console.log(typeof (anotherBalance)); // object 

//Boolean

let isLoggedIn = true;
console.log(typeof isLoggedIn); // boolean

let isReallyActive = new Boolean(true);
console.log(isReallyActive); // [Boolean: true]

//null and undefined

let firstName
console.log(firstName); // undefined
console.log(typeof firstName) // undefined
let lastName = null;
console.log(lastName); // null
console.log(typeof lastName)    // object

//Symbol

let sym1 = Symbol("my identifier");
let sym2 = Symbol("my identifier");
console.log(sym1 === sym2); // false

console.log(typeof sym1); // symbol