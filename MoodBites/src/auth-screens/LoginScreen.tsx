function LoginScreen() {

    

    return (
        <div>
            <h1 className="text-3xl font-black text-center mt-10">
                Login to MoodBites
            </h1>

            <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
                <button type="submit" className="w-full bg-brand-primary text-white py-2 rounded-lg hover:bg-brand-primary-dark transition-colors">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginScreen