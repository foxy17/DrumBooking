import { Button, Flex } from '@chakra-ui/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import drum from '@/components/Assets/drum.json';

export const NoSession = ({ sessions }: { sessions: any[] }) => {
  return (
    <>
      {sessions.length === 0 && (
        <Flex className="flex-col h-max items-center pb-4">
          <Flex className="mt-4 text-2xl text-center z-10">
            No Practice Session Booked for today
          </Flex>
          <Lottie
            animationData={drum}
            loop={true}
            className="h-72 -mt-12 z-0"
          />
          <Button
            className={clsx(
              'bg-[#E3B874FF] text-[#171A1FFF] rounded-full text-md px-8 py-6 w-full',
              'hover:bg-info hover:text-black mt-6',
            )}
          >
            Book Now
          </Button>
        </Flex>
      )}
    </>
  );
};
