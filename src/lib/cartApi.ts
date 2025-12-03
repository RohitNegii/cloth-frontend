import api from './api';

export const addToCart = (productId: string, quantity: number, size: string, color: string) => {
  return api.post("/cart/add", { product:productId, quantity, size, color });
};

export const getCart = () => {
  return api.get('/cart');
};

export const updateCartItem = (itemId: string, quantity: number) => {
  return api.put(`/cart/update/${itemId}`, { quantity });
};

export const removeFromCart = (itemId: string) => {
  return api.delete(`/cart/remove/${itemId}`);
};

