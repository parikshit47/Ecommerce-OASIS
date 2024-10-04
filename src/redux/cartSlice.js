import { createSlice } from '@reduxjs/toolkit';

// Retrieve cart state from localStorage or set to empty array
const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      const quantityToAdd = Math.max(action.payload.quantity || 1, 1); // Ensure quantity is at least 1
    
      if (existingItem) {
        // If item exists, increase the quantity by the specified amount
        existingItem.quantity += 1;
      } else {
        // Add new item with the specified quantity
        state.push({ ...action.payload, quantity: quantityToAdd });
      }
    
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    removeItem: (state, action) => {
      const itemIndex = state.findIndex((item) => item.id === action.payload.id);
      
      if (itemIndex !== -1) {
        if (state[itemIndex].quantity > 1) {
          // Decrease the quantity if it's greater than 1
          state[itemIndex].quantity -= 1;
        } else {
          // Remove item from cart if quantity is 1
          state.splice(itemIndex, 1);
        }
      }
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCart: (state) => {
      state.length = 0;
      localStorage.removeItem('cart'); // Clear from localStorage
    },
  },
});

// Export the actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;
// Export the reducer
export default cartSlice.reducer;
