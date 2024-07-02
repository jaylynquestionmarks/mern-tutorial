import { useCallback, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { NewEvent, Event } from '../../server/src/models/events'

function App(): JSX.Element {
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState<string>();
  const [day, setDay] = useState<Date>();

  const hasEvents = events !== undefined;

  const getData = useCallback(async () => {
    try {
      const response = await axios.get<Event[]>('http://localhost:3000/get-events');
      setEvents(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [])

  useEffect(() => {
    getData();
  }, [])

  //should response be called something else?
  const postData = useCallback(async (name: string, day: string) => {
    const newEvent: NewEvent = {
      name,
      day,
    };
    try {
      await axios.post<NewEvent[]>('http://localhost:3000/create-event', newEvent);
      await getData();
    } catch (err) {
      console.error(err);
    }
  }, [])


  const Submit = () => {
    //name and age are both required
    if (name && day) {
      postData(name, day.toString());
    }
  }

  const onChangedName = useCallback((value: string) => {
    setName(value);
  }, [])
  
  const onChangedDay = useCallback((value: string) => {
    parseInt(value);
    //need to change to user input
    const formatedDate = new Date(2013, 3, 14);
    setDay((formatedDate));
  }, []);

  return (
    <div className='center'>
      <h2>First MERN(MongoDB, Express, React, NodeJS) App </h2>
      {
        hasEvents ? events.map((event) => (
            //return
            <div key={event._id}>
              <h3>Event Name: {event.name} </h3>
              <h3>Date: {event.day} </h3>
              <p>-----</p>
            </div>
          )
        ) : null
      }
      <p />
      <input type="text" onChange={(e) => onChangedName(e.currentTarget.value)} />
      <input type="text" onChange={(e) => onChangedDay(e.currentTarget.value)} />
      <button onClick={Submit}> Create Event</button>
    </div>
  )
}

export default App
