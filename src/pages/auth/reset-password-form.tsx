import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/auth.service';
import useAuthStore from '@/store/useAuthStore';

// Define Yup schema for form validation
const schema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const navigate = useNavigate();
  const [resetError, setResetError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: { password: string }) => {
    setIsSubmitting(true);
    setResetError('');

    try {
      await authService.updatePassword(data.password);
      setSuccessMessage('Password reset successful! Logging you in...');

      // Wait for 3 seconds before redirecting
      setTimeout(() => {
        navigate('/login', {
          state: {
            message:
              'Password reset successful! Please login with your new password.',
          },
        });
      }, 2000);
    } catch (error: any) {
      setResetError(
        (error?.message as string) ||
          'Failed to reset password. Please try again.'
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
          <Label htmlFor="password">New Password</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {resetError && (
          <Alert variant="destructive">
            <AlertDescription>{resetError}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
        </Button>
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-300 hover:text-gray-500"
          >
            Login to your account
          </Link>
        </div>
      </form>
    </CardContent>
  );
}
