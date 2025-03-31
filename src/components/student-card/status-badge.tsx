import React from 'react';
import { cn } from '@/lib/utils';

import type { ClassType } from '@/utils/constants';

interface StatusBadgeProps {
  classType: ClassType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ classType, className }) => {
  return (
    <span
      className={cn(
        'px-2 pb-1 pt-[5px] text-[8px] uppercase font-bold font-cirka tracking-[1px] leading-[10px]',
        'bg-info-500 text-pop-white-300 border-pop-black-300/50',
        className
      )}
    >
      {classType.charAt(0).toUpperCase() + classType.slice(1)}
    </span>
  );
};

export default StatusBadge;
