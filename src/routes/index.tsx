import { Navigate } from 'react-router';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { HomeLayout } from '@/components/layout/home.layout';
import { RootLayout } from '@/components/layout/root.layout';
import AdminDashboard from '@/pages/admin-dashboard';
import Home from '@/pages/home';
import NotesHistory from '@/pages/notes-history/notes-history';
import Users from '@/pages/users/users';
import { adminRouteConfig } from '@/routes/admin-route-config';
import PrivateRoute from '@/routes/private-route';
import { routeConfig } from '@/routes/route-config';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
            element: <Users />,
          },
        ],
      },
      {
        path: '/login',
        element: <Home />,
      },
      {
        path: '/history',
        element: <NotesHistory />,
      },
    ],
  },
]);
