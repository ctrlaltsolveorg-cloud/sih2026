'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCropName, getLocalizedGrade, getLocalizedLocation } from '@/lib/i18n';
import { useRole } from '@/context/RoleContext';
import { useAuth } from '@/context/AuthContext';
import PortalGuard from '@/components/PortalGuard';
import { Tractor, Plus, Sparkles, PhoneCall, CheckCircle2, TrendingUp, Volume2, ShieldCheck, X, Loader2, Trash2, Lock, Mail, Eye, EyeOff, AlertCircle, Camera, Image as ImageIcon } from 'lucide-react';

export default function FarmerDashboardPage() {
  const { t, language } = useLanguage();
  const { userName } = useRole();
  const { user, verifyCredentials } = useAuth();

  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ivrResponse, setIvrResponse] = useState<string | null>(null);
  const [selectedKeypad, setSelectedKeypad] = useState('1');
  const [successSignal, setSuccessSignal] = useState<string | null>(null);

  // Security Verification Delete Modal State
  const [cropToDelete, setCropToDelete] = useState<{ id: string; name: string } | null>(null);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showVerifyPass, setShowVerifyPass] = useState(false);
  const [isVerifyingDelete, setIsVerifyingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Form states for adding produce
  const [cropName, setCropName] = useState('');
  const [quantityKg, setQuantityKg] = useState('500');
  const [basePriceRupees, setBasePriceRupees] = useState('32');
  const [grade, setGrade] = useState('उच्चतम श्रेणी A+');
  const [location, setLocation] = useState('नासिक मंडी संकलन हब');
  const [cropPhoto, setCropPhoto] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // User-isolated active listings (starts empty, populated only with this farmer's crops)
  const [myListings, setMyListings] = useState<any[]>([]);

  useEffect(() => {
    async function loadCrops() {
      if (!user?.id) {
        setMyListings([]);
        return;
      }

      try {
        const res = await fetch(`/api/v1/crops?farmerId=${encodeURIComponent(user.id)}`);
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
            imageUrl: c.image_url,
            farmerId: c.farmer_id,
          }));
        }

        // Get local storage crops specifically belonging to this logged-in farmer
        let localCrops: any[] = [];
        try {
          const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
          localCrops = stored.filter((item: any) => item.farmerId === user.id);
        } catch (e) {}

        const combined = [...localCrops, ...apiCrops];
        // Deduplicate by ID
        const seen = new Set();
        const uniqueCrops = combined.filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });

        setMyListings(uniqueCrops);
      } catch (e) {
        console.error('Error fetching crops from backend:', e);
      }
    }
    loadCrops();
  }, []);

  const triggerSuccessSignal = (msg: string) => {
    setSuccessSignal(msg);
    setTimeout(() => {
      setSuccessSignal(null);
    }, 4000);
  };

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
        triggerSuccessSignal(language === 'hi' ? 'IVR वॉयस प्रविष्टि सफलतापूर्वक दर्ज की गई!' : 'IVR Voice Entry Registered Successfully!');
      }
    } catch (e) {
      setIvrResponse('IVR वॉयस सेवा: "1 बटन दबाया गया — 500 किग्रा टमाटर सफलतापूर्वक दर्ज हो गए हैं।"');
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'hi' ? 'फोटो का साइज़ 5MB से कम होना चाहिए' : 'Photo size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCropPhoto(result);
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
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
      imageUrl: cropPhoto.trim() || undefined,
      farmerId: user?.id,
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
          farmerId: user?.id || 'u_farmer_1',
          farmerName: user?.name || userName,
          imageUrl: cropPhoto.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.crop) {
        cropToAdd = {
          id: String(data.crop.id),
          crop: data.crop.crop_name,
          qty: data.crop.quantity_available,
          priceRupees: (data.crop.price_paise / 100).toFixed(2),
          grade: data.crop.grade,
          location: data.crop.location,
          status: 'सत्यापित फसल',
          imageUrl: data.crop.image_url,
          farmerId: data.crop.farmer_id,
        };
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
      setCropPhoto('');
      setPhotoPreview(null);
      triggerSuccessSignal(
        language === 'hi'
          ? `फसल "${cropName}" सफलता से पंजीकृत की गई!`
          : `Crop "${cropName}" registered successfully!`
      );
    }
  };

  const openDeleteModal = (id: string, cropNameStr: string) => {
    setCropToDelete({ id, name: cropNameStr });
    setVerifyEmail(user?.email || '');
    setVerifyPassword('');
    setDeleteError(null);
  };

  const handleConfirmDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropToDelete) return;

    setIsVerifyingDelete(true);
    setDeleteError(null);

    try {
      // 1. Verify credentials (email & password)
      const verifyRes = await verifyCredentials(verifyEmail, verifyPassword);

      if (!verifyRes.success) {
        setDeleteError(
          verifyRes.error ||
            (language === 'hi' ? 'सत्यापन विफल! ईमेल या पासवर्ड गलत है।' : 'Verification failed! Invalid Email or Password.')
        );
        setIsVerifyingDelete(false);
        return;
      }

      // 2. Verified! Proceed with crop deletion
      const id = cropToDelete.id;
      const cropNameStr = cropToDelete.name;

      setMyListings((prev) => prev.filter((item) => item.id !== id));

      try {
        const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
        const filtered = stored.filter((item: any) => item.id !== id);
        localStorage.setItem('kb_custom_crops', JSON.stringify(filtered));
      } catch (e) {}

      try {
        await fetch(`/api/v1/crops?id=${id}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Delete crop API error:', err);
      }

      setCropToDelete(null);
      setVerifyPassword('');
      setIsVerifyingDelete(false);

      triggerSuccessSignal(
        language === 'hi'
          ? `सुरक्षा सत्यापन सफल! फसल "${cropNameStr}" को सूची से हटा दिया गया!`
          : `Security Verification Passed! Crop "${cropNameStr}" deleted successfully!`
      );
    } catch (err: any) {
      setDeleteError(err.message || 'सत्यापन में त्रुटि हुई!');
      setIsVerifyingDelete(false);
    }
  };

  return (
    <PortalGuard
      requiredRole="FARMER"
      portalName={language === 'hi' ? 'किसान पोर्टल (Farmer Desk)' : 'Farmer Desk'}
      portalDescription={
        language === 'hi'
          ? 'यह पोर्टल केवल पंजीकृत किसानों के लिए सुरक्षित है जहाँ वे अपनी फसलों को पंजीकृत, प्रबंधित और सीधे बाज़ार में बेच सकते हैं।'
          : 'This portal is restricted to registered Farmers to list, manage, and sell their crop produce directly.'
      }
    >
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
              {t.farmerWelcome}{userName ? `, ${userName}` : ''}
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
          {myListings.length === 0 ? (
            <div className="col-span-full py-12 px-4 text-center bg-white/50 border-2 border-dashed border-emerald-900/15 rounded-3xl space-y-3">
              <div className="w-14 h-14 mx-auto bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center">
                <Tractor className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-extrabold text-emerald-950 text-base">
                  {language === 'hi' ? 'अभी आपकी कोई फसल पंजीकृत नहीं है' : 'No crops registered yet'}
                </h4>
                <p className="text-xs text-emerald-800/70 max-w-sm mx-auto mt-1">
                  {language === 'hi'
                    ? 'ऊपर दिए गए "नयी फसल जोड़ें" बटन पर क्लिक करके अपनी पहली फसल दर्ज करें और सीधे खरीदारों से जुड़ें।'
                    : 'Click the "Register New Produce" button above to list your produce and reach direct verified buyers.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-xs shadow-md transition"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>{t.farmerAddNewCrop}</span>
              </button>
            </div>
          ) : (
            myListings.map((crop) => (
              <div key={crop.id} className="p-4 bg-white/90 rounded-2xl border border-emerald-900/10 shadow-sm flex items-center justify-between gap-3 group hover:border-emerald-900/20 transition">
                {crop.imageUrl && (
                  <img
                    src={crop.imageUrl}
                    alt={crop.crop}
                    className="w-14 h-14 object-cover rounded-xl border border-emerald-900/10 shrink-0 shadow-sm"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                    {getLocalizedGrade(crop.grade, language)}
                  </span>
                  <h4 className="font-extrabold text-emerald-950 text-base mt-1 truncate">{getLocalizedCropName(crop.crop, language)}</h4>
                  <p className="text-xs text-emerald-800/70 mt-0.5 truncate">
                    {language === 'hi' ? 'मात्रा: ' : 'Quantity: '}{crop.qty} {language === 'hi' ? 'किग्रा' : 'kg'} • {getLocalizedLocation(crop.location, language)}
                  </p>
                </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-lg font-extrabold text-amber-800">
                    ₹{crop.priceRupees} <span className="text-xs font-normal text-emerald-900">/ {language === 'hi' ? 'किग्रा' : 'kg'}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                    {crop.status === 'सत्यापित फसल' ? (language === 'hi' ? 'सत्यापित फसल' : 'Verified Crop') : (language === 'hi' ? 'पूल में शामिल' : 'Pooled Lot')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openDeleteModal(crop.id, crop.crop)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition border border-transparent hover:border-red-200"
                  title={language === 'hi' ? 'हटाएं (Delete)' : 'Delete Crop Listing'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
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
              {language === 'hi' ? 'सफलतापूर्वक पुष्टित ✓' : 'Confirmed Successfully ✓'}
            </p>
            <p className="text-xs font-medium text-amber-100/90">{successSignal}</p>
          </div>
        </div>
      )}

      {/* Modal for Security Verification before Crop Deletion */}
      {cropToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-md shadow-2xl border border-red-900/20 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <div className="flex items-center gap-2 text-red-700">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-base text-emerald-950">
                  {language === 'hi' ? 'सुरक्षा सत्यापन - फसल हटाएं' : 'Security Verification - Delete Crop'}
                </h3>
              </div>
              <button
                onClick={() => setCropToDelete(null)}
                className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-red-100/70 rounded-2xl border border-red-200 text-xs space-y-1">
              <p className="font-extrabold text-red-900">
                {language === 'hi' ? 'क्या आप इस फसल को हटाना चाहते हैं?' : 'Are you sure you want to delete this crop listing?'}
              </p>
              <p className="text-emerald-950 font-bold">
                🌾 {getLocalizedCropName(cropToDelete.name, language)}
              </p>
              <p className="text-[11px] text-red-800">
                {language === 'hi'
                  ? 'सुरक्षा कारणों से फसल हटाने के लिए यूज़र ID और पासवर्ड सत्यापन अनिवार्य है।'
                  : 'For security reasons, please verify your User ID & Password to proceed.'}
              </p>
            </div>

            {deleteError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{deleteError}</span>
              </div>
            )}

            <form onSubmit={handleConfirmDelete} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'यूज़र ID / ईमेल (User ID / Email)' : 'User ID / Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-emerald-800/60" />
                  <input
                    type="email"
                    required
                    placeholder="ramesh.patil@kisanbandhan.ai"
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'पासवर्ड दर्ज करें (Account Password)' : 'Account Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-emerald-800/60" />
                  <input
                    type={showVerifyPass ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowVerifyPass(!showVerifyPass)}
                    className="absolute right-3 top-3 text-emerald-800/60 hover:text-emerald-950"
                  >
                    {showVerifyPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCropToDelete(null)}
                  className="flex-1 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={isVerifyingDelete}
                  className="flex-1 py-3 bg-red-700 hover:bg-red-800 text-white font-extrabold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isVerifyingDelete ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{language === 'hi' ? 'सत्यापित हो रहा है...' : 'Verifying...'}</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>{language === 'hi' ? 'सत्यापित करके हटाएं' : 'Verify & Delete'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Adding New Produce */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-emerald-900/20 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <h3 className="font-extrabold text-lg text-emerald-950">
                {language === 'hi' ? 'नयी फसल बाज़ार में जोड़ें' : 'Register New Crop to Marketplace'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduce} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'फसल का नाम' : 'Crop Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'hi' ? 'उदा. नासिक हाइब्रिड टमाटर या Turnip' : 'e.g. Fresh Tomatoes or Turnip'}
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    {language === 'hi' ? 'मात्रा (किग्रा)' : 'Quantity (kg)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    {language === 'hi' ? 'वांछित मूल्य (₹/किग्रा)' : 'Expected Price (₹/kg)'}
                  </label>
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
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'संकलन हब स्थान' : 'Collection Hub Location'}
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Optional Crop Photo Upload */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-emerald-950">
                    {language === 'hi' ? 'फसल की फोटो (ऐच्छिक)' : 'Crop Photo (Optional)'}
                  </label>
                  <span className="text-[10px] text-emerald-800/60 font-semibold">
                    JPG, PNG, WebP (Max 5MB)
                  </span>
                </div>

                {photoPreview ? (
                  <div className="p-2.5 bg-white border border-emerald-900/20 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={photoPreview}
                        alt="Crop Preview"
                        className="w-14 h-14 object-cover rounded-xl border border-emerald-900/10 shadow-sm shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-emerald-950 truncate">
                          {language === 'hi' ? 'फोटो संलग्न की गई ✓' : 'Photo Attached ✓'}
                        </p>
                        <p className="text-[10px] text-emerald-800/70 truncate">
                          {language === 'hi' ? 'खरीदारों को आपकी असली फसल दिखेगी' : 'Buyers will see your actual produce'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCropPhoto('');
                        setPhotoPreview(null);
                      }}
                      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition shrink-0"
                      title={language === 'hi' ? 'फोटो हटाएं' : 'Remove Photo'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-emerald-900/20 hover:border-amber-500 rounded-2xl cursor-pointer bg-white/70 hover:bg-white text-xs font-bold text-emerald-950 transition">
                      <Camera className="w-4 h-4 text-amber-700" />
                      <span>
                        {language === 'hi'
                          ? 'फोटो चुनें (कैमरा / गैलरी से अपलोड करें)'
                          : 'Choose Photo (Upload from Camera / File)'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="url"
                      placeholder={language === 'hi' ? 'अथवा फोटो का लिंक (Image URL) पेस्ट करें (ऐच्छिक)' : 'Or paste online Image URL (Optional)'}
                      value={cropPhoto}
                      onChange={(e) => {
                        setCropPhoto(e.target.value);
                        setPhotoPreview(e.target.value.trim() ? e.target.value.trim() : null);
                      }}
                      className="w-full px-3.5 py-2 bg-white/80 border border-emerald-900/15 rounded-xl text-xs text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
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
  </PortalGuard>
  );
}
