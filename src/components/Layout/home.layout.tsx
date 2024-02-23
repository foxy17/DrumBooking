import React, { type ReactHTMLElement, type ReactNode } from 'react';
import { RiCalendar2Fill, RiHome2Fill, RiUser3Fill } from 'react-icons/ri';
import { Flex } from '@chakra-ui/react';
import { FloatingNav } from '@/components/NavBar';

const navItems = [
  {
    name: 'Home',
    link: '/dash',
    icon: <RiHome2Fill className="h-6 w-6 text-inherit" />,
  },
  {
    name: 'Calendar',
    link: '/calendar',
    icon: <RiCalendar2Fill className="h-6 w-6 text-inherit" />,
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: <RiUser3Fill className="h-6 w-6 text-inherit" />,
  },
];

export const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Flex className="flex-col h-screen max-h-screen min-h-screen w-screen bg-main pb-20 overflow-hidden relative">
      <FloatingNav navItems={navItems} />
      {children}
    </Flex>
  );
};
