import { cn } from "@/lib/utils";
import type React from "react";

import type { ClassType } from "@/utils/constants";

interface StatusBadgeProps {
  classType: ClassType;
  className?: string;
}

const badgeColorMap: Record<ClassType, string> = {
  solo: "bg-poli-purple-500 text-pop-white-500",
  duo: "bg-yoyo-500 text-pop-white-500",
  trio: "bg-pink-pong-500 text-pop-white-500",
  quad: "bg-park-green-700 text-pop-white-500",
};

const defaultBadgeColor = "bg-pop-black-200 text-pop-white-300";

const StatusBadge: React.FC<StatusBadgeProps> = ({ classType, className }) => {
  const colorClasses = badgeColorMap[classType] ?? defaultBadgeColor;

  return (
    <span
      className={cn(
        "px-2 pb-1 pt-[5px] text-[8px] uppercase font-bold font-cirka tracking-[1px] leading-[10px]",
        "border-pop-black-300/50",
        colorClasses,
        className
      )}
    >
      {classType.charAt(0).toUpperCase() + classType.slice(1)}
    </span>
  );
};

export default StatusBadge;
