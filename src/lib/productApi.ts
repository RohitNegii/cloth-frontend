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

export const addReview = (productId: string, rating: number, comment: string) => {
    return api.post(`/reviews`, { product: productId, rating, comment });
};

export const getReviews = (productId: string) => {
    return api.get(`/reviews/product/${productId}`);
};