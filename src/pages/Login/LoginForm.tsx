import { useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { IoLockClosed, IoMailOutline } from 'react-icons/io5';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/services/auth';
import useAuthStore from '@/store/useAuthStore';

export const LoginForm = () => {
  const authService = new AuthService();
  const { setIsAuthenticated } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<any> = async (data) => {
    navigate('/dash');
  };

  const checkAuth = async () => {
    // Check if user is authenticated
    const isAuthenticated = authService.isAuthenticated();
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const Icon = showPassword ? LuEye : LuEyeOff;

  return (
    <div className="flex flex-col px-5 w-full max-w-sm h-full mt-6 prose">
      <h1 className="self-star tracking-tight mb-1 text-white">
        Bombay Drum School
      </h1>
      <h3 className="mt-2 self-start font-normal mb-7 text-base-100">
        Unlock Your Rhythm
      </h3>
      <form className="not-prose flex flex-col justify-center items-center gap-8 w-full mt-2">
        <div className="w-full max-w-sm">
          <input
            type="email"
            className="!bg-white rounded !border-none !focus:ring-0 !focus:outline-none !focus:border-none"
            placeholder="Enter Email"
          />
        </div>
        <div className="w-full max-w-sm mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="pr-4.5 !bg-white rounded !border-none !focus:ring-0 !focus:outline-none !focus:border-none"
          />
          <div className="flex-row-reverse mt-3 cursor-pointer text-sm text-green-100">
            Forgot Password?
          </div>
        </div>
        <div
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onSubmit}
        >
          Sign In
        </div>
      </form>
      <a className="text-xs my-6 text-white/80 self-center">
        Terms and Conditions
      </a>
    </div>
  );
};
