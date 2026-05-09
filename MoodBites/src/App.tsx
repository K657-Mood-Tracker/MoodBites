import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import FocusHub from './concentrate/FocusHub';
import Insights from './insight/Insights';
import Dashboard from './dashboard/Dashboard';
import LoginScreen from './auth-screens/LoginScreen';
import { AuthProvider } from './context/AuthContext';
import RegisterScreen from './auth-screens/RegisterScreen';
import { useAuth } from './context/AuthContext';
import LandingPage from './LandingPage';
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

  return <LandingPage />;
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
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

function AppRoutes() {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route path="/insights" element={<Insights />} />
        <Route path="/" element={<RootRedirect />} />
        <Route path="/concentrate" element={<FocusHub />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </div>
  );
}

export default App
