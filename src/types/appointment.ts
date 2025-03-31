import { type ClassType } from '@/utils/constants';

export interface Appointment {
  id: string;
  name: string;
  time: string;
  image: string;
  appointmentType: ClassType;
  grade: number;
  notes: string;
  homework?: string;
  timeEnd?: string;
}
