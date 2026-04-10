import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import FocusHub from './concentrate/FocusHub';
import Insights from './insight/Insights';
import Dashboard from './dashboard/Dashboard';
import LoginScreen from './auth-screens/LoginScreen';
import { AuthProvider } from './context/AuthContext';
import RegisterScreen from './auth-screens/RegisterScreen';
import { useAuth } from './context/AuthContext';
//import test from './insight/test';

type User = {
  id: number;
  username: string;
  email: string;
}

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  } 

  return (
    <div className="flex justify-center items-center mt-20 flex-col">
      <h1 className="text-3xl font-black mb-4">Welcome to MoodBites!</h1>
      <p>Please <a href="/login" className="text-brand-accent underline">Login</a> or <a href="/register" className="text-brand-accent underline">Register</a> to see your dashboard.</p>
    </div>
  )
}

function App() {
  
  // example of how to use the api
  
/*   const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/demo-users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, []) */

  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/insights" element={<Insights />} />
            <Route path="/" element={<RootRedirect />} />
            <Route path="/concentrate" element={<FocusHub />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
