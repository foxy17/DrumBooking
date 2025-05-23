import { Calendar, House, User, Users } from "lucide-react";

export const routeConfig = {
  home: {
    name: "Home",
    link: "/dash",
    icon: House,
  },
  students: {
    name: "Students",
    link: "/students",
    icon: Users,
  },
  calendar: {
    name: "Calendar",
    link: "/calendar",
    icon: Calendar,
  },
  profile: {
    name: "Profile",
    link: "/profile",
    icon: User,
  },
};
