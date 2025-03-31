import React from 'react';
import { Clock } from 'lucide-react';
import StudentCard, {
  type StudentData,
} from '@/components/student-card/student-card';
import { type Appointment } from '@/types/appointment';

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

const OngoingClassesSection: React.FC<OngoingClassesSectionProps> = ({
  ongoingStudents,
}) => {
  if (ongoingStudents.length === 0) {
    return (
      <div className="mb-1">
        <h2 className="text-xl font-bold text-pop-white-500 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-poli-purple-500" />
          Ongoing Classes
        </h2>
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
    <div className="mb-1">
      <h2 className="font-cirka font-semiBold tracking-wide text-2xl text-pop-white-500 mb-3 flex items-center">
        ongoing classes
      </h2>
      <div className="space-y-2">
        {ongoingStudents.map(student => (
          <StudentCard
            key={student.id}
            student={convertAppointmentToStudentData(student)}
            onAddNote={() => {}}
            onViewFullNote={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default OngoingClassesSection;
