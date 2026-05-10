import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import PublicShell from './components/PublicShell'
import FocusHub from './concentrate/FocusHub'
import Insights from './insight/Insights'
import Dashboard from './dashboard/Dashboard'
import LoginScreen from './auth-screens/LoginScreen'
import { AuthProvider } from './context/AuthContext'
import RegisterScreen from './auth-screens/RegisterScreen'
import { useAuth } from './context/AuthContext'
import LandingPage from './LandingPage'
//import test from './insight/test'

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <Header />
        <Dashboard />
      </>
    );
  }

  return (
    <PublicShell>
      <LandingPage />
    </PublicShell>
  );
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
        <Routes>
          <Route path="/insights" element={
            <>
              <Header />
              <Insights />
            </>
          } />
          <Route path="/" element={<RootRedirect />} />
          <Route path="/concentrate" element={
            <>
              <Header />
              <FocusHub />
            </>
          } />
          <Route path="/login" element={
            <PublicShell>
              <LoginScreen />
            </PublicShell>
          } />
          <Route path="/register" element={
            <PublicShell>
              <RegisterScreen />
            </PublicShell>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
