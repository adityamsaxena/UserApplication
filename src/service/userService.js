import axiosInstance from '../helper/axiosInterceptors';
import API_PATHS from './apiPath';

// Fetch users for a specific page
export const fetchUsers = async (page) => {
  try {
    const response = await axiosInstance.get(`${API_PATHS.USER_LIST}?pageNumber=${page}&pageSize=10`);
    return {
      users: response.data.data,
      totalRecords: response.data.totalRecords,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_PATHS.DELETE_USER}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Fetch user details by user ID
export const fetchUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_PATHS.USER_LIST}/${id}`);
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Update user details by user ID
export const updateUser = async (id, updatedUserData) => {
  try {
    const response = await axiosInstance.put(`${API_PATHS.USER_LIST}/${id}`, updatedUserData);
    return response.data.user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
