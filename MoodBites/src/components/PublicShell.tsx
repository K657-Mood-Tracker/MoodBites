import type { ReactNode } from 'react';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

interface PublicShellProps {
  children: ReactNode;
}

export default function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen w-full flex flex-col public-shell">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
