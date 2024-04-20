import { Button, Flex } from '@chakra-ui/react';

export const CheckIn = () => {
  return (
    <Flex className="flex-col w-full h-full">
      <h1>Check In Requests</h1>
      <Flex className="flex-row text-xl captiazlie ">
        This is another text example{' '}
      </Flex>
      <Button>Check In to the class</Button>

      <Flex className="flex-col">Adding this flex here</Flex>
    </Flex>
  );
};
