import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import NewQuery from './components/NewQuery';
import Results from './components/Results';
import BookingPage from './components/BookingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/newquery" element={<NewQuery />} />
        <Route path="/result" element={<Results />} />
        <Route path="/bookingpage" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
