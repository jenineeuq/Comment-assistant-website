import { useEffect } from 'react';
import { Check } from 'lucide-react';

export default function PaymentSuccess() {
  useEffect(() => {
    // Update premium status in extension
    chrome.storage.sync.set({ 
      isPremium: true,
      commentCount: 0 
    });

    // Close window after 3 seconds if opened from extension
    const timer = setTimeout(() => {
      if (window.opener) {
        window.close();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Payment Successful!</h2>
        <p className="text-gray-600">
          Thank you for upgrading to unlimited access. Your account has been updated.
        </p>
        <p className="text-sm text-gray-500">
          This window will close automatically...
        </p>
      </div>
    </div>
  );
} 