'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingCart } from 'lucide-react';

export default function FloatingCartButton() {
  const { itemCount, setIsCartOpen } = useCart();
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        id="floating-cart-btn"
        className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0F3826] via-[#144932] to-[#072115] text-amber-300 shadow-[0_10px_30px_-5px_rgba(15,56,38,0.5)] border-2 border-amber-400/40 hover:border-amber-300 hover:shadow-[0_15px_35px_-5px_rgba(15,56,38,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center backdrop-blur-xl ring-4 ring-emerald-900/15 dark:ring-emerald-400/15"
        aria-label={language === 'hi' ? `खरीदारी टोकरी (${itemCount})` : `Shopping Cart (${itemCount})`}
        title={
          language === 'hi'
            ? `खरीदारी टोकरी (${itemCount} वस्तुएँ)`
            : `Shopping Cart (${itemCount} items)`
        }
      >
        {/* Ambient Radial Hover Glow */}
        <span className="absolute inset-0 rounded-full bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />

        {/* Supermarket Trolley Cart Icon */}
        <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 group-hover:rotate-6 transition-transform duration-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />

        {/* Premium Corner Notification Badge (Blinkit / iOS Style) */}
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[24px] h-[24px] px-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-black text-xs rounded-full flex items-center justify-center border-2 border-white dark:border-[#072115] shadow-lg shadow-amber-500/40 tracking-tight transform transition-transform duration-200 group-hover:scale-110">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
}
