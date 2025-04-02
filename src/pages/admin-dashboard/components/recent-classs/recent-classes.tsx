import StudentCard from '@/components/student-card/student-card';
import { type StudentClassInstance } from '@/types/student';
import { RecentClassCard } from './recent-classes-card';

export const RecentClasses = (props: { data: StudentClassInstance[] }) => {
  const { data } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        {data.map(instance => (
          <StudentCard
            key={instance.classInstanceId + instance.studentId}
            student={instance}
          >
            <RecentClassCard student={instance} />
          </StudentCard>
        ))}
      </div>
    </div>
  );
};
