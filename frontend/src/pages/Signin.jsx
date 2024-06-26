import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { AuthContext } from '../components/AuthContext';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      const success = await signIn(email, password);
      if (success) {
        navigate('/'); // Redirect to home page on successful login
      } else {
        setError('Signin failed');
      }
    } catch (error) {
      console.error('Signin failed:', error);
      setError(error.response?.data?.message || 'Signin failed');
    }
  };


  const responseGoogle = async (response) => {
    try {
      const result = await axios.post('http://localhost:3000/googlelogin', { tokenId: response.tokenId });
      const { token, user } = result.data;
      localStorage.setItem('token', token);
      navigate('/'); // Redirect to home page on successful Google login
    } catch (error) {
      console.error('Google signin failed:', error);
      setError('Google signin failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-2 lg:pt-12">
      <h2 className="text-2xl font-bold mb-4">Signin Page</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="bg-white bg-opacity-80 rounded-3xl shadow-md w-80 p-6 mb-8" onSubmit={handleSignin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border-t-4 shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border-t-4 shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mb-4 space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Signin
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
          <button
            onClick={() => navigate('/signup')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
            type="button"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
