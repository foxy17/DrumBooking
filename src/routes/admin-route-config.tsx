import { FaHouse, FaPersonBooth, FaUser } from 'react-icons/fa6';

export const adminRouteConfig = {
  home: {
    name: 'Dashboard',
    link: 'dashbaord',
    icon: <FaHouse className="h-6 w-6 text-inherit" />,
  },
  checkin: {
    name: 'Reschedule',
    link: 'schedule',
    icon: <FaPersonBooth className="h-6 w-6 text-inherit" />,
  },
  profile: {
    name: 'Users',
    link: 'users',
    icon: <FaUser className="h-6 w-6 text-inherit" />,
  },
};
