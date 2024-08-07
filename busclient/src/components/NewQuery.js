import React, { useState } from 'react';
import './NewQuery.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const NewQuery = () => {
  const navigate = useNavigate();
  const [busId, setBusId] = useState('');
  const [busType, setBusType] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [sleeperSeats, setSleeperSeats] = useState('');
  const [pricePerSeat, setPricePerSeat] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBusIdChange = (e) => {
    setBusId(e.target.value);
  };

  const handleBusTypeChange = (e) => {
    setBusType(e.target.value);
  };

  const handleAvailableSeatsChange = (e) => {
    setAvailableSeats(e.target.value);
  };

  const handleSleeperSeatsChange = (e) => {
    setSleeperSeats(e.target.value);
  };

  const handlePricePerSeatChange = (e) => {
    setPricePerSeat(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("perfect");
    try {
      const response = await axios.post('http://localhost:3000/api/search', {
        source,
        destination,
        date,
        time,
      });
     
      window.alert('Server response: Buses are available');
      navigate('/result', { state: { buses: response.data } });
    } catch (error) {
      window.alert('NO MORE BUSES ARE AVAILABLE');
    }
  };
  
  return (
    <div className="fullscreen">
      <br /><br />
      <form id="key" onSubmit={handleSubmit}>
        <div>
          <label  id="v6" htmlFor="source">Source:</label><br />
          <input type="text" id="source" value={source} onChange={handleSourceChange} required />
        </div>
        <div>
          <label id="v7" htmlFor="destination">Destination:</label><br />
          <input type="text" id="destination" value={destination} onChange={handleDestinationChange} required />
        </div>
        <div>
          <label id="v8" htmlFor="date">Date:</label><br />
          <input type="date" id="date" value={date} onChange={handleDateChange} required />
        </div>
        <div>
          <label id="v9" htmlFor="time">Time:</label><br />
          <input type="time" id="time" value={time} onChange={handleTimeChange} required />
        </div>
        <button id="but" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewQuery;
