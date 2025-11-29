
"use client";

import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Layout from '@/component/layout/Layout';
import Link from 'next/link';
import { getProductById } from '@/lib/productApi'; // Assuming you have this API function

const relatedProducts = [
    {
        id: 2,
        name: "Classic Denim Jacket",
        category: "Jackets",
        price: "₹4,499",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
        ctaLink: "/product/2",
    },
    {
        id: 3,
        name: "Linen Blend Shirt",
        category: "Shirts",
        price: "₹2,799",
        imageUrl: "https://images.unsplash.com/photo-1621072156002-e2f31c197e41?auto=format&fit=crop&w=600&q=80",
        ctaLink: "/product/3",
    },
    {
        id: 4,
        name: "Tailored Chino Trousers",
        category: "Trousers",
        price: "₹3,299",
        imageUrl: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
        ctaLink: "/product/4",
    },
    {
        id: 5,
        name: "Minimalist Leather Sneakers",
        category: "Footwear",
        price: "₹5,999",
        imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
        ctaLink: "/product/5",
    },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(params.id);
        setProduct(productData.product);
        setMainImage(productData.product.images[0]);
        setSelectedSize(productData.product.sizes[0]);
        setSelectedColor(productData.product.colors[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (!product) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="bg-[var(--background-light)] text-[var(--text-primary)] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
                {product.images.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} - view ${idx + 1}`}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${mainImage === img ? 'border-[var(--primary-brand)]' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
              <div className="flex-1">
                <img src={mainImage} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-[var(--primary-brand)]">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] ml-2">({product.reviews} reviews)</p>
              </div>
              <p className="text-3xl font-bold text-[var(--primary-brand)] mb-6">${product.price}</p>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">{product.description}</p>

              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Size:</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-md border-2 font-semibold ${selectedSize === size ? 'bg-[var(--primary-brand)] text-white border-[var(--primary-brand)]' : 'bg-transparent text-[var(--text-primary)] border-gray-300 hover:border-[var(--primary-brand)]'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Color:</h3>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-[var(--primary-brand)]' : 'border-transparent'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[var(--buttons-highlight)] text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <FiShoppingCart /> Add to Cart
                </button>
                <button className="p-4 rounded-lg bg-[var(--contrast-light-2)] text-[var(--text-primary)] hover:bg-gray-300 transition-colors"><FiHeart /></button>
                <button className="p-4 rounded-lg bg-[var(--contrast-light-2)] text-[var(--text-primary)] hover:bg-gray-300 transition-colors"><FiShare2 /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="bg-[var(--contrast-light-2)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-[var(--primary-brand)] mb-8">Related Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <Link href={relatedProduct.ctaLink}>
                    <div className="relative w-full h-64 overflow-hidden">
                    <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    </div>
                    <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{relatedProduct.category}</p>
                    <h3 className="text-lg font-bold text-gray-900 truncate">{relatedProduct.name}</h3>
                    <p className="text-xl font-extrabold text-gray-900 mt-2">{relatedProduct.price}</p>
                    </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
