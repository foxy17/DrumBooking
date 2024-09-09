import { HeroImage } from '@/pages/Login/HeroImage';
import { LoginForm } from './LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col justify-center h-full w-full relative px-2 pt-4 login-bg">
      <div className="flex flex-col items-center w-full h-fit z-10 rounded-md shadow-md card-bg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
