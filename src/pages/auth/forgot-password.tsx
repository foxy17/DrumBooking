import { AuthLayout } from "@/components/layouts/auth-layout";
import { ForgotPasswordForm } from "./forgot-form";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your email to receive a password reset link"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
