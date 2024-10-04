import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItem = (item) => {
    console.log('Adding item:', item);
    const itemToAdd = { ...item };
    dispatch(addItem(itemToAdd));
  };

  const handleRemoveItem = (item) => {
    console.log('Removing item from cart:', item);
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-5">
      <h2 className="text-2xl sm:text-4xl tracking-wider border-b p-3 sm:p-6 text-center uppercase">Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-lg sm:text-xl p-4">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2 sm:space-y-0 max-w-full border-t p-2 sm:p-5">
            {cartItems.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 mb-2 sm:mb-4 border-b">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 w-full">
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    className="w-32 h-32 sm:w-44 sm:h-44 object-contain"
                  />
                  <span className="text-sm w-full text-center sm:text-left uppercase">{item.name}</span>
                  <span className="text-sm mt-2 sm:mt-0 
                  sm:ml-4">${item.price}</span>
                  
                  <div className="flex items-center border
                   border-gray-300 mt-2 sm:mt-0">
                    <button 
                      onClick={() => handleRemoveItem(item)} 
                      className="px-3 py-2 text-xl font-semibold 
                      border-r border-gray-300 hover:bg-gray-200 transition duration-200"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-sm w-10 
                    text-center">{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddItem(item);
                      }}
                      className="px-3 py-2 text-xl font-semibold 
                      border-l border-gray-300 hover:bg-gray-200 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row 
          justify-between items-center py-3 sm:py-5">
            <h3 className="text-xl sm:text-2xl uppercase
             mb-3 sm:mb-0">Total: ${totalPrice.toFixed(2)}</h3>
            <div className="flex flex-col sm:flex-row gap-2 
            sm:gap-4 w-10/12 sm:w-auto">
              <button 
                onClick={handleClearCart} 
                className="bg-[#1E1E1E] text-white px-10 
                sm:px-20 py-2 hover:bg-red-600 transition 
                duration-300 uppercase rounded-lg w-full sm:w-auto"
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout} 
                className="bg-blue-600 text-white px-10 
                sm:px-20 py-2 hover:bg-blue-700 transition 
                duration-300 uppercase rounded-lg w-full sm:w-auto"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
