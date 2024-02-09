
import { type SubmitHandler, useForm } from 'react-hook-form';
import useAuthStore from '@/store/useAuthStore';

const Login = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);


  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsAuthenticated(true);
  };

  return (<></>);
};

export default Login;
