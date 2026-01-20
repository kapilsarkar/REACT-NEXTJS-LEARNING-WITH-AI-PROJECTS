// && -> and
// || -> or
// ! -> reverses the boolean value

let isLoggedIn = true;
let isPayed = false;

console.log(isLoggedIn && isPayed); // false
console.log(isLoggedIn || isPayed); // true

let isEmailUser = true;
let isGoogleUser = false;;

console.log(isEmailUser || isGoogleUser); // true

console.log(!isEmailUser); // false
console.log(!isGoogleUser); // true