# Mini Ticket System

A role-based support ticketing system built with React.js, Redux Toolkit, and Express.js.

## Features

- User Authentication (JWT-based)
- Role-Based Access Control (User & Admin roles)
- Ticket Management System
- React with Functional Components and Hooks
- Redux with Redux Toolkit
- Responsive UI with Tailwind CSS

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Frontend

- React.js with Functional Components and Hooks
- Redux Toolkit for State Management
- React Router v7 for Navigation
- Tailwind CSS v4 for Styling
- TypeScript for Type Safety

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd backend
   pnpm install

   # Install frontend dependencies
   cd ../frontend
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:

   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Run the application:

   ```bash
   # Start backend server
   cd backend
   pnpm run dev

   # Start frontend development server
   cd ../frontend
   pnpm dev
   ```

## API Endpoints

### Authentication

- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Tickets

- GET /api/tickets - Get all tickets (admin) or user tickets (user)
- GET /api/tickets/:id - Get a specific ticket
- POST /api/tickets - Create a new ticket
- PUT /api/tickets/:id - Update ticket status (admin only)

## Project Structure

```
mini-ticket/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── admin/
    │   │   ├── auth/
    │   │   ├── dashboard/
    │   │   ├── layout/
    │   │   └── routing/
    │   ├── redux/
    │   │   ├── slices/
    │   │   └── store.ts
    │   │   ├── types/
    │   │   ├── utils/
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

## License

ISC
