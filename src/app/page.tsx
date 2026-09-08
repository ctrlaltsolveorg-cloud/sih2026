'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCropName, getLocalizedCategory, getLocalizedGrade, getLocalizedLocation, getLocalizedFarmer } from '@/lib/i18n';
import { useRole } from '@/context/RoleContext';
import { useCart } from '@/context/CartContext';
import {
  Sparkles,
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  PhoneCall,
  CheckCircle,
  MapPin,
  Award,
  Layers,
  Truck,
  Building2,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';

interface Listing {
  id: number;
  crop_name: string;
  category: string;
  quantity_kg: number;
  price_paise_per_kg: number;
  quality_grade: string;
  cv_trust_score: number;
  harvest_date: string;
  is_organic: number;
  farmer_name: string;
  location: string;
  hub_location: string;
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const { role, setRole } = useRole();
  const { addToCart } = useCart();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'gradeA' | 'organic'>('all');
  const [selectedCropCategory] = useState<string>('All');

  // Mandi live ticker items in authentic Hindi
  const tickerItems = [
    { crop: 'टमाटर (उच्चतम श्रेणी A+)', price: '₹34.50/किग्रा', trend: '+4.2%' },
    { crop: 'नाशिक लाल प्याज', price: '₹28.00/किग्रा', trend: '+1.8%' },
    { crop: 'इन्दौर ज्योति आलू', price: '₹22.00/किग्रा', trend: '-0.5%' },
    { crop: 'शरबाती प्रीमियम गेहूं', price: '₹38.00/किग्रा', trend: '+2.1%' },
    { crop: 'पीला सोयाबीन', price: '₹46.50/किग्रा', trend: '+0.9%' },
    { crop: 'देसी लहसुन', price: '₹140.00/किग्रा', trend: '+5.0%' },
  ];

  useEffect(() => {
    async function fetchProduce() {
      try {
        const initialProduce: Listing[] = [
          {
            id: 101,
            crop_name: 'ताज़ा हाइब्रिड टमाटर (Fresh Tomatoes)',
            category: 'सब्जियाँ',
            quantity_kg: 1200,
            price_paise_per_kg: 3450, // ₹34.50
            quality_grade: 'ग्रेड A+',
            cv_trust_score: 98,
            harvest_date: '2026-09-07',
            is_organic: 1,
            farmer_name: 'रामेश्वर यादव',
            location: 'नासिक मंडी हब (महाराष्ट्र)',
            hub_location: 'नासिक एग्रो-हब #04',
          },
          {
            id: 102,
            crop_name: 'लाल प्याज (Lasalgaon Red Onion)',
            category: 'सब्जियाँ',
            quantity_kg: 3500,
            price_paise_per_kg: 2800, // ₹28.00
            quality_grade: 'ग्रेड A',
            cv_trust_score: 95,
            harvest_date: '2026-09-06',
            is_organic: 0,
            farmer_name: 'सहयाद्री किसान FPO समूह',
            location: 'लासलगांव संकलन केंद्र',
            hub_location: 'लासलगांव हब',
          },
          {
            id: 103,
            crop_name: 'जैविक ज्योति आलू (Organic Potatoes)',
            category: 'कंदमूल',
            quantity_kg: 2800,
            price_paise_per_kg: 2250, // ₹22.50
            quality_grade: 'ग्रेड A+',
            cv_trust_score: 99,
            harvest_date: '2026-09-05',
            is_organic: 1,
            farmer_name: 'सुरेश पाटिल',
            location: 'इन्दौर (मध्य प्रदेश)',
            hub_location: 'इन्दौर लॉजिस्टिक्स हब',
          },
          {
            id: 104,
            crop_name: 'हरी शिमला मिर्च (Fresh Capsicum)',
            category: 'सब्जियाँ',
            quantity_kg: 800,
            price_paise_per_kg: 4800, // ₹48.00
            quality_grade: 'ग्रेड A',
            cv_trust_score: 94,
            harvest_date: '2026-09-07',
            is_organic: 0,
            farmer_name: 'कविता चौधरी',
            location: 'पुणे ग्रामीण हब',
            hub_location: 'पुणे हब',
          },
          {
            id: 105,
            crop_name: 'शरबाती प्रीमियम गेहूं (Sharbati Wheat)',
            category: 'अनाज',
            quantity_kg: 5000,
            price_paise_per_kg: 3800, // ₹38.00
            quality_grade: 'निर्यात श्रेणी',
            cv_trust_score: 99,
            harvest_date: '2026-09-04',
            is_organic: 1,
            farmer_name: 'मालवा कृषक FPO',
            location: 'उज्जैन (मध्य प्रदेश)',
            hub_location: 'उज्जैन साइलो हब',
          },
          {
            id: 106,
            crop_name: 'देसी जैविक गाजर (Organic Carrots)',
            category: 'सब्जियाँ',
            quantity_kg: 1500,
            price_paise_per_kg: 2600, // ₹26.00
            quality_grade: 'ग्रेड A',
            cv_trust_score: 96,
            harvest_date: '2026-09-07',
            is_organic: 1,
            farmer_name: 'हनुमान सहाय',
            location: 'जयपुर (राजस्थान)',
            hub_location: 'जयपुर मंडी संकलन',
          }
        ];

        // Check local storage custom crops
        let localProduce: Listing[] = [];
        try {
          const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
          localProduce = stored.map((item: any, idx: number) => ({
            id: typeof item.id === 'number' ? item.id : 5000 + idx,
            crop_name: item.crop || 'नयी फसल',
            category: 'सब्जियाँ',
            quantity_kg: parseInt(item.qty) || 500,
            price_paise_per_kg: Math.round((parseFloat(item.priceRupees) || 30) * 100),
            quality_grade: item.grade || 'ग्रेड A+',
            cv_trust_score: 98,
            harvest_date: '2026-09-08',
            is_organic: 1,
            farmer_name: item.farmer_name || 'रामेश्वर यादव',
            location: item.location || 'नासिक मंडी हब (महाराष्ट्र)',
            hub_location: 'नासिक एग्रो-हब #04',
          }));
        } catch (e) {}

        try {
          const res = await fetch('/api/v1/crops');
          const data = await res.json();
          let apiProduce: Listing[] = [];
          if (data.success && data.crops && data.crops.length > 0) {
            apiProduce = data.crops.map((c: any, index: number) => ({
              id: typeof c.id === 'number' ? c.id : 1000 + index,
              crop_name: c.crop_name,
              category: c.category || 'सब्जियाँ',
              quantity_kg: c.quantity_available || 500,
              price_paise_per_kg: c.price_paise || 3000,
              quality_grade: c.grade || 'ग्रेड A+',
              cv_trust_score: 97,
              harvest_date: c.harvest_date || '2026-09-08',
              is_organic: c.organic_certified || 0,
              farmer_name: c.farmer_name || 'रामेश्वर यादव',
              location: c.location || 'नासिक मंडी हब (महाराष्ट्र)',
              hub_location: c.district ? `${c.district} एग्रो-हब` : 'नासिक एग्रो-हब #04',
            }));
          }

          const combinedAll = [...localProduce, ...apiProduce, ...initialProduce];
          const seen = new Set();
          const uniqueListings = combinedAll.filter((item) => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
          });
          setListings(uniqueListings);
        } catch (e) {
          const combinedAll = [...localProduce, ...initialProduce];
          setListings(combinedAll);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduce();
  }, []);

  const filteredListings = listings.filter((item) => {
    if (filter === 'gradeA' && !item.quality_grade.includes('A') && !item.quality_grade.includes('निर्यात')) return false;
    if (filter === 'organic' && item.is_organic !== 1) return false;
    if (selectedCropCategory !== 'All' && item.category !== selectedCropCategory) return false;
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Live Mandi Agmarknet Ticker */}
      <div className="w-full bg-[#0F3826] text-amber-100 rounded-2xl py-2.5 px-4 shadow-md overflow-hidden border border-emerald-800/40 flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 shrink-0 bg-emerald-950/80 px-3 py-1 rounded-lg border border-amber-400/20">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{t.liveMandiTicker}</span>
        </div>
        <div className="overflow-hidden relative w-full">
          <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 font-medium">
                <span className="text-amber-50">{getLocalizedCropName(item.crop, language)}</span>
                <span className="font-mono text-amber-300">{language === 'hi' ? item.price : item.price.replace('/किग्रा', '/kg')}</span>
                <span className="text-emerald-400 text-[11px] font-bold">{item.trend}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F3826] via-[#164E35] to-[#0A2619] text-amber-50 p-8 sm:p-12 shadow-2xl border border-amber-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>SIH 2026 PS 26033 • किसान दिवस समर्पित प्रत्यक्ष कृषि मंच</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-50 leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#marketplace"
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition flex items-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.heroCTA}</span>
              </a>

              <div className="px-4 py-3 bg-emerald-950/80 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-center gap-2.5 shadow-inner">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-amber-300">टोल-फ्री IVR वॉयस हेल्पलाइन: 1800-KISAN-AI</strong> (कीपैड फोन फसल पंजीकरण)
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-3xl font-extrabold text-amber-400">0%</div>
              <div className="text-xs text-amber-200/80 font-medium">{t.statMiddlemen}</div>
              <p className="text-[10px] text-amber-300/60">{t.statMiddlemenDesc}</p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-3xl font-extrabold text-emerald-400">99.4%</div>
              <div className="text-xs text-amber-200/80 font-medium">{t.statCVGrading}</div>
              <p className="text-[10px] text-amber-300/60">{t.statCVGradingDesc}</p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-3xl font-extrabold text-amber-400">6 AI</div>
              <div className="text-xs text-amber-200/80 font-medium">{t.statAIEngines}</div>
              <p className="text-[10px] text-amber-300/60">{t.statAIEnginesDesc}</p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center space-y-1">
              <div className="text-3xl font-extrabold text-emerald-400">IVR/SMS</div>
              <div className="text-xs text-amber-200/80 font-medium">{t.statNoInternet}</div>
              <p className="text-[10px] text-amber-300/60">{t.statNoInternetDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Persona Dynamic Switcher Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>{t.selectDashboardTitle}</span>
          </h2>
          <span className="text-xs text-emerald-800/60">{t.integratedRolesCount}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/farmer"
            onClick={() => setRole('FARMER')}
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${
              role === 'FARMER'
                ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md'
                : 'glass-card hover:border-emerald-800/30 text-emerald-950'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-700">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight">{t.roleFarmer}</p>
              <p className="text-[10px] opacity-80">{t.roleFarmerSub}</p>
            </div>
          </Link>

          <Link
            href="/fpo"
            onClick={() => setRole('FPO')}
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${
              role === 'FPO'
                ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md'
                : 'glass-card hover:border-emerald-800/30 text-emerald-950'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-700">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight">{t.roleFPO}</p>
              <p className="text-[10px] opacity-80">{t.roleFPOSub}</p>
            </div>
          </Link>

          <Link
            href="/buyer"
            onClick={() => setRole('BUYER')}
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${
              role === 'BUYER'
                ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md'
                : 'glass-card hover:border-emerald-800/30 text-emerald-950'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-700">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight">{t.roleBuyer}</p>
              <p className="text-[10px] opacity-80">{t.roleBuyerSub}</p>
            </div>
          </Link>

          <Link
            href="/hub"
            onClick={() => setRole('HUB_OPERATOR')}
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${
              role === 'HUB_OPERATOR'
                ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md'
                : 'glass-card hover:border-emerald-800/30 text-emerald-950'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-700">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight">{t.roleHub}</p>
              <p className="text-[10px] opacity-80">{t.roleHubSub}</p>
            </div>
          </Link>

          <Link
            href="/transporter"
            onClick={() => setRole('TRANSPORTER')}
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${
              role === 'TRANSPORTER'
                ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md'
                : 'glass-card hover:border-emerald-800/30 text-emerald-950'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-700">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight">{t.roleTransporter}</p>
              <p className="text-[10px] opacity-80">{t.roleTransporterSub}</p>
            </div>
          </Link>

          <Link
            href="/admin"
            onClick={() => setRole('ADMIN')}
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${
              role === 'ADMIN'
                ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md'
                : 'glass-card hover:border-emerald-800/30 text-emerald-950'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight">{t.roleAdmin}</p>
              <p className="text-[10px] opacity-80">{t.roleAdminSub}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Produce Marketplace */}
      <div id="marketplace" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/10 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
              <span>{t.marketplaceTitle}</span>
            </h2>
            <p className="text-xs text-emerald-800/70">
              सत्यापित कंप्यूटर विज़न ग्रेडिंग और पारदर्शी एस्क्रौ के साथ ताज़ी फसल खरीदें
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-emerald-900/5 p-1 rounded-xl border border-emerald-900/10 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filter === 'all'
                  ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                  : 'text-emerald-900 hover:bg-emerald-100/50'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setFilter('gradeA')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filter === 'gradeA'
                  ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                  : 'text-emerald-900 hover:bg-emerald-100/50'
              }`}
            >
              {t.filterGradeA}
            </button>
            <button
              onClick={() => setFilter('organic')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filter === 'organic'
                  ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                  : 'text-emerald-900 hover:bg-emerald-100/50'
              }`}
            >
              {t.filterOrganic}
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-emerald-900/5 animate-pulse rounded-2xl border border-emerald-900/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => {
              const priceRupees = (item.price_paise_per_kg / 100).toFixed(2);
              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-5 space-y-4 hover:shadow-xl transition-all duration-300 border border-emerald-900/10 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                          {getLocalizedCategory(item.category, language)}
                        </span>
                        <h3 className="font-extrabold text-lg text-emerald-950 mt-1 leading-tight">
                          {getLocalizedCropName(item.crop_name, language)}
                        </h3>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="px-2.5 py-1 bg-emerald-900 text-amber-200 font-extrabold text-xs rounded-xl shadow-sm flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-400" /> {getLocalizedGrade(item.quality_grade, language)}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium mt-1">
                          {language === 'hi' ? 'CV विश्वासांक: ' : 'CV Confidence: '}{item.cv_trust_score}%
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-900/5 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-900">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate font-medium">{getLocalizedLocation(item.location, language)}</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-800/80 text-[11px]">
                        <span>{language === 'hi' ? 'उत्पादक: ' : 'Producer: '}{getLocalizedFarmer(item.farmer_name, language)}</span>
                        {item.is_organic === 1 && (
                          <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                            <CheckCircle className="w-3 h-3" /> {language === 'hi' ? '100% जैविक' : '100% Organic'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-emerald-800/70">{language === 'hi' ? 'Fair Price AI मूल्य' : 'Fair Price AI Rate'}</div>
                      <div className="text-xl font-extrabold text-amber-800">
                        ₹{priceRupees} <span className="text-xs font-normal text-emerald-900">/ {language === 'hi' ? 'किग्रा' : 'kg'}</span>
                      </div>
                      <div className="text-[10px] font-mono text-emerald-700">({item.price_paise_per_kg} {t.paiseSuffix})</div>
                    </div>

                    <button
                      onClick={() =>
                        addToCart({
                          listingId: item.id,
                          cropName: item.crop_name,
                          pricePaisePerKg: item.price_paise_per_kg,
                          quantityKg: 100, // Default 100kg batch
                          grade: item.quality_grade,
                          farmerName: item.farmer_name,
                          location: item.location,
                        })
                      }
                      className="px-4 py-2.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl shadow-md transition flex items-center gap-1.5 text-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
