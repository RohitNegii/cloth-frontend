
import http from './api';

const sendOtp = (phone: string) => {
  return http.post('/users/send-otp', { phone });
};

const verifyOtp = (phone: string, otp: string, name: string, email: string) => {
  return http.post('/users/verify-otp', { phone, otp, name, email });
};

const getUserProfile = () => {
  return http.get('/users/profile');
};

const updateUserProfile = (data: object) => {
  return http.put('/users/profile', data);
};

export const userApi = {
  sendOtp,
  verifyOtp,
  getUserProfile,
  updateUserProfile,
};
