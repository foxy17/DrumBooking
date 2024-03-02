import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Card, CardBody, Flex, IconButton, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCounterStore } from '@/store/useCounterStore';

import { cn } from '@/utils/cn';

interface PracticeCardProps {
  toggleOpen: (value: boolean) => void;
}
export const PracticeEditCard = ({ toggleOpen }: PracticeCardProps) => {
  const { value, setValue } = useCounterStore((state) => state);
  const [count, setCount] = useState(value);

  const onClose = () => {
    toggleOpen(false);
    setValue(count);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        style={{ pointerEvents: 'auto' }}
        className="z-20 fixed will-change-[opacity] -translate-x-2/4 w-full left-2/4 inset-y-0 blur-bg"
        onClick={onClose}
      ></motion.div>
      <Card
        className={cn(
          '!rounded-xl dark:!bg-pop-pink dark:!text-main !fixed overflow-hidden mx-4 py-2 top-1/3 inset-x-0 z-30',
        )}
        layoutId="card-booked"
        as={motion.div}
      >
        <CardBody as={motion.div} className="flex flex-col justify-start">
          <Flex
            className="gap-x-2"
            as={motion.div}
            layoutId="card-booked-header"
          >
            <Text className="text-xl">Practice</Text>
            <Text className="mb-4 text-xl">Booked</Text>
          </Flex>
          <Flex className="justify-between">
            <Text
              className="!text-3xl font-semibold"
              as={motion.div}
              layoutId="card-booked-value"
              layout="position"
            >
              {count}
            </Text>
            <Flex className="flex-row items-center gap-x-4">
              <IconButton
                aria-label="minus"
                onClick={decrement}
                _active={{
                  transform: 'scale(0.5)',
                }}
                icon={<FaMinus />}
                isRound={true}
                color="main"
              />
              <IconButton
                aria-label="plus"
                _active={{
                  bg: 'main',
                  transform: 'scale(1.5)',
                }}
                _hover={{ bg: 'main' }}
                onClick={increment}
                icon={<FaPlus />}
                isRound={true}
                bgColor="main"
                color="white"
              />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};
