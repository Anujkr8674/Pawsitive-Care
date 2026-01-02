// api/userAPI.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_USER(userId));
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
    throw error;
  }
};
