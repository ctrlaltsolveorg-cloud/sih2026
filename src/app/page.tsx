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
  UserCheck,
  Search
} from 'lucide-react';
import Link from 'next/link';
import BulmaProductCard from '@/components/BulmaProductCard';
import { FULL_CROP_CATALOG } from '@/lib/cropCatalogData';

interface Listing {
  id: number | string;
  crop_name: string;
  crop_name_hi?: string;
  category: string;
  variety?: string;
  quantity_kg: number;
  price_paise_per_kg: number;
  quality_grade: string;
  cv_trust_score: number;
  harvest_date: string;
  is_organic: number;
  farmer_name: string;
  location: string;
  hub_location: string;
  image_url?: string;
  images?: string[];
  unit?: string;
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const { role, setRole } = useRole();
  const { addToCart } = useCart();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'gradeA' | 'organic'>('all');
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

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
        // Check local storage custom crops
        let localProduce: Listing[] = [];
        try {
          const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
          localProduce = stored.map((item: any, idx: number) => {
            let photos: string[] = [];
            if (Array.isArray(item.photos)) {
              photos = item.photos;
            } else if (item.imageUrl) {
              photos = [item.imageUrl, item.imageUrl];
            }
            return {
              id: item.id || `local_${idx}`,
              crop_name: item.crop || item.crop_name || 'नयी फसल',
              crop_name_hi: item.crop_name_hi,
              category: item.category || 'Vegetables',
              variety: item.variety || 'सत्यापित किसान लॉट',
              quantity_kg: parseInt(item.qty || item.quantity_available) || 500,
              price_paise_per_kg: item.pricePaise || Math.round((parseFloat(item.priceRupees) || 30) * 100),
              quality_grade: item.grade || 'ग्रेड A+',
              cv_trust_score: 98,
              harvest_date: item.harvestDate || '2026-09-08',
              is_organic: item.isOrganic || 1,
              farmer_name: item.farmer_name || 'किसान (Farmer)',
              location: item.location || 'नासिक मंडी हब (महाराष्ट्र)',
              hub_location: 'नासिक एग्रो-हब #04',
              image_url: photos[0],
              images: photos,
              unit: item.unit || 'kg',
            };
          });
        } catch (e) { }

        let apiProduce: Listing[] = [];
        try {
          const res = await fetch('/api/v1/crops');
          const data = await res.json();
          if (data.success && data.crops && data.crops.length > 0) {
            apiProduce = data.crops.map((c: any) => {
              let photoList: string[] = [];
              if (c.image_url && typeof c.image_url === 'string' && c.image_url.startsWith('[') && c.image_url.endsWith(']')) {
                try {
                  photoList = JSON.parse(c.image_url);
                } catch (e) {
                  photoList = [c.image_url];
                }
              } else if (c.image_url) {
                photoList = [c.image_url];
              }
              if (photoList.length === 1) {
                photoList.push(photoList[0]);
              }

              return {
                id: c.id,
                crop_name: c.crop_name,
                category: c.category || 'Vegetables',
                variety: 'सत्यापित किसान लॉट',
                quantity_kg: c.quantity_available || 500,
                price_paise_per_kg: c.price_paise || 3000,
                quality_grade: c.grade || 'ग्रेड A+',
                cv_trust_score: 97,
                harvest_date: c.harvest_date || '2026-09-08',
                is_organic: c.organic_certified || 0,
                farmer_name: c.farmer_name || 'किसान (Farmer)',
                location: c.location || 'नासिक मंडी हब (महाराष्ट्र)',
                hub_location: c.district ? `${c.district} एग्रो-हब` : 'नासिक एग्रो-हब #04',
                image_url: photoList[0],
                images: photoList,
                unit: c.unit || 'kg',
              };
            });
          }
        } catch (e) { }

        // 350+ Catalog Items
        const catalogProduce: Listing[] = FULL_CROP_CATALOG.map((item) => ({
          id: item.id,
          crop_name: item.name,
          crop_name_hi: item.nameHi,
          category: item.category,
          variety: item.variety,
          quantity_kg: 500,
          price_paise_per_kg: item.pricePaise,
          quality_grade: item.grade,
          cv_trust_score: 97,
          harvest_date: '2026-09-08',
          is_organic: item.isOrganic,
          farmer_name: 'प्रमाणित किसान नेटवर्क (Farmer Network)',
          location: 'नासिक / इंदौर संकलन हब',
          hub_location: 'राज्य संकलन एग्रो-हब',
          image_url: item.photos[0],
          images: item.photos,
          unit: item.unit,
        }));

