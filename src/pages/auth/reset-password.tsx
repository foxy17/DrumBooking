import { AuthLayout } from '@/components/layouts/auth-layout';
import { ResetPasswordForm } from '@/pages/auth/reset-password-form';

const ResetPassword = () => {
  return (
    <AuthLayout title="Reset Password" description="Enter your new password">
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
