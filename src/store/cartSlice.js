import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeFromCart: (state, action) => {
      // ลบสินค้าทั้งหมดที่มี id ตรงกับ action.payload
      state.items = state.items.filter((item) => item.id !== action.payload);
    
      // คำนวณ total ใหม่
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity ,removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;