import { Navigate } from 'react-router';
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { HomeLayout } from '@/components/Layout/home.layout';
import { AdminDashboard } from '@/pages/AdminDashboard';
import Home from '@/pages/Home';
import { adminRouteConfig } from '@/routes/adminRouteConfig';
import PrivateRoute from '@/routes/PrivateRoute';
import { routeConfig } from '@/routes/routeConfig';

export const router = createBrowserRouter([
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
        path: routeConfig.checkin.link,
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
      <HomeLayout>
        <Outlet />
      </HomeLayout>
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
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <Home />,
  },
]);
