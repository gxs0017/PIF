import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin'; // Updated import
import withAuth from './components/HOC';
import SadminPanel from './pages/Sadminpanel'; // Import SadminPanel component
import Profile from './pages/profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow pb-16"> {/* Adjust the padding-bottom as needed */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/sadmin-panel" element={<SadminPanel />} />
            <Route path="/profile" element={withAuth(Profile)} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to PIF</h1>
    </div>
  );
}

export default App;
