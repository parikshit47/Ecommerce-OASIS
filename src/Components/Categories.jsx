import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import plantersImage from '/src/assets/planters.webp';
import plantsImage from '/src/assets/plants.webp';
import floralImage from '/src/assets/floral.webp';

const categories = [
  { name: 'Planters', image: plantersImage, link: '/shop/planters' },
  { name: 'Cactus', image: plantsImage, link: '/shop/cactus' },
  { name: 'Floral', image: floralImage, link: '/shop/floral' },
];

const CategoryCard = (category) => (
  <div className="relative flex flex-col items-center cursor-pointer group bg-black">
    <Suspense fallback={<div className="w-full h-full bg-gray-200"></div>}>
      <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-80" />
    </Suspense>
    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
      <p className="text-4xl uppercase text-white mb-4">{category.name}</p>
      <Link to={category.link} className="px-4 py-2 bg-white text-black uppercase text-lg hover:bg-gray-200 transition">
        Shop {category.name}
      </Link>
    </div>
  </div>
);

const Categories = () => {
  return (
    <div className="p-5 text-center">
      <h1 className="font-reck uppercase text-4xl p-6">Categories</h1>
      <div className="max-w-8xl p-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} name={category.name} image={category.image} link={category.link} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
