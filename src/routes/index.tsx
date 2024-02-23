import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { HomeLayout } from '@/components/Layout/home.layout';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        index={true}
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        element={
          <HomeLayout>
            <Outlet />
          </HomeLayout>
        }
      >
        <Route
          path="/dash"
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PublicRoute>
              <Dashboard />
            </PublicRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
