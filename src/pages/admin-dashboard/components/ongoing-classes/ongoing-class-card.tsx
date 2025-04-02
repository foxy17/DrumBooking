import { useEffect, useRef, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { useStudentCardSheet } from '@/components/student-card/student-card';
import { Button } from '@/components/ui/button';
import DragToCompleteButton from '@/components/ui/drag-to-complete-button';
import { Textarea } from '@/components/ui/textarea';
import { type StudentClassInstance } from '@/types/student';
import './ongoing-class-card.css';

export const OngoingClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  const { setSheetOpen } = useStudentCardSheet();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Format the date for display (e.g., "12th May")
  const formatPreviousClassDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });

    // Add ordinal suffix to day
    const suffix = getDaySuffix(day);
    return `${day}${suffix} ${month}`;
  };

  // Helper function to get day suffix (st, nd, rd, th)
  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  useEffect(() => {
    if (isAddingNote && textareaRef.current) {
      // Focus the textarea when it appears
      textareaRef.current.focus();
    }
  }, [isAddingNote]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl tracking-widest font-cirka text-foreground border-b border-b-orange-sunshine-500 pb-2">
          {student.studentName}
        </h2>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4">
          {/* Previous class notes section with heading */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-pop-white-300 mb-2">
              Previous Class - {formatPreviousClassDate(student.date)}
            </h3>

            {student.notes ? (
              <div className="rounded-md bg-pop-black-400/50 p-3 min-h-[120px]">
                <p className="text-pop-white-100">{student.notes}</p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground italic py-4 bg-pop-black-400/20 rounded-md">
                No previous class notes.
              </div>
            )}
          </div>

          <div
            className={`textarea-container ${isAddingNote ? 'visible' : ''}`}
          >
            <Textarea
              ref={textareaRef}
              value={newNote}
              onChange={e => {
                setNewNote(e.target.value);
              }}
              className="note-textarea"
              placeholder="Enter class notes..."
            />
          </div>

          <div className="mt-3">
            <Button
              variant="secondary"
              className={clsx(
                'w-full',
                isAddingNote ? 'bg-success-500!' : '',
                'add-note-button',
                { save: isAddingNote }
              )}
              onClick={() => {
                if (isAddingNote) {
                  setIsAddingNote(false);
                } else {
                  setIsAddingNote(true);
                }
              }}
            >
              {isAddingNote ? (
                <>
                  <FaSave className="h-4 w-4 mr-2" />
                  Save Note
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </>
              )}
            </Button>
          </div>
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
