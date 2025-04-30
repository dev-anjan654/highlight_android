import {createSlice} from '@reduxjs/toolkit';

const bookingDateSlice = createSlice({
  name: 'date',
  initialState: {booking_date: []},
  reducers: {
    addBookingDate: (state, action) => {
      state.booking_date = action.payload;
    },
  },
});

export const {addBookingDate} = bookingDateSlice.actions;
export default bookingDateSlice.reducer;
