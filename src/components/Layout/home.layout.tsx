import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { routeConfig } from '@/routes/routeConfig';
import { NavigationDock } from './navigation';

const navItems = [routeConfig.home, routeConfig.checkin, routeConfig.profile];
export const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-col max-h-[100dvh] min-h-[100dvh] w-screen pb-20 overflow-x-hidden relative">
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Avatar>
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </div>
      {children}
      <NavigationDock />
    </div>
  );
};
