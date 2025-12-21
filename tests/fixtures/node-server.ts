// Node.js server test file
import { createServer } from 'http';

interface User {
  id: number;
  name: string;
}

function createUser(name: string): User {
  return {
    id: Math.random(),
    name,
  };
}

async function startServer(port: number): Promise<void> {
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello World' }));
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Missing return type (should error in strict server configs)
function validateUser(user) {
  return user.name && user.name.length > 0;
}

export { createUser, startServer, validateUser };
