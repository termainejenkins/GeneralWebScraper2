import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';
import { AppError } from '../middleware/errorHandler';

interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// In-memory storage for demo purposes
const users: User[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

export const authService = {
  register: async (email: string, password: string): Promise<Omit<User, 'password'>> => {
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      throw new AppError(400, 'User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date()
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  login: async (email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> => {
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return token and user without password
    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  },

  verifyToken: (token: string): { userId: string; email: string; role: string } => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
      return decoded;
    } catch (error) {
      logger.error('Error verifying token:', error);
      throw new AppError(401, 'Invalid token');
    }
  },

  getUserById: async (id: string): Promise<Omit<User, 'password'> | null> => {
    const user = users.find(u => u.id === id);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  updateUser: async (id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<Omit<User, 'password'> | null> => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    // If updating password, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    users[index] = { ...users[index], ...data };

    const { password: _, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  },

  deleteUser: async (id: string): Promise<void> => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new AppError(404, 'User not found');
    }
    users.splice(index, 1);
  }
}; 