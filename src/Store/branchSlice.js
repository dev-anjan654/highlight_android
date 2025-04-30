import {createSlice} from '@reduxjs/toolkit';

const branchSlice = createSlice({
  name: 'branch',
  initialState: {branch: []},
  reducers: {
    addBranch: (state, action) => {
      state.branch = action.payload;
    },
  },
});

export const {addBranch} = branchSlice.actions;
export default branchSlice.reducer;
