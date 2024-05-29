import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import  Login  from "/components/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to My App</h1>
        <Link to="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Login
          </button>
        </Link>
      </div>
      
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
