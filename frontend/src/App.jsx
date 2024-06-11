import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom'; // Include useNavigate
import axios from 'axios'; // Import Axios for making HTTP requests
import withAuth from './components/HOC';

function App() {
  return (
    <Router>
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginComponent />} />
  <Route path="/sadmin-panel" element={withAuth(SadminPanel, 'SADMIN')} /> {/* Use withAuth for SadminPanel */}
  <Route path="/profile" element={withAuth(Profile)} /> {/* Use withAuth for Profile */}
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

function LoginComponent() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password });
      console.log(response.data); // Log the response data
      const { role, token } = response.data.user;

      // Save the token to local storage
      localStorage.setItem('token', token);

      // Redirect based on the user role
      if (role === 'SADMIN') {
        navigate('/sadmin-panel'); // Redirect to Sadmin panel
      } else {
        navigate('/profile'); // Redirect to Profile page for other users
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Login
        </button>
      </form>
    </div>
  );
}

function SadminPanel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sadmin Panel</h1>
      <p>Only accessible by users with the SADMIN role.</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p>This is the profile page.</p>
    </div>
  );
}

export default App;
