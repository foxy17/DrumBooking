import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ModalManager } from '@/components/modal/modal-manager';

export function RootLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModalManager />
      <Outlet />
    </Suspense>
  );
}
