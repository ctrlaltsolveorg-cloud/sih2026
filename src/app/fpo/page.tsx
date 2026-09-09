'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import { Layers, TrendingUp, CheckCircle2, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FpoDashboardPage() {
  const { t } = useLanguage();
  const { userName } = useRole();

  const [pooledLots, setPooledLots] = useState([
    { id: 'pool_101', crop_name: 'नासिक हाइब्रिड टमाटर (वर्चुअल पूल)', total_quantity_kg: 5500, target_price_rs: '27.50', members: 34, status: 'pooling' },
    { id: 'pool_102', crop_name: 'लासलगांव लाल प्याज (थोक एकत्रीकरण)', total_quantity_kg: 12000, target_price_rs: '34.00', members: 52, status: 'locked' },
  ]);

  const [bulkReqs] = useState([
    { id: 'req_201', buyer: 'अन्नपूर्णा होटल एवं कैटरिंग सेवा', crop_name: 'टमाटर', qty_kg: 2000, max_price_rs: '29.00', fill_percent: 65 },
    { id: 'req_202', buyer: 'रिलायंस रिटेल एग्री', crop_name: 'शरबाती गेहूं', qty_kg: 10000, max_price_rs: '39.00', fill_percent: 85 },
  ]);

  const handleLockLot = (id: string) => {
    setPooledLots(pooledLots.map(lot => lot.id === id ? { ...lot, status: 'locked' } : lot));
    confetti({ particleCount: 60, spread: 60 });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="p-3 bg-amber-500/20 rounded-2xl">
          <Building2 className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            {t.fpoGroupName}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            {t.fpoTitle}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
            {userName} • {t.fpoSubtitle}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-emerald-700">
          <span className="text-xs font-bold text-emerald-800">{t.fpoStatSupply}</span>
          <div className="text-2xl font-extrabold text-emerald-950">17.5 {t.categoryGrains}</div>
          <span className="text-[11px] text-emerald-700 font-bold">{t.fpoStatSupplySub}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-amber-600">
          <span className="text-xs font-bold text-emerald-800">{t.fpoStatLots}</span>
          <div className="text-2xl font-extrabold text-amber-800">{pooledLots.length} {t.roleFPOSub}</div>
          <span className="text-[11px] text-amber-700 font-medium">{t.fpoStatLotsSub}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-blue-600">
          <span className="text-xs font-bold text-emerald-800">{t.fpoStatRfqs}</span>
          <div className="text-2xl font-extrabold text-blue-700">{bulkReqs.length} RFQs</div>
          <span className="text-[11px] text-blue-600 font-medium">{t.fpoStatRfqsSub}</span>
        </div>
      </div>

      {/* Pooled Lots & RFQs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pooled Virtual Lots */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>{t.virtualLotsTitle}</span>
          </h2>

          <div className="space-y-4">
            {pooledLots.map((lot) => (
              <div key={lot.id} className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-800">#{lot.id}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    lot.status === 'locked' ? 'bg-emerald-900 text-amber-200' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {lot.status === 'locked' ? t.lockedBadge : t.poolingActive}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-emerald-950">{lot.crop_name}</h3>
                <div className="text-xs text-emerald-800/80">
                  {t.availableQty}: <strong className="text-emerald-950">{lot.total_quantity_kg} kg</strong> • {t.pricePerKg}: <strong className="text-amber-800">{t.currencySymbol}{lot.target_price_rs}</strong>
                </div>

                <div className="pt-3 border-t border-emerald-900/10 flex items-center justify-between">
                  <span className="text-xs text-emerald-900 font-medium">{lot.members} {t.roleFarmer}</span>
                  {lot.status !== 'locked' ? (
                    <button
                      onClick={() => handleLockLot(lot.id)}
                      className="px-4 py-2 bg-[#0F3826] text-amber-50 hover:bg-emerald-900 font-bold rounded-xl text-xs shadow transition"
                    >
                      {t.lockLotBtn}
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {t.lockedBadge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Bulk RFQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span>{t.institutionalDemandTitle}</span>
          </h2>

          <div className="space-y-4">
            {bulkReqs.map((req) => (
              <div key={req.id} className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-emerald-950">{req.buyer}</h3>
                  <span className="text-[10px] px-2.5 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full">
                    {t.statusAvailable}
                  </span>
                </div>

                <p className="text-xs text-emerald-800/80">
                  {req.qty_kg} kg {req.crop_name} @ max {t.currencySymbol}{req.max_price_rs}/{t.pricePerKg}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-emerald-950">
                    <span>{t.fulfillmentLabel}</span>
                    <span className="text-amber-800">{req.fill_percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-emerald-900/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full transition-all duration-500" style={{ width: `${req.fill_percent}%` }} />
                  </div>
                </div>

                <button className="w-full py-2.5 bg-[#0F3826] text-amber-50 hover:bg-emerald-900 font-bold rounded-xl text-xs shadow transition">
                  {t.checkout}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
