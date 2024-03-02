import { Navigate } from 'react-router';
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { routeConfig } from 'routes/routeConfig';
import { HomeLayout } from '@/components/Layout/home.layout';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={routeConfig.home.link} replace />,
      },
      {
        index: true,
        path: routeConfig.home.link,
        element: <Dashboard />,
      },
      {
        path: routeConfig.checkin.link,
        element: <Dashboard />,
      },
      {
        path: routeConfig.profile.link,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <Home />,
  },
]);
// const Router = () => (
//     <BrowserRouter>
//         <Routes>
//             <Route
//                 path="/"
//                 element={
//                     <PublicRoute>
//                         <Home/>
//                     </PublicRoute>
//                 }
//             />
//             <Route
//                 element={
//                     <HomeLayout>
//                         <Outlet/>
//                     </HomeLayout>
//                 }
//             >
//                 <Route
//                     path={routeConfig.}
//                     element={
//                         <PublicRoute>
//                             <Dashboard/>
//                         </PublicRoute>
//                     }
//                 />
//                 <Route
//                     path="/calendar"
//                     element={
//                         <PublicRoute>
//                             <Dashboard/>
//                         </PublicRoute>
//                     }
//                 />
//                 <Route
//                     path="/profile"
//                     element={
//                         <PublicRoute>
//                             <Dashboard/>
//                         </PublicRoute>
//                     }
//                 />
//             </Route>
//
//             <Route
//                 path="/dashboard"
//                 element={
//                     <PrivateRoute>
//                         <Dashboard/>
//                     </PrivateRoute>
//                 }
//             />
//         </Routes>
//     </BrowserRouter>
// );
