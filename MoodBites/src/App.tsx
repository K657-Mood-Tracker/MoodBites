import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import FocusHub from './concentrate/FocusHub';
import Insights from './insight/Insights';
import Dashboard from './dashboard/Dashboard';
import LoginScreen from './auth-screens/LoginScreen';
import { AuthProvider } from './context/AuthContext';
//import test from './insight/test';

type User = {
  id: number;
  username: string;
  email: string;
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/concentrate" element={<FocusHub />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
