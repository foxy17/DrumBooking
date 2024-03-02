import { useNavigate } from 'react-router';
import { Avatar, Box, Flex, Heading } from '@chakra-ui/react';
import { routeConfig } from 'routes/routeConfig';

export const DashboardTabs = () => {
  const navigate = useNavigate();
  const onProfileClick = () => {
    navigate(routeConfig.profile.link);
  };
  return (
    <Flex className="flex-col">
      <Flex className="justify-between items-center mt-8 gap-x-4 relative">
        <Heading className="text-white font-bold text-4xl self-center">
          Bombay Drum School
        </Heading>
        <Avatar
          onClick={onProfileClick}
          size="lg"
          name="Prosper Otemuyiwa"
          src="https://bit.ly/prosper-baba"
          className="z-10"
        />
        <Box className="absolute -right-3.5 h-24 w-24 bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-2xl z-0" />
      </Flex>
    </Flex>
  );
};
