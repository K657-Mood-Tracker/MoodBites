import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';

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
   /*  <div className="App">
      <h1>Demo Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div> */
    <div>
      <Header />
    </div>
  )
}

export default App
