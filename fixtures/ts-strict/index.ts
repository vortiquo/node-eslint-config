// TypeScript Strict ESLint configuration fixture
type User = {
  readonly name: string;
  readonly age: number;
};

const user: User = {
  name: 'Jane Doe',
  age: 25,
} as const;

function greet(person: User): string {
  return `Hello, ${person.name}!`;
}

console.log(greet(user));
