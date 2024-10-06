import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import PropTypes from 'prop-types';

const categories = [
  { name: 'Planters', image: '/src/assets/planters.webp', link: '/shop/planters' },
  { name: 'Cactus', image: '/src/assets/plants.webp', link: '/shop/cactus' },
  { name: 'Floral', image: '/src/assets/floral.webp', link: '/shop/floral' },
];

const CategoryCard = ({ name, image, link }) => (
  <div className="relative flex flex-col items-center cursor-pointer group bg-black">
    <Suspense fallback={<div className="w-full h-full bg-gray-200"></div>}>
      <img src={image} alt={name} className="w-full h-full object-cover opacity-80" />
    </Suspense>
    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
      <p className="text-4xl uppercase text-white mb-4">{name}</p>
      <Link to={link} className="px-4 py-2 bg-white text-black uppercase text-lg hover:bg-gray-200 transition">
        Shop {name}
      </Link>
    </div>
  </div>
);

CategoryCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Categories = () => {
  return (
    <div className="p-5 text-center">
      <h1 className="font-reck uppercase text-4xl p-6">Categories</h1>
      <div className="max-w-8xl p-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
