import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationDock } from './navigation';

export const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const username = 'Rahul Chaudhary'; // Replace with actual username from auth context

  return (
    <div className="flex flex-col h-[100dvh] w-screen overflow-hidden">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 h-12 border-b border-zinc-800 shrink-0">
        <div className="flex justify-between items-center px-6  h-full max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-xl font-cirka lowercase">{username}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 tracking-wider font-thin"
            title="Logout"
          >
            Logout
            <LogOut className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <main className="flex-grow overflow-auto">{children}</main>

      <NavigationDock />
    </div>
  );
};
