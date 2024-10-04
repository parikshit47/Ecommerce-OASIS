import planters from '/src/assets/planters.webp';
import floral from '/src/assets/floral.webp';
import plants from '/src/assets/plants.webp';

const Categories = () => {
    return (
        <div className="p-5 text-center">
            <h1 className="font-reck uppercase text-4xl p-6">Categories</h1>
            <div className="max-w-8xl p-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Planters Card */}
                <div className="relative flex flex-col items-center 
                cursor-pointer group bg-black">
                    <img 
                        src={planters}
                        alt="Planters" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-4xl uppercase text-white mb-4">Planters</p>
                        <a href="/shop/planters" className="px-4 py-2 bg-white text-black 
                        uppercase text-lg hover:bg-gray-200 transition">
                            Shop Planters
                        </a>
                    </div>
                </div>
                
                {/* Plants Card */}
                <div className="relative flex flex-col items-center cursor-pointer group bg-black">
                    <img 
                        src={plants}
                        alt="Cactus" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute
                     inset-0 flex flex-col justify-center items-center opacity-0 
                     group-hover:opacity-100 transition-opacity">
                        <p className="text-4xl uppercase text-white mb-4">Cactus</p>
                        <a href="/shop/cactus" className="px-4 py-2 bg-white text-black 
                        uppercase text-lg hover:bg-gray-200 transition">
                            Shop Cactus
                        </a>
                    </div>
                </div>
                
                {/* Floral Card */}
                <div className="relative flex flex-col items-center cursor-pointer group bg-black">
                    <img 
                        src={floral}
                        alt="Floral" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-4xl uppercase text-white mb-4">Floral</p>
                        <a href="/shop/floral" className="px-4 py-2 bg-white text-black 
                        uppercase text-lg hover:bg-gray-200 transition">
                            Shop Floral
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Categories;
