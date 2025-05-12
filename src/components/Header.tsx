import { MessageSquare, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadGoogleScript, initializeGoogleAuth } from '../utils/googleAuth';

const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3000' 
  : 'https://comment-lp.onrender.com';

interface User {
  name: string;
  picture: string;
  email: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    loadGoogleScript().catch(console.error);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const client = initializeGoogleAuth(async (response) => {
        if (response.access_token) {
          try {
            const { data } = await axios.post(`${API_URL}/api/auth/google`, {
              token: response.access_token
            });

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            if (window.chrome?.storage?.sync) {
              window.chrome.storage.sync.set({
                authToken: data.token,
                commentCount: 0,
                isPremium: data.user.isPremium || false
              }, () => {
                window.close();
              });
            }
          } catch (error) {
            console.error('API Error:', error);
            alert('Authentication failed. Please try again.');
          }
        }
      });

      client.requestAccessToken();
    } catch (error) {
      console.error('Auth Error:', error);
      alert('Failed to initialize Google Sign-In. Please check your configuration.');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span className="ml-2 font-semibold text-gray-900">Comment Assistant</span>
          </div>
          <nav className="flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-gray-900" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Features
            </a>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-blue-600"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleGoogleSignIn}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
              >
                Sign in
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}