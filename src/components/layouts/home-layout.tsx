import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { NavigationDock } from "./navigation";

// Define reusable style constants
const headerStyles = {
  base: "bg-background/95 h-12 border-b border-b-pop-black-100  shrink-0",
  mobile: "z-2 backdrop-blur  supports-[backdrop-filter]:bg-background/60",
  desktop: "md:fixed md:top-0 md:left-0 md:right-0 md:z-10 md:border-none",
};

const containerStyles = {
  base: "flex items-center h-full",
  mobile: "justify-between px-6 max-w-2xl",
  desktop: "mdjustify-between mdpx-6 md:max-w-screen-2xl",
};

export const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const username = "Rahul Chaudhary"; // Replace with actual username from auth context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-screen overflow-auto">
      <div
        className={cn(
          headerStyles.base,
          headerStyles.mobile,
          headerStyles.desktop
        )}
      >
        <div
          className={cn(
            containerStyles.base,
            containerStyles.mobile,
            containerStyles.desktop
          )}
        >
          <div className="hidden md:block">
            <img src="/logo.png" alt="Icon" className="h-8 mt-2" />
          </div>

          <div className="flex md:hidden items-center gap-4">
            <span className="text-xl font-cirka lowercase">{username}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block text-base font-cirka lowercase mr-3">
              {username}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 tracking-wider cursor-pointer"
              title="Logout"
              onClick={handleLogout}
            >
              Logout
              <LogOut className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <main className={cn("flex-grow overflow-auto", "md:pl-16", "md:mt-12")}>
        {children}
      </main>

      <NavigationDock />
    </div>
  );
};
