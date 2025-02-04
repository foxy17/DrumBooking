export interface Appointment {
  id: string;
  name: string;
  time: string;
  image: string;
  appointmentType: 'Solo' | 'Duo';
  grade: number;
  notes: string;
  homework?: string;
}
