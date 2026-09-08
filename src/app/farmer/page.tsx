'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCropName, getLocalizedGrade, getLocalizedLocation } from '@/lib/i18n';
import { useRole } from '@/context/RoleContext';
import { Tractor, Plus, Sparkles, PhoneCall, CheckCircle2, TrendingUp, Volume2, ShieldCheck, X, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FarmerDashboardPage() {
  const { t, language } = useLanguage();
  const { userName } = useRole();

  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ivrResponse, setIvrResponse] = useState<string | null>(null);
  const [selectedKeypad, setSelectedKeypad] = useState('1');

  // Form State
  const [cropName, setCropName] = useState('');
  const [quantityKg, setQuantityKg] = useState('500');
  const [basePriceRupees, setBasePriceRupees] = useState('32');
  const [grade, setGrade] = useState('उच्चतम श्रेणी A+');
  const [location, setLocation] = useState('नासिक मंडी संकलन हब');

  // Demo active listings
  const [myListings, setMyListings] = useState([
    {
      id: '201',
      crop: 'ताज़ा हाइब्रिड टमाटर',
      qty: 1200,
      priceRupees: '34.50',
      grade: 'उच्चतम श्रेणी A+',
      location: 'नासिक एग्रो-हब #04',
      status: 'सत्यापित फसल',
    },
    {
      id: '202',
      crop: 'नासिक लाल प्याज',
      qty: 2500,
      priceRupees: '28.00',
      grade: 'श्रेणी A',
      location: 'लासलगांव संकलन केंद्र',
      status: 'पूल में शामिल',
    },
  ]);

  useEffect(() => {
    async function loadCrops() {
      try {
        const res = await fetch('/api/v1/crops');
        const data = await res.json();
        let apiCrops: any[] = [];
        if (data.success && data.crops && data.crops.length > 0) {
          apiCrops = data.crops.map((c: any) => ({
            id: String(c.id),
            crop: c.crop_name,
            qty: c.quantity_available,
            priceRupees: (c.price_paise / 100).toFixed(2),
            grade: c.grade || 'उच्चतम श्रेणी A+',
            location: c.location || 'नासिक मंडी संकलन हब',
            status: 'सत्यापित फसल',
          }));
        }

        // Get local storage crops
        let localCrops: any[] = [];
        try {
          localCrops = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
        } catch (e) {}

        const combined = [...localCrops, ...apiCrops];
        // Deduplicate by ID
        const seen = new Set();
        const uniqueCrops = combined.filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });

        if (uniqueCrops.length > 0) {
          setMyListings(uniqueCrops);
        }
      } catch (e) {
        console.error('Error fetching crops from backend:', e);
      }
    }
    loadCrops();
  }, []);

  const handleSimulateIvr = async () => {
    try {
      const res = await fetch('/api/v1/ivr/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dtmfInput: selectedKeypad }),
      });
      const data = await res.json();
      if (data.success) {
        setIvrResponse(data.simulatedAudioResponseHindi);
        confetti({ particleCount: 50, spread: 60 });
      }
    } catch (e) {
      setIvrResponse('IVR वॉयस सेवा: "1 बटन दबाया गया — 500 किग्रा टमाटर सफलतापूर्वक दर्ज हो गए हैं।"');
    }
  };

  const handleAddProduce = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fallbackCrop = {
      id: String(Date.now()),
      crop: cropName || 'नयी फसल',
      qty: parseInt(quantityKg) || 500,
      priceRupees: basePriceRupees || '30.00',
      grade: grade,
      location: location,
      status: 'सत्यापित फसल',
    };

    let cropToAdd = fallbackCrop;

    try {
      const res = await fetch('/api/v1/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: cropName || 'नयी फसल',
          quantityKg: quantityKg || '500',
          priceRupees: basePriceRupees || '30.00',
          grade: grade,
          location: location,
          farmerName: userName,
        }),
      });

      const data = await res.json();
      if (data.success && data.crop) {
        cropToAdd = data.crop;
      }
    } catch (err) {
      console.log('Backend insert fallback to local storage:', err);
    } finally {
      setMyListings((prev) => [cropToAdd, ...prev]);

      // Save to localStorage as persistent fallback sync
      try {
        const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
        localStorage.setItem('kb_custom_crops', JSON.stringify([cropToAdd, ...stored]));
      } catch (e) {}

      setIsSubmitting(false);
      setShowAddModal(false);
      setCropName('');
      confetti({ particleCount: 80, spread: 70 });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl">
            <Tractor className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              {t.farmerBadge}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              {t.farmerWelcome}, {userName}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
              {t.farmerSubtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t.farmerAddNewCrop}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-emerald-700">
          <span className="text-xs font-bold text-emerald-800">{t.statEarnedIncome}</span>
          <div className="text-2xl font-extrabold text-emerald-950">₹1,11,400.00</div>
          <span className="text-[11px] text-emerald-700 font-mono">11,14,0000 {t.paiseSuffix} • {t.statZeroCommission}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-amber-600">
          <span className="text-xs font-bold text-emerald-800">{t.statActiveListings}</span>
          <div className="text-2xl font-extrabold text-amber-800">{myListings.length} {language === 'hi' ? 'फसल सूची' : 'Crop Listings'}</div>
          <span className="text-[11px] text-amber-700 font-medium">{t.statVerifiedByAI}</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-blue-600">
          <span className="text-xs font-bold text-emerald-800">{t.statSmartContracts}</span>
          <div className="text-2xl font-extrabold text-blue-700">3 {language === 'hi' ? 'अनुबंध निष्पादित' : 'Executed Contracts'}</div>
          <span className="text-[11px] text-blue-600 font-medium">{t.statEscrowProtected}</span>
        </div>
      </div>

      {/* Feature Phone IVR Info Card */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-800 rounded-xl">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-emerald-950 text-base">
              {t.ivrGuideHeader}
            </h3>
            <p className="text-xs text-emerald-800/70">
              {t.ivrGuideSub}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-white/70 rounded-xl border border-emerald-900/10 space-y-1">
            <span className="font-bold text-amber-800 bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">{t.keypad1Title}</span>
            <p className="font-bold text-emerald-950">{t.keypad1Sub}</p>
            <p className="text-[11px] text-emerald-800/70">{t.keypad1Desc}</p>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-emerald-900/10 space-y-1">
            <span className="font-bold text-amber-800 bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">{t.keypad2Title}</span>
            <p className="font-bold text-emerald-950">{t.keypad2Sub}</p>
            <p className="text-[11px] text-emerald-800/70">{t.keypad2Desc}</p>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-emerald-900/10 space-y-1">
            <span className="font-bold text-amber-800 bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">{t.keypad3Title}</span>
            <p className="font-bold text-emerald-950">{t.keypad3Sub}</p>
            <p className="text-[11px] text-emerald-800/70">{t.keypad3Desc}</p>
          </div>
        </div>
      </div>

      {/* Active Produce Listings Table */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-lg text-emerald-950 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span>{t.myRegisteredCrops}</span>
          </h3>
          <span className="text-xs font-bold text-emerald-800">{t.agmarknetConnected}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myListings.map((crop) => (
            <div key={crop.id} className="p-4 bg-white/90 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                  {getLocalizedGrade(crop.grade, language)}
                </span>
                <h4 className="font-extrabold text-emerald-950 text-base mt-1">{getLocalizedCropName(crop.crop, language)}</h4>
                <p className="text-xs text-emerald-800/70 mt-0.5">
                  {language === 'hi' ? 'मात्रा: ' : 'Quantity: '}{crop.qty} {language === 'hi' ? 'किग्रा' : 'kg'} • {getLocalizedLocation(crop.location, language)}
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-extrabold text-amber-800">
                  ₹{crop.priceRupees} <span className="text-xs font-normal text-emerald-900">/ {language === 'hi' ? 'किग्रा' : 'kg'}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                  {crop.status === 'सत्यापित फसल' ? (language === 'hi' ? 'सत्यापित फसल' : 'Verified Crop') : (language === 'hi' ? 'पूल में शामिल' : 'Pooled Lot')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding New Produce */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-emerald-900/20 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <h3 className="font-extrabold text-lg text-emerald-950">नयी फसल बाज़ार में जोड़ें</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduce} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">फसल का नाम</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. नासिक हाइब्रिड टमाटर"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">मात्रा (किग्रा)</label>
                  <input
                    type="number"
                    required
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">वांछित मूल्य (₹/किग्रा)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={basePriceRupees}
                    onChange={(e) => setBasePriceRupees(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">संकलन हब स्थान</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin text-amber-400" />}
                  <span>{isSubmitting ? (language === 'hi' ? 'फसल दर्ज हो रही है...' : 'Registering Crop...') : (language === 'hi' ? 'फसल दर्ज करें' : 'Register Crop')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
