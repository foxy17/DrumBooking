import { RotateCcw } from 'lucide-react';
import { UserInfo } from '@/components/ui/user-info';
import { type Appointment } from '@/types/appointment';

export const RecentClasses = (props: { data: Appointment[] }) => {
  const { data } = props;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Classes</h2>
      </div>
      <div className="rounded-2xl border-2 border-zinc-400 overflow-hidden">
        {data.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between px-4 py-8 hover:bg-zinc-900 transition-all duration-200"
          >
            <UserInfo classData={appointment} />
            <RotateCcw className="h-8 w-8 text-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  );
};
