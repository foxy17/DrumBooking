import { useStudentCardSheet } from "@/components/student-card/student-card";
import DragToCompleteButton from "@/components/ui/drag-to-complete-button";
import type { StudentClassInstance } from "@/types/student";
import { useState } from "react";
import { CurrentClassNotes } from "./components/current-class-notes";
import { PreviousClassNotes } from "./components/previous-class-notes";

export const OngoingClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  const { setSheetOpen } = useStudentCardSheet();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState("");

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
          <CurrentClassNotes
            newNote={newNote}
            setNewNote={setNewNote}
            isAddingNote={isAddingNote}
            setIsAddingNote={setIsAddingNote}
          />
        </div>

        <DragToCompleteButton
          variant="sharp"
          onComplete={() => {}}
          onClose={() => {
            setSheetOpen(false);
          }}
          text="Slide to Complete Class"
        />
      </div>
    </div>
  );
};
