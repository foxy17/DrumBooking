import { RiCalendar2Fill, RiHome2Fill, RiUser3Fill } from 'react-icons/ri';
import { Flex } from '@chakra-ui/react';
import Header from 'pages/Dashboard/Header';
import { Sessions } from 'pages/Dashboard/Sessions';
import { FloatingNav } from '@/components/NavBar';
import { MetaDataCard } from './components/MetaDataCard';
import { DashboardTabs } from './Tabs';

const Dashboard = () => {
  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <RiHome2Fill className="h-6 w-6 text-white" />,
    },
    {
      name: 'Calendar',
      link: '/calendar',
      icon: <RiCalendar2Fill className="h-6 w-6 text-main" />,
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: <RiUser3Fill className="h-6 w-6 text-main" />,
    },
  ];
  return (
    <Flex className="flex-col h-screen max-h-screen min-h-screen w-screen bg-main pb-20 overflow-hidden relative">
      <FloatingNav navItems={navItems} />
      <Flex className="relative flex-col w-full bg-main px-4">
        <DashboardTabs />
        <Header />
      </Flex>
      <Flex className="relative flex-col w-full bg-main px-4 overflow-auto">
        <MetaDataCard />
        <Sessions />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
