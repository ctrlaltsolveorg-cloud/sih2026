'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import { Truck, Navigation, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TransporterDashboardPage() {
  const { t } = useLanguage();
  const { userName } = useRole();

  const [inputOtp, setInputOtp] = useState('');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState<string | null>(null);

  const routePlan = {
    metrics: {
      totalDistanceKm: '42.5',
      estimatedEtaMinutes: '55',
      fuelSavingsPercent: '24.0',
    },
    optimizedStops: [
      {
        stopIndex: 1,
        orderId: '501',
        buyerName: 'अन्नपूर्णा पुणे (खरीदार)',
        pickup: 'नासिक एग्रो-हब #04',
        dropoff: 'पुणे स्वॉरगेट वितरण हब',
        pickupOtp: '4829',
        deliveryOtp: '9103',
      },
      {
        stopIndex: 2,
        orderId: '502',
        buyerName: 'मदर डेयरी एग्री',
        pickup: 'लासलगांव संकलन केंद्र',
        dropoff: 'मुंबई सेन्ट्रल कोल्ड स्टोर',
        pickupOtp: '6712',
        deliveryOtp: '3341',
      },
    ],
  };

  const handleVerifyOtpHandshake = () => {
    if (inputOtp === '4829' || inputOtp === '9103' || inputOtp.length === 4) {
      setOtpSuccessMsg(`OTP ${inputOtp} verified! Handshake & dispatch authorized.`);
      setInputOtp('');
      confetti({ particleCount: 70, spread: 60 });
    } else {
      setOtpSuccessMsg('Invalid OTP. Demo OTP: 4829');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="p-3 bg-amber-500/20 rounded-2xl">
          <Truck className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            {t.transporterTitle}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Green-Way Logistics Fleet
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
            {userName} • {t.transporterSubtitle}
          </p>
        </div>
      </div>

      {/* AI Route Optimizer Card */}
      <div className="bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl space-y-6 border border-amber-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
          <div className="flex items-center gap-3">
            <Navigation className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-lg font-bold">{t.fleetMetricsTitle}</h2>
              <p className="text-xs text-amber-200/70">{t.statAiEnginesSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold bg-emerald-950/80 px-4 py-2 rounded-2xl border border-emerald-800">
            <div>{t.distanceLabel}: <span className="text-amber-400">{routePlan.metrics.totalDistanceKm} km</span></div>
            <div>{t.etaLabel}: <span className="text-amber-400">{routePlan.metrics.estimatedEtaMinutes} min</span></div>
            <div>{t.fuelSavingsLabel}: <span className="text-emerald-400">+{routePlan.metrics.fuelSavingsPercent}%</span></div>
          </div>
        </div>

        {/* Optimized Stops */}
        <div className="space-y-4">
          {routePlan.optimizedStops.map((stop) => (
            <div key={stop.stopIndex} className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-amber-500 text-emerald-950 font-extrabold rounded-full flex items-center justify-center text-sm shrink-0">
                  #{stop.stopIndex}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-amber-50">
                    Order #{stop.orderId} • {t.colBuyer}: {stop.buyerName}
                  </h3>
                  <p className="text-xs text-amber-200/70 mt-1">
                    {t.locationLabel}: <strong>{stop.pickup}</strong> → <strong>{stop.dropoff}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg font-mono font-bold border border-amber-500/30">
                  {t.pickupOtpLabel}: {stop.pickupOtp}
                </span>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-mono font-bold border border-emerald-500/30">
                  {t.deliveryOtpLabel}: {stop.deliveryOtp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* OTP Verification Box */}
        <div className="bg-emerald-950/90 p-5 rounded-2xl border border-emerald-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Key className="w-4 h-4" />
            <span>{t.otpVerifyTitle}</span>
          </div>

          {otpSuccessMsg && (
            <div className="p-3 bg-amber-100 text-emerald-950 rounded-xl text-xs font-bold animate-fadeIn">
              {otpSuccessMsg}
            </div>
          )}

          <div className="flex items-center gap-3 max-w-md">
            <input
              type="text"
              maxLength={4}
              value={inputOtp}
              onChange={(e) => setInputOtp(e.target.value)}
              placeholder={t.otpVerifyPlaceholder}
              className="flex-1 px-3.5 py-2 bg-emerald-900 border border-emerald-700 rounded-xl text-xs text-amber-100 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={handleVerifyOtpHandshake}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold rounded-xl text-xs shadow transition"
            >
              {t.btnVerifyOtp}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
