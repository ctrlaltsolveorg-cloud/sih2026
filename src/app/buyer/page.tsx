'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import { ShoppingBag, Plus, FileText, MapPin, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BuyerDashboardPage() {
  const { t } = useLanguage();
  const { userName } = useRole();

  const [showAddReqModal, setShowAddReqModal] = useState(false);
  const [cropName, setCropName] = useState('टमाटर');
  const [requiredQty, setRequiredQty] = useState('1500');
  const [maxPriceRs, setMaxPriceRs] = useState('29.00');
  const [deliveryLoc, setDeliveryLoc] = useState('अन्नपूर्णा पुणे संकलन हब');

  const [buyerOrders] = useState([
    {
      id: 301,
      farmer_name: 'रामेश्वर यादव',
      delivery_address: 'नासिक हब से पुणे प्रेषित',
      total_amount_paise: 4140000, // ₹41,400.00
      status: 'in_transit',
    },
    {
      id: 302,
      farmer_name: 'सुरेश पाटिल',
      delivery_address: 'इन्दौर हब से सीधा पिकअप',
      total_amount_paise: 2250000, // ₹22,500.00
      status: 'delivered',
    },
  ]);

  const handlePostRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddReqModal(false);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl">
            <ShoppingBag className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              {t.buyerTitle}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              {t.farmerWelcome}, {userName}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
              {t.buyerSubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddReqModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.btnPostReq}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-emerald-700">
          <span className="text-xs font-bold text-emerald-800">{t.buyerStatContracts}</span>
          <div className="text-2xl font-extrabold text-emerald-950">₹63,900.00</div>
          <span className="text-[11px] text-emerald-700 font-bold">{t.statMiddlemenSub}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-amber-600">
          <span className="text-xs font-bold text-emerald-800">{t.buyerOrdersTitle}</span>
          <div className="text-2xl font-extrabold text-amber-800">{buyerOrders.length} {t.roleBuyerSub}</div>
          <span className="text-[11px] text-amber-700 font-medium">GPS Live Tracking</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-blue-600">
          <span className="text-xs font-bold text-emerald-800">{t.buyerStatQuality}</span>
          <div className="text-2xl font-extrabold text-blue-700">99.4%</div>
          <span className="text-[11px] text-blue-600 font-medium">{t.statCvGradingSub}</span>
        </div>
      </div>

      {/* Active Orders & Recurring Contracts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Orders */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <span>{t.buyerOrdersTitle}</span>
          </h2>

          <div className="space-y-4">
            {buyerOrders.map((ord) => (
              <div key={ord.id} className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-800">#{ord.id}</span>
                  <span className="text-[10px] px-2.5 py-0.5 bg-emerald-900 text-amber-200 font-bold rounded-full">
                    {ord.status === 'in_transit' ? t.statusInTransit : t.statusDelivered}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-emerald-950">{t.farmerLabel}: {ord.farmer_name}</h3>
                <p className="text-xs text-emerald-800/80 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{ord.delivery_address}</span>
                </p>

                <div className="pt-3 border-t border-emerald-900/10 flex items-center justify-between">
                  <div className="text-base font-extrabold text-amber-800">
                    {t.currencySymbol}{(ord.total_amount_paise / 100).toFixed(2)}{' '}
                    <span className="text-[10px] text-emerald-700 font-normal">({ord.total_amount_paise} {t.paiseSuffix})</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    {t.escrowLockedText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recurring Contracts */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <span>{t.buyerStatContracts}</span>
          </h2>

          <div className="space-y-4">
            <div className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-emerald-950">{t.tickerCrop1} Contract</h3>
                <span className="text-[10px] px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                  {t.statusVerified}
                </span>
              </div>
              <p className="text-xs text-emerald-800/80">
                100 kg {t.tickerCrop1} • {t.fpoTitle}
              </p>
              <button className="w-full py-2 bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-950 font-bold rounded-xl text-xs transition">
                {t.checkout}
              </button>
            </div>

            <div className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-emerald-950">{t.tickerCrop4} Contract</h3>
                <span className="text-[10px] px-2.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full">
                  {t.statusPooled}
                </span>
              </div>
              <p className="text-xs text-emerald-800/80">
                500 kg {t.tickerCrop4} • {t.escrowLockedText}
              </p>
              <button className="w-full py-2 bg-[#0F3826] text-amber-50 hover:bg-emerald-900 font-bold rounded-xl text-xs shadow transition">
                {t.proceedOrder}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Posting Bulk Requirement */}
      {showAddReqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-emerald-900/20 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <h3 className="font-extrabold text-lg text-emerald-950">{t.reqModalTitle}</h3>
              <button onClick={() => setShowAddReqModal(false)} className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostRequirement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">{t.colCrop}</label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">{t.colQty} (kg)</label>
                  <input
                    type="number"
                    required
                    value={requiredQty}
                    onChange={(e) => setRequiredQty(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">{t.colPrice} ({t.currencySymbol}/{t.pricePerKg})</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={maxPriceRs}
                    onChange={(e) => setMaxPriceRs(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">{t.colLocation}</label>
                <input
                  type="text"
                  required
                  value={deliveryLoc}
                  onChange={(e) => setDeliveryLoc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddReqModal(false)}
                  className="flex-1 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-xs shadow transition"
                >
                  {t.submitReqBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
