import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

// Lazy-loaded components
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));
const GraphQLCRUD = lazy(() => import('../pages/GraphQLCRUD'));

// 认证路由（登录相关）
const authRoutes = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
];

// 受保护路由（需要登录）
const protectedRoutes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Suspense>
        ),
      },
       {
        path: 'graphQLCRUD',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute>
              <GraphQLCRUD />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
];

// 公开路由（NotFound）
const publicRoutes = [
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
];

// 合并所有路由
const router = createBrowserRouter([
  ...protectedRoutes,
  ...authRoutes,
  ...publicRoutes,
]);

export default router;