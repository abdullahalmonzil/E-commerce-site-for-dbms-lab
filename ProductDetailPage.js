import React, { useState } from 'react';
import { useStore } from './StoreContext';

export const ProductDetailPage = ({ product, onBack }) => {
  const { addToCart } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || 'Black');
  const [quantity, setQuantity] = useState(1);

  const images = product.gallery || [product.imageUrl];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={onBack} className="mb-6 text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1">
        ← Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  selectedImage === idx ? 'border-black' : 'border-transparent'
                }`}
              />
            ))}
          </div>
          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
            <img src={images[selectedImage]} alt={product.title} className="w-full h-[500px] object-cover" />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{product.gender} / {product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
          <p className="text-2xl font-black text-gray-900 mt-4">${product.price.toFixed(2)}</p>

          <p className="mt-6 text-gray-600 leading-relaxed text-sm">{product.description}</p>

          {/* Size Selector */}
          {product.sizes && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Size</label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 border rounded text-sm font-medium ${
                      selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {product.colors && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Color</label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 border rounded text-sm font-medium ${
                      selectedColor === color ? 'border-black bg-gray-100 font-bold' : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
              <span className="px-4 text-sm font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
            </div>

            <button
              onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
              className="flex-1 bg-black text-white py-3.5 px-6 rounded font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              Add to Shopping Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};