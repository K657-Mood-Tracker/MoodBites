import { CircleUserRound, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    const baseClasses = "hover:text-brand-accent transition-colors underline-offset-8 decoration-2";
    return isActive 
      ? `${baseClasses} text-brand-accent underline` 
      : `${baseClasses} hover:underline`;
  };

  return (
    <header className="flex flex-1 items-center justify-center bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <nav aria-label="Main navigation" className="flex justify-between items-center w-full max-w-5xl px-6 py-4">
            <div className="flex font-black text-2xl tracking-tight text-slate-800">
                <h1>
                    <Link to="/" className="hover:text-brand-accent transition-colors">MoodBites</Link>
                </h1>
            </div>
            { isAuthenticated ? (
                <ul className="flex items-center space-x-8 text-sm font-bold text-slate-500">
                    <li><Link to="/" className={getLinkClasses("/")}>Dashboard</Link></li>
                    <li><Link to="/insights" className={getLinkClasses("/insights")}>Insights</Link></li>
                    <li><Link to="/concentrate" className={getLinkClasses("/concentrate")}>Focus Hub</Link></li>
                </ul>
            ) : (
                <div></div>
            )}
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full bg-brand-secondary/30 text-slate-600 hover:bg-brand-secondary/50 transition-all">
                        <Bell size={20} />
                        </button>
                        <Link to="/profile" className="w-10 h-10 rounded-full bg-brand-secondary/40 flex items-center justify-center text-brand-accent hover:bg-brand-secondary/60 transition-all">
                            <CircleUserRound size={28} />
                        </Link>
                        <div className="font-bold bg-brand-secondary p-2 w-20 h-10 rounded-lg items-center justify-center text-slate-600">
                            <button onClick={logout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <div className="font-bold bg-brand-secondary p-2 w-20 h-10 rounded-lg items-center justify-center text-slate-600">
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </div>
        </nav>
    </header>
  ) 
}
