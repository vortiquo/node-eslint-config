// Server Strict ESLint configuration fixture
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import { z } from 'zod';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Validation schemas
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
});

const CreateUserSchema = UserSchema.omit({ id: true });

type User = z.infer<typeof UserSchema>;

// In-memory storage (in a real app, this would be a database)
const users = new Map<string, User>();

// Error handling middleware
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error.message);

  if (error instanceof z.ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      details: error.errors,
    });
    return;
  }

  res.status(500).json({
    error: 'Internal server error',
  });
};

// Routes
app.get('/health', (req: Request, res: Response): void => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/users/:id', (req: Request, res: Response): void => {
  const { id } = req.params;

  const user = users.get(id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(user);
});

app.post('/users', (req: Request, res: Response): void => {
  const userData = CreateUserSchema.parse(req.body);
  const user: User = {
    id: crypto.randomUUID(),
    ...userData,
  };

  users.set(user.id, user);
  res.status(201).json(user);
});

app.use(errorHandler);

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
