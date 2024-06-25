import { useCallback, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { User } from '../../server/src/models/users'

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  const hasUsers = users !== undefined;

  const getData = useCallback(async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:3000/get-users');
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [])

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      {
        hasUsers ? users.map((user) => (
            //return
            <div key={user._id}>
              <h3>Name: {user.name} </h3>
              <h3>Age: {user.age} </h3>
              <p>-----</p>
            </div>
          )
        ) : null
      }
    </div>
  )
}

export default App
