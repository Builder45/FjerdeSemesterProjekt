import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: "",
  visible: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {

    setNotification(state, action) {
      state.notification = action.payload;
      state.visible = true;
    },

    toggleNotification(state, action) {
      state.visible = action.payload;
    }
  }
});

export default uiSlice;