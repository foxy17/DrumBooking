import { CalendarCheck, House, User } from 'lucide-react';
import { Dock, DockIcon } from '@/components/magicui/dock';

export function NavigationDock() {
  return (
    <div className="relative">
      <Dock direction="middle">
        <DockIcon>
          <House className="size-6" />
        </DockIcon>
        <DockIcon>
          <CalendarCheck className="size-6" />
        </DockIcon>
        <DockIcon>
          <User className="size-6" />
        </DockIcon>
      </Dock>
    </div>
  );
}
