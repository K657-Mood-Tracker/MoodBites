import { Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function PublicHeader() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <header className="sticky top-0 z-50 public-header">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] flex items-center justify-center text-white shadow-sm shadow-[rgba(124,58,237,0.18)]">
            <Heart className="w-5 h-5" />
          </div>
          <Link to="/" className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-brand-primary)] transition-colors">
            MoodBites
          </Link>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-3 text-sm font-semibold">
          {!isLoginPage && !isRegisterPage && (
            <Link to="/login" className="text-slate-600 hover:text-[var(--color-brand-primary)] transition-colors">
              Login
            </Link>
          )}

          {isLoginPage && (
            <Link to="/register" className="rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-white shadow-sm shadow-[rgba(124,58,237,0.18)] hover:bg-[var(--color-brand-strong)] transition-colors whitespace-nowrap">
              Register
            </Link>
          )}

          {isRegisterPage && (
            <Link to="/login" className="rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-white shadow-sm shadow-[rgba(124,58,237,0.18)] hover:bg-[var(--color-brand-strong)] transition-colors whitespace-nowrap">
              Login
            </Link>
          )}

          {!isLoginPage && !isRegisterPage && (
            <Link to="/register" className="rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-white shadow-sm shadow-[rgba(124,58,237,0.18)] hover:bg-[var(--color-brand-strong)] transition-colors whitespace-nowrap">
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
