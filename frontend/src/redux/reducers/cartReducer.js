import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartArr: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, image, name, price } = action.payload;
      const existingItem = state.cartArr.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartArr.push({ id, image, name, price, quantity: 1 });
      }
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    },

    increaseQuantity(state, action) {
      const item = state.cartArr.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    },

    decreaseQuantity(state, action) {
      const item = state.cartArr.find(item => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cartArr = state.cartArr.filter(item => item.id !== action.payload);
        }
      }
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    },

    rem(state, action) {
      state.cartArr = state.cartArr.filter(item => item.id !== action.payload);
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    },

    clearCart(state) {
      state.cartArr = [];
      state.total = 0;
    },
    setCart(state, action) {
      state.cartArr = action.payload;
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    }
    
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  rem,
  clearCart,
  setCart
} = cartSlice.actions;

export const cartReducer =  cartSlice.reducer;
