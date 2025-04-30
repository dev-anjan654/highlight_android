import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../utility/api';

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async () => {
    try {
      const tokenData = await AsyncStorage.getItem('user_log');
      const parsedToken = JSON.parse(tokenData);
      const body = {CustomerId: Number(parsedToken?.userId)};

      const response = await axios.post(`${BASE_URL}/api/get_customer`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching user details:', error);
      throw error;
    }
  },
);

// Create a slice for user state management
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearUserDetails: state => {
      state.userDetails = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the async action and the reducer
export const {clearUserDetails} = userSlice.actions;

export default userSlice.reducer;
