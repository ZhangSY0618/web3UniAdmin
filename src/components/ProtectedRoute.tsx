import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

// 定义 props 的类型
interface ProtectedRouteProps {
  children: ReactNode;
}

// 检查用户是否已登录
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = isAuthenticated();

  // 如果已登录且访问 /login，重定向到首页
  if (isAuth && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  // 如果未登录且访问受保护页面，重定向到 /login
  if (!isAuth && location.pathname !== '/login') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 正常渲染页面
  return children;
};

export default ProtectedRoute;