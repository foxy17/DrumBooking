import React from 'react';
import { Drawer } from 'vaul';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { StatusType } from '@/types/status';
import SheetChildren from './sheet-children';
import StatusBadge from './status-badge';

import { type ClassType } from '@/utils/constants';

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
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') setIsOpen(true);
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-pop-white-500 tracking-wide font-bold text-lg">
              {props.student.name}
            </h3>
            <div className="flex font-cirka items-center tracking-wide gap-1 text-sm text-pop-white-300/80 mt-1">
              <span>{props.student.time}</span>
              {props.student.timeEnd && (
                <>
                  <span className="mx-1">-</span>
                  <span>{props.student.timeEnd}</span>
                </>
              )}
            </div>
          </div>
          <StatusBadge classType={props.student.classType} />
        </div>
      </div>

      {isDesktop ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-[400px] sm:max-w-xl p-6 z-50">
            <SheetChildren
              student={props.student}
              onCheckIn={props.onCheckIn}
              onChangeTime={props.onChangeTime}
              onAddNote={props.onAddNote}
              onViewDetails={props.onViewDetails}
              showActions={props.showActions}
              setIsOpen={setIsOpen}
            />
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/90 z-50" />
            <Drawer.Content className="bg-background fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] h-fit pb-8 z-50">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mt-2 mb-8" />
              <div className="px-6">
                <SheetChildren
                  student={props.student}
                  onCheckIn={props.onCheckIn}
                  onChangeTime={props.onChangeTime}
                  onAddNote={props.onAddNote}
                  onViewDetails={props.onViewDetails}
                  showActions={props.showActions}
                  setIsOpen={setIsOpen}
                />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  );
};

export default StudentCard;
