// React component test file
import React, { useState, useEffect } from 'react';

interface Props {
  name: string;
}

function UserCard({ name }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return (
    <div>
      <h1>Hello {name}!</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

// Missing props interface (should warn/error depending on config)
function SimpleButton({ children }) {
  return <button>{children}</button>;
}

export { UserCard, SimpleButton };
