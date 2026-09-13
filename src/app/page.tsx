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
  Search,
  Cpu,
  Bot,
  Activity,
  Radio,
  Scan,
  Lock
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
  logo_url?: string;
  side_logo?: string;
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
              logo_url: item.logo_url || item.sideLogo || photos[0],
              side_logo: item.logo_url || item.sideLogo || photos[0],
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
                logo_url: c.logo_url || photoList[0],
                side_logo: c.logo_url || photoList[0],
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
          image_url: item.photos && item.photos.length > 0 ? item.photos[0] : undefined,
          images: item.photos && item.photos.length > 0 ? item.photos : undefined,
          logo_url: item.logo_url || item.sideLogo || (item.photos && item.photos.length > 0 ? item.photos[0] : undefined),
          side_logo: item.logo_url || item.sideLogo || item.thumbnail || (item.photos && item.photos.length > 0 ? item.photos[0] : undefined),
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
      {/* Full-width Open Hero Section with Edge-to-Edge Farm Background */}
      <div className="relative -mx-4 sm:-mx-8 lg:-mx-12 -mt-6 pt-6 sm:pt-8 pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden text-amber-50">
        {/* Full-bleed Background Farm Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 ease-out pointer-events-none"
          style={{ backgroundImage: "url('/images/hero_farm_bg.jpg')" }}
        />
        {/* Contrast overlay — rich dark emerald over text, clear vibrant farm imagery across right, ZERO white fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03140D]/92 via-[#051E13]/75 to-[#08291B]/45 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          {/* Live Mandi Agmarknet Ticker */}
          <div className="w-full bg-[#051C12]/70 backdrop-blur-md text-amber-100 rounded-2xl py-2 px-4 shadow-sm overflow-hidden border border-white/10 flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 shrink-0 bg-amber-500/15 px-3 py-1 rounded-lg border border-amber-400/20">
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

          {/* Hero Content — Open, Breathable & Minimal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/25 text-xs font-semibold backdrop-blur-sm shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>SIH 2026 PS 26033 • किसान दिवस समर्पित प्रत्यक्ष कृषि मंच</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                {t.heroTitle}
              </h1>

              <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-2xl font-normal drop-shadow-xs">
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#marketplace"
                  className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-extrabold rounded-xl shadow-xl transition-all duration-200 flex items-center gap-2 text-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.heroCTA}</span>
                </a>

                <div className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl text-xs text-amber-200 flex items-center gap-2.5 shadow-sm">
                  <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong className="text-amber-300">टोल-फ्री IVR वॉयस हेल्पलाइन: 1800-KISAN-AI</strong> (कीपैड फोन फसल पंजीकरण)
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Glassmorphic Robotics Telemetry HUD — Pure Transparent Glass */}
            <div className="lg:col-span-5 space-y-3">
              {/* Telemetry Status Bar — High Transparency */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-2xl bg-black/20 hover:bg-black/25 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.3)] text-[11px] font-mono text-cyan-200 transition">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                  <span className="font-extrabold tracking-wider uppercase drop-shadow-xs">ROBOTICS AI TELEMETRY</span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-amber-300 font-bold drop-shadow-xs">NODE: 6/6 LIVE</span>
                  <span className="text-white/40">•</span>
                  <span className="text-emerald-400 font-bold drop-shadow-xs">SYS: 99.9%</span>
                </div>
              </div>

              {/* 4 Ultra-Transparent Floating Glass HUD Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Card 1: Computer Vision Circular Gauge Widget */}
                <div className="p-4 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-3xl border border-white/20 hover:border-cyan-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 animate-float-slow flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-200 mb-1">
                      <span className="flex items-center gap-1 font-bold">
                        <Scan className="w-3.5 h-3.5 text-cyan-400" />
                        <span>CV GRADING</span>
                      </span>
                      <span className="text-emerald-300 font-bold text-[9px] bg-emerald-500/25 px-1.5 py-0.5 rounded-full border border-emerald-400/40 backdrop-blur-xs">
                        GRADE-A
                      </span>
                    </div>

                    {/* Circular Telemetry Ring */}
                    <div className="flex items-center justify-center my-2">
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 76 76">
                          <circle
                            cx="38"
                            cy="38"
                            r="32"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.15)"
                            strokeWidth="5"
                          />
                          <circle
                            cx="38"
                            cy="38"
                            r="32"
                            fill="none"
                            stroke="url(#cyanEmeraldGrad)"
                            strokeWidth="5"
                            strokeDasharray="201"
                            strokeDashoffset="1.2"
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient id="cyanEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#22d3ee" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-lg font-black text-white font-mono tracking-tight leading-none drop-shadow-md">
                            99.4%
                          </span>
                          <span className="text-[8px] font-mono text-cyan-200/90 font-bold uppercase drop-shadow-xs">
                            ACCURACY
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/15 text-center relative z-10">
                    <div className="text-xs text-white font-extrabold drop-shadow-sm">{t.statCVGrading}</div>
                    <p className="text-[10px] text-cyan-100/80 font-mono leading-tight mt-0.5">{t.statCVGradingDesc}</p>
                  </div>
                </div>

                {/* Card 2: Smart Escrow Zero Middlemen Protocol */}
                <div className="p-4 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-3xl border border-white/20 hover:border-amber-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 animate-float-delay flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-200 mb-1">
                      <span className="flex items-center gap-1 font-bold">
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                        <span>SMART ESCROW</span>
                      </span>
                      <span className="text-amber-300 text-[9px] bg-amber-500/25 px-1.5 py-0.5 rounded-full border border-amber-400/40 backdrop-blur-xs font-bold">
                        ZERO-CUT
                      </span>
                    </div>

                    <div className="text-center my-3">
                      <div className="text-4xl font-black text-amber-400 font-mono tracking-tight drop-shadow-md">
                        0%
                      </div>
                      <span className="inline-block mt-1 text-[9px] font-mono text-amber-100 uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-xs">
                        MIDDLEMEN CUT
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/15 text-center relative z-10">
                    <div className="text-xs text-white font-extrabold drop-shadow-sm">{t.statMiddlemen}</div>
                    <p className="text-[10px] text-amber-100/80 leading-tight mt-0.5">{t.statMiddlemenDesc}</p>
                  </div>
                </div>

                {/* Card 3: 6 AI Neural Engines Equalizer */}
                <div className="p-4 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-3xl border border-white/20 hover:border-cyan-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 animate-float-delay flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-200 mb-1">
                      <span className="flex items-center gap-1 font-bold">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span>NEURAL CORE</span>
                      </span>
                      <span className="text-cyan-200 text-[9px] bg-cyan-500/25 px-1.5 py-0.5 rounded-full border border-cyan-400/40 backdrop-blur-xs font-mono font-bold">
                        6 ENGINES
                      </span>
                    </div>

                    <div className="text-center my-1.5">
                      <div className="text-3xl font-black text-cyan-300 font-mono drop-shadow-md">6 AI</div>
                    </div>

                    {/* Animated Equalizer Waveform Bars */}
                    <div className="flex items-end justify-center gap-1.5 h-7 my-2">
                      {[45, 80, 100, 65, 90, 50].map((height, i) => (
                        <div
                          key={i}
                          className="w-2 bg-gradient-to-t from-emerald-400 to-cyan-300 rounded-t shadow-xs animate-pulse"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${i * 150}ms`,
                            animationDuration: '1.4s'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/15 text-center relative z-10">
                    <div className="text-xs text-white font-extrabold drop-shadow-sm">{t.statAIEngines}</div>
                    <p className="text-[10px] text-cyan-100/80 font-mono leading-tight mt-0.5">{t.statAIEnginesDesc}</p>
                  </div>
                </div>

                {/* Card 4: Satellite / IVR Voice Node */}
                <div className="p-4 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-3xl border border-white/20 hover:border-emerald-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 animate-float-slow flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-emerald-200 mb-1">
                      <span className="flex items-center gap-1 font-bold">
                        <Radio className="w-3.5 h-3.5 text-emerald-400" />
                        <span>VOICE NODE</span>
                      </span>
                      <span className="text-emerald-300 text-[9px] bg-emerald-500/25 px-1.5 py-0.5 rounded-full border border-emerald-400/40 backdrop-blur-xs font-bold">
                        OFFLINE
                      </span>
                    </div>

                    <div className="text-center my-2">
                      <div className="text-2xl font-black text-emerald-300 font-mono tracking-tight drop-shadow-md">
                        IVR / SMS
                      </div>
                      <span className="inline-block mt-1 text-[9px] font-mono text-emerald-100 uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-xs">
                        KEYPAD PHONE
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/15 text-center relative z-10">
                    <div className="text-xs text-white font-extrabold drop-shadow-sm">{t.statNoInternet}</div>
                    <p className="text-[10px] text-amber-100/80 leading-tight mt-0.5">{t.statNoInternetDesc}</p>
                  </div>
                </div>
              </div>
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
                logo_url={item.logo_url}
                side_logo={item.side_logo}
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
