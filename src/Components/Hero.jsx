import { useState, useEffect } from 'react';
import hero_img from '/src/assets/hero.jpg';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = hero_img;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section>
      <div className='w-full h-screen relative bg-green-950'>
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={hero_img} 
            className="w-full h-full object-cover opacity-80" 
            alt="Hero" 
          />
        </div>
      </div>
    </section>
  )
}

export default Hero