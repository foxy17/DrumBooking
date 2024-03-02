import { useState } from 'react';
import { Card, CardBody, Flex, Text } from '@chakra-ui/react';
import { motion, useCycle } from 'framer-motion';

import { cn } from '@/utils/cn';

export const MetaDataCard = () => {
  return (
    <Flex className="w-full gap-x-2">
      <Card
        className={cn(
          '!rounded-xl dark:!bg-pop-yellow dark:!text-main !flex-1',
        )}
      >
        <CardBody className="flex-col items-start">
          <Text className="text-lg">Classes</Text>
          <Text className="mb-2 text-lg">Attended</Text>
          <Text className="!text-3xl font-semibold">4 of 4</Text>
        </CardBody>
      </Card>
      <Card
        className={cn('!rounded-xl dark:!bg-pop-pink dark:!text-main !flex-1')}
      >
        <CardBody className="flex-col items-start">
          <Text className="text-lg">Practice</Text>
          <Text className="mb-2 text-lg">Booked</Text>
          <Text className="!text-3xl font-semibold">24</Text>
        </CardBody>
      </Card>
    </Flex>
  );
};
