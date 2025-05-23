import { ModalManager } from "@/components/modal/modal-manager";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModalManager />
      <Outlet />
    </Suspense>
  );
}
