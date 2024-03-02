import { useState } from 'react';
import { Card, CardBody, Flex, IconButton, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PracticeEditCard } from '@/pages/Dashboard/components/PracticeEditCard';
import { useCounterStore } from '@/store/useCounterStore';

import { cn } from '@/utils/cn';

export const MetaDataCard = () => {
  const [isOpen, toggleOpen] = useState(false);
  const count = useCounterStore((state) => state.value);

  return (
    <>
      {isOpen && <PracticeEditCard toggleOpen={toggleOpen} />}
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
          className={cn(
            '!rounded-xl dark:!bg-pop-pink dark:!text-main !flex-1',
            isOpen ? 'invisible ' : 'visible',
          )}
          as={motion.div}
          layoutId="card-booked"
          onClick={() => {
            toggleOpen(!isOpen);
          }}
        >
          <CardBody
            as={motion.div}
            className="flex-col items-start"
            layoutId="card-booked-body"
          >
            <Flex
              className="flex-col"
              as={motion.div}
              layoutId="card-booked-header"
            >
              <Text className="text-lg">Practice</Text>
              <Text className="mb-2 text-lg">Booked</Text>
            </Flex>
            <Text
              className="!text-3xl font-semibold"
              as={motion.div}
              layoutId="card-booked-value"
            >
              {count}
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};
