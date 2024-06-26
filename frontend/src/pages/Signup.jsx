import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        email,
        password,
        name,
      });
      setMessage(response.data.message);
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Signup failed');
      setMessage(null);
    }
  };

  const responseGoogle = (response) => {
    // Handle Google sign-in response here
    console.log(response);
    // Example: Send token to backend for verification
    // const tokenId = response.tokenId;
    // axios.post('/googlelogin', { idToken: tokenId }).then(response => {
    //   console.log(response.data);
    //   navigate('/profile');
    // }).catch(error => {
    //   console.error('Google signin failed:', error);
    //   setError('Google signin failed');
    // });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 mt-8">Signup</h1>
      <div className="bg-white bg-opacity-80 rounded-3xl shadow-md w-80 max-w-md p-6 md:mx-auto md:mt-4">
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
            >
              Signup
            </button>
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle} // Optional: handle failure
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="p-2 bg-white border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Login icon"
                    className="h-5 w-5"
                  />
                </button>
              )}
            />
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/signin')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 w-full rounded-2xl focus:outline-none focus:shadow-outline"
          >
            Already a user? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
