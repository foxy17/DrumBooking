import React from 'react';
import { FaHouse, FaPersonBooth, FaUser } from 'react-icons/fa6';

export const routeConfig = {
  home: {
    name: 'Home',
    link: '/dash',
    icon: <FaHouse className="h-6 w-6 text-inherit" />,
  },
  checkin: {
    name: 'check',
    link: '/check',
    icon: <FaPersonBooth className="h-6 w-6 text-inherit" />,
  },
  profile: {
    name: 'Profile',
    link: '/profile',
    icon: <FaUser className="h-6 w-6 text-inherit" />,
  },
};
