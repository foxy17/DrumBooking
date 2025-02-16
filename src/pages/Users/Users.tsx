import React from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Booking } from '@/types/booking';
import UserList from './components/UserList';

const usersData: Booking[] = [
  {
    id: '1',
    name: 'Brandon Taylor qwewerq Brandon Taylor',
    time: '12 PM Thursdays',
    duration: '3 Month',
    date: 'Jan 11, 2023',
    image: '/hero.png',
    phone: '(818) 537-7381',
    email: 'codyfisher@company.com',
  },
  {
    id: '2',
    name: 'Anna Hunt',
    time: '12:15 PM',
    duration: '1 Month',
    date: 'Jan 11, 2023',
    image: '/hero.png',
    phone: '(818) 537-7381',
    email: 'codyfisher@company.com',
  },
  {
    id: '3',
    name: 'Anna Hunt',
    time: '12 PM Thursdays',
    duration: 'Expiring',
    date: 'Jan 11, 2023',
    image: '/hero.png',
    phone: '(818) 537-7381',
    email: 'codyfisher@company.com',
  },
];

const Users = () => {
  return (
    <div className="px-4 xs:px-8 py-4 md:py-8">
      <div className="mb-4 flex justify-center items-center gap-4 md:gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search Users"
            className="rounded-full border dark:border-zinc-200 bg-zinc-900 pl-9 dark:placeholder:text-white"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-2 border-zinc-400 bg-transparent text-zinc-100 hover:bg-zinc-800"
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-2 border-zinc-400 bg-transparent text-zinc-100 hover:bg-zinc-800"
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>
      <UserList data={usersData} />
    </div>
  );
};

export default Users;
