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
    <>
      {sessions.length === 0 && (
        <Flex className="flex-col h-max items-center pb-4 bg-dark-grey mt-3 rounded-xl z-10">
          <Flex className="mt-4 text-3xl font-[200] text-center text-white">
            No Upcoming <br />
            Practice Session
          </Flex>
          <Button
            className={clsx(
              '!bg-white !text-main !rounded-full !text-md !px-24 py-6',
              'hover:!bg-info hover:!text-black mt-6',
            )}
            onClick={onClick}
          >
            Book Now
          </Button>
        </Flex>
      )}
      <Lottie animationData={drum} loop={true} className="h-72 -mt-20 z-0" />
    </>
  );
};
