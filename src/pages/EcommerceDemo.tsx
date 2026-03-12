import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, Plus, Minus, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

export default function EcommerceDemo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Array<{id: number, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/ecommerce/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    setIsCartOpen(true);
    setOrderSuccess(false);
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

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/ecommerce/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
      });
      
      if (res.ok) {
        setCart([]);
        setOrderSuccess(true);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#f5f2ed] font-sans text-[#1a1a1a]">
      {/* Navbar */}
      <nav className="bg-[#f5f2ed] border-b border-[#1a1a1a]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors flex items-center gap-1 text-xs uppercase tracking-widest font-semibold">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
          
          <div className="font-serif font-light text-3xl tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
            Maison.
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold text-[#1a1a1a]/60">
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Shop</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Collections</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Journal</a>
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-[#1a1a1a]/5 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#1a1a1a] text-[#f5f2ed] text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[60vh] bg-[#1a1a1a] text-[#f5f2ed] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 opacity-80">Autumn / Winter 2024</p>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-8 tracking-tight">The Art of Living</h1>
          <button className="px-8 py-3 border border-[#f5f2ed] text-sm uppercase tracking-widest hover:bg-[#f5f2ed] hover:text-[#1a1a1a] transition-colors duration-500">
            Discover Collection
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <h2 className="text-3xl font-serif font-light">Curated Objects</h2>
          <div className="flex gap-4 text-xs uppercase tracking-widest">
            <button className="font-semibold border-b border-[#1a1a1a] pb-1">All</button>
            <button className="text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors pb-1">Home</button>
            <button className="text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors pb-1">Accessories</button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-[#1a1a1a]/50 font-serif italic">Curating collection...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-[#e8e5e0] overflow-hidden mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#f5f2ed] text-[#1a1a1a] text-xs uppercase tracking-widest font-semibold py-3 px-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#1a1a1a] hover:text-[#f5f2ed]"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#1a1a1a]/50 uppercase tracking-widest mb-2">{product.category}</p>
                  <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#f5f2ed] shadow-2xl z-50 flex flex-col border-l border-[#1a1a1a]/10"
            >
              <div className="flex items-center justify-between p-8 border-b border-[#1a1a1a]/10">
                <h2 className="text-2xl font-serif font-light">Your Cart ({cartItemsCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#1a1a1a]/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {orderSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#1a1a1a] space-y-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                      <Star className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl">Order Confirmed</h3>
                    <p className="text-center text-[#1a1a1a]/60">Thank you for your purchase. Your items will be shipped shortly.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-8 px-8 py-3 bg-[#1a1a1a] text-[#f5f2ed] text-xs uppercase tracking-widest font-semibold hover:bg-[#1a1a1a]/80 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#1a1a1a]/50 space-y-6">
                    <ShoppingCart className="w-12 h-12 opacity-20" />
                    <p className="font-serif italic text-lg">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-[#1a1a1a] text-xs uppercase tracking-widest font-semibold border-b border-[#1a1a1a] pb-1 hover:text-[#1a1a1a]/60 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map(item => {
                      const product = products.find(p => p.id === item.id)!;
                      return (
                        <div key={item.id} className="flex gap-6">
                          <img src={product.image} alt={product.name} className="w-24 h-32 object-cover bg-[#e8e5e0]" loading="lazy" />
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between mb-1">
                              <h3 className="font-serif text-lg line-clamp-2 pr-4">{product.name}</h3>
                            </div>
                            <p className="text-xs text-[#1a1a1a]/50 uppercase tracking-widest mb-4">{product.category}</p>
                            <p className="font-medium mb-auto">${(product.price * item.quantity).toFixed(2)}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-[#1a1a1a]/20">
                                <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-[#1a1a1a]/5 transition-colors">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-[#1a1a1a]/5 transition-colors">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs uppercase tracking-widest text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors"
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

              {cart.length > 0 && !orderSuccess && (
                <div className="p-8 border-t border-[#1a1a1a]/10 bg-white/50">
                  <div className="flex justify-between mb-6 text-lg">
                    <span className="font-serif">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-[#1a1a1a]/50 mb-8 uppercase tracking-widest">Shipping and taxes calculated at checkout.</p>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-[#1a1a1a] text-[#f5f2ed] py-4 text-sm uppercase tracking-widest font-semibold hover:bg-[#1a1a1a]/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? 'Processing...' : 'Checkout'}
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
