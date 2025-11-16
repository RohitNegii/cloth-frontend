
import React from 'react';
import ProductDetailPage from './[productId]';

// This page is a fallback for the product detail page.
export default function ProductPage() {
  return <ProductDetailPage params={{ productId: '1' }} />;
}
