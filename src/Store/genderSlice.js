import {createSlice} from '@reduxjs/toolkit';

const genderSlice = createSlice({
  name: 'gender',
  initialState: {gender: []},
  reducers: {
    addGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const {addGender} = genderSlice.actions;
export default genderSlice.reducer;
