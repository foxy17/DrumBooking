'use client';
import React, { type ReactNode, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';

import { cn } from '@/utils/cn';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: Array<{
    name: string;
    link: string;
    icon?: ReactNode;
  }>;
  className?: string;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const routes = ['/dash', '/calendar', '/profile'];
  const [index, setIndex] = useState(0);
  const id = useMemo(
    () => routes.indexOf(location.pathname),
    [location.pathname],
  );
  console.log(id, location.pathname);
  const variants = {
    active: {
      background: 'blue', // Your desired active background color
      transition: {
        duration: 0.3, // Adjust transition duration as needed
        ease: 'easeInOut', // Customize transition ease function
      },
    },
    inactive: {
      background: 'transparent', // Your desired inactive background color
    },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{
          opacity: 1,
          y: 100,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit w-full justify-center fixed bottom-3 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-1 py-1  items-center gap-x-2 pl-2',
          className,
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            className={cn(
              'relative bg-transparent p-2.5 rounded-full dark:text-neutral-50 items-center flex-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500',
            )}
            onClick={() => {
              setIndex(idx);
              navigate(navItem.link);
            }}
          >
            <span
              className={cn(
                'block sm:hidden',
                idx === id ? 'text-white' : 'text-main',
              )}
            >
              {navItem.icon}
            </span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
            {idx === id && (
              <motion.div
                className="absolute bottom-0 left-0 h-full bg-main rounded-full -z-10 ml-0"
                layoutId="navbar"
                aria-hidden="true"
                style={{
                  width: '100%',
                }}
                transition={{
                  type: 'easeInOut',
                  bounce: 0.1,
                  stiffness: 130,
                  damping: 9,
                  duration: 0.2,
                }}
              />
            )}
          </a>
        ))}
        <motion.div variants={variants} animate={true} className="background" />
      </motion.nav>
    </AnimatePresence>
  );
};
