export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  user: User | string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  tickets: TicketState;
}
