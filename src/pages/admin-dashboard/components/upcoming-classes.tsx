import { Check, RotateCcw, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserInfo } from '@/components/ui/user-info';
import { cn } from '@/lib/utils';
import { type StudentClassInstance } from '@/types/student';

export const UpcomingClasses = (props: { data: StudentClassInstance[] }) => {
  const { data } = props;

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border-2 border-zinc-400 overflow-hidden"
      >
        {data.map(instance => (
          <AccordionItem
            key={instance.classInstanceId + instance.studentId}
            value={instance.classInstanceId + instance.studentId}
            className={cn(
              'group px-4 py-4 transition-all duration-200',
              'data-[state=open]:bg-zinc-900'
            )}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex w-full items-center">
                <UserInfo
                  userInfo={{
                    id: instance.studentId,
                    name: instance.studentName,
                    image: '',
                    time: instance.timeSlot,
                  }}
                />
                <div className="flex-1 flex justify-center">
                  <span
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 bg-white text-black text-center',
                      'group-data-[state=open]:bg-black group-data-[state=open]:text-white'
                    )}
                  >
                    {instance.classType}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold uppercase tracking-wider text-white">
                    Notes
                  </span>
                </div>
                <p className="text-sm text-zinc-400">
                  {(instance.notes ?? '').slice(0, 100)}
                  {(instance.notes?.length ?? 0) > 100 ? '... ' : ''}
                  {(instance.notes?.length ?? 0) > 0 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="text-rose-300 hover:text-rose-200 font-normal hover:underline hover:cursor-pointer ml-1">
                          view more
                        </span>
                      </DialogTrigger>
                      <DialogContent className="bg-black border-2 border-zinc-400 rounded-2xl w-5/6 gap-2 p-4">
                        <DialogTitle className="text-base font-bold tracking-wider text-white text-xl font-extrabold">
                          Notes
                        </DialogTitle>
                        <DialogDescription>{instance.notes}</DialogDescription>
                        <div className="flex justify-center w-full pt-8">
                          <Button
                            variant="secondary"
                            className="w-full bg-indigo-400  hover:bg-indigo-400/80 rounded-full"
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Notes History
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </p>
                <div className="flex justify-between pt-4 mt-4 gap-4">
                  <Button
                    variant="secondary"
                    className="w-40 bg-rose-300 text-rose-700 hover:bg-rose-300/80 rounded-full"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Missed
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-40 bg-white text-black hover:bg-white/90 rounded-full"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Check In
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
