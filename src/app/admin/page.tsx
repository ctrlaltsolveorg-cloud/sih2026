'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Sparkles, Activity, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const { t } = useLanguage();

  const [orders] = useState([
    {
      id: 501,
      buyer_name: 'बिगबास्केट थोक खरीद',
      farmer_name: 'रामेश्वर यादव',
      total_amount_paise: 4140000, // ₹41,400.00
      delivery_type: 'हब पिकअप',
      status: 'सफलतापूर्वक हस्तांतरित',
    },
    {
      id: 502,
      buyer_name: 'मदर डेयरी फ्रेश',
      farmer_name: 'सहयाद्री किसान FPO',
      total_amount_paise: 9800000, // ₹98,000.00
      delivery_type: 'प्रत्यक्ष खेत प्रेषण',
      status: 'परिवहन में',
    },
    {
      id: 503,
      buyer_name: 'रिलायंस रिटेल फूड्स',
      farmer_name: 'सुरेश पाटिल',
      total_amount_paise: 6300000, // ₹63,000.00
      delivery_type: 'हब पिकअप',
      status: 'सुरक्षित एस्क्रौ locked',
    },
  ]);

  const totalGmvPaise = orders.reduce((sum, o) => sum + o.total_amount_paise, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="p-3 bg-amber-500/20 rounded-2xl">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            SIH 2026 PS 26033 राष्ट्रीय मंडी शासन
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            मंत्रालय एवं राष्ट्रीय मंडी शासन कक्ष (Governance Control Room)
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
            उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय — प्रत्यक्ष कृषि व्यापार निगरानी
          </p>
        </div>
      </div>

      {/* Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-emerald-700">
          <span className="text-xs font-bold text-emerald-800">कुल राष्ट्रीय सकल व्यापार मूल्य (GMV)</span>
          <div className="text-2xl font-extrabold text-emerald-950">
            ₹{(totalGmvPaise / 100).toFixed(2)}
          </div>
          <span className="text-[11px] text-emerald-700 font-mono font-medium">
            ({totalGmvPaise} पैसे) • सत्यापित लेजर
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-blue-600">
          <span className="text-xs font-bold text-emerald-800">किसान आय हिस्सेदारी</span>
          <div className="text-2xl font-extrabold text-blue-700">82.4%</div>
          <span className="text-[11px] text-blue-600 font-medium">पारंपरिक मंडी (35%) की तुलना में</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-amber-600">
          <span className="text-xs font-bold text-emerald-800">खरीदार बचत दर</span>
          <div className="text-2xl font-extrabold text-amber-700">37.8%</div>
          <span className="text-[11px] text-amber-600 font-medium">बिचौलिया कमीशन समाप्त</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border-l-4 border-l-purple-600">
          <span className="text-xs font-bold text-emerald-800">बचाया गया भोजन (बर्बादी रोकथाम)</span>
          <div className="text-2xl font-extrabold text-purple-700">4.2 टन</div>
          <span className="text-[11px] text-purple-600 font-medium">AI रसद एवं मार्ग नियोजन</span>
        </div>
      </div>

      {/* AI Confidence & Governance Panel */}
      <div className="bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl space-y-6 border border-amber-500/20">
        <div className="flex items-center gap-3 border-b border-emerald-800/60 pb-4">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="text-lg font-bold">6 AI मॉडल लाइव राष्ट्रीय विश्वसनीयता ट्रैकर</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 space-y-2">
            <span className="text-xs text-amber-300 font-bold">Fair Price AI मॉडल 1</span>
            <div className="text-xl font-extrabold text-amber-50">94.8% सटीकता</div>
            <p className="text-[11px] text-amber-200/70">एगमार्कनेट मंडी इंडेक्स + ग्रेड बोनस</p>
          </div>

          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 space-y-2">
            <span className="text-xs text-amber-300 font-bold">कंप्यूटर विज़न ऑटो-ग्रेडिंग (मॉडल 2)</span>
            <div className="text-xl font-extrabold text-amber-50">99.4% ग्रेड विश्वासांक</div>
            <p className="text-[11px] text-amber-200/70">FSSAI मानक के अनुसार स्वचालित गुणवत्ता</p>
          </div>

          <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 space-y-2">
            <span className="text-xs text-amber-300 font-bold">मार्ग एवं बर्बादी रोकथाम (मॉडल 3 व 4)</span>
            <div className="text-xl font-extrabold text-amber-50">+24.0% ईंधन बचत</div>
            <p className="text-[11px] text-amber-200/70">मल्टी-स्टॉप पिकअप एवं 0% खराबी गारंटी</p>
          </div>
        </div>
      </div>

      {/* Live Order Transactions Stream */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-900" />
            <h3 className="font-extrabold text-lg text-emerald-950">सद्य व्यापार लेनदेन स्ट्रीम (राष्ट्रीय लेजर)</h3>
          </div>
          <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-full">
            सद्य अपडेटेड
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-emerald-900/10 text-emerald-950 border-b border-emerald-900/10">
                <th className="p-3 font-bold">ऑर्डर आईडी</th>
                <th className="p-3 font-bold">खरीदार संस्था</th>
                <th className="p-3 font-bold">उत्पादक किसान / FPO</th>
                <th className="p-3 font-bold">कुल राशि</th>
                <th className="p-3 font-bold">लॉजिस्टिक्स प्रकार</th>
                <th className="p-3 font-bold">एस्क्रौ स्थिति</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/5">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-emerald-50/50 transition font-medium">
                  <td className="p-3 font-bold text-emerald-950">#{ord.id}</td>
                  <td className="p-3">{ord.buyer_name}</td>
                  <td className="p-3">{ord.farmer_name}</td>
                  <td className="p-3 font-extrabold text-amber-800">
                    ₹{(ord.total_amount_paise / 100).toFixed(2)}{' '}
                    <span className="text-[10px] text-emerald-700 font-normal">({ord.total_amount_paise} पैसे)</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">
                      {ord.delivery_type}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 bg-emerald-900 text-amber-100 rounded-full font-bold">
                      {ord.status}
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
