import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { ProtectedRoute } from '@/components/protected-route';
import Landing from '@/page/landing';
import Login from '@/page/login';
import Signup from '@/page/signup';
import Dashboard from '@/page/dashboard';
import Profile from '@/page/profile';
import Progress from '@/page/progress';
import Settings from '@/page/settings';
import Achievements from '@/page/achievements';
import Meal from '@/page/meal/meal';
import ForgotPassword from '@/page/forgot-password';
import ResetPassword from '@/page/reset-password';
import LogActivity from '@/page/activity/log/activity';
import LogMeal from '@/page/meal/log/meal-log';
import Workout from '@/page/workouts/[id]/workout';
import Workouts from '@/page/workouts/workouts';
import CreateWorkout from '@/page/workouts/create/workout-create';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout>
          <Outlet />
        </Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/progress',
        element: <Progress />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/achievements',
        element: <Achievements />,
      },
      {
        path: '/workouts/:id',
        element: <Workout />,
      },
      {
        path: '/meal',
        element: <Meal />,
      },
      {
        path: '/log/activity',
        element: <LogActivity />,
      },
      {
        path: '/log/meal',
        element: <LogMeal />,
      },
      {
        path: '/workouts/create',
        element: <CreateWorkout />,
      },
      {
        path: '/workouts',
        element: <Workouts />,
      },
    ],
  },
]); 