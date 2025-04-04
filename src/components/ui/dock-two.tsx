import * as React from 'react';
import { type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface DockProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  items: Array<{
    icon: LucideIcon;
    label: string;
    onClick?: () => void;
  }>;
}

interface DockIconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  labelPosition?: 'top' | 'right';
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const sideFloatingAnimation = {
  initial: { x: 0 },
  animate: {
    x: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, className, labelPosition = 'top' }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{
          scale: 1.1,
          ...(labelPosition === 'top' ? { y: -2 } : { x: -2 }),
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          'relative group p-2.5 rounded-full cursor-pointer',
          'transition-colors',
          className
        )}
      >
        <Icon className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        <span
          className={cn(
            'absolute px-2 py-1 rounded text-xs',
            'bg-popover text-popover-foreground',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity whitespace-nowrap pointer-events-none',
            labelPosition === 'top'
              ? '-top-8 left-1/2 -translate-x-1/2'
              : 'top-1/2 -translate-y-1/2 left-full ml-2'
          )}
        >
          {label}
        </span>
      </motion.button>
    );
  }
);
DockIconButton.displayName = 'DockIconButton';

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className, orientation = 'horizontal' }, ref) => {
    const isVertical = orientation === 'vertical';

    return (
      <div
        ref={ref}
        className={cn(
          isVertical
            ? 'h-full flex flex-col items-center justify-center'
            : 'w-full flex items-center justify-center p-2',
          className
        )}
      >
        <div
          className={cn(
            isVertical
              ? 'h-full flex flex-col items-center justify-center relative'
              : 'w-full max-w-4xl rounded-xl flex items-center justify-center relative'
          )}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={isVertical ? sideFloatingAnimation : floatingAnimation}
            className={cn(
              isVertical
                ? 'flex flex-col items-center gap-6 sm:gap-7 md:gap-8 lg:gap-10 h-full py-4'
                : 'flex items-center gap-3 p-2 rounded-xl backdrop-blur-lg border shadow-md bg-background/80 border-border',
              isVertical ? 'bg-transparent' : '',
              'transition-shadow duration-300'
            )}
          >
            {items.map(item => (
              <DockIconButton
                key={item.label}
                {...item}
                className={
                  isVertical ? 'text-gray-400 hover:text-white' : undefined
                }
                labelPosition={isVertical ? 'right' : 'top'}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);
Dock.displayName = 'Dock';

export { Dock };
