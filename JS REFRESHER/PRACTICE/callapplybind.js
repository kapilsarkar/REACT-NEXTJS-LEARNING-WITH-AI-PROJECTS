const person = {
    name:"Kapil",
}

function greet(city,country){
    console.log(`Hi I am ${this.name} from ${city} and ${country}`)
}

greet("Kolkata","India");

greet.call(person,"Kolkata","India");

greet.apply(person,["Kolkata","India"]);

const greetBind =  greet.bind(person,"Kolkata","India");

greetBind();

//Real-World Use Case (React-style thinking)

const user = {
    name:"Piku",
    greet(){
        console.log(`Hi I am ${this.name}`)
    }
}

const fn = user.greet;
fn(); //undefined

const fixedFn = user.greet.bind(user);
fixedFn(); //Piku

//Q1️⃣ Predict the output

const obj = { name: "Virat" };

function sayHi() {
  console.log(this.name);
}

sayHi.call(obj); //Virat

//Q2️⃣ Fix the bug

const user2 = {
  name: "Kapil",
  greet() {
    console.log(this.name);
  }
};

setTimeout(user.greet, 1000);

//Q4️⃣ bind prediction
const person2 = { name: "Rohit" };

function greet(city) {
  console.log(this.name + " from " + city);
}

const g1 = greet.bind(person, "Mumbai");
g1();