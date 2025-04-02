import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  ATTENDANCE_STATUS,
  type AttendanceStatusType,
  CLASS_INSTANCE_STATUS,
  type ClassInstanceStatusType,
} from '@/utils/constants';

interface RecentClassStatusBadgeProps {
  classInstanceStatus?: ClassInstanceStatusType | null;
  attendanceStatus?: AttendanceStatusType | null;
  className?: string;
}

const badgeColorMap: Record<string, string> = {
  [CLASS_INSTANCE_STATUS.SCHEDULED]:
    'bg-orange-sunshine-500 text-pop-white-500',
  [ATTENDANCE_STATUS.MISSED]: 'bg-red-500 text-pop-white-500',
  completed: 'bg-park-green-700 text-pop-white-500',
};

const defaultBadgeColor = 'bg-pop-black-200 text-pop-white-300';

const RecentClassStatusBadge: React.FC<RecentClassStatusBadgeProps> = ({
  classInstanceStatus,
  attendanceStatus,
  className,
}) => {
  // Determine what to display based on status
  let displayText = '';
  let colorKey = '';
  let showCheckIcon = false;

  if (attendanceStatus === ATTENDANCE_STATUS.MISSED) {
    displayText = 'Missed';
    colorKey = ATTENDANCE_STATUS.MISSED;
  } else if (classInstanceStatus === CLASS_INSTANCE_STATUS.SCHEDULED) {
    displayText = 'Scheduled';
    colorKey = CLASS_INSTANCE_STATUS.SCHEDULED;
  } else if (classInstanceStatus === CLASS_INSTANCE_STATUS.COMPLETED) {
    showCheckIcon = true;
    colorKey = 'completed';
  }

  const colorClasses = badgeColorMap[colorKey] ?? defaultBadgeColor;

  return (
    <span
      className={cn(
        'px-2 pb-1 pt-[5px] text-[8px] uppercase font-bold font-cirka tracking-[1px] leading-[10px] flex items-center',
        'border-pop-black-300/50',
        colorClasses,
        className
      )}
    >
      {showCheckIcon ? <Check className="h-3 w-3" /> : displayText}
    </span>
  );
};

export default RecentClassStatusBadge;
