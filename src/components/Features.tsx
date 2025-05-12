import React from 'react';
import { Clock, Globe, MessageSquare, TrendingUp } from 'lucide-react';

export default function Features() {
  return (
    <div id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Feature Section */}
        <div className="mb-40">
          <h2 className="text-7xl font-extrabold text-center mb-24 leading-tight">
            Achieve{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Instant Growth
            </span>{" "}
            with AI.
          </h2>

          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="w-full md:w-1/2">
              <div className="rounded-xl p-6 bg-blue-50 inline-block mb-8 transform transition-transform hover:scale-110">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">Grow Your Profile Faster</h3>
              <p className="text-gray-600 text-lg">
                Grow your profile more quickly by participating in every relevant conversation, ensuring you're consistently seen and heard.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 rounded-lg aspect-video"></div>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 bg-gray-100 rounded-lg aspect-video"></div>
            <div className="w-full md:w-1/2">
              <div className="rounded-xl p-6 bg-blue-50 inline-block mb-8 transform transition-transform hover:scale-110">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">Reduce time by 10x</h3>
              <p className="text-gray-600 text-lg">
                Engage with 100+ posts in minutes, helping your profile grow organically and giving you more time for what matters most.
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center mt-24">
            <a href="#" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full overflow-hidden transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105">
              <span className="relative">Add to Chrome - It's Free</span>
            </a>
          </div>
        </div>

        {/* Second Feature Section */}
        <div>
          <h2 className="text-7xl font-extrabold text-center mb-24 leading-tight">
            Grow{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              smarter
            </span>
            , not harder
          </h2>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="w-full md:w-1/2">
              <div className="rounded-xl p-6 bg-blue-50 inline-block mb-8 transform transition-transform hover:scale-110">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">One Click Comment Generation</h3>
              <p className="text-gray-600 text-lg">
                One-click comment creation made easy. Pick your tone, and watch us generate a high-quality response in seconds.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-gray-100 rounded-lg aspect-video"></div>
          </div>
          
          {/* Feature 4 */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 bg-gray-100 rounded-lg aspect-video"></div>
            <div className="w-full md:w-1/2">
              <div className="rounded-xl p-6 bg-blue-50 inline-block mb-8 transform transition-transform hover:scale-110">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">Multilanguage Support</h3>
              <p className="text-gray-600 text-lg">
                Break language barriers with ease. Our extension supports multiple languages, allowing you to engage with a global audience and expand your reach across LinkedIn and Twitter.
              </p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center mt-24">
            <a href="#" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full overflow-hidden transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105">
              <span className="relative">Download Extension Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}