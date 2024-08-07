const express = require('express');
const mongoose = require('./db');
const authRoutes = require('./routes/AuthRoutes');

const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());   
app.use(express.json());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
