import { type StatusType } from '@/types/status';

export const STATUS = {
  ONGOING: 'ongoing',
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  ABSENT: 'absent',
  RESCHEDULED: 'rescheduled',
} as const;

export const CLASS_TYPE = {
  SOLO: 'solo',
  DUO: 'duo',
  TRIO: 'trio',
  QUAD: 'quad',
} as const;

export type ClassType = (typeof CLASS_TYPE)[keyof typeof CLASS_TYPE];
