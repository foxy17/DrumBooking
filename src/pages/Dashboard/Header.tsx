import { GoMoveToStart } from 'react-icons/go';
import { useNavigate } from 'react-router';
import { Button, Flex } from '@chakra-ui/react';
import { routeConfig } from 'routes/routeConfig';

const Header = () => {
  const navigate = useNavigate();
  const handleCheckIn = () => {
    navigate(routeConfig.checkin.link);
  };
  return (
    <Flex className="justify-between items-center mt-12 mb-3">
      <Flex className="tracking-wide text-white text-xl  font-sans">
        This Billing Cycle
      </Flex>
      <Button
        className="!bg-white !rounded-full"
        rightIcon={<GoMoveToStart />}
        onClick={handleCheckIn}
      >
        Check in
      </Button>
    </Flex>
  );
};

export default Header;
