import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store';
import App from './App.jsx'
import './index.css'

const stripePromise = loadStripe("pk_test_51Q5aF6102evEj0YHWnfYsXg3DhsQXNOWCTdXsNWe8HSGr3g7RO0fslN5S5k4L3K2bz9sgTAFsKEejSNnPaNBa42Z00YyNceAb5"); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Elements stripe={stripePromise}>
  <Provider store={store}>
  <App />
</Provider>
</Elements>
</StrictMode>

);
