import hero_img from '/src/assets/hero.jpg';
const Hero = () => {
  return (
    <section>
        <div className='w-full object-cover bg-black'>
           <img src={hero_img} className="w-full opacity-80 " alt="" />
        </div>
    </section>
  )
}

export default Hero;