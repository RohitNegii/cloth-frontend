import http from './api';

export const userApi = {
  sendOtp: (phone: string) => {
    return http.post('/auth/send-otp', { phone });
  },
  verifyOtp: (phone: string, otp: string, name?: string, email?: string) => {
    return http.post('/auth/verify-otp', { phone, otp, name, email });
  },
  getProfile: () => {
    return http.get('/users/profile');
  },
};
