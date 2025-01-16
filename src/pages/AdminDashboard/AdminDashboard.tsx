import { RecentClasses } from '@/components/RecentClasses';
import { UpcomingClasses } from '@/components/UpcomingClasses';
import { type Appointment } from '@/types/appointment';

const upcomingClasses: Appointment[] = [
  {
    id: '1',
    image: '/hero.png',
    name: 'James Harrid',
    time: '11:47 PM',
    appointmentType: 'Solo',
    grade: 3,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. Proin mauris augue, dictum a neque at, vehicula vestibulum neque. Duis in elit lacus. Fusce ut eros vitae elit rutrum aliqu',
  },
  {
    id: '2',
    image: '/hero.png',
    name: 'Anna Hunt',
    time: '11:00 AM',
    appointmentType: 'Duo',
    grade: 4,
    notes:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. Aliquam erat volutpat. Mauris at dui consequat, ultrices augue gravida, fermentum turpis. Vivamus turpis enim, maximus id commodo vel, sodales in odio. Nullam iaculis ipsum a sagittis tempus. Donec vel efficitur lacus. Cras varius consectetur finibus. Proin mauris augue, dictum a neque at, vehicula vestibulum neque. Duis in elit lacus. Fusce ut eros vitae elit rutrum aliqu',
  },
];

const recentClasses: Appointment[] = [
  {
    id: '1',
    image: '/hero.png',
    name: 'Jane Cooper',
    time: '12:00 PM',
    appointmentType: 'Solo',
    grade: 3,
    notes: '',
  },
  {
    id: '2',
    image: '/hero.png',
    name: 'James Harrid',
    time: '11:37 PM',
    appointmentType: 'Solo',
    grade: 4,
    notes: '',
  },
];

const AdminDashboard = () => {
  return (
    <div className="flex w-full max-w-2xl mx-auto flex-col px-8 py-4 gap-8">
      <UpcomingClasses data={upcomingClasses} />
      <RecentClasses data={recentClasses} />
    </div>
  );
};

export default AdminDashboard;
