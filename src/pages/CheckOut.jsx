import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const CheckOut = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
  });
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    dispatch(clearCart());
    setPopupVisible(true);

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-sm rounded-lg">
      <h2 className="text-2xl mb-6 text-center uppercase font-light">Checkout</h2>

      <div className="mb-6">
        <h3 className="text-lg font-light mb-3">Your Cart Items</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-light">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                <span className="font-light">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-light text-gray-500" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border-b border-gray-200 focus:border-gray-400 transition-colors duration-300 bg-transparent"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-light text-gray-500" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border-b border-gray-200 focus:border-gray-400 transition-colors duration-300 bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-light text-gray-500" htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full p-2 border-b border-gray-200 focus:border-gray-400 transition-colors duration-300 bg-transparent"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-light text-gray-500" htmlFor="address">Billing Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border-b border-gray-200 focus:border-gray-400 transition-colors duration-300 bg-transparent"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-light text-gray-500">Card Details</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#333',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                  iconColor: '#fa755a',
                },
              },
            }}
            className="p-2 border-b border-gray-200"
          />
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-2 rounded-md transition duration-200 ${
            loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {loading ? 'Processing...' : 'Submit Order'}
        </button>
      </form>

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
            <h3 className="text-lg font-light mb-2">Thanks for your order!</h3>
            <p className="mb-4 text-gray-500">Your order has been placed successfully.</p>
            <button
              onClick={() => setPopupVisible(false)}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
