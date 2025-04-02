// import { type StatusType } from '@/types/status';

export const STATUS = {
  ONGOING: 'ongoing',
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  ABSENT: 'absent',
  RESCHEDULED: 'rescheduled',
} as const;

export const ATTENDANCE_STATUS = {
  ATTENDED: 'attended',
  PENDING: 'pending',
  MISSED: 'missed',
} as const;

export type AttendanceStatusType =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

export const CLASS_INSTANCE_STATUS = {
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  SCHEDULED: 'scheduled',
} as const;

export type ClassInstanceStatusType =
  (typeof CLASS_INSTANCE_STATUS)[keyof typeof CLASS_INSTANCE_STATUS];

export const CLASS_TYPE = {
  SOLO: 'solo',
  DUO: 'duo',
  TRIO: 'trio',
  QUAD: 'quad',
} as const;

export type ClassType = (typeof CLASS_TYPE)[keyof typeof CLASS_TYPE];
