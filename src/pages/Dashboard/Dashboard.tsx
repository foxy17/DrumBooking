import { Flex, useDisclosure } from '@chakra-ui/react';
import Header from 'pages/Dashboard/Header';
import { Sessions } from 'pages/Dashboard/Sessions';
import { BottomSheet } from '@/pages/Dashboard/components/BottomSheet';
import { MetaDataCard } from './components/MetaDataCard';
import { DashboardTabs } from './Tabs';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex className="relative flex-col w-full bg-primary h-full overflow-auto">
      <Flex className="relative flex-col w-full px-4">
        <DashboardTabs />
        <Header />
      </Flex>
      <Flex className="relative flex-col w-full px-4 overflow-y-scroll">
        <MetaDataCard />
        <Sessions />
      </Flex>
      <BottomSheet isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Dashboard;
