import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  id: '',
  email: '',
  token: '',
};
const authSlice = createSlice({
  name: 'auth', // tên của reducer
  // giá trị ban đầu
  initialState: { authData: initialState },
  reducers: {
    // tựa như các function
    addAuth: (state, action) => {
      state.authData = action.payload; // set giá trị mới payload mang theo thông tin tựa như useState
    },
    removeAuth: (state, action) => {
      state.authData = initialState;
    },
  },
});
export const authReducer = authSlice.reducer; // lấy tất cả reducer
export const { addAuth, removeAuth } = authSlice.actions; // các action trong reducers
export const authSelector = (state) => state.authReducer.authData; // lấy ra data
