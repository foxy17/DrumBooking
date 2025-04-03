import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { type StudentClassInstance } from '@/types/student';
import './recent-classes-card.css';

export const RecentClassCard: React.FC<{ student: StudentClassInstance }> = ({
  student,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(student.notes ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      // Focus the textarea and move cursor to the end
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl tracking-widest font-cirka text-foreground border-b border-b-orange-sunshine-500 pb-2">
          {student.studentName}
        </h2>
      </div>

      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="mb-3">
            <div className="rounded-md bg-pop-black-400/50 p-2 min-h-[120px] border border-pop-white-300/50">
              <Textarea
                ref={textareaRef}
                value={noteText}
                onChange={e => {
                  setNoteText(e.target.value);
                }}
                className="note-textarea bg-pop-black-500! border-0 p-0"
                placeholder="Enter class notes..."
                disabled={!isEditing}
              />

              <Button
                variant={isEditing ? 'success' : 'secondary'}
                size="sm"
                className="w-full"
                onClick={() => {
                  if (isEditing) {
                    // Save functionality would go here
                    console.log('Note saved:', noteText);
                    setIsEditing(false);
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? (
                  <>
                    <FaSave className="h-3 w-3 mr-1" />
                    Save Note
                  </>
                ) : (
                  <>
                    <FaEdit className="h-3 w-3 mr-1" />
                    Edit Note
                  </>
                )}
              </Button>
            </div>
          </div>
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
      </div>
    </div>
  );
};
