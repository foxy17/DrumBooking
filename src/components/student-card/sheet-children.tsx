import React from 'react';
import { CalendarClock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DragToCompleteButton from '@/components/ui/drag-to-complete-button';
import type { StudentCardProps, StudentData } from './student-card';

import { STATUS } from '@/utils/constants';

interface SheetChildrenProps extends Omit<StudentCardProps, 'student'> {
  student: StudentData;
  setIsOpen: (open: boolean) => void;
}

const SheetChildren = ({
  student,
  onCheckIn,
  onChangeTime,
  onAddNote,
  onViewDetails,
  showActions = true,
  setIsOpen,
}: SheetChildrenProps) => {
  const handleComplete = () => {
    onAddNote?.(student.id);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl tracking-widest font-cirka text-foreground border-b border-b-orange-sunshine-500 pb-2">
          {student.name}
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

        {showActions && (
          <div className="flex flex-col gap-2 pt-4 border-t sticky bottom-0 bg-background pb-2">
            {student.status === STATUS.ONGOING && (
              <DragToCompleteButton
                variant="sharp"
                onComplete={handleComplete}
                onClose={() => {
                  setIsOpen(false);
                }}
                text="Slide to Complete Class"
              />
            )}

            {student.status === STATUS.UPCOMING && (
              <>
                <Button
                  variant="default"
                  className="bg-poli-purple-500 hover:bg-poli-purple-600 text-pop-white-500"
                  onClick={() => {
                    onCheckIn?.(student.id);
                    setIsOpen(false);
                  }}
                >
                  Check In
                </Button>
                <Button
                  variant="outline"
                  className="border-info-500/50 text-info-500 hover:bg-info-500/10"
                  onClick={() => {
                    onChangeTime?.(student.id);
                    setIsOpen(false);
                  }}
                >
                  <CalendarClock className="w-4 h-4 mr-1" />
                  Change Time
                </Button>
              </>
            )}

            {(student.status === STATUS.COMPLETED ||
              student.status === STATUS.ABSENT ||
              student.status === STATUS.RESCHEDULED) && (
              <Button
                variant="outline"
                className="border-poli-purple-500/50 text-poli-purple-500 hover:bg-poli-purple-500/10"
                onClick={() => {
                  onViewDetails?.(student.id);
                  setIsOpen(false);
                }}
              >
                View Details
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SheetChildren;
