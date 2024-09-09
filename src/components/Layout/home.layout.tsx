import React from 'react';
import { FloatingNav } from '@/components/NavBar';
import { routeConfig } from '@/routes/routeConfig';

const navItems = [routeConfig.home, routeConfig.checkin, routeConfig.profile];
export const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-col max-h-[100dvh] min-h-[100dvh] w-screen bg-primary pb-20 overflow-hidden relative">
      <FloatingNav navItems={navItems} />
      {children}
    </div>
  );
};
