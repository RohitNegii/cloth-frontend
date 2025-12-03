import api from "./api";

interface CartItem {
  product: string; // product id
  name?: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

interface OrderPayload {
  userId: string;
  items: CartItem[];
  totalPrice: number;
  shippingAddress: ShippingAddress;
}

export const createOrder = (orderData: OrderPayload) => {
  return api.post("/orders", orderData);
};

export const trackOrder = (orderId: string) => {
  return api.get(`/orders/${orderId}/track`);
};

// Admin route
export const updateOrderStatus = (orderId: string, status: string) => {
  return api.put(`/orders/${orderId}/status`, { status });
};

export const orderApi = {
  createOrder,
  trackOrder,
  updateOrderStatus,
};