'use client';

import { Edit, RotateCcw } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { UserInfo } from '@/components/ui/user-info';
import { cn } from '@/lib/utils';
import type { Booking } from '@/types/booking';

export default function UserList(props: { data: Booking[] }) {
  const { data } = props;
  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 text-white rounded-2xl md:mt-8 mt-6">
      <div className="rounded-2xl border-2 border-zinc-200 overflow-hidden">
        {/* Header Row */}
        <div className="flex py-4 px-4 border-b-2 border-zinc-200 bg-[#292939] pr-12">
          <span className="font-semibold text-zinc-100 w-[60%] md:pl-4">
            NAME
          </span>
          <span className="font-semibold text-zinc-100 pl-4">Due Date</span>
        </div>

        {/* Accordion Rows */}
        <Accordion type="single" collapsible>
          {data.map((data) => (
            <AccordionItem
              key={data.id}
              value={data.id}
              className={cn(
                'group transition-all duration-200 bg-[#171a1f]',
                '[&[data-state=open]]:bg-[#1e1e1d]',
                'border-b border-zinc-200',
                'md:px-4',
                'last:border-0',
              )}
            >
              <AccordionTrigger className="hover:no-underline py-4 px-2 w-full">
                <div className="flex items-center w-full max-w-[calc(100%-2rem)]">
                  <UserInfo userInfo={data} />
                  <div className="flex flex-col items-start pl-4">
                    <div className="font-semibold text-white">{data.date}</div>
                    <div
                      className={`text-xs ${
                        data.duration === 'Expiring'
                          ? 'text-red-300'
                          : 'text-zinc-400'
                      }`}
                    >
                      {data.duration}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 pt-4 px-6 pb-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold uppercase tracking-wider">
                        Phone
                      </span>
                      <span className="text-[#9abf88]">{data.phone}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold uppercase tracking-wider">
                        Email
                      </span>
                      <span className="text-zinc-300 break-words">
                        {data.email}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button className="flex-1 bg-indigo-400 hover:bg-indigo-400/80 rounded-full text-white">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      History
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full border-zinc-400 bg-white text-black hover:bg-zinc-200 hover:text-black"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
