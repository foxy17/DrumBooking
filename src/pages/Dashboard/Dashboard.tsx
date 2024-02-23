import { Flex, useDisclosure } from '@chakra-ui/react';
import Header from 'pages/Dashboard/Header';
import { Sessions } from 'pages/Dashboard/Sessions';
import { BottomSheet } from '@/pages/Dashboard/components/BottomSheet';
import { MetaDataCard } from './components/MetaDataCard';
import { DashboardTabs } from './Tabs';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex className="relative flex-col w-full bg-main px-4">
        <DashboardTabs />
        <Header onClick={onOpen} />
      </Flex>
      <Flex className="relative flex-col w-full bg-main px-4 overflow-auto">
        <MetaDataCard />
        <Sessions />
      </Flex>
      <BottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Dashboard;
