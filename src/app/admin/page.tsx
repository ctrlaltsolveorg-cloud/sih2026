'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function AdminPage() {
  const { t } = useLanguage();

  const [orders] = useState([
    {
      id: 501,
      buyer_name: 'BigBasket Bulk',
      farmer_name: 'Rameshwar Yadav',
      total_amount_paise: 4140000, // ₹41,400.00
      delivery_type: 'Hub Pickup',
      status: 'delivered',
    },
    {
      id: 502,
      buyer_name: 'Mother Dairy Fresh',
      farmer_name: 'Sahyadri FPO',
      total_amount_paise: 9800000, // ₹98,000.00
      delivery_type: 'Direct Dispatch',
      status: 'in_transit',
    },
    {
      id: 503,
      buyer_name: 'Reliance Retail Agri',
      farmer_name: 'Suresh Patil',
      total_amount_paise: 6300000, // ₹63,000.00
      delivery_type: 'Hub Pickup',
      status: 'escrow_locked',
    },
  ]);

  const totalGmvPaise = orders.reduce((sum, o) => sum + o.total_amount_paise, 0);

  const getStatusBadge = (status: string) => {
    if (status === 'delivered') return t.statusDelivered;
    if (status === 'in_transit') return t.statusInTransit;
    return t.escrowLockedText;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="p-3 bg-amber-500/20 rounded-2xl">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            {t.adminTitle}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            {t.adminHeading}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
            {t.adminSubtitle}
          </p>
        </div>
      </div>

      {/* Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-emerald-700">
          <span className="text-xs font-bold text-emerald-800">{t.adminStatGmv}</span>
          <div className="text-2xl font-extrabold text-emerald-950">
            {t.currencySymbol}{(totalGmvPaise / 100).toFixed(2)}
          </div>
          <span className="text-[11px] text-emerald-700 font-mono font-medium">
            ({totalGmvPaise} {t.paiseSuffix}) • Audit Ledger
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-blue-600">
          <span className="text-xs font-bold text-emerald-800">{t.adminStatIncome}</span>
          <div className="text-2xl font-extrabold text-blue-700">+42.4%</div>
          <span className="text-[11px] text-blue-600 font-medium">0% {t.statMiddlemenSub}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-amber-600">
          <span className="text-xs font-bold text-emerald-800">{t.adminStatWaste}</span>
          <div className="text-2xl font-extrabold text-amber-700">4.2 Tons</div>
          <span className="text-[11px] text-amber-600 font-medium">{t.statAiEnginesSub}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-purple-600">
          <span className="text-xs font-bold text-emerald-800">{t.adminStatMandis}</span>
          <div className="text-2xl font-extrabold text-purple-700">142 Hubs</div>
          <span className="text-[11px] text-purple-600 font-medium">{t.allIndiaLangs247}</span>
        </div>
      </div>

      {/* AI Confidence & Governance Panel */}
      <div className="bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl space-y-6 border border-amber-500/20">
        <div className="flex items-center gap-3 border-b border-emerald-800/60 pb-4">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="text-lg font-bold">{t.aiEnginesTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 space-y-2">
            <span className="text-xs text-amber-300 font-bold">{t.fairPriceHeader}</span>
            <div className="text-xl font-extrabold text-amber-50">94.8% Accuracy</div>
            <p className="text-[11px] text-amber-200/70">{t.liveMandiTicker}</p>
          </div>

          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 space-y-2">
            <span className="text-xs text-amber-300 font-bold">{t.cvResultsTitle}</span>
            <div className="text-xl font-extrabold text-amber-50">99.4% Precision</div>
            <p className="text-[11px] text-amber-200/70">{t.statCvGradingSub}</p>
          </div>

          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 space-y-2">
            <span className="text-xs text-amber-300 font-bold">{t.fleetMetricsTitle}</span>
            <div className="text-xl font-extrabold text-amber-50">+24.0% Fuel Savings</div>
            <p className="text-[11px] text-amber-200/70">{t.multiStopTitle}</p>
          </div>
        </div>
      </div>

      {/* Live Order Transactions Stream */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-900" />
            <h3 className="font-extrabold text-lg text-emerald-950">{t.recentLedgerTitle}</h3>
          </div>
          <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-full">
            Realtime Audit Trail
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-900/10 text-emerald-950 border-b border-emerald-900/10">
                <th className="p-3 font-bold">{t.colOrderId}</th>
                <th className="p-3 font-bold">{t.colBuyer}</th>
                <th className="p-3 font-bold">{t.colFarmer}</th>
                <th className="p-3 font-bold">{t.colAmount}</th>
                <th className="p-3 font-bold">{t.colDelivery}</th>
                <th className="p-3 font-bold">{t.escrowStatusLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/5">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-emerald-50/50 transition font-medium">
                  <td className="p-3 font-bold text-emerald-950">#{ord.id}</td>
                  <td className="p-3">{ord.buyer_name}</td>
                  <td className="p-3">{ord.farmer_name}</td>
                  <td className="p-3 font-extrabold text-amber-800">
                    {t.currencySymbol}{(ord.total_amount_paise / 100).toFixed(2)}{' '}
                    <span className="text-[10px] text-emerald-700 font-normal">({ord.total_amount_paise} {t.paiseSuffix})</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">
                      {ord.delivery_type}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 bg-emerald-900 text-amber-100 rounded-full font-bold">
                      {getStatusBadge(ord.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
