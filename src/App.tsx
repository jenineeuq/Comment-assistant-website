import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pricing from './components/Pricing';
import Header from './components/Header';
import Stats from './components/Stats';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import UserAvatar from './components/UserAvatar';
import PaymentSuccess from './components/PaymentSuccess';
import Auth from './components/Auth';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="text-left">
                    {/* User count section */}
                    <div className="flex items-center mb-1">
                      <div className="flex -space-x-2 mr-3 relative">
                        <UserAvatar
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                          name="Sarah Chen"
                          role="Product Designer"
                        />
                        <UserAvatar
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
                          name="Michael Smith"
                          role="Marketing Lead"
                        />
                        <UserAvatar
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                          name="Emily Johnson"
                          role="Content Creator"
                        />
                        <UserAvatar
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                          name="David Wilson"
                          role="Social Media Manager"
                        />
                      </div>
                      <span className="text-gray-600 font-medium">147 happy creators</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-6xl font-bold text-gray-900 mb-3 leading-tight">
                      Comment Smarter
                      <br />
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                        Grow Faster
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-6 max-w-lg">
                      Create viral, high-engagement AI-powered 
                      Comments for Twitter & LinkedIn in 
                      one click.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col items-start gap-4">
                      <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center" 
                        onClick={() => window.location.href = 'https://chrome.google.com/webstore/detail/your-extension-id'}>
                        Get started for free
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          One-click signup
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          No credit card required
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Space for demo video */}
                  <div className="bg-gray-100 rounded-lg"></div>
                </div>
              </div>
            </div>
            <Stats />
            <Features />
            <FAQ />
          </>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;