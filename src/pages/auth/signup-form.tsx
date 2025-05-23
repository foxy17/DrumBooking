import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";

// Define Yup schema for form validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // Validate on blur
  });
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    setSignupError("");

    try {
      await authService.signUp(data.email, data.password);
      // Show success message and redirect to login
      navigate("/login", {
        state: {
          message: "User added successfully!",
        },
      });
    } catch (error: any) {
      setSignupError(
        (error?.message as string) || "Failed to add user. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardContent>
      <form
        noValidate={true}
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="user@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {signupError && (
          <Alert variant="destructive">
            <AlertDescription>{signupError}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding User..." : "Add User"}
        </Button>
        <div className="text-center">
          <span className="text-sm text-gray-500">Back to </span>
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-gray-500"
          >
            Login
          </Link>
        </div>
      </form>
    </CardContent>
  );
}
