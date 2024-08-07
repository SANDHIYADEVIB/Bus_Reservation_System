import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const { buses } = location.state || {};
  const navigate = useNavigate();
  const [selectedBuses, setSelectedBuses] = useState([]);
  const [busType, setBusType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleBusCardClick = (bus) => {
    setSelectedBuses([...selectedBuses, bus]);
  };
 
  const filterBuses = (bus) => {
    // Filter by bus type
    const isTypeMatch = !busType || busType === bus.busType;
    let isPriceMatch = true;
    if (priceRange) {
      if (priceRange === '100-500') {
        isPriceMatch = bus.pricePerSeat >= 100 && bus.pricePerSeat <= 500;
      } else if (priceRange === '>500') {
        isPriceMatch = bus.pricePerSeat > 500;
      }
    }
  
    return isTypeMatch && isPriceMatch;
  };
  

  const handleBooking = () => {
    navigate('/bookingpage', { state: { selectedBuses } });
  };

  return (
    <div className="result-container">
      <h2>AVAILABLE BUSES</h2>
      <div className="search-boxes">
        <select value={busType} onChange={(e) => setBusType(e.target.value)}>
          <option value="">All Bus Types</option>
          <option value="AC">AC</option>
          <option value="NONAC">NonAC</option>
        </select>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">All Price Ranges</option>
          <option value="100-500">100 - 500</option>
          <option value=">500">Greater than 500</option>
        </select>
      </div>
      <div className="bus-container">
        {buses &&
          buses.map((bus) => (
            filterBuses(bus) && (
              <div
                key={bus._id}
                className="bus-card-link"
                onClick={() => handleBusCardClick(bus)}
              >
                <div className="bus-card">
                  <p>Bus ID: {bus.busId}</p>
                  <p>Bus Type: {bus.busType}</p>
                  <p>Available Seats: {bus.availableSeats}</p>
                  <p>Sleeper Seats: {bus.sleeperSeats}</p>
                  <p>Price Per Seat: {bus.pricePerSeat}</p>
                  <p>Source: {bus.source}</p>
                  <p>Destination: {bus.destination}</p>
                  <p>Date: {new Date(bus.date).toLocaleDateString()}</p>
                  <p>Time: {bus.time}</p>
                </div>
              </div>
            )
          ))}
      </div>
      <button id="kl" onClick={handleBooking}>Book Selected Buses</button>
    </div>
  );
};

export default Results;
