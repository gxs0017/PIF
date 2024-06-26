// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import withAuth from './components/HOC';
import SadminPanel from './pages/Sadminpanel';
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import { AuthProvider } from './components/AuthContext'; // Correct import path for AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap your application with AuthProvider */}
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/sadmin-panel" element={<SadminPanel />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
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
