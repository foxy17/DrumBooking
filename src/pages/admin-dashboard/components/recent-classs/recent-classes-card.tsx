import { type StudentClassInstance } from '@/types/student';

export const RecentClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl tracking-widest font-cirka text-foreground border-b border-b-orange-sunshine-500 pb-2">
          {student.studentName}
        </h2>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4">
          {student.notes && (
            <div className="mb-3 rounded-md bg-pop-black-400/50">
              <div className="flex items-start gap-2">
                <p className="text-pop-white-100">{student.notes}</p>
              </div>
            </div>
          )}
          {!student.notes && (
            <div className="text-center text-muted-foreground italic py-4">
              No previous class notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
