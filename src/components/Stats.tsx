import React, { useEffect, useState } from 'react';
import UserAvatar from './UserAvatar';

function AnimatedNumber({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Stats() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text tracking-tight leading-tight">
          Together, We Grow Faster!
        </h2>
        <div className="flex items-center justify-center space-x-4 text-4xl md:text-5xl font-bold tracking-tight text-center">
          <span className="text-gray-900">
            <AnimatedNumber end={1753} /> comments created by
          </span>
          <div className="flex -space-x-1.5 relative">
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
          <span className="text-gray-900">
            <AnimatedNumber end={147} /> creators.
          </span>
        </div>
      </div>
    </div>
  );
}