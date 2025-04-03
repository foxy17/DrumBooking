import { useEffect, useRef } from 'react';
import { FaSave } from 'react-icons/fa';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeader } from './section-header';

interface CurrentClassNotesProps {
  newNote: string;
  setNewNote: (note: string) => void;
  isAddingNote: boolean;
  setIsAddingNote: (isAddingNote: boolean) => void;
}

export const CurrentClassNotes = ({
  newNote,
  setNewNote,
  isAddingNote,
  setIsAddingNote,
}: CurrentClassNotesProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasNewNote = newNote.trim() !== '';

  useEffect(() => {
    if (isAddingNote && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAddingNote]);

  return (
    <div className="mb-4 mt-4">
      <SectionHeader className="mb-3">Current Class Notes</SectionHeader>

      <div className="rounded-md bg-pop-black-400/50 p-2 min-h-[120px] border border-pop-white-300/50">
        <Textarea
          ref={textareaRef}
          value={newNote}
          onChange={e => {
            setNewNote(e.target.value);
          }}
          className="note-textarea bg-pop-black-500! border-0 p-0"
          placeholder="Enter class notes..."
        />

        <Button
          variant="secondary"
          size="sm"
          className={clsx(
            'w-full bg-success-500 text-white',
            !hasNewNote && 'opacity-50'
          )}
          onClick={() => {
            if (isAddingNote) {
              setIsAddingNote(false);
            } else {
              setIsAddingNote(true);
            }
          }}
        >
          <FaSave className="h-3 w-3 mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
};
