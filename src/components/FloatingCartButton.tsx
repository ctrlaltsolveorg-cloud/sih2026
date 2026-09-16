'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCartButton() {
  const { itemCount, setIsCartOpen } = useCart();
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        id="floating-cart-btn"
        className="group relative w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-br from-[#0F3826] via-[#072115] to-[#0F3826] text-amber-400 rounded-full shadow-2xl border-2 border-amber-400/50 hover:border-amber-400 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center backdrop-blur-md"
        aria-label={language === 'hi' ? `खरीदारी टोकरी (${itemCount})` : `Cart (${itemCount})`}
        title={
          language === 'hi'
            ? `खरीदारी टोकरी (${itemCount} वस्तुएँ)`
            : `Shopping Cart (${itemCount} items)`
        }
      >
        {/* Glow effect on hover */}
        <span className="absolute inset-0 rounded-full bg-amber-400/20 opacity-0 group-hover:opacity-100 transition duration-300 blur-sm pointer-events-none" />

        {/* Cart Icon & Item Badge Only */}
        <div className="relative flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 group-hover:rotate-6 transition duration-200" />
          {itemCount > 0 && (
            <span className="absolute -top-2.5 -right-2.5 min-w-[22px] h-[22px] px-1 bg-amber-500 text-emerald-950 font-black text-xs rounded-full flex items-center justify-center border-2 border-[#0F3826] shadow-md animate-pulse">
              {itemCount}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
