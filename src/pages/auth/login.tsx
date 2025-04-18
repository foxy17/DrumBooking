import { AuthLayout } from '@/components/layouts/auth-layout';
import { LoginForm } from './login-form';

const Login = () => {
  return (
    <AuthLayout
      title="Login"
      description="Enter your email below to login to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
