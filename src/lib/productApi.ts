import api from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};

type AddReviewPayload = {
  orderId: string;
  productId: string;
  rating: number;
  comment?: string;
};

export const addReview = (data: AddReviewPayload) => {
  return api.post("/reviews/add", data);
};

export const getReviews = (productId: string) => {
    return api.get(`/reviews/product/${productId}`);
};