import { Dock } from '@/components/ui/dock-two';
import { routeConfig } from '@/routes/route-config';

export function NavigationDock() {
  const items = [
    { icon: routeConfig.home.icon, label: routeConfig.home.name },
    { icon: routeConfig.students.icon, label: routeConfig.students.name },
    { icon: routeConfig.calendar.icon, label: routeConfig.calendar.name },
    { icon: routeConfig.profile.icon, label: routeConfig.profile.name },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <Dock items={items} />
    </div>
  );
}
