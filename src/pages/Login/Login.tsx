import { Flex } from '@chakra-ui/react';
import { HeroImage } from '@/pages/Login/HeroImage';
import { LoginForm } from './LoginForm';

const Login = () => {
  return (
    <Flex className="flex-col justify-center h-full w-full relative px-2 pt-4 login-bg">
      <Flex className="flex-col items-center w-full h-fit z-10 rounded-md shadow-md card-bg">
        <LoginForm />
      </Flex>
    </Flex>
  );
};

export default Login;
