import { AuthLayout } from '@/components/layouts/auth-layout';
import { SignupForm } from './signup-form';

const Signup = () => {
  return (
    <AuthLayout
      title="Create an Account"
      description="Sign up to get started with our application"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
