import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { Avatar, Flex, Heading } from '@chakra-ui/react';
import { ActivityRings } from '@jonasdoesthings/react-activity-rings';
import clsx from 'clsx';
import { TypewriterEffect } from '@/components/Effects';

export const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const words = [
    {
      text: 'Hello',
      className: 'text-light-gray text-5xl font-[500]',
    },
    {
      text: 'Arnav!',
      className: 'text-white text-5xl font-[500]',
    },
  ];
  return (
    <Flex className="flex-col">
      <Flex className="justify-between items-center mt-8 gap-x-4">
        <Heading className="text-white font-bold text-4xl self-center">
          Bombay Drum School
        </Heading>
        <Avatar
          size="lg"
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
        />
      </Flex>
      <Flex className="w-full mt-8 -mb-6">
        <TypewriterEffect words={words} cursorClassName="h-0" />
      </Flex>
    </Flex>
  );
};
