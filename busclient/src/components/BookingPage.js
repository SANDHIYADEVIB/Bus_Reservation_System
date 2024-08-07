import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingPage.css';
import axios from 'axios';

const BookingPage = () => {
  const location = useLocation();
  const { selectedBuses } = location.state || {};
  const navigate = useNavigate();

  const [seatsToBook, setSeatsToBook] = useState(1);
  const [minSeats, setMinSeats] = useState(1);
  const [maxSeats, setMaxSeats] = useState(1);
  
  useEffect(() => {
    if (selectedBuses && selectedBuses.length > 0) {
      const totalAvailableSeats = selectedBuses.reduce((acc, bus) => acc + bus.availableSeats, 0);
      setMaxSeats(totalAvailableSeats);
      setSeatsToBook(1); 
    }
  }, [selectedBuses]);

  const handleSeatChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minSeats && value <= maxSeats) {
      setSeatsToBook(value);
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedBuses) return 0;
    const totalPrice = selectedBuses.reduce((acc, bus) => acc + bus.pricePerSeat, 0) * seatsToBook;
    return totalPrice;
  };
  
  const handlePay = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/bookSeats', { busId: selectedBuses[0].busId, seatsToBook });
      window.alert('Seats booked successfully:', response.data);
      // Update UI or show success message to user
    } catch (error) {
      window.alert('Seats Not Available :');
      // Handle error and show error message to user
    }
  };

  const handleSignOut = () => {
    // Perform signout logic here, e.g., clearing session storage or removing tokens
    navigate('/'); // Redirect to the login page
  };
  
  return (
    <div className="booking-container">
      <div className="booking-box">
        <h2 className="booking-header">Selected Buses</h2>

        <ul className="booking-list">
          {selectedBuses &&
            selectedBuses.map((bus, index) => (
              <li className="booking-item" key={index}>
                Bus ID: {bus.busId}, Bus Type: {bus.busType}, Price: {bus.pricePerSeat}
              </li>
            ))}
        </ul>
        <div className="booking-details">
          <label className="booking-label" htmlFor="seats">Number of Seats:</label>
          <input
            className="booking-input"
            type="number"
            id="seats"
            value={seatsToBook}
            onChange={handleSeatChange}
            min={minSeats}
            max={maxSeats}
            required
          />
        </div>
        <div className="payment-details">
          <p className="total-price">Total Price: {calculateTotalPrice()}</p>
          <button id="iu" onClick={handlePay}>Pay</button>
        </div>
        <button id="pl" onClick={handleSignOut}>Sign Out</button>
      </div>
    
    </div>
   
  );
};

export default BookingPage;
