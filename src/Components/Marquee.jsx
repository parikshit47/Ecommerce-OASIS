import { useRef, useEffect } from 'react';

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
      const logosWidth = logos.scrollWidth;
      const animationDuration = logosWidth / 60;

      const animation = marquee.animate(
        [
          { transform: 'translateX(0)' },
          { transform: `translateX(-${logosWidth / 3}px)` }
        ],
        {
          duration: animationDuration * 1000,
          iterations: Infinity,
          easing: 'linear'
        }
      );

      return () => {
        animation.cancel();
      };
    }
  }, []);

  return (
    <div className="overflow-hidden bg-transparent pt-20 pb-10 max-w-5xl mx-auto">
      <div
        ref={marqueeRef}
        className="relative whitespace-nowrap"
      >
        <div ref={logosRef} className="inline-flex">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="logo flex-shrink-0 mx-10">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-12 w-auto filter grayscale"
                loading="lazy"
                width="100"
                height="48"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
