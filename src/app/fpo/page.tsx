'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCropName, getLocalizedFarmer } from '@/lib/i18n';
import { useRole } from '@/context/RoleContext';
import PortalGuard from '@/components/PortalGuard';
import { Users, Layers, TrendingUp, CheckCircle2, Building2, Sparkles } from 'lucide-react';

export default function FpoDashboardPage() {
  const { t, language } = useLanguage();
  const { userName } = useRole();
  const [successSignal, setSuccessSignal] = useState<string | null>(null);

  const [pooledLots, setPooledLots] = useState([
    { id: 'pool_101', crop_name: 'Nashik Hybrid Tomato (Virtual Pool)', total_quantity_kg: 5500, target_price_rs: '27.50', members: 34, status: 'Pooling Active' },
    { id: 'pool_102', crop_name: 'Lasalgaon Red Onion (Bulk Aggregation)', total_quantity_kg: 12000, target_price_rs: '34.00', members: 52, status: 'Lot Locked & Secured' },
  ]);

  const [bulkReqs] = useState([
    { id: 'req_201', buyer: 'Annapurna Hotel & Catering Services', crop_name: 'Tomato', qty_kg: 2000, max_price_rs: '29.00', fill_percent: 65 },
    { id: 'req_202', buyer: 'Reliance Retail Agri', crop_name: 'Sharbati Wheat', qty_kg: 10000, max_price_rs: '39.00', fill_percent: 85 },
  ]);

  const handleLockLot = (id: string) => {
    setPooledLots(pooledLots.map(lot => lot.id === id ? { ...lot, status: 'Lot Locked & Secured' } : lot));
    setSuccessSignal('FPO Lot Secured Successfully!');
    setTimeout(() => setSuccessSignal(null), 4000);
  };

  return (
    <PortalGuard
      requiredRole="FPO"
      portalName="FPO Aggregator"
      portalDescription="This portal is restricted to registered FPO managers for pooling member farm yields and collective bargaining."
    >
      <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="p-3 bg-amber-500/20 rounded-2xl">
          <Building2 className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            {t.fpoHeaderBadge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Sahyadri Farmers Producer FPO Group
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
            Manager: {userName} • 142 Member Farmers Pooled (Collective Bargaining)
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-emerald-700">
          <span className="text-xs font-bold text-emerald-800">{t.fpoStatTotalSupply}</span>
          <div className="text-2xl font-extrabold text-emerald-950">17.5 Tons</div>
          <span className="text-[11px] text-emerald-700 font-bold">{t.fpoStatBargaining}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-amber-600">
          <span className="text-xs font-bold text-emerald-800">{t.fpoStatVirtualLots}</span>
          <div className="text-2xl font-extrabold text-amber-800">{pooledLots.length} Lots</div>
          <span className="text-[11px] text-amber-700 font-medium">{t.fpoStatMembersIncluded}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-blue-600">
          <span className="text-xs font-bold text-emerald-800">{t.fpoStatBuyerReqs}</span>
          <div className="text-2xl font-extrabold text-blue-700">{bulkReqs.length} Offers</div>
          <span className="text-[11px] text-blue-600 font-medium">{t.fpoStatReadySupply}</span>
        </div>
      </div>

      {/* Pooled Lots & RFQs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pooled Virtual Lots */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>{t.fpoSectionVirtualLots}</span>
          </h2>

          <div className="space-y-4">
            {pooledLots.map((lot) => (
              <div key={lot.id} className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-800">Lot #{lot.id}</span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    lot.status === 'Lot Locked & Secured' ? 'bg-emerald-900 text-amber-200' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {lot.status === 'Lot Locked & Secured' ? 'Lot Locked & Secured' : 'Pooling Active'}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-emerald-950">{lot.crop_name}</h3>
                <div className="text-xs text-emerald-800/80">
                  Total Quantity: <strong className="text-emerald-950">{lot.total_quantity_kg} kg</strong> • Target Rate: <strong className="text-amber-800">₹{lot.target_price_rs}/kg</strong>
                </div>

                <div className="pt-3 border-t border-emerald-900/10 flex items-center justify-between">
                  <span className="text-xs text-emerald-900 font-medium">{lot.members} Farmers Included</span>
                  {lot.status !== 'Lot Locked & Secured' ? (
                    <button
                      onClick={() => handleLockLot(lot.id)}
                      className="px-4 py-2 bg-[#0F3826] text-amber-50 hover:bg-emerald-900 font-bold rounded-xl text-xs shadow transition"
                    >
                      {t.fpoLockLotBtn}
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {t.fpoLotLockedStatus}
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
            <span>{t.fpoSectionBuyerReqs}</span>
          </h2>

          <div className="space-y-4">
            {bulkReqs.map((req) => (
              <div key={req.id} className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-emerald-950">{req.buyer}</h3>
                  <span className="text-[10px] px-2.5 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full">
                    Active Demand Offer
                  </span>
                </div>

                <p className="text-xs text-emerald-800/80">
                  Requirement: <strong>{req.qty_kg} kg {req.crop_name}</strong> @ Max ₹{req.max_price_rs}/kg
                </p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-emerald-950">
                    <span>{t.fpoFulfilledPercent}</span>
                    <span className="text-amber-800">{req.fill_percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-emerald-900/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full transition-all duration-500" style={{ width: `${req.fill_percent}%` }} />
                  </div>
                </div>

                <button className="w-full py-2.5 bg-[#0F3826] text-amber-50 hover:bg-emerald-900 font-bold rounded-xl text-xs shadow transition">
                  {t.fpoAcceptCommitmentBtn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Green Pulse Success Signal Toast */}
      {successSignal && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F3826] text-amber-50 px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-bounce">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-full animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-emerald-300">
              Confirmed Successfully ✓
            </p>
            <p className="text-xs font-medium text-amber-100/90">{successSignal}</p>
          </div>
        </div>
      )}
      </div>
    </PortalGuard>
  );
}
