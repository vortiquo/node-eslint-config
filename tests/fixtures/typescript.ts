// TypeScript test file
function greetUser(name: string): number {
  console.log(`Hello ${name}!`);
  return 42;
}

// Unused variable (should warn)
const unusedVar: string = 'test';

// Missing return type (should error for strict TS configs)
function calculateSum(a: number, b: number) {
  return a + b;
}

// Async function without await (should error in strict configs)
async function fetchData(): Promise<string> {
  return Promise.resolve('data');
}

export { greetUser, calculateSum, fetchData };
