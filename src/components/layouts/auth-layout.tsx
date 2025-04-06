import { type ReactNode } from 'react';
import { BorderBeam } from '@/components/magicui/border-beam';
import DotPattern from '@/components/magicui/dot-pattern';
import WordPullUp from '@/components/magicui/word-pull-up';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="h-[100dvh] w-screen flex items-center justify-center">
      <div className="flex flex-col justify-center h-full w-full relative px-2 pt-4 login-bg">
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]'
          )}
        />
        <Card className="mx-auto max-w-md bg-card z-10 relative">
          <BorderBeam />
          <CardHeader>
            <WordPullUp
              className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-5xl md:leading-[3.5rem]"
              lines={['Bombay Drums', 'School']}
            />
            <CardTitle className="text-xl pt-4">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          {children}
        </Card>
      </div>
    </div>
  );
}
