import { RiCalendar2Fill, RiHome2Fill, RiUser3Fill } from 'react-icons/ri';
import { Flex } from '@chakra-ui/react';
import Header from 'pages/Dashboard/Header';
import { Sessions } from 'pages/Dashboard/Sessions';
import { FloatingNav } from '@/components/NavBar';
import { MetaDataCard } from './components/MetaDataCard';
import { DashboardTabs } from './Tabs';

const Dashboard = () => {
  return (
    <>
      <Flex className="relative flex-col w-full bg-main px-4">
        <DashboardTabs />
        <Header />
      </Flex>
      <Flex className="relative flex-col w-full bg-main px-4 overflow-auto">
        <MetaDataCard />
        <Sessions />
      </Flex>
    </>
  );
};

export default Dashboard;
