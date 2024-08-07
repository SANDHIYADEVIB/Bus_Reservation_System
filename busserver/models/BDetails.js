const mongoose = require('mongoose');

const busDetailsSchema = new mongoose.Schema({
  busId: { type: String, required: true },
  busType: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  sleeperSeats: { type: Number, required: true },
  pricePerSeat: { type: Number, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  
});

const BDetails = mongoose.model('BDetails', busDetailsSchema);

module.exports = BDetails;
