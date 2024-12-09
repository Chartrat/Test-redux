// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    modalContent: null, // Optional: ใช้ในกรณีต้องการเปลี่ยนเนื้อหา Modal
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalContent = action.payload || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
