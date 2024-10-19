const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      const existingItem = state.items[existingIndex];

      let updatedItems;
      if (existingItem) {
        // If item exists, increase quantity by 1
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;
      } else {
        // Add the new item with quantity 1
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity + 1, // Increment total quantity
      };
    }

    case 'REMOVE_FROM_CART': {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      const existingItem = state.items[existingIndex];

      let updatedItems;
      if (existingItem.quantity > 1) {
        // If the quantity is more than 1, decrease the quantity
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingIndex] = updatedItem;
      } else {
        // If quantity is 1, remove the item from the cart
        updatedItems = state.items.filter(item => item.id !== action.payload.id);
      }

      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity - 1, // Decrement total quantity
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
