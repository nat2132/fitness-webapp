# FitTrack - Fitness Web Application

A modern fitness tracking web application built with React, allowing users to track workouts, monitor nutrition, and visualize progress.

## Features

- **Workout Tracking**: Log and track your workouts with detailed metrics and progress visualization
- **Meal Planning**: Track your nutrition, plan meals, and monitor your caloric intake
- **Progress Analytics**: Visualize your fitness journey with detailed charts and analytics
- **Health Monitoring**: Keep track of vital health metrics and receive personalized insights
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- React Router
- React Hook Form

A full-stack web application built with React, Tailwind CSS, Node.js, and MongoDB.

## Project Structure

```
fitness-webapp/
├── frontend/          # React frontend application
└── backend/           # Node.js backend server
```

## Setup Instructions

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory (use `backend/.env.example` as a template) with the following variables:
   ```
   PORT=5000
   MONGODB_URI=<your-atlas-uri>
   JWT_SECRET=<your-jwt-secret>
   CORS_ORIGIN=http://localhost:5173
   ```
   Never commit your real `.env` file — it contains credentials and is already git-ignored.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Location | Required | Description |
| --- | --- | --- | --- |
| `PORT` | backend | No | Port the backend listens on (default: `5000`). |
| `MONGODB_URI` | backend | Yes | MongoDB connection string (MongoDB Atlas or local). |
| `JWT_SECRET` | backend | Yes | Secret used to sign JWTs. Use a long random string. |
| `CORS_ORIGIN` | backend | No | Comma-separated list of allowed CORS origins (default: `http://localhost:5173`). |
| `VITE_API_BASE_URL` | frontend | No | Base URL of the backend API. Leave empty in development (the Vite dev server proxies `/api` to `http://localhost:5000`); set the full API URL in production. |

## Technologies Used

- Frontend:
  - React
  - Tailwind CSS
  - Vite
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT Authentication 