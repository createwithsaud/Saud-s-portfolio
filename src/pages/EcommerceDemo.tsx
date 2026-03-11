import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, Plus, Minus, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Minimalist Chronograph',
    price: 249.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Watches'
  },
  {
    id: 2,
    name: 'Premium Wireless Headphones',
    price: 349.00,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Audio'
  },
  {
    id: 3,
    name: 'Leather Messenger Bag',
    price: 189.50,
    rating: 4.7,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Smart Home Speaker',
    price: 129.99,
    rating: 4.5,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 159.00,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Ceramic Coffee Dripper',
    price: 45.00,
    rating: 4.6,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600&h=600',
    category: 'Home'
  }
];

export default function EcommerceDemo() {
  const [cart, setCart] = useState<Array<{id: number, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Navbar */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <div className="font-serif font-bold text-2xl tracking-tight">LUMIÈRE</div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
              <a href="#" className="hover:text-black">Shop</a>
              <a href="#" className="hover:text-black">Collections</a>
              <a href="#" className="hover:text-black">About</a>
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-neutral-900 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Curated Essentials</h1>
        <p className="text-neutral-400 max-w-xl mx-auto">Discover our collection of thoughtfully designed products for your everyday life.</p>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <div className="flex gap-2">
            <select className="bg-white border border-neutral-200 text-sm rounded-md px-3 py-1.5 outline-none">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square bg-neutral-200 rounded-xl overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => addToCart(product.id)}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-black font-medium py-3 rounded-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
                >
                  Add to Cart
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">{product.category}</p>
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-neutral-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-400">({product.reviews})</span>
                  </div>
                </div>
                <p className="font-medium">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Slide-over Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <h2 className="text-xl font-bold">Your Cart ({cartItemsCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                    <ShoppingCart className="w-12 h-12 text-neutral-300" />
                    <p>Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-black font-medium underline underline-offset-4 hover:text-neutral-600"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => {
                      const product = products.find(p => p.id === item.id)!;
                      return (
                        <div key={item.id} className="flex gap-4">
                          <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md bg-neutral-100" />
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                              <p className="font-medium text-sm">${(product.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="text-xs text-neutral-500 mb-3">{product.category}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-neutral-200 rounded-md">
                                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-neutral-50 text-neutral-600">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-neutral-50 text-neutral-600">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-neutral-500 underline underline-offset-2 hover:text-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-100 bg-neutral-50">
                  <div className="flex justify-between mb-4 text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mb-6">Shipping and taxes calculated at checkout.</p>
                  <button className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
