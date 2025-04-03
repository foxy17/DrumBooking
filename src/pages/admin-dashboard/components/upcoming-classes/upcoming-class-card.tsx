import { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { SignatureModal } from '@/components/signature-modal/signature-modal';
import { useStudentCardSheet } from '@/components/student-card/student-card';
import { Button } from '@/components/ui/button';
import DragToCheckinButton from '@/components/ui/drag-to-complete-button';
import { type StudentClassInstance } from '@/types/student';
import { PreviousClassNotes } from './components/previous-class-notes';

export const UpcomingClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  const { setSheetOpen } = useStudentCardSheet();
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl tracking-widest font-cirka text-foreground border-b border-b-orange-sunshine-500 pb-2">
          {student.studentName}
        </h2>
      </div>

      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
          <PreviousClassNotes student={student} />
        </div>

        <div className="flex justify-between gap-4 mb-4">
          <Button
            variant="secondary"
            className="w-full bg-white text-black hover:bg-white/90 rounded-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Reschedule
          </Button>
          <Button
            variant="secondary"
            className="w-full bg-rose-300 text-rose-700 hover:bg-rose-300/80 rounded-full"
          >
            <X className="mr-2 h-4 w-4" />
            Mark as Missed
          </Button>
        </div>

        <DragToCheckinButton
          variant="sharp"
          onComplete={() => {
            setIsSignatureModalOpen(true);
          }}
          text="Swipe to Check In"
        />
      </div>

      {isSignatureModalOpen && (
        <SignatureModal
          isOpen={isSignatureModalOpen}
          onClose={() => {
            setIsSignatureModalOpen(false);
          }}
          onSave={(signatureData: string) => {
            console.log('Signature saved:', signatureData);
            // Here you would save the signature to the database
            setIsSignatureModalOpen(false);
            setSheetOpen(false);
          }}
          studentName={student.studentName}
        />
      )}
    </div>
  );
};
