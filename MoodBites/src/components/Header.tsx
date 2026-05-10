import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    const baseClasses = "transition-colors underline-offset-8 decoration-2";
    return isActive 
      ? `${baseClasses} text-purple-600 underline` 
      : `${baseClasses} text-slate-700 hover:text-purple-600`;
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60">
      <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
            <span className="text-lg font-black">M</span>
          </div>
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 hover:text-purple-600 transition-colors">
            MoodBites
          </Link>
        </div>

        {isAuthenticated ? (
          <ul className="flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <li><Link to="/" className={getLinkClasses("/")}>Dashboard</Link></li>
            <li><Link to="/insights" className={getLinkClasses("/insights")}>Insights</Link></li>
            <li><Link to="/concentrate" className={getLinkClasses("/concentrate")}>Focus Hub</Link></li>
          </ul>
        ) : (
          <div className="flex items-center gap-4 text-sm font-semibold">
            {!isLoginPage && (
              <Link to="/login" className="text-slate-600 hover:text-purple-600 transition-colors">
                Login
              </Link>
            )}
            {!isRegisterPage && (
              <Link to="/register" className="rounded-xl bg-purple-600 px-4 py-2 text-white shadow-sm shadow-purple-200/50 hover:bg-purple-700 transition-colors whitespace-nowrap">
                Get Started
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  ) 
}
