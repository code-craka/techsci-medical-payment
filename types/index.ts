export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  status: string;
  balance: number;
  twoFactorEnabled: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  category: string;
  reference: string;
  date: Date;
  reason?: string;
}

export interface Fake {
  id: string;
  name: string;
  passport: string;
  city: string;
  to: string;
  category: string;
  status: string;
  createdAt: Date;
}

export interface Process {
  id: string;
  userId: string;
  status: string;
  type: string;
  reference: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginHistory {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  status: 'success' | 'failed' | 'blocked';
  reason?: string;
  createdAt: Date;
}
