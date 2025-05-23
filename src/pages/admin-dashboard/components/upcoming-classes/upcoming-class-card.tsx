import { useStudentCardSheet } from "@/components/student-card/student-card";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/modalStore";
import { MODAL_TYPES } from "@/types/modals";
import type { StudentClassInstance } from "@/types/student";
import { Calendar, X } from "lucide-react";
import { PreviousClassNotes } from "./components/previous-class-notes";

export const UpcomingClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  const { setSheetOpen } = useStudentCardSheet();
  const { openModal } = useModalStore();

  const handleStartClass = () => {
    openModal(MODAL_TYPES.SIGNATURE, {
      studentName: student.studentName,
      onSave: (signatureData: string) => {
        console.log("Signature saved:", signatureData);
        // Here you would save the signature to the database
        setSheetOpen(false);
      },
    });
  };

  const handleReschedule = () => {
    // TODO: Implement reschedule functionality
    console.log("Reschedule class for:", student.studentName);
  };

  const handleMarkAsMissed = () => {
    // TODO: Implement mark as missed functionality
    console.log("Mark as missed for:", student.studentName);
  };

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

        <div className="flex gap-3 mb-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReschedule}
            className="flex-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800 font-medium"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Reschedule
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMarkAsMissed}
            className="flex-1 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800 font-medium"
          >
            <X className="mr-2 h-4 w-4" />
            Mark as Missed
          </Button>
        </div>

        <Button className="w-full" onClick={handleStartClass}>
          Start Class
        </Button>
      </div>
    </div>
  );
};
