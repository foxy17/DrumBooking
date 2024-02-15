import { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { IoMailOutline } from 'react-icons/io5';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import useAuthStore from '@/store/useAuthStore';

export const LoginForm = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsAuthenticated(true);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const Icon = showPassword ? LuEye : LuEyeOff;

  return (
    <div className="flex flex-col items-center px-5 w-full max-w-sm h-full mt-8 prose">
      <h1 className="tracking-tight mb-1">Bombay Drum School</h1>
      <h3 className="mt-1 text-neutral-500 font-normal mb-7">
        Unlock Your Rhythm
      </h3>
      <form className="not-prose flex flex-col justify-center items-center gap-8 w-full">
        <div className="w-full max-w-sm">
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
        </div>
        <div className="w-full max-w-sm mb-4">
          <InputGroup size="md">
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
          <div className="flex flex-row-reverse mt-3 cursor-pointer">
            Forgot Password?
          </div>
        </div>
        <Button
          className="!bg-black w-full"
          colorScheme="red"
          fontWeight="normal"
          fontSize={16}
          variant="solid"
          height="44px"
        >
          Sign In
        </Button>
        <a className="text-xs text-gray-500">Terms and Conditions</a>
      </form>
    </div>
  );
};
