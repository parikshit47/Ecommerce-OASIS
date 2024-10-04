import workimg from '/src/assets/work.webp';

const Work = () => {
  return (
    <div className="py-20 px-4 text-center relative flex justify-center items-center overflow-hidden">
      <div className='bg-zinc-50 text-black font-smono absolute z-10 w-4/5 md:w-2/3 lg:w-1/3 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl'>
        <h2 className='text-2xl uppercase mb-4'>Oasis Employment</h2>
        <p className='mb-6'>Do you want to work with us?</p>
        <a href="" className='inline-block bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition-colors duration-300'>
          Check out the possibilities
        </a>
      </div>
      <div className='w-full h-full'>
        <img 
          src={workimg} 
          loading="lazy" 
          alt="Oasis work environment" 
          className='w-full h-full object-cover rounded-lg'
        />
      </div>
    </div>
  )
}

export default Work