import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/auth.service';

// Define Yup schema for form validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur', // Validate on blur
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { email: string }) => {
    setIsSubmitting(true);
    try {
      await authService.resetPassword(data.email);

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Password reset link has been sent to your email',
      });
      reset();
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message:
          error.message || 'Failed to send reset link. Please try again.',
      });
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
            placeholder="m@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {submitStatus && (
          <Alert
            variant={submitStatus.type === 'error' ? 'destructive' : 'default'}
          >
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-gray-500"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </CardContent>
  );
}
