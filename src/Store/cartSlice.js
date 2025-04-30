import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../utility/api';

// Async thunk to fetch cart details
export const fetchCartDetails = createAsyncThunk(
  'cart/fetchCartDetails',
  async (_, {rejectWithValue}) => {
    try {
      const tokenData = await AsyncStorage.getItem('user_log');
      const parsedToken = JSON.parse(tokenData);
      const body = {user_id: Number(parsedToken?.userId)};

      const response = await axios.post(`${BASE_URL}/api/get_carts`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching cart details:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  },
);

// Create a slice for cart state management
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCartDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartDetails = action.payload;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

// Export the async action and the reducer
export default cartSlice.reducer;
