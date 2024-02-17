import { RiCalendar2Fill, RiHome2Fill, RiUser3Fill } from 'react-icons/ri';
import { Flex } from '@chakra-ui/react';
import { FloatingNav } from '@/components/NavBar';
import { BottomBar } from './BottomBar';
import Stats from './Stats';
import { DashboardTabs } from './Tabs';
const Dashboard = () => {
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <RiHome2Fill className="h-6 w-6 text-black" />,
    },
    {
      name: 'Calendar',
      link: '/calendar',
      icon: <RiCalendar2Fill className="h-6 w-6 text-white" />,
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: <RiUser3Fill className="h-6 w-6 text-white" />,
    },
  ];
  return (
    <Flex className="relative flex-col h-full min-h-screen w-screen bg-main px-4 overflow-auto">
      <FloatingNav navItems={navItems} />
      <DashboardTabs />
      <Stats />
      {/* <BottomBar /> */}
    </Flex>
  );
};

export default Dashboard;
