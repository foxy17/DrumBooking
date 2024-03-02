import { Button, Flex } from '@chakra-ui/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import drum from '@/components/Assets/drum.json';

export const NoSession = ({
  sessions,
  onClick,
}: {
  sessions: any[];
  onClick: () => void;
}) => {
  return (
    <Flex className="flex-col h-max items-center pb-6 bg-dark-grey mt-2 rounded-xl">
      <Flex className="mt-4 text-3xl font-[200] text-center text-white">
        No Upcoming <br />
        Practice Session
      </Flex>
      <Button
        className={clsx(
          '!bg-white !text-main !rounded-full !text-md !px-24 py-6',
          'hover:!bg-info hover:!text-black mt-12',
        )}
        onClick={onClick}
      >
        Book Now
      </Button>
    </Flex>
  );
};
