import React from 'react';
import { CalendarClock, Clock, MessageSquare } from 'lucide-react';
import { Drawer } from 'vaul';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { StatusType } from '@/types/status';
import StatusBadge from './status-badge';

import { type ClassType, STATUS } from '@/utils/constants';

export interface StudentData {
  id: string;
  name: string;
  status: StatusType;
  time: string;
  date: string;
  classType: ClassType;
  notes?: string;
  timeEnd?: string;
}

interface StudentCardProps {
  student: StudentData;
  onCheckIn?: (id: string) => void;
  onChangeTime?: (id: string) => void;
  onAddNote?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onViewFullNote?: (id: string) => void;
  showActions?: boolean;
}

const SheetChildren = ({
  student,
  onCheckIn,
  onChangeTime,
  onAddNote,
  onViewDetails,
  showActions = true,
  setIsOpen,
}: StudentCardProps & { setIsOpen: (open: boolean) => void }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          {student.name}
        </h2>
      </div>

      <div className="flex flex-col h-full">
        {/* Notes Section */}
        <div className="flex-1 overflow-y-auto">
          {student.notes && (
            <div className="mb-3 p-3 rounded-md bg-pop-black-400/50">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-0.5 text-poli-purple-500 flex-shrink-0" />
                <p className="text-pop-white-300/90">{student.notes}</p>
              </div>
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex flex-col gap-2 pt-6 border-t sticky bottom-0 bg-background">
            {student.status === STATUS.ONGOING && (
              <Button
                onClick={() => {
                  onAddNote?.(student.id);
                  setIsOpen(false);
                }}
              >
                Complete Class
              </Button>
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

const StudentCard: React.FC<StudentCardProps> = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      <div
        className="neo-card p-4 mb-3 cursor-pointer hover:bg-pop-black-400/10 transition-colors"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-pop-white-500 tracking-wide font-bold text-lg">
              {props.student.name}
            </h3>
            <div className="flex font-cirka items-center tracking-wide gap-1 text-sm text-pop-white-300/80 mt-1">
              <span>{props.student.time}</span>
              <span className="mx-1">-</span>
              <span>{props.student.timeEnd}</span>
            </div>
          </div>
          <StatusBadge classType={props.student.classType} />
        </div>
      </div>

      {isDesktop ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-[400px] sm:max-w-xl p-6 z-50">
            <SheetChildren {...props} setIsOpen={setIsOpen} />
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/90 z-50" />
            <Drawer.Content className="bg-background fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] h-fit pb-8 z-50">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mt-2 mb-8" />
              <div className="px-6">
                <SheetChildren {...props} setIsOpen={setIsOpen} />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  );
};

export default StudentCard;
