import { AuthLayout } from "@/components/layouts/auth-layout";
import { SignupForm } from "./signup-form";

const Signup = () => {
  return (
    <AuthLayout
      title="Add New User"
      description="Create a new user account in the system"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
