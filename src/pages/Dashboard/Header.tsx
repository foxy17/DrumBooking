import { GoMoveToStart } from 'react-icons/go';
import { Button, Flex } from '@chakra-ui/react';

const Header = ({ onClick }) => {
  return (
    <Flex className="justify-between items-end mt-12 mb-3">
      <Flex className="tracking-wider text-white text-xl  font-sans ">
        This Month
      </Flex>
      <Button
        className=" !bg-white !rounded-full"
        rightIcon={<GoMoveToStart />}
        onClick={onClick}
      >
        Check In
      </Button>
    </Flex>
  );
};

export default Header;
