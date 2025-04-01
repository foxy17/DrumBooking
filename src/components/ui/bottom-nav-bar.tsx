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
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t border-gray-700 bg-pop-black-500 text-white">
      <div className="mx-auto flex h-full max-w-md items-center justify-around px-4">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                'relative flex h-full flex-col items-center justify-center gap-1 text-xs font-medium text-pop-white-100', // Added relative positioning
                isActive && 'text-yoyo-300' // Style for active item text
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
              {!isActive && (
                <div className="absolute bottom-1 h-1 w-8 rounded-full text-pop-white-500" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
