import { Check, X } from 'lucide-react';
import { useStudentCardSheet } from '@/components/student-card/student-card';
import { Button } from '@/components/ui/button';
import { type StudentClassInstance } from '@/types/student';

export const UpcomingClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  const { setSheetOpen } = useStudentCardSheet();

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
        <div className="flex justify-between gap-4">
          <Button
            variant="secondary"
            className="w-full bg-rose-300 text-rose-700 hover:bg-rose-300/80 rounded-full"
          >
            <X className="mr-2 h-4 w-4" />
            Missed
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-white text-black hover:bg-white/90 rounded-full"
          >
            <Check className="mr-2 h-4 w-4" />
            Check In
          </Button>
        </div>
      </div>
    </div>
  );
};
