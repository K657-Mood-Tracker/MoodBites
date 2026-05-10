import type { ReactNode } from 'react';
import Header from './Header';
import PublicFooter from './PublicFooter';

interface AuthenticatedShellProps {
  children: ReactNode;
}

export default function AuthenticatedShell({ children }: AuthenticatedShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-public-bg)]">
      <Header />
      <div className="flex-1 bg-transparent">{children}</div>
      <PublicFooter />
    </div>
  );
}
