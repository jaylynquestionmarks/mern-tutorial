import { useCallback, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { NewEvent, Event } from '../../server/src/models/events'

import { Dropdown } from 'primereact/dropdown';


function App(): JSX.Element {
  //Event
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState<string>();
  //Date
  const [day, setDay] = useState<Date>(); //old code
  const [selectedMonth, setSelectedMonth] = useState(null);
    const countries = [
        { name: 'January', code: '1' },
        { name: 'February', code: '2' },
        { name: 'March', code: '3' },
        { name: 'April', code: '4' },
        { name: 'May', code: '5' },
        { name: 'June', code: '6' },
        { name: 'July', code: '7' },
        { name: 'August', code: '8' },
        { name: 'September', code: '9' },
        { name: 'October', code: '10' },
        { name: 'November', code: '11' },
        { name: 'December', code: '12' }
    ];

  const hasEvents = events !== undefined;

  //get data from database
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

  //send data to database
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

  //Name
  const onChangedName = useCallback((value: string) => {
    setName(value);
  }, [])
  
  const onChangedDay = useCallback((value: string) => {
    parseInt(value);
    //need to change to user input
    const formatedDate = new Date(2020, 5-1, 15);
    setDay((formatedDate));
  }, []);

  //Date
  const selectedMonthTemplate = (option, props) => {
    if (option) {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    }

    return <span>{props.placeholder}</span>;
};

const monthOptionTemplate = (option) => {
    return (
        <div className="flex align-items-center">
            <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
            <div>{option.name}</div>
        </div>
    );
};


  //format + show data
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
      
      <Dropdown value={selectedMonth} onChange={(e) => setSelectedMonth(e.value)} options={countries} optionLabel="name" placeholder="Select a Month" 
          filter valueTemplate={selectedMonthTemplate} itemTemplate={monthOptionTemplate} className="w-full md:w-14rem" />

      
      <button onClick={Submit}> Create Event</button>
    </div>
  )
}

export default App
