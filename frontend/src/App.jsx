import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginComponent from './pages/Login'; // Adjusted import path
import withAuth from './components/HOC';
import SadminPanel from './pages/Sadminpanel'; // Import SadminPanel component
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/sadmin-panel" element={<SadminPanel />} />
        <Route path="/profile" element={withAuth(Profile)} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to My App</h1>
      <Link to="/login">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Login
        </button>
      </Link>
    </div>
  );
}

export default App;
