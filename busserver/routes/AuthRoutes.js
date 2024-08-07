const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const BDetails = require('../models/BDetails');
// Route handler for user sign up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Server error' });
  } 
});

// Route handler for user sign in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists and password is correct
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
//router handler for bus search
router.post('/search', async (req, res) => {
  try {
    const {  
      source,
      destination,
      date,
      time, } = req.body;
    console.log("okie okie okie");
 
    const matchingBuses = await BDetails.find({
      source,
      destination,
      date: { $gte: new Date(date), $lt: new Date(date + 'T23:59:59.999Z') }
    });
    
    if (matchingBuses.length > 0) {
      res.json(matchingBuses);
    } else {
      res.status(404).json({ message: 'No matching buses found' });
    }

  } catch (error) {
    console.error('Error searching buses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/bookSeats', async (req, res) => {
  const { busId, seatsToBook } = req.body;

  try {
    // Find the bus by its ID
    const bus = await BDetails.findOne({ busId });

    // Check if the bus exists
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    // Check if enough seats are available
    if (bus.availableSeats < seatsToBook) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Update the available seats count
    bus.availableSeats -= seatsToBook;
    await bus.save();

    // Send success response
    res.json({ message: 'Seats booked successfully', updatedBus: bus });
  } catch (err) {
    console.error('Error booking seats:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
