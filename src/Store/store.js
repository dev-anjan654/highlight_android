import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import branchSlice from './branchSlice';
import genderSlice from './genderSlice';
import bookingDateSlice from './bookingDateSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    branch: branchSlice,
    gender: genderSlice,
    date: bookingDateSlice,
    user: userSlice,
  },
});

export default store;
