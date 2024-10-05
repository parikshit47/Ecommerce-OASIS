import { useState, useEffect } from 'react';
import hero_img from '/src/assets/hero.jpg';
import mobile_hero_img from '/src/assets/mobile_hero.jpg';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    const img = new Image();
    img.src = isMobile ? mobile_hero_img : hero_img;
    img.onload = () => setImageLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <section>
      <div className='w-full h-screen relative'>
        <div className='w-full h-full bg-green-950 absolute top-0 left-0'></div>
        <img 
          src={isMobile ? mobile_hero_img : hero_img} 
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-80' : 'opacity-0'}`} 
          alt="Hero" 
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </section>
  )
}

export default Hero