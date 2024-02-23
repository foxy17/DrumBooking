import { Flex } from '@chakra-ui/react';
import { HeroImage } from '@/pages/Login/HeroImage';
import { LoginForm } from './LoginForm';

const Login = () => {
  return (
    <Flex className="flex-col justify-end h-screen w-full relative">
      <HeroImage />
      <Flex className="flex-col items-center bg-secondary w-full h-3/5 z-10 rounded-t-md shadow-md">
        <LoginForm />
      </Flex>
    </Flex>
  );
};

export default Login;
