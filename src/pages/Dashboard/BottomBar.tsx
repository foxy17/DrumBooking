import { useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import drum from '@/components/Assets/drum.json';
import { NoSession } from '@/pages/Dashboard/components/NoSession';

export const BottomBar = () => {
  const [sessions, setSessions] = useState([]);
  return (
    <Flex className="flex-col bg-white w-full flex-1 mt-16 rounded-t-[32px] shadow-card px-3 pt-4">
      <Flex className="justify-between w-full h-fit items-center px-2">
        <Text className="font-bold text-sm">Today's Sessions</Text>
        <Button
          className={clsx(
            'bg-lightGrey rounded-full text-sm px-8 py-6',
            'hover:bg-main hover:text-white',
          )}
        >
          Attend Class
        </Button>
      </Flex>
      <NoSession sessions={sessions} />
    </Flex>
  );
};
