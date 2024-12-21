function greet() {
  console.log("venky");
}

// greetins is higher order function  and greenFn is callback function
function greetings(greetFn) {
  greetFn();
}

greetings(greet);
