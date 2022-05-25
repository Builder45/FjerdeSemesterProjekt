import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  //changed: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    loadCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    //setChangedFalse(state) {
    //  state.changed = false;
    //},

    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      //state.changed = true;

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
      //state.changed = true;
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }
      else {
        state.items = state.items.filter(item => item.id !== id);
      }
    }
  }
});

export default cartSlice;