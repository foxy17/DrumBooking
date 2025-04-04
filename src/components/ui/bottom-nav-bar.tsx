import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string; // Assuming items will have a path for routing
}

interface BottomNavBarProps {
  items: NavItem[];
}

export function BottomNavBar({ items }: BottomNavBarProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-1 h-14 bg-pop-black-500/85 backdrop-blur-sm text-white">
      <div className="mx-auto flex h-full max-w-md items-center justify-around px-4">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(`/admin${item.path}`);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                'relative flex h-full px-4 items-center justify-center',
                isActive ? 'text-yoyo-300' : 'text-pop-white-100'
              )}
            >
              <Icon className={cn('h-8 w-8')} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
