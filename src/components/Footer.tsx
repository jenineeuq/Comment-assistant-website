import { MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-blue-500 to-blue-400 mt-20">
      {/* Curved top edge */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[120px] transform rotate-180"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="currentColor"
            className="text-blue-500"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <MessageSquare className="w-8 h-8" />
          <span className="ml-2 text-xl font-bold">Comment Assistant</span>
        </div>

        {/* Copyright and Links */}
        <div className="space-y-4">
          <p>&copy; {new Date().getFullYear()} Comment Assistant. All Rights Reserved.</p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <a href="#" className="hover:text-blue-100 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-100 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-100 transition-colors">Sign up</a>
          </div>
        </div>
      </div>
    </footer>
  );
}