import { RotateCcw } from 'lucide-react';
import { UserInfo } from '@/components/ui/user-info';
import { type StudentClassInstance } from '@/types/student';

export const RecentClasses = (props: { data: StudentClassInstance[] }) => {
  const { data } = props;

  return (
    <div>
      <div className="rounded-2xl border-2 border-zinc-400 overflow-hidden">
        {data.map(instance => (
          <div
            key={instance.classInstanceId + instance.studentId}
            className="flex items-center justify-between px-4 py-8 hover:bg-zinc-900 transition-all duration-200"
          >
            <UserInfo
              userInfo={{
                id: instance.studentId,
                name: instance.studentName,
                image: '',
                time: instance.timeSlot,
              }}
            />
            <RotateCcw className="h-8 w-8 text-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  );
};
