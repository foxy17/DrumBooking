import useAuthStore from "@/store/useAuthStore";
import type { ReactElement } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const { isAuthenticated } = useAuthStore((state) => state);

  return isAuthenticated ? <Navigate to="/admin/dashboard" /> : children;
};

export default PublicRoute;
