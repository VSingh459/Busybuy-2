import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { setOrders, addOrder, clearOrders } = orderSlice.actions;
export const orderReducer =  orderSlice.reducer;
