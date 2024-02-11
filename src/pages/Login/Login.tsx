import { HeroImage } from '@/pages/Login/HeroImage';
import { LoginForm } from './LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col justify-end h-screen w-full relative">
      <HeroImage />
      <div className="flex flex-col items-center bg-base-100 w-full h-3/5 z-10 rounded-t-md shadow-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
