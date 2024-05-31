import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Remove Navigate from here
import axios from 'axios'; // Import Axios for making HTTP requests

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginComponent />} />
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
  // Define state variables to store user input
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post('/login', { email, password });
      console.log(response.data); // Log the response data
  
      // Redirect to the appropriate page based on the user role
      if (response.data.user.role === 'ADMIN') {
        return <Navigate to="/admin-panel" />; // This line will now use Navigate from react-router-dom
      } else {
        return <Navigate to="/profile" />; // This line will now use Navigate from react-router-dom
      }
    } catch (error) {
      // Handle login error
      setError(error.response.data.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" // Set autocomplete attribute
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" // Set autocomplete attribute
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default App;
