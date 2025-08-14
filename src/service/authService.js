import axiosInstance from "../helper/axiosInterceptors";
import API_PATHS from "./apiPath";

// Function to handle user registration
export const registerUser = async (fullName, emailAddress, userPassword) => {
  try {
    const response = await axiosInstance.post(API_PATHS.REGISTER, {
      name: fullName,
      email: emailAddress,
      password: userPassword,
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// Function to handle email verification
export const verifyEmail = async (token, userId) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.VERIFY_EMAIL}?token=${token}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Verification failed";
  }
};

// Function to handle sending a password reset link
export const sendPasswordResetLink = async (email) => {
  try {
    const response = await axiosInstance.post(`${API_PATHS.FORGOT_PASSWORD}`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error sending reset link";
  }
};

// Function to reset password
export const resetPassword = async (userId, authToken, password) => {
  try {
    const response = await axiosInstance.post(API_PATHS.RESET_PASSWORD, {
      password,
      token: authToken,
      userId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error resetting password";
  }
};

// Function to Login
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(API_PATHS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
};
