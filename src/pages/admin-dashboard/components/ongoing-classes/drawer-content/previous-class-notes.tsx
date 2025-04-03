import { type StudentClassInstance } from '@/types/student';
import { formatPreviousClassDate } from '@/utils/date-string-helper';
import { SectionHeader } from './section-header';

interface PreviousClassNotesProps {
  student: StudentClassInstance;
}

export const PreviousClassNotes = ({ student }: PreviousClassNotesProps) => {
  return (
    <div className="mb-4">
      <SectionHeader>
        Previous Class - {formatPreviousClassDate(student.date)}
      </SectionHeader>

      {student.notes ? (
        <div className="rounded-md bg-pop-black-400/50 py-1 min-h-[120px]">
          <p className="text-muted-foreground">{student.notes}</p>
        </div>
      ) : (
        <div className="text-center text-muted-foreground italic py-4 bg-pop-black-400/20 rounded-md">
          No previous class notes.
        </div>
      )}
    </div>
  );
};
