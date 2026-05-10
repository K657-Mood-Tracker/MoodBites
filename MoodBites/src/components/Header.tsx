import { Heart, User2 } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Insights', to: '/insights' },
  { label: 'Focus Hub', to: '/concentrate' },
];

export default function Header() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const userName = user?.username || user?.name || user?.email || '';
  const userInitials = userName
    ? userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part: string) => part[0].toUpperCase())
        .join('')
    : '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(248,242,255,0.95)] border-b border-[rgba(124,58,237,0.12)] backdrop-blur-md">
      <nav aria-label="Main navigation" className="mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 max-w-7xl">
        <Link to="/" className="flex items-center gap-3 text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] text-white shadow-sm shadow-[rgba(124,58,237,0.18)]">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight">MoodBites</p>
            <p className="text-sm text-slate-600">Your mental health hub</p>
          </div>
        </Link>

        {isAuthenticated ? (
          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700">
              {navLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 transition ${
                      isActive
                        ? 'bg-[var(--color-surface-soft)] text-[var(--color-text-primary)] shadow-sm shadow-[rgba(99,102,241,0.08)]'
                        : 'text-slate-700 hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-surface-soft)]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMenuOpen(value => !value)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm shadow-[rgba(15,23,42,0.08)] transition hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-soft)]"
              >
                {userInitials ? (
                  <span className="text-sm font-bold">{userInitials}</span>
                ) : (
                  <User2 className="h-5 w-5" />
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5">
                  <div className="px-4 py-3 text-sm text-slate-500">Account</div>
                  <div className="space-y-1 px-2 pb-3">
                    <button
                      type="button"
                      disabled
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                      Profile
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Soon
                      </span>
                    </button>
                    <button
                      type="button"
                      disabled
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400"
                    >
                      Settings
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Soon
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center rounded-2xl px-3 py-2 text-left text-sm font-semibold text-[var(--color-brand-primary)] transition hover:bg-[var(--color-surface-soft)]"
                    >
                      Atsijungti
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
            <Link to="/login" className="text-slate-600 hover:text-[var(--color-brand-primary)] transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[var(--color-brand-primary)] px-4 py-2 text-white shadow-sm shadow-[rgba(124,58,237,0.18)] hover:bg-[var(--color-brand-secondary)] transition-colors whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
