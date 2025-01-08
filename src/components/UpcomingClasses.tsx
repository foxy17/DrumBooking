import { useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { UserInfo } from '@/components/ui/user-info';
import { cn } from '@/lib/utils';
import { type Appointment } from '@/types/appointment';

export const UpcomingClasses = (props: { data: Appointment[] }) => {
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>(
    {},
  );

  const { data } = props;
  const toggleNotes = (id: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Upcoming Classes</h2>
        <button className="text-zinc-400 hover:text-zinc-600">See all</button>
      </div>
      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border-2 border-zinc-400 overflow-hidden"
      >
        {data.map((classData) => (
          <AccordionItem
            key={classData.id}
            value={classData.id}
            className={cn(
              'group px-4 py-4 transition-all duration-200',
              '[&[data-state=open]]:bg-zinc-900',
            )}
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex w-full items-center">
                <UserInfo classData={classData} />
                <div className="flex-1 flex justify-center">
                  <span
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 bg-white text-black text-center',
                      'group-data-[state=open]:bg-black group-data-[state=open]:text-white',
                    )}
                  >
                    {classData.appointmentType}
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
                  <span className="text-base font-bold uppercase tracking-wider text-white">
                    Grade - {classData.grade}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">
                  {expandedNotes[classData.id]
                    ? classData.notes
                    : classData.notes.slice(0, 100) + '...'}
                  <button
                    onClick={() => {
                      toggleNotes(classData.id);
                    }}
                    className="ml-1 text-rose-300 hover:text-rose-200"
                  >
                    {expandedNotes[classData.id] ? 'view less' : 'view more'}
                  </button>
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
