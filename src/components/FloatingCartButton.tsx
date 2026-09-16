'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCartButton() {
  const { itemCount, totalPaise, setIsCartOpen } = useCart();
  const { language } = useLanguage();

  const totalRupees = (totalPaise / 100).toFixed(2);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        id="floating-cart-btn"
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#0F3826] via-[#072115] to-[#0F3826] text-amber-50 rounded-full shadow-2xl border-2 border-amber-400/40 hover:border-amber-400 hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
        aria-label={language === 'hi' ? `खरीदारी टोकरी (${itemCount})` : `Shopping Cart (${itemCount})`}
        title={
          language === 'hi'
            ? `खरीदारी टोकरी — ${itemCount} वस्तुएँ • ₹${totalRupees}`
            : `Shopping Cart — ${itemCount} items • ₹${totalRupees}`
        }
      >
        {/* Glow effect on hover */}
        <span className="absolute inset-0 rounded-full bg-amber-400/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-sm pointer-events-none" />

        {/* Cart Icon & Item Badge */}
        <div className="relative">
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:rotate-6 transition duration-200" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2.5 min-w-[20px] h-5 px-1 bg-amber-500 text-emerald-950 font-black text-[11px] rounded-full flex items-center justify-center border-2 border-[#0F3826] shadow-md animate-pulse">
              {itemCount}
            </span>
          )}
        </div>

        {/* Text & Amount Preview */}
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs sm:text-sm font-extrabold text-amber-100 tracking-wide">
            {language === 'hi' ? 'टोकरी' : 'Cart'}
          </span>
          {itemCount > 0 ? (
            <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300">
              ₹{totalRupees}
            </span>
          ) : (
            <span className="text-[9px] text-amber-200/60 hidden sm:inline font-medium">
              {language === 'hi' ? 'खाली' : 'Empty'}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
