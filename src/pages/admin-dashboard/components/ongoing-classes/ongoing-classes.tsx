import React from 'react';
import StudentCard, {
  type StudentData,
} from '@/components/student-card/student-card';
import { type Appointment } from '@/types/appointment';
import { OngoingClassCard } from './ongoing-class-card';

import { type ClassType, STATUS } from '@/utils/constants';

interface OngoingClassesSectionProps {
  ongoingStudents: Appointment[];
}

const convertAppointmentToStudentData = (
  appointment: Appointment
): StudentData => {
  return {
    id: appointment.id,
    name: appointment.name,
    status: STATUS.ONGOING,
    time: appointment.time,
    date: new Date().toISOString().split('T')[0], // Today's date since it's ongoing
    classType: appointment.appointmentType as ClassType,
    notes: appointment.notes,
    timeEnd: appointment.timeEnd,
  };
};

export const OngoingClassesSection: React.FC<OngoingClassesSectionProps> = ({
  ongoingStudents,
}) => {
  if (ongoingStudents.length === 0) {
    return (
      <div className="mb-1">
        <div className="neo-card p-6 pb-1 flex flex-col items-center justify-center">
          <p className="text-pop-white-100">No ongoing classes right now</p>
          <p className="text-sm text-pop-white-300/50 mt-1">
            Check upcoming classes below
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        {ongoingStudents.map(student => (
          <StudentCard
            key={student.id}
            student={convertAppointmentToStudentData(student)}
          >
            <OngoingClassCard
              student={convertAppointmentToStudentData(student)}
            />
          </StudentCard>
        ))}
      </div>
    </div>
  );
};
