import { House, Calendar, User, Users } from 'lucide-react';

export const routeConfig = {
  home: {
    name: 'Home',
    link: '/dash',
    icon: House,
  },
  students: {
    name: 'Students',
    link: '/students',
    icon: Users,
  },
  checkin: {
    name: 'check',
    link: '/check',
    icon: Calendar,
  },
  profile: {
    name: 'Profile',
    link: '/profile',
    icon: User,
  },
};
