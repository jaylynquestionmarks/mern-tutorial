import { useCallback, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { NewUser, User } from '../../server/src/models/users'

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<number>()

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

  //should response be called something else?
  const postData = useCallback(async (name: string, age: number) => {
    const newUser: NewUser = {
      name,
      age,
    };
    try {
      await axios.post<NewUser[]>('http://localhost:3000/create-user', newUser);
      await getData();
    } catch (err) {
      console.error(err);
    }
  }, [])


  const Submit = () => {
    //name and age are both required
    if (name && age) {
      postData(name, age);
    }
  }

  const onChangedName = useCallback((value: string) => {
    setName(value);
  }, [])

  const onChangedAge = useCallback((value: string) => {
    setAge(parseInt(value));
  }, []);

  return (
    <div className='center'>
      <h2>First MERN(MongoDB, Express, React, NodeJS) App </h2>
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
      <p />
      <input type="text" onChange={(e) => onChangedName(e.currentTarget.value)} />
      <input type="text" onChange={(e) => onChangedAge(e.currentTarget.value)} />
      <button onClick={Submit}> Create User</button>
    </div>
  )
}

export default App
