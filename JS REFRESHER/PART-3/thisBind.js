const person = {
    name: "Kapil Sarkar",
    greet() {
        console.log(`Hi I am ${this.name}`)
    }
}

person.greet();
const greetFunction = person.greet;
greetFunction();

const boundGreet = person.greet.bind({name:"Virat Kohli"})
boundGreet();