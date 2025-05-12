import { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import axios from 'axios';
import { loadGoogleScript, initializeGoogleAuth } from '../utils/googleAuth';

const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3000' 
  : 'https://comment-lp.onrender.com';

export default function Auth() {
  useEffect(() => {
    loadGoogleScript()
      .then(() => console.log('Google script loaded successfully'))
      .catch(error => {
        console.error('Failed to load Google script:', error);
        alert('Failed to load Google authentication. Please check your internet connection and try again.');
      });
  }, []);

  const requestExtensionPermissions = async () => {
    if (!chrome?.permissions) {
      console.error('Chrome permissions API not available');
      return false;
    }

    try {
      const granted = await chrome.permissions.request({
        permissions: ['storage', 'identity'],
        origins: ['https://comment-lp.onrender.com/*']
      });

      if (granted) {
        console.log('Extension permissions granted');
        return true;
      } else {
        console.error('Extension permissions denied');
        alert('Extension permissions are required to use this feature.');
        return false;
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Check both extension and store contexts
      const isExtensionAuth = window.location.href.includes('from=extension');
      const isStoreAuth = window.location.href.includes('from=store');
      
      console.log('Auth context:', { isExtensionAuth, isStoreAuth });

      await loadGoogleScript();
      console.log('Google script loaded, proceeding with sign in...');

      // Request permissions for both extension and store auth
      if (isExtensionAuth || isStoreAuth) {
        const permissionsGranted = await requestExtensionPermissions();
        if (!permissionsGranted) {
          console.log('Extension permissions not granted');
          return;
        }
      }

      const client = initializeGoogleAuth(async (response) => {
        if (!response || !response.access_token) {
          console.error('No access token received from Google');
          alert('Failed to get authentication token from Google. Please try again.');
          return;
        }

        try {
          console.log('Got access token, calling backend...');
          const { data } = await axios.post(`${API_URL}/api/auth/google`, {
            token: response.access_token
          });

          if (!data || !data.token) {
            console.error('Invalid response from backend:', data);
            alert('Invalid response from server. Please try again.');
            return;
          }

          console.log('Successfully authenticated with backend');

          // Store in localStorage first
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          // Handle extension storage for both extension and store auth
          if (isExtensionAuth || isStoreAuth) {
            try {
              console.log('Storing auth data in extension...');
              chrome.storage.sync.set({
                authToken: data.token,
                commentCount: 0,
                isPremium: data.user.isPremium || false
              }, () => {
                if (chrome.runtime.lastError) {
                  console.error('Storage error:', chrome.runtime.lastError);
                  return;
                }
                console.log('Auth data stored in extension');
                
                chrome.storage.sync.get(['authToken'], (result) => {
                  console.log('Storage verification:', result.authToken ? 'success' : 'failed');
                  
                  chrome.runtime.sendMessage({
                    action: 'authStateChanged',
                    isAuthenticated: true,
                    token: data.token
                  }, () => {
                    console.log('Extension auth complete, closing window...');
                    window.close();
                  });
                });
              });
            } catch (storageError) {
              console.error('Extension storage error:', storageError);
              alert('Failed to store authentication in extension. Please try again.');
            }
          } else {
            // Regular website flow
            window.location.reload();
          }
        } catch (apiError) {
          console.error('Backend API error:', apiError);
          alert(apiError.response?.data?.error || 'Authentication failed. Please try again.');
        }
      });

      await client.requestAccessToken();
    } catch (error) {
      console.error('Google Sign-in initialization error:', error);
      alert('Failed to initialize Google Sign-In. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Comment Assistant
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to start generating AI-powered comments
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}