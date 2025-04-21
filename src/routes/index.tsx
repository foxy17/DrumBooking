import { Navigate } from 'react-router';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AuthProvider } from '@/components/auth/auth-provider';
import AdminDashboard from '@/pages/admin-dashboard';
import ForgotPassword from '@/pages/auth/forgot-password';
import ResetPassword from '@/pages/auth/reset-password';
import Signup from '@/pages/auth/signup';
import Home from '@/pages/home';
import NotesHistory from '@/pages/notes-history/notes-history';
import Users from '@/pages/users/users';
import { adminRouteConfig } from '@/routes/admin-route-config';
import PrivateRoute from '@/routes/private-route';
import PublicRoute from '@/routes/public-route';
import { routeConfig } from '@/routes/route-config';
import { HomeLayout, RootLayout } from '../components/layouts';
export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <HomeLayout>
              <Outlet />
            </HomeLayout>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={routeConfig.home.link} replace />,
          },
          {
            index: true,
            path: routeConfig.home.link,
            element: <AdminDashboard />,
          },
          {
            path: routeConfig.calendar.link,
            element: <AdminDashboard />,
          },
          {
            path: routeConfig.profile.link,
            element: <AdminDashboard />,
          },
        ],
      },
      {
        path: '/admin',
        element: (
          <PrivateRoute>
            <HomeLayout>
              <Outlet />
            </HomeLayout>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={adminRouteConfig.home.link} replace />,
          },
          {
            index: true,
            path: adminRouteConfig.home.link,
            element: <AdminDashboard />,
          },
          {
            path: adminRouteConfig.checkin.link,
            element: <AdminDashboard />,
          },
          {
            path: adminRouteConfig.profile.link,
            element: <Users />,
          },
        ],
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <PrivateRoute>
            <ResetPassword />
          </PrivateRoute>
        ),
      },
      {
        path: '/history',
        element: (
          <PrivateRoute>
            <NotesHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
