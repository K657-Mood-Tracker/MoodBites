import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, redirect, useNavigate } from "react-router-dom";

function RegisterScreen() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
       // const apiUrl = import.meta.env.VITE_BACKEND_URL;
       // const apiUrl = "";
        
        fetch(`/api/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
            },
            body: JSON.stringify({
                username: (document.getElementById("username") as HTMLInputElement).value,
                email: (document.getElementById("email") as HTMLInputElement).value,
                password: (document.getElementById("password") as HTMLInputElement).value
            })
        })
        .then(async res => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.token) {
                login(data.token, data.user);
            }
            navigate("/");
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => setLoading(false));
    };

    return (
        <div>
            <h1 className="text-3xl font-black text-center mt-10">
                Register for MoodBites
            </h1>

            <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-bold mb-2">Username</label>
                    <input type="text" id="username" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                </div> 
                <button type="submit" className="w-full bg-brand-primary text-white py-2 rounded-lg hover:bg-brand-primary-dark transition-colors">
                    Register
                </button>
            </form>

            <div className="p-6 max-w-md mx-auto mt-4">
                <div className="font-bold bg-brand-secondary p-2 w-full h-md rounded-lg items-center justify-center text-slate-600">
                    <button>
                        <Link to="/login">Already have an account? Login here.</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen