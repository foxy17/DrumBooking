import StudentCard from '@/components/student-card/student-card';
import { type StudentClassInstance } from '@/types/student';
import { UpcomingClassCard } from './upcoming-class-card';

export const UpcomingClasses = (props: { data: StudentClassInstance[] }) => {
  const { data } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        {data.map(instance => (
          <StudentCard
            key={instance.classInstanceId + instance.studentId}
            student={instance}
          >
            <UpcomingClassCard student={instance} />
          </StudentCard>
        ))}
      </div>
    </div>
  );
};
