import { Navigate, Outlet } from 'react-router-dom';
export default function ProtectedRoute({ employee, role }) {
  if (!employee) return <Navigate to="/login" replace />;
  if (role && employee.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
}
