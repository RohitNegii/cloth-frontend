
import api from './api';

export const addToCart = (productId: string, quantity: number, size: string, color: string) => {
  return api.post('/cart', { productId, quantity, size, color });
};
