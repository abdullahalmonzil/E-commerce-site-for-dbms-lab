import React from 'react';
import { useStore } from './StoreContext';

const CATEGORY_MAP = {
  Men: ['Shirts', 'T-Shirts', 'Pants', 'Trousers', 'Belts', 'Undergarments'],
  Women: ['Dresses', 'Tops', 'Clothes', 'Pants', 'T-Shirts', 'Trousers']
};

export const CatalogPage = ({ products, onSelectProduct }) => {
  const { activeCategory, setActiveCategory, searchQuery, addToCart } = useStore();

  const filteredProducts = products.filter(item => {
    const matchesGender = activeCategory.gender === 'All' || item.gender === activeCategory.gender;
    const matchesSub = activeCategory.sub === 'All' || item.category === activeCategory.sub;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGender && matchesSub && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Category Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Categories</h3>
          
          <button
            onClick={() => setActiveCategory({ gender: 'All', sub: 'All' })}
            className={`block w-full text-left py-2 px-3 rounded text-sm font-medium mb-2 ${
              activeCategory.gender === 'All' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>

          {['Men', 'Women'].map(gender => (
            <div key={gender} className="mb-6">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">{gender}</h4>
              <div className="space-y-1">
                {CATEGORY_MAP[gender].map(sub => (
                  <button
                    key={sub}
                    onClick={() => setActiveCategory({ gender, sub })}
                    className={`block w-full text-left py-1.5 px-3 rounded text-sm ${
                      activeCategory.gender === gender && activeCategory.sub === sub
                        ? 'bg-gray-200 font-semibold text-black'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeCategory.gender} {activeCategory.sub !== 'All' ? `- ${activeCategory.sub}` : ''}
          </h1>
          <span className="text-sm text-gray-500">{filteredProducts.length} items found</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No products match your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="group border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
              >
                {/* Clicking Image -> Opens Product Detail Page */}
                <div 
                  className="aspect-w-3 aspect-h-4 bg-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{product.gender} • {product.category}</p>
                    
                    {/* Clicking Title -> Opens Product Detail Page */}
                    <h3 
                      className="font-medium text-gray-900 mt-1 cursor-pointer hover:underline truncate"
                      onClick={() => onSelectProduct(product)}
                    >
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    
                    {/* Separate Button -> Only triggers Add to Cart without opening Product Detail */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents opening Product Detail Page
                        addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0] || 'Black', 1);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-black rounded hover:bg-gray-800 transition-colors"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};