import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Vogue', url: '/images/vogue-logo.png' },
  { name: 'Architectural Digest', url: '/images/ad-logo.png' },
  { name: 'Gardeners World', url: '/images/gw-logo.png' },
  { name: 'GQ', url: '/images/gq-logo.png' },
  { name: 'New York Times', url: '/images/ny-times.png' },
];

const Marquee = () => {
  const marqueeRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const logos = logosRef.current;

    if (marquee && logos) {
      const logosWidth = logos.scrollWidth; // Total width of the logos
      const animationDuration = logosWidth / 60; // Adjust speed (60 pixels per second)

      // Set up the infinite animation
      const animation = marquee.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${logosWidth / 3}px)` } // Move by the width of one set of logos
        ],
        {
          duration: animationDuration * 1000, // Set the duration in milliseconds
          iterations: Infinity, // Loop forever
          easing: 'linear' // Keep a smooth, linear animation
        }
      );

      return () => {
        animation.cancel(); // Clean up the animation when the component unmounts
      };
    }
  }, []);

  return (
    <div className="overflow-hidden bg-transparent pt-20 pb-10 max-w-5xl mx-auto">
      <motion.div
        ref={marqueeRef}
        className="relative whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div ref={logosRef} className="inline-flex">
          {/* Repeat the logos three times for seamless looping */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="logo flex-shrink-0 mx-10">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-12 w-auto filter grayscale"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
