'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import { Tractor, Plus, Sparkles, PhoneCall, CheckCircle2, TrendingUp, Volume2, ShieldCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FarmerDashboardPage() {
  const { t } = useLanguage();
  const { userName } = useRole();

  const [showAddModal, setShowAddModal] = useState(false);
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
      id: 201,
      crop: 'ताज़ा हाइब्रिड टमाटर',
      qty: 1200,
      priceRupees: '34.50',
      grade: 'उच्चतम श्रेणी A+',
      location: 'नासिक एग्रो-हब #04',
      status: 'सत्यापित फसल',
    },
    {
      id: 202,
      crop: 'नासिक लाल प्याज',
      qty: 2500,
      priceRupees: '28.00',
      grade: 'श्रेणी A',
      location: 'लासलगांव संकलन केंद्र',
      status: 'पूल में शामिल',
    },
  ]);

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

  const handleAddProduce = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduce = {
      id: Date.now(),
      crop: cropName || 'नयी फसल',
      qty: parseInt(quantityKg) || 500,
      priceRupees: basePriceRupees || '30.00',
      grade: grade,
      location: location,
      status: 'सत्यापित फसल',
    };
    setMyListings([newProduce, ...myListings]);
    setShowAddModal(false);
    confetti({ particleCount: 80, spread: 70 });
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
              प्रत्यक्ष किसान पोर्टल • 0% मध्यस्थ कमीशन
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              नमस्ते, {userName}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
              आपकी फसल सीधे सत्यापित खरीदारों को न्यायसंगत मूल्य पर बेची जाती है
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition flex items-center gap-2 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>नयी फसल दर्ज करें</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-emerald-700">
          <span className="text-xs font-bold text-emerald-800">कुल प्रत्यक्ष अर्जित आय</span>
          <div className="text-2xl font-extrabold text-emerald-950">₹1,11,400.00</div>
          <span className="text-[11px] text-emerald-700 font-mono">11,14,0000 पैसे • शून्य कमीशन</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-amber-600">
          <span className="text-xs font-bold text-emerald-800">सक्रिय बाज़ार फसलें</span>
          <div className="text-2xl font-extrabold text-amber-800">{myListings.length} फसल सूची</div>
          <span className="text-[11px] text-amber-700 font-medium">Fair Price AI द्वारा सत्यापित</span>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-blue-600">
          <span className="text-xs font-bold text-emerald-800">प्राप्त स्मार्ट अनुबंध</span>
          <div className="text-2xl font-extrabold text-blue-700">3 अनुबंध निष्पादित</div>
          <span className="text-[11px] text-blue-600 font-medium">सुरक्षित एस्क्रौ भुगतान</span>
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
              टोल-फ्री IVR वॉयस सेवा निर्देशिका (1800-KISAN-AI)
            </h3>
            <p className="text-xs text-emerald-800/70">
              बिना इंटरनेट वाले साधारण कीपैड फोन से फसल दर्ज करने हेतु निःशुल्क हेल्पलाइन निर्देश
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 bg-white/70 rounded-xl border border-emerald-900/10 space-y-1">
            <span className="font-bold text-amber-800 bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">कीपैड बटन 1</span>
            <p className="font-bold text-emerald-950">फसल बिक्री पंजीकरण</p>
            <p className="text-[11px] text-emerald-800/70">टोल-फ्री नंबर पर 1 दबाकर अपनी फसल और मात्रा वॉयस मैसेज द्वारा दर्ज करें।</p>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-emerald-900/10 space-y-1">
            <span className="font-bold text-amber-800 bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">कीपैड बटन 2</span>
            <p className="font-bold text-emerald-950">सद्य मंडी भाव (Agmarknet)</p>
            <p className="text-[11px] text-emerald-800/70">टोल-फ्री नंबर पर 2 दबाकर अपने निकटतम मंडी का रीयल-टाइम AI न्यूनतम समर्थन मूल्य सुनें।</p>
          </div>
          <div className="p-3 bg-white/70 rounded-xl border border-emerald-900/10 space-y-1">
            <span className="font-bold text-amber-800 bg-amber-500/20 px-2 py-0.5 rounded text-[10px]">कीपैड बटन 3</span>
            <p className="font-bold text-emerald-950">खाता शेष एवं एस्क्रौ स्टेटस</p>
            <p className="text-[11px] text-emerald-800/70">टोल-फ्री नंबर पर 3 दबाकर अपने बैंक खाते और लंबित प्रत्यक्ष भुगतान की स्थिति जानें।</p>
          </div>
        </div>
      </div>

      {/* Active Produce Listings Table */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-lg text-emerald-950 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span>आपकी पंजीकृत फसलें</span>
          </h3>
          <span className="text-xs font-bold text-emerald-800">एगमार्कनेट AI मंडी से जुड़ा</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myListings.map((crop) => (
            <div key={crop.id} className="p-4 bg-white/90 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                  {crop.grade}
                </span>
                <h4 className="font-extrabold text-emerald-950 text-base mt-1">{crop.crop}</h4>
                <p className="text-xs text-emerald-800/70 mt-0.5">
                  मात्रा: {crop.qty} किग्रा • {crop.location}
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-extrabold text-amber-800">
                  ₹{crop.priceRupees} <span className="text-xs font-normal text-emerald-900">/ किग्रा</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                  {crop.status}
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
                  className="flex-1 py-3 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-xs shadow transition"
                >
                  फसल दर्ज करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
