import { Avatar, AvatarGroup, Flex, Tag, Text } from '@chakra-ui/react';
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
    <Flex className="justify-between w-full items-start">
      <Flex className="flex-col w-full">
        <Text className="text-2xl">{date}</Text>
        {solo ? (
          <Tag className="!bg-pastel-purple tracking-widest !text-white w-fit !font-bold !px-4 !py-2 mt-3">
            Solo Drums
          </Tag>
        ) : (
          <Tag className="!bg-pastel-green tracking-widest w-fit !font-bold !px-4 !py-2 mt-3">
            Shared Practice
          </Tag>
        )}
      </Flex>
      <Flex className="flex-col w-full items-end">
        <Text className="text-2xl text-pop-pink mb-3">{time}</Text>

        {solo ? (
          <Avatar
            size="sm"
            name="Kola Tioluwani"
            src="https://bit.ly/tioluwani-kolawole"
          />
        ) : (
          <AvatarGroup size="sm" max={2}>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Avatar
              name="Kola Tioluwani"
              src="https://bit.ly/tioluwani-kolawole"
            />
          </AvatarGroup>
        )}
      </Flex>
    </Flex>
  );
};
