import { Dock } from '@/components/ui/dock-two';
import { routeConfig } from '@/routes/route-config';
import { BottomNavBar } from '../ui/bottom-nav-bar';

export function NavigationDock() {
  const items = [
    {
      icon: routeConfig.home.icon,
      label: routeConfig.home.name,
      path: routeConfig.home.link,
    },
    {
      icon: routeConfig.students.icon,
      label: routeConfig.students.name,
      path: routeConfig.students.link,
    },
    {
      icon: routeConfig.calendar.icon,
      label: routeConfig.calendar.name,
      path: routeConfig.calendar.link,
    },
    {
      icon: routeConfig.profile.icon,
      label: routeConfig.profile.name,
      path: routeConfig.profile.link,
    },
  ];

  return (
    <>
      <div className="fixed left-2 top-1/2 hidden -translate-y-1/2 md:block h-auto">
        <Dock
          items={items.map(({ icon, label }) => ({ icon, label }))}
          orientation="vertical"
          className="border-zinc-800"
        />
      </div>

      <div className="block mt-16 md:hidden">
        <BottomNavBar items={items} />
      </div>
    </>
  );
}
