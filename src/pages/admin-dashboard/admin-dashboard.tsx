import { type Appointment } from '@/types/appointment';
import { OngoingClassesSection as OngoingClasses } from './components/ongoing-classes';
import { RecentClasses } from './components/recent-classes';
import { UpcomingClasses } from './components/upcoming-classes';

import { CLASS_TYPE } from '@/utils/constants';

const upcomingClasses: Appointment[] = [
  {
    id: '1',
    image: '/hero.png',
    name: 'James Harrid',
    time: '11:47 PM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.SOLO,
    grade: 3,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Proin mauris augue, dictum a neque at, vehicula vestibulum neque. Duis in elit lacus. Fusce ut eros vitae elit rutrum aliqu',
    homework:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. ',
  },
  {
    id: '2',
    image: '/hero.png',
    name: 'Anna Hunt',
    time: '11:00 AM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.SOLO,
    grade: 4,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. ',
    homework:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. ',
  },
  {
    id: '2',
    image: '/hero.png',
    name: 'Anna Hunt',
    time: '11:00 AM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.SOLO,
    grade: 4,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. ',
    homework:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. ',
  },
];

const recentClasses: Appointment[] = [
  {
    id: '1',
    image: '/hero.png',
    name: 'Jane Cooper',
    time: '12:00 PM',
    timeEnd: '1:00 PM',
    appointmentType: CLASS_TYPE.SOLO,
    grade: 3,
    notes: '',
  },
  {
    id: '2',
    image: '/hero.png',
    name: 'James Harrid',
    time: '11:00 PM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.SOLO,
    grade: 4,
    notes: '',
  },
  {
    id: '3',
    image: '/hero.png',
    name: 'James Harrid',
    time: '11:00 PM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.SOLO,
    grade: 4,
    notes: '',
  },
];
const ongoingStudents: Appointment[] = [
  {
    id: '1',
    image: '/hero.png',
    name: 'James Harrid',
    time: '11:47 PM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.SOLO,
    grade: 3,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Proin mauris augue, dictum a neque at, vehicula vestibulum neque. Duis in elit lacus. Fusce ut eros vitae elit rutrum aliqu',
    homework:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. ',
  },
  {
    id: '2',
    image: '/hero.png',
    name: 'Anna Hunt',
    time: '11:00 AM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.DUO,
    grade: 4,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. ',
    homework:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. ',
  },
  {
    id: '3',
    image: '/hero.png',
    name: 'Anna Hunt',
    time: '11:00 AM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.DUO,
    grade: 4,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. ',
    homework:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. ',
  },
  {
    id: '4',
    image: '/hero.png',
    name: 'Anna Hunt',
    time: '11:00 AM',
    timeEnd: '12:00 PM',
    appointmentType: CLASS_TYPE.DUO,
    grade: 4,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. ',
    homework:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. ',
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
