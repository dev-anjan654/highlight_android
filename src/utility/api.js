import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const BASE_URL = 'https://n44qm1v0-5000.inc1.devtunnels.ms';

const getToken = async () => {
  try {
    const tokenData = await AsyncStorage.getItem('user_log');
    if (tokenData) {
      const parsedToken = JSON.parse(tokenData);
      return parsedToken.token;
    }
    return null;
  } catch (error) {
    console.log('Error fetching token:', error);
    return null;
  }
};

// Registration
export const registerApp = async body => {
  try {
    const result = await axios.post(
      `${BASE_URL}/api/customer_registration`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendOTP = async body => {
  try {
    const result = await axios.post(`${BASE_URL}/api/send_otp`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyOTP = async body => {
  try {
    const result = await axios.post(`${BASE_URL}/api/verify_otp`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Login
export const customerLogin = async body => {
  try {
    const result = await axios.post(`${BASE_URL}/api/customer_login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Logout
export const customerLogout = async () => {
  const token = await getToken();
  try {
    const result = await axios.post(
      `${BASE_URL}/api/customer_logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//add to cart
export const addToCart = async body => {
  try {
    const result = await axios.post(`${BASE_URL}/api/add_to_cart`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//remove cart item
export const removeCartItem = async body => {
  try {
    const result = await axios.post(`${BASE_URL}/api/remove_from_cart`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//place order
export const placeOrder = async body => {
  try {
    const result = await axios.post(`${BASE_URL}/api/place_order`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//appointment history
export const fetchAppointmentHistory = async body => {
  try {
    const result = await axios.post(`${BASE_URL}/api/order_history`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//fetch orders by order Id
export const fetchOrdersById = async body => {
  try {
    const result = await axios.post(
      `${BASE_URL}/api/fetch_order_data_by_id`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return result;
  } catch (error) {
    return error;
  }
};

// Fetch All Details API
export const fetchAllDetails = async end_url => {
  try {
    const result = await axios.post(
      `${BASE_URL}/api/${end_url}`,
      {}, // An empty body for this request
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return result;
  } catch (error) {
    return error;
  }
};
