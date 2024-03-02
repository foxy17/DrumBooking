import { Avatar, AvatarGroup, Button, Flex, Tag, Text } from '@chakra-ui/react';

interface SessionCardProps {
  date: string;
  people: string;
  time: string;
  solo?: boolean;
}

export const SessionCard = ({
  date,
  people,
  time,
  solo = false,
}: SessionCardProps) => {
  return (
    <Flex className="flex-col w-full">
      <Flex className="justify-between w-full items-start">
        <Flex className="flex-col w-full">
          <Text className="text-2xl leading-tight font-normal mb-1">
            {date}
          </Text>
          <Text className="text-xl text-pastel-green font-medium tracking-wider mb-3">
            {time}
          </Text>
        </Flex>
        <Flex className="flex-col w-full items-end">
          {solo ? (
            <>
              <Avatar
                size="sm"
                name="Kola Tioluwani"
                src="https://bit.ly/tioluwani-kolawole"
              />
              <Tag className="!bg-main !rounded-full !text-white w-fit !px-3 !py-1 mt-2">
                Solo Drums
              </Tag>
            </>
          ) : (
            <>
              <AvatarGroup size="sm" max={2}>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Avatar
                  name="Kola Tioluwani"
                  src="https://bit.ly/tioluwani-kolawole"
                />
              </AvatarGroup>
              <Tag className="!bg-dark-green !rounded-full !text-white w-fit !px-3 !py-1 mt-2">
                Shared Practice
              </Tag>
            </>
          )}
        </Flex>
      </Flex>
      <Button
        variant="ouitline"
        className="bg-main text-pop-pink !rounded-full !font-normal !w-fit !px-10"
      >
        Cancel
      </Button>
    </Flex>
  );
};
