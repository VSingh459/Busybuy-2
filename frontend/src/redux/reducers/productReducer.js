import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, image, name, price } = action.payload;
      const existingProduct = state.cartArr.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartArr.push({ id, image, name, price, quantity: 1 });
      }
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    increaseQuantity(state, action) {
      const product = state.cartArr.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    decreaseQuantity(state, action) {
      const product = state.cartArr.find((item) => item.id === action.payload);
      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          state.cartArr = state.cartArr.filter((item) => item.id !== action.payload);
        }
      }
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    rem(state, action) {
      state.cartArr = state.cartArr.filter((item) => item.id !== action.payload);
      state.total = state.cartArr.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, rem } = productSlice.actions;
export const prodReducer =  productSlice.reducer;