        // Prioritize farmer direct produce at the top
        const combinedAll = [...localProduce, ...apiProduce, ...catalogProduce];
        const seen = new Set();
        const uniqueListings = combinedAll.filter((item) => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });
        setListings(uniqueListings);
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
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = item.crop_name.toLowerCase().includes(q);
      const hiMatch = item.crop_name_hi ? item.crop_name_hi.includes(q) : false;
      const varMatch = item.variety ? item.variety.toLowerCase().includes(q) : false;
      if (!nameMatch && !hiMatch && !varMatch) return false;
    }
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
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${role === 'FARMER'
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
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${role === 'FPO'
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
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${role === 'BUYER'
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
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${role === 'HUB_OPERATOR'
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
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${role === 'TRANSPORTER'
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
            className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${role === 'ADMIN'
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
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-900 font-extrabold text-[11px] rounded-full border border-amber-500/30">
                {language === 'hi' ? 'किसान डेस्क से सीधा संकलन' : 'Direct from Farmer Desk'}
              </span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'hi' ? '2 से 6 फोटो सत्यापित' : '2-6 Photos Verified'}</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2 mt-1">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
              <span>{t.marketplaceTitle}</span>
            </h2>
            <p className="text-xs text-emerald-800/70">
              {language === 'hi'
                ? 'आपकी फसल सफलतापूर्वक आपकी फसल सूची में जोड़ दी गई है और अब यह प्लेटफ़ॉर्म पर उपलब्ध है।'
                : 'Your crop has been added successfully to your crop list and is now available on the platform.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-900/15 shadow-sm">
              {filteredListings.length} {language === 'hi' ? 'फसलें उपलब्ध' : 'Produce Listed'}
            </span>
          </div>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-emerald-900/15 shadow-sm overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedCropCategory('All')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'All'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 hover:bg-emerald-50'
                  }`}
              >
                {language === 'hi' ? 'सभी ' : 'All '}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Vegetables')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Vegetables'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 hover:bg-emerald-50'
                  }`}
              >
                {language === 'hi' ? '+100 सब्जियाँ' : '+100 Vegetables'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Fruits')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Fruits'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 hover:bg-emerald-50'
                  }`}
              >
                {language === 'hi' ? '+100 फल' : '+100 Fruits'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Pulses')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Pulses'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 hover:bg-emerald-50'
                  }`}
              >
                {language === 'hi' ? '+100 दालें' : '+100 Pulses'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Grains')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Grains'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 hover:bg-emerald-50'
                  }`}
              >
                {language === 'hi' ? '+50 अनाज' : '+50 Grains'}
              </button>
            </div>

            {/* Real-time Search Box */}
            <div className="relative min-w-[240px] sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-emerald-800/50" />
              <input
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'फसल, किस्म या किसान खोजें...'
                    : 'Search crop, variety, farmer...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-emerald-900/20 rounded-2xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-emerald-800 hover:text-emerald-950"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Secondary Quality Filters */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-900/70">
              {language === 'hi' ? 'गुणवत्ता फिल्टर:' : 'Quality Filter:'}
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-900/5 p-1 rounded-xl border border-emerald-900/10 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition ${filter === 'all'
                    ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                    : 'text-emerald-900 hover:bg-emerald-100/50'
                  }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setFilter('gradeA')}
                className={`px-3 py-1 rounded-lg font-bold transition ${filter === 'gradeA'
                    ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                    : 'text-emerald-900 hover:bg-emerald-100/50'
                  }`}
              >
                {t.filterGradeA}
              </button>
              <button
                onClick={() => setFilter('organic')}
                className={`px-3 py-1 rounded-lg font-bold transition ${filter === 'organic'
                    ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                    : 'text-emerald-900 hover:bg-emerald-100/50'
                  }`}
              >
                {t.filterOrganic}
              </button>
            </div>
          </div>
        </div>

        {/* Listings Grid: Bulma Responsive Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 bg-emerald-900/5 animate-pulse rounded-3xl border border-emerald-900/10" />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="py-16 px-4 text-center bg-white/60 border-2 border-dashed border-emerald-900/15 rounded-3xl space-y-4">
            <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-emerald-950">
                {language === 'hi' ? 'वर्तमान में कोई फसल उपलब्ध नहीं है' : 'No produce currently listed'}
              </h3>
              <p className="text-xs text-emerald-800/70 max-w-md mx-auto mt-1">
                {language === 'hi'
                  ? 'पंजीकृत किसान अपने किसान पोर्टल (Farmer Desk) में जाकर 2 से 6 तस्वीरों के साथ अपनी ताज़ा फसलें पंजीकृत कर सकते हैं।'
                  : 'Registered farmers can log in to the Farmer Desk and list their fresh harvest with 2-6 photos.'}
              </p>
            </div>
            <Link
              href="/farmer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-xs shadow-md transition"
            >
              <span>{language === 'hi' ? 'किसान पोर्टल पर जाएँ' : 'Go to Farmer Desk'}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <BulmaProductCard
                key={item.id}
                id={item.id}
                crop_name={item.crop_name}
                crop_name_hi={item.crop_name_hi}
                category={item.category}
                variety={item.variety}
                quantity_kg={item.quantity_kg}
                price_paise_per_kg={item.price_paise_per_kg}
                quality_grade={item.quality_grade}
                cv_trust_score={item.cv_trust_score}
                harvest_date={item.harvest_date}
                is_organic={item.is_organic}
                farmer_name={item.farmer_name}
                location={item.location}
                images={item.images || (item.image_url ? [item.image_url] : undefined)}
                unit={item.unit}
                onAddToCart={(c) =>
                  addToCart({
                    listingId: c.listingId,
                    cropName: c.cropName,
                    pricePaisePerKg: c.pricePaisePerKg,
                    quantityKg: c.quantityKg,
                    grade: c.grade,
                    farmerName: c.farmerName,
                    location: c.location,
                    imageUrl: c.imageUrl,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
