// JavaScript test file
function greetUser(name) {
  console.log(`Hello ${name}!`);
  return 42;
}

// Unused variable (should warn)
const unusedVar = 'test';

// Missing return type (should not error for JS configs)
function calculateSum(a, b) {
  return a + b;
}

module.exports = { greetUser, calculateSum };
