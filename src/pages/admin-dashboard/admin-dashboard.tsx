import { type StudentClassInstance } from '@/types/student';
import { OngoingClassesSection as OngoingClasses } from './components/ongoing-classes';
import { RecentClasses } from './components/recent-classes';
import { UpcomingClasses } from './components/upcoming-classes';

import { CLASS_TYPE } from '@/utils/constants';

const upcomingClasses: StudentClassInstance[] = [
  {
    studentId: '1',
    studentName: 'James Harrid',
    classInstanceId: 'ci-upcoming-1',
    date: '2024-04-10',
    timeSlot: '11pm-12pm',
    classType: CLASS_TYPE.SOLO,
    attendance: 'pending',
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Proin mauris augue, dictum a neque at, vehicula vestibulum neque. Duis in elit lacus. Fusce ut eros vitae elit rutrum aliqu',
  },
  {
    studentId: '2',
    studentName: 'Anna Hunt',
    classInstanceId: 'ci-upcoming-2',
    date: '2024-04-11',
    timeSlot: '11am-12pm',
    classType: CLASS_TYPE.SOLO,
    attendance: 'pending',
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. ',
  },
];

const recentClasses: StudentClassInstance[] = [
  {
    studentId: '1',
    studentName: 'Jane Cooper',
    classInstanceId: 'ci-recent-1',
    date: '2024-04-01',
    timeSlot: '12pm-1pm',
    classType: CLASS_TYPE.SOLO,
    attendance: 'attended',
    notes: 'Good progress on rudiments.',
  },
  {
    studentId: '2',
    studentName: 'James Harrid',
    classInstanceId: 'ci-recent-2',
    date: '2024-04-01',
    timeSlot: '11am-12pm',
    classType: CLASS_TYPE.SOLO,
    attendance: 'attended',
    notes: 'Needs to practice paradiddles more.',
  },
];

const ongoingStudents: StudentClassInstance[] = [
  {
    studentId: '1',
    studentName: 'James Harrid',
    classInstanceId: 'ci-ongoing-1',
    date: '2024-04-08',
    timeSlot: '11am-12pm',
    classType: CLASS_TYPE.SOLO,
    attendance: 'pending',
    notes: 'Ongoing class notes placeholder.',
  },
  {
    studentId: '2',
    studentName: 'Anna Hunt',
    classInstanceId: 'ci-ongoing-2',
    date: '2024-04-08',
    timeSlot: '11am-12pm',
    classType: CLASS_TYPE.DUO,
    attendance: 'pending',
    notes: 'Ongoing class notes placeholder for duo student 1.',
  },
  {
    studentId: '3',
    studentName: 'Ben Carter',
    classInstanceId: 'ci-ongoing-2',
    date: '2024-04-08',
    timeSlot: '11am-12pm',
    classType: CLASS_TYPE.DUO,
    attendance: 'pending',
    notes: 'Ongoing class notes placeholder for duo student 2.',
  },
];

const AdminDashboard = () => {
  return (
    <div className="flex w-full max-w-2xl mx-auto flex-col px-6 py-4">
      <div id="ongoing">
        <h2 className="text-xl font-bold font-overpass tracking-wider bg-background py-2 sticky top-0 z-1">
          ongoing classes
        </h2>
        <OngoingClasses ongoingStudents={ongoingStudents} />
      </div>
      <div id="recent">
        <h2 className="text-xl font-bold font-overpass tracking-wider bg-background py-2 sticky top-0 z-1">
          recent classes
        </h2>
        <RecentClasses data={recentClasses} />
      </div>
      <div id="upcoming">
        <h2 className="text-xl font-bold font-overpass tracking-wider bg-background py-2 sticky top-0 z-1">
          upcoming classes
        </h2>
        <UpcomingClasses data={upcomingClasses} />
      </div>
    </div>
  );
};

export default AdminDashboard;
