import { Check } from 'lucide-react';

// Add Dodo Payments test configuration
const DODO_TEST_API = 'https://test.dodopayments.com';
const DODO_PRODUCT_ID = 'pdt_YC8TYtaHodo3O1ovKcFk4'; // You'll need to create this in Dodo dashboard

export default function Pricing() {
  const handlePayment = async () => {
    try {
      // Create payment session with Dodo Payments
      const response = await fetch(`${DODO_TEST_API}/api/v1/payment-sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eMHFZ909m8GpuhgC.v4ssfjDdwE5CaikmuTP4X5kZ90tk7elJTFQdy1imsm70XNh/'
        },
        body: JSON.stringify({
          productId: DODO_PRODUCT_ID,
          amount: 2900, // $29.00
          currency: 'USD',
          successUrl: 'https://comment-ai-25409.firebaseapp.com/payment-success',
          cancelUrl: 'https://comment-ai-25409.firebaseapp.com/pricing'
        })
      });

      const { paymentUrl } = await response.json();
      
      // Redirect to Dodo Payments checkout
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Lifetime Deal
            </span>
          </h2>
          <p className="text-xl text-gray-600">One-time payment, lifetime access.</p>
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12">
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <h3 className="text-2xl font-bold">Lifetime Access</h3>
                <p className="text-gray-500">One-time payment</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-500">/lifetime</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'Unlimited AI-powered comments',
                'Access to all future updates',
                'Premium support',
                'Multi-language support',
                'Advanced AI customization',
                'Priority feature requests'
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={handlePayment}
              className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200"
            >
              Get Lifetime Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 