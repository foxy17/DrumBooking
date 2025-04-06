import { useState } from 'react';
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

// Define Yup schema for form validation
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur', // Validate on blur
  });
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    setLoginError('');

    try {
      await authService.signIn(data.email, data.password);
      navigate('/dash');
    } catch (error: any) {
      setLoginError(
        (error?.message as string) || 'Login failed. Please try again.'
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
            placeholder="m@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        {loginError && (
          <Alert variant="destructive">
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <div className="text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-sm text-gray-300 hover:text-gray-500"
          >
            Sign up
          </Link>
        </div>
      </form>
    </CardContent>
  );
}
