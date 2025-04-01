import React, { createContext, useContext, useState } from 'react';
import { Drawer } from 'vaul';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { StatusType } from '@/types/status';
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

// Define Context props
interface StudentCardContextProps {
  setSheetOpen: (open: boolean) => void;
  isSheetOpen: boolean;
}

// Create Context
const StudentCardContext = createContext<StudentCardContextProps | null>(null);

// Create a hook to use the context
export const useStudentCardSheet = () => {
  const context = useContext(StudentCardContext);
  if (!context) {
    throw new Error('useStudentCardSheet must be used within a StudentCard');
  }
  return context;
};

export interface StudentCardProps {
  student: StudentData;
  children: React.ReactNode;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const contextValue = { setSheetOpen: setIsOpen, isSheetOpen: isOpen };

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
              {student.name}
            </h3>
            <div className="flex font-cirka items-center tracking-wide gap-1 text-sm text-pop-white-300/80 mt-1">
              <span>{student.time}</span>
              {student.timeEnd && (
                <>
                  <span className="mx-1">-</span>
                  <span>{student.timeEnd}</span>
                </>
              )}
            </div>
          </div>
          <StatusBadge classType={student.classType} />
        </div>
      </div>

      {isDesktop ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-[400px] sm:max-w-xl p-6 z-50">
            <StudentCardContext.Provider value={contextValue}>
              {children}
            </StudentCardContext.Provider>
          </SheetContent>
        </Sheet>
      ) : (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/90 z-50" />
            <Drawer.Content className="bg-background fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] h-fit pb-8 z-50">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mt-2 mb-8" />
              <div className="px-6">
                <StudentCardContext.Provider value={contextValue}>
                  {children}
                </StudentCardContext.Provider>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  );
};

export default StudentCard;
