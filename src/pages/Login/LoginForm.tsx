import { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { IoLockClosed, IoMailOutline } from 'react-icons/io5';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { AuthService } from '@/services/auth';
import useAuthStore from '@/store/useAuthStore';

export const LoginForm = () => {
  const authService = new AuthService();
  const { setIsAuthenticated } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    navigate('/dash');
  };

  const checkAuth = async () => {
    // Check if user is authenticated
    const isAuthenticated = await authService.isAuthenticated();
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const Icon = showPassword ? LuEye : LuEyeOff;

  return (
    <Flex className="flex flex-col px-5 w-full max-w-sm h-full mt-6 prose">
      <Heading size="2xl" className="self-star tracking-tight mb-1 text-white">
        Bombay Drum School
      </Heading>
      <h3 className="mt-2 self-start font-normal mb-7 text-base-100">
        Unlock Your Rhythm
      </h3>
      <form className="not-prose flex flex-col justify-center items-center gap-8 w-full mt-2">
        <Box className="w-full max-w-sm">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IoMailOutline color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              className="!bg-white rounded !border-none !focus:ring-0 !focus:outline-none !focus:border-none"
              placeholder="Enter Email"
            />
          </InputGroup>
        </Box>
        <Box className="w-full max-w-sm mb-4">
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <IoLockClosed color="gray.300" />
            </InputLeftElement>
            <Input
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              className="!bg-white rounded !border-none !focus:ring-0 !focus:outline-none !focus:border-none"
            />
            <InputRightElement width="4.5rem">
              <Icon className="" onClick={togglePassword} />
            </InputRightElement>
          </InputGroup>
          <Flex className="flex-row-reverse mt-3 cursor-pointer text-sm text-green-100">
            Forgot Password?
          </Flex>
        </Box>
        <Button
          className="!bg-green w-full"
          colorScheme="red"
          fontWeight="normal"
          fontSize={18}
          variant="solid"
          height="44px"
          onClick={onSubmit}
        >
          Sign In
        </Button>
      </form>
      <a className="text-xs my-6 text-white/80 self-center">
        Terms and Conditions
      </a>
    </Flex>
  );
};
