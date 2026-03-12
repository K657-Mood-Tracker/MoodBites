import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import FocusHub from './concentrate/FocusHub';
import Insights from './insight/Insights';
//import test from './insight/test';

type User = {
  id: number;
  username: string;
  email: string;
}

function App() {
  
  // example of how to use the api
  
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/demo-users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Dashboard Coming Soon</h2></div>} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/concentrate" element={<FocusHub />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
