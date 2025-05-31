import { createSlice } from "@reduxjs/toolkit";
import data from '../../utils/data.js';

const initialState = {
  allProducts: data,
  filteredProducts: data,
  selectedCategories: [],
  priceRange: 100000,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPriceRange(state, action) {
      state.priceRange = action.payload;
      state.filteredProducts = state.allProducts.filter(product =>
        (state.selectedCategories.length === 0 || 
          state.selectedCategories.includes(product.category)) &&
        product.price <= state.priceRange
      );
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
      state.filteredProducts = state.allProducts.filter(product =>
        (state.selectedCategories.length === 0 || 
          state.selectedCategories.includes(product.category)) &&
        product.price <= state.priceRange
      );
    },
  },
});

export const { setPriceRange, setSelectedCategories } = filterSlice.actions;

export const filterReducer =  filterSlice.reducer;
