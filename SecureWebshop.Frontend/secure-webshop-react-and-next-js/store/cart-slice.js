import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    loadCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItem(state, action) {
      const newItem = action.payload;
      if (newItem.priceReduction > 0) {
        newItem.price = newItem.price * (100 - newItem.priceReduction) / 100;
      }

      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          total: newItem.price
        });
      }
      else {
        existingItem.quantity++;
        existingItem.total += existingItem.price;
      }
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }
      else {
        state.items = state.items.filter(item => item.id !== id);
      }
    },

    reset(state) {
      state.totalQuantity = 0;
      state.items = [];
    }
  }
});

export default cartSlice;