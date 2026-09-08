'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCropName, getLocalizedGrade } from '@/lib/i18n';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotalPaise,
    logisticsFeePaise,
    totalPaise,
    clearCart,
  } = useCart();
  const { t, language } = useLanguage();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [contractId, setContractId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    // Generate simulated smart contract hash
    const hash = 'KF-CONTRACT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setContractId(hash);
    setOrderPlaced(true);
  };

  const handleCloseSuccess = () => {
    setOrderPlaced(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF5EB] h-full shadow-2xl flex flex-col border-l border-emerald-900/10">
        {/* Header */}
        <div className="p-5 bg-[#0F3826] text-amber-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">{t.cartTitle}</h2>
              <p className="text-xs text-amber-200/80">स्मार्ट अनुबंध और प्रत्यक्ष प्रेषण</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-emerald-800 rounded-full transition"
          >
            <X className="w-5 h-5 text-amber-100" />
          </button>
        </div>

        {/* Body */}
        {orderPlaced ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-700 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-950 mb-2">ऑर्डर अनुबंध सफलतापूर्वक निष्पादित!</h3>
            <p className="text-sm text-emerald-800/80 mb-4">
              किसान और हब ऑपरेटर को स्वचालित प्रेषण आदेश भेज दिया गया है।
            </p>
            <div className="p-4 bg-emerald-900/5 rounded-2xl border border-emerald-900/10 w-full mb-6 text-left text-xs space-y-2 font-mono">
              <p className="text-emerald-900 font-bold">स्मार्ट कॉन्ट्रैक्ट आईडी: {contractId}</p>
              <p className="text-emerald-700">कुल भुगतान: ₹{(totalPaise / 100).toFixed(2)} ({totalPaise} पैसे)</p>
              <p className="text-emerald-700">एस्क्रौ स्थिति: निष्पादित (Locked in Escrow)</p>
            </div>
            <button
              onClick={handleCloseSuccess}
              className="w-full py-3.5 bg-[#0F3826] text-amber-50 font-bold rounded-xl shadow-lg hover:bg-emerald-900 transition flex items-center justify-center gap-2"
            >
              पूर्ण करें (Close) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-emerald-800/60 text-center py-12">
                  <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.5]" />
                  <p className="font-medium">{t.cartEmpty}</p>
                </div>
              ) : (
                cart.map((item) => {
                  const itemTotalPaise = Math.round(item.pricePaisePerKg * item.quantityKg);
                  return (
                    <div
                      key={item.listingId}
                      className="p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-900/10 shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-emerald-950">{getLocalizedCropName(item.cropName, language)}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-medium">
                            {getLocalizedGrade(item.grade, language)}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800/70 mb-2">
                          किसान: {item.farmerName} • {item.location}
                        </p>
                        <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                          <span>
                            ₹{(item.pricePaisePerKg / 100).toFixed(2)} / kg ({item.pricePaisePerKg} पैसे)
                          </span>
                          <span className="text-amber-800">
                            कुल: ₹{(itemTotalPaise / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-emerald-900/20 rounded-lg overflow-hidden bg-emerald-50/50">
                          <button
                            onClick={() => updateQuantity(item.listingId, item.quantityKg - 50)}
                            className="px-2 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-emerald-950">
                            {item.quantityKg}kg
                          </span>
                          <button
                            onClick={() => updateQuantity(item.listingId, item.quantityKg + 50)}
                            className="px-2 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.listingId)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-5 bg-white/90 border-t border-emerald-900/10 space-y-3 shadow-lg">
                <div className="space-y-1.5 text-xs text-emerald-900">
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80">{t.cartSubtotal}:</span>
                    <span className="font-semibold">₹{(subtotalPaise / 100).toFixed(2)} ({subtotalPaise} पैसे)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80">{t.logisticsFee} (4%):</span>
                    <span className="font-semibold">₹{(logisticsFeePaise / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80">{t.gstTax}:</span>
                    <span className="font-semibold text-emerald-700">₹0.00 (exempt)</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-emerald-900/20 flex justify-between text-base font-bold text-emerald-950">
                    <span>{t.totalAmount}:</span>
                    <span className="text-amber-800">
                      ₹{(totalPaise / 100).toFixed(2)} <span className="text-xs text-emerald-700 font-normal">({totalPaise} पैसे)</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700/80 bg-emerald-50 p-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>किसान एस्क्रौ सुरक्षा — भुगतान केवल गुणवत्ता प्रमाणन के बाद।</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#0F3826] text-amber-50 font-bold rounded-xl shadow-lg hover:bg-emerald-900 transition flex items-center justify-center gap-2 text-sm"
                >
                  {t.proceedOrder} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
