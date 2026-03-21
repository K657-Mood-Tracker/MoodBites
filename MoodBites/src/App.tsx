import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import FocusHub from './concentrate/FocusHub';
import Dashboard from './dashboard/Dashboard';

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
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/insights" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Insights Coming Soon</h2></div>} />
          <Route path="/concentrate" element={<FocusHub />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
