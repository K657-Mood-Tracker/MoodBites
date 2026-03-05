import { CircleUserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-1 items-center justify-center">
        <nav aria-label="Main navigation" className="flex justify-between w-full max-w-4xl px-4 py-2">
            <div className="flex font-black text-xl">
                <h1>
                    MoodBites
                </h1>
            </div>
            <ul className="flex items-center space-x-4">
                <li><a href="/">Dashboard</a></li>
                <li><a href="/insights">Insights</a></li>
                <li><a href="/concentrate">Concentrate</a></li>
            </ul>
            <div>
                <a href="/profile">
                    <CircleUserRound size={28} />
                </a>
            </div>
        </nav>
    </header>
  ) 
}
