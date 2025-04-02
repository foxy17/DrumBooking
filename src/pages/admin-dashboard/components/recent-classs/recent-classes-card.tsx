import { useEffect, useRef, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { type StudentClassInstance } from '@/types/student';
import './recent-classes-card.css';

export const RecentClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(student.notes ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingNote && textareaRef.current) {
      // Focus the textarea and move cursor to the end
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditingNote]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl tracking-widest font-cirka text-foreground border-b border-b-orange-sunshine-500 pb-2">
          {student.studentName}
        </h2>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4">
          {isEditingNote ? (
            <div className="mb-3">
              <Textarea
                ref={textareaRef}
                value={noteText}
                onChange={e => {
                  setNoteText(e.target.value);
                }}
                className="note-textarea"
                placeholder="Enter class notes..."
              />
            </div>
          ) : (
            <div className="mb-3 rounded-md bg-pop-black-400/50 relative min-h-[120px]">
              <button
                onClick={() => {
                  setIsEditingNote(true);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-pop-black-400/50"
                aria-label="Edit note"
              >
                <Edit className="h-3.5 w-3.5 text-pop-white-300" />
              </button>
              <div className="flex items-start gap-2 p-3 h-full">
                {student.notes ? (
                  <p className="text-pop-white-100">{student.notes}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No previous class notes.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <Button
          variant="outline"
          className="w-full border-pop-white-500 text-pop-white-500 hover:bg-pop-black-400/50"
          onClick={() => {}}
        >
          Edit Attendance
        </Button>
        <div
          className={`save-button-container ${isEditingNote ? 'visible' : ''}`}
        >
          <Button
            className={`save-button ${isEditingNote ? 'visible' : ''} w-full bg-park-green-700 hover:bg-park-green-600 text-pop-white-500 flex items-center justify-center gap-2`}
            onClick={() => {
              setIsEditingNote(false);
            }}
          >
            <FaSave className="h-4 w-4" />
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
};
