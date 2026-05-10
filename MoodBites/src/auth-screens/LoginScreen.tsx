import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate} from "react-router-dom";

function LoginScreen() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        //const apiUrl = import.meta.env.VITE_BACKEND_URL;
        
        fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: (document.getElementById("email") as HTMLInputElement).value,
                password: (document.getElementById("password") as HTMLInputElement).value
            })
        })
        .then(async res => {
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                console.error(data);
                throw new Error(data?.message || `HTTP ${res.status}`);
            }

            return data;
        })
        .then(data => {
            if (data?.token) {
                login(data.token, data.user);
                navigate("/");
            }
        })
        .catch(err => {
            console.error("Login error:", err);
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen public-shell">
            <section className="w-full bg-transparent">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
                    <div className="space-y-8">
                        <div className="max-w-xl space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface-soft)] px-4 py-1 text-sm font-semibold text-[var(--color-brand-primary)] shadow-sm">
                                MoodBites student wellbeing
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">Continue your wellbeing journey</h1>
                            <p className="text-lg leading-8 text-[var(--color-text-secondary)]">
                                Track your mood, habits and focus sessions to understand your emotional wellbeing better.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
                                <p className="text-sm font-semibold text-[var(--color-brand-primary)] mb-3">Mood tracking</p>
                                <p className="text-sm text-[var(--color-text-secondary)]">Log how you feel and uncover emotional patterns.</p>
                            </div>
                            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
                                <p className="text-sm font-semibold text-[var(--color-brand-primary)] mb-3">Habit insights</p>
                                <p className="text-sm text-[var(--color-text-secondary)]">Build healthy routines that support your daily wellbeing.</p>
                            </div>
                            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
                                <p className="text-sm font-semibold text-[var(--color-brand-primary)] mb-3">Focus progress</p>
                                <p className="text-sm text-[var(--color-text-secondary)]">Track session performance and stay present while studying.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-6 -right-6 hidden xl:block">
                            <div className="h-28 w-28 rounded-full bg-[var(--color-surface-soft)] blur-2xl opacity-90"></div>
                        </div>
                        <div className="absolute -bottom-6 left-0 hidden xl:block">
                            <div className="h-24 w-24 rounded-full bg-[var(--color-brand-soft)] blur-2xl opacity-80"></div>
                        </div>

                        <div className="relative rounded-[2rem] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl shadow-[rgba(124,58,237,0.15)] p-10 backdrop-blur-xl">
                            <div className="space-y-4 text-center mb-8">
                                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-brand-primary)]">Welcome back</p>
                                <h2 className="text-3xl font-black text-slate-900">Login to your account</h2>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    Continue your MoodBites journey and reconnect with your wellbeing insights.
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-slate-400 shadow-sm transition focus:border-[var(--color-brand-secondary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-soft)]"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-slate-400 shadow-sm transition focus:border-[var(--color-brand-secondary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-soft)]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(124,58,237,0.18)] transition hover:shadow-xl hover:from-[var(--color-brand-secondary)] hover:to-[var(--color-brand-primary)] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
                                Don&apos;t have an account?{' '}
                                <Link to="/register" className="font-semibold text-[var(--color-brand-primary)] hover:text-[var(--color-brand-secondary)]">
                                    Register here
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>                </div>            </section>
        </div>
    )
}

export default LoginScreen