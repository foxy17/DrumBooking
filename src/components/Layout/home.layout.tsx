import React, { type ReactHTMLElement, type ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import { routeConfig } from 'routes/routeConfig';
import { FloatingNav } from '@/components/NavBar';

const navItems = [routeConfig.home, routeConfig.checkin, routeConfig.profile];
export const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Flex className="flex-col max-h-[100dvh] min-h-[100dvh] w-screen bg-primary pb-20 overflow-hidden relative">
      <FloatingNav navItems={navItems} />
      {children}
    </Flex>
  );
};
