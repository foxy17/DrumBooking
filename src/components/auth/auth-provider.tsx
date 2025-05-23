import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is already logged in
        await authService.getSession();
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void initializeAuth();
  }, []);

  if (isLoading) {
    // You could return a loading spinner here
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
