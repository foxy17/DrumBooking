import React, { useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Booking } from '@/types/booking';
import { FilterModal } from './components/FilterModal';
import UserList from './components/UserList';

const usersData: Booking[] = [
  {
    id: '1',
    name: 'Brandon Taylor qwewerq Brandon Taylor',
    time: '12 PM Thursdays',
    duration: '3 Month',
    date: 'Jan 11, 2025',
    image: '/hero.png',
    phone: '(818) 537-7381',
    email: 'codyfisher@company.com',
    appointmentType: 'Solo',
  },
  {
    id: '2',
    name: 'Anna Hunt',
    time: '12:15 PM',
    duration: '1 Month',
    date: 'Feb 19, 2025',
    image: '/hero.png',
    phone: '(818) 537-7381',
    email: 'codyfisher@company.com',
    appointmentType: 'Duo',
  },
  {
    id: '3',
    name: 'Anna Hunt',
    time: '12 PM Thursdays',
    duration: 'Expiring',
    date: 'Feb 26, 2025',
    image: '/hero.png',
    phone: '(818) 537-7381',
    email: 'codyfisher@company.com',
    appointmentType: 'Solo',
  },
];

type FilterKeys = 'dueWithin7Days' | 'soloSession' | 'duoSession';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dueWithin7Days: false,
    soloSession: false,
    duoSession: false,
  });

  const handleFilterChange = (key: FilterKeys, value: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      dueWithin7Days: false,
      soloSession: false,
      duoSession: false,
    });
  };

  const applyFilters = (users: Booking[]) => {
    let filteredUsers = users;

    // Filter by search term
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Filter by due date (within 7 days)
    if (filters.dueWithin7Days) {
      const today = new Date();
      filteredUsers = filteredUsers.filter((user) => {
        if (!user.date) return false;
        const userDate = new Date(user.date);
        const diffTime = userDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 7;
      });
    }

    // Filter by session type
    if (filters.soloSession || filters.duoSession) {
      filteredUsers = filteredUsers.filter((user) => {
        if (filters.soloSession && user.appointmentType === 'Solo') return true;
        if (filters.duoSession && user.appointmentType === 'Duo') return true;
        return false;
      });
    }

    return filteredUsers;
  };

  const filteredUsers = applyFilters(usersData);

  return (
    <div className="px-4 xs:px-8 py-4 md:py-8">
      <div className="mb-4 flex justify-center items-center gap-4 md:gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search Users"
            className="rounded-full border dark:border-zinc-200 bg-zinc-900 pl-9 dark:placeholder:text-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
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
          onClick={() => {
            setIsFilterModalOpen(true);
          }}
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>
      <UserList data={filteredUsers} header="Due Date">
        <UserList.Header />
        <UserList.AccordionWrapper>
          <UserList.AccordionTrigger>
            <UserList.SecondColumn />
          </UserList.AccordionTrigger>
          <UserList.AccordionContentWrapper>
            <UserList.ContactInformation />
            <UserList.Buttons />
          </UserList.AccordionContentWrapper>
        </UserList.AccordionWrapper>
      </UserList>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => {
          setIsFilterModalOpen(false);
        }}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        onApplyFilters={() => {
          setIsFilterModalOpen(false);
        }}
      />
    </div>
  );
};

export default Users;
