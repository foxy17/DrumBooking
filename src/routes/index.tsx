import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/articles"
        element={
          <PrivateRoute>
              <></>
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
