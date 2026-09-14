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
  ArrowRight,
  Coins,
  Shield,
  Zap,
  CheckCircle2,
  Scan,
  Users,
  Scale
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

            {/* Clean Transparent Glass Stat Cards — Authentic, Minimal & Grounded */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-5 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 hover:border-amber-400/40 text-center space-y-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 animate-float-slow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight drop-shadow-md">
                  0%
                </div>
                <div className="text-xs sm:text-sm text-white font-extrabold drop-shadow-xs">
                  {t.statMiddlemen}
                </div>
                <p className="text-[11px] text-amber-100/85 leading-tight">
                  {t.statMiddlemenDesc}
                </p>
              </div>

              <div className="p-5 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 hover:border-emerald-400/40 text-center space-y-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 animate-float-delay relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono tracking-tight drop-shadow-md">
                  99.4%
                </div>
                <div className="text-xs sm:text-sm text-white font-extrabold drop-shadow-xs">
                  {t.statCVGrading}
                </div>
                <p className="text-[11px] text-amber-100/85 leading-tight">
                  {t.statCVGradingDesc}
                </p>
              </div>

              <div className="p-5 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 hover:border-amber-400/40 text-center space-y-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 animate-float-delay relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight drop-shadow-md">
                  6 AI
                </div>
                <div className="text-xs sm:text-sm text-white font-extrabold drop-shadow-xs">
                  {t.statAIEngines}
                </div>
                <p className="text-[11px] text-amber-100/85 leading-tight">
                  {t.statAIEnginesDesc}
                </p>
              </div>

              <div className="p-5 bg-black/20 hover:bg-black/25 backdrop-blur-md rounded-2xl border border-white/20 hover:border-emerald-400/40 text-center space-y-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 animate-float-slow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono tracking-tight drop-shadow-md">
                  IVR/SMS
                </div>
                <div className="text-xs sm:text-sm text-white font-extrabold drop-shadow-xs">
                  {t.statNoInternet}
                </div>
                <p className="text-[11px] text-amber-100/85 leading-tight">
                  {t.statNoInternetDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose-Driven Dual Gateway: Built for Farmers & Buyers */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/10 text-emerald-900 border border-emerald-900/15 text-xs font-bold">
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'hi' ? 'दोहरी शक्ति: किसके लिए बना है किसानबंधन?' : 'Dual Mission: Who is KisanBandhan Built For?'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
            {language === 'hi' 
              ? 'किसान की मेहनत, खरीदार की बचत — बिना बिचौलिया प्रत्यक्ष सेतु' 
              : 'Empowering Farmers, Enabling Buyers — Zero Middlemen Direct Bridge'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800/80 leading-relaxed">
            {language === 'hi'
              ? 'पारंपरिक मंडियों में 30-40% मुनाफा बिचौलिये ले जाते हैं। किसानबंधन सीधे अन्नदाता को थोक खरीदारों से जोड़कर पारदर्शी एआई मूल्य और एस्क्रो सुरक्षा प्रदान करता है।'
              : 'Traditional supply chains lose 30-40% value to middlemen. KisanBandhan AI connects growers directly with bulk buyers through transparent AI pricing and escrow.'}
          </p>
        </div>

        {/* Dual Pillar Cards: Farmer vs Buyer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Pillar 1: For Farmers */}
          <div className="bg-gradient-to-br from-[#062215] via-[#0A2E1E] to-[#0F3826] text-amber-50 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-emerald-400/50 transition duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-mono text-[10px] font-extrabold rounded-full border border-amber-400/30 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'hi' ? 'अन्नदाता किसान भाईयों के लिए' : 'FOR FARMERS & GROWERS'}</span>
                </span>
                <span className="text-xs font-mono text-emerald-300/80 font-semibold">0% Middlemen Cut</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {language === 'hi' ? 'किसान पोर्टल (Farmer Desk)' : 'Farmer Desk & Direct Gate'}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/85 mt-1 leading-relaxed">
                  {language === 'hi'
                    ? 'मेहनत आपकी, पूरा मुनाफा आपका — किसी दलाल या आढ़ती को कमीशन दिए बिना सीधे देश भर के खरीदारों को बेचें।'
                    : 'Your harvest, your profit — sell directly to nationwide buyers without paying a single rupee to commission agents.'}
                </p>
              </div>

              {/* Benefit Bullets */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/30">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {language === 'hi' ? '0% कमीशन, 100% सीधा बैंक भुगतान' : '0% Commission, 100% Direct Payout'}
                    </h4>
                    <p className="text-[11px] text-amber-100/75 leading-tight">
                      {language === 'hi' ? 'डिलीवरी होते ही सुरक्षित एस्क्रो से पूरा भुगतान 2 घंटे में सीधे आपके खाते / UPI में।' : 'Full payment transferred directly to your bank/UPI via secure escrow within 2 hours of delivery.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-400/30">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {language === 'hi' ? 'AI सटीक मंडी भाव (Agmarknet Live)' : 'AI Fair Price Intelligence'}
                    </h4>
                    <p className="text-[11px] text-amber-100/75 leading-tight">
                      {language === 'hi' ? 'दलालों के बहकावे से मुक्ति — देश भर की 2,400+ मंडियों का लाइव सटीक बेंचमार्क रेट।' : 'Real-time Agmarknet mandi feeds and AI rate calculations prevent distress selling.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-400/30">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {language === 'hi' ? '1800-KISAN-AI (कीपैड फोन पर भी)' : 'Toll-Free IVR / SMS for Basic Phones'}
                    </h4>
                    <p className="text-[11px] text-amber-100/75 leading-tight">
                      {language === 'hi' ? 'इंटरनेट या स्मार्टफोन नहीं है? टोल-फ्री कॉल करें और अपनी भाषा में फसल दर्ज कराएं।' : 'No smartphone needed — dial our 24/7 toll-free IVR to list crops in 11 regional languages.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/farmer"
                onClick={() => setRole('FARMER')}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{language === 'hi' ? 'किसान पोर्टल में जाएं (Farmer Desk)' : 'Enter Farmer Portal (Sell Produce)'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: For Buyers & Consumers */}
          <div className="bg-white/95 backdrop-blur-md text-emerald-950 rounded-3xl p-6 sm:p-8 border border-emerald-900/15 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/40 transition duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-900/10 text-emerald-900 font-mono text-[10px] font-extrabold rounded-full border border-emerald-900/20 uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'hi' ? 'थोक खरीदार, FPO व उपभोक्ताओं के लिए' : 'FOR BUYERS, FPOs & RETAILERS'}</span>
                </span>
                <span className="text-xs font-mono text-emerald-800/70 font-semibold">100% Farm-Fresh</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 leading-tight">
                  {language === 'hi' ? 'खरीदार पोर्टल (Buyer Hub)' : 'Buyer Hub & Bulk Procurement'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800/80 mt-1 leading-relaxed">
                  {language === 'hi'
                    ? 'सीधे खेत से ताज़ा फसल, कंप्यूटर विज़न क्वालिटी ग्रेडिंग और पारदर्शी एस्क्रो अनुबंध के साथ थोक में खरीदें।'
                    : 'Source directly from verified farm gates with computer vision certified grading and secure smart contract escrow.'}
                </p>
              </div>

              {/* Benefit Bullets */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-600/20">
                    <Scan className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      {language === 'hi' ? 'कंप्यूटर विज़न AI ग्रेडिंग (Grade-A)' : 'Computer Vision Grade-A Quality'}
                    </h4>
                    <p className="text-[11px] text-emerald-800/70 leading-tight">
                      {language === 'hi' ? 'FSSAI और एगमार्क मानकों पर जांची गई फसल — नमी, आकार व रंग का सटीक स्कोर।' : 'Multi-spectral AI defect detection certifies produce quality before dispatch.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 border border-amber-600/20">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      {language === 'hi' ? 'स्मार्ट एस्क्रो भुगतान सुरक्षा' : 'Guaranteed Escrow Protection'}
                    </h4>
                    <p className="text-[11px] text-emerald-800/70 leading-tight">
                      {language === 'hi' ? 'आपका पैसा तब तक सुरक्षित रहता है जब तक आप माल की गुणवत्ता से पूरी तरह संतुष्ट न हों।' : 'Funds remain locked in banking escrow until delivery inspection and OTP verification.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-800 flex items-center justify-center shrink-0 mt-0.5 border border-blue-600/20">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      {language === 'hi' ? 'कोल्ड-चेन ट्रैकिंग व सीधी डिलीवरी' : 'Optimized Cold-Chain Fleet'}
                    </h4>
                    <p className="text-[11px] text-emerald-800/70 leading-tight">
                      {language === 'hi' ? 'खेत या निकटतम एग्री-हब से सीधे आपके गोदाम तक लाइव जीपीएस लॉजिस्टिक्स।' : 'Live GPS route tracking and perishable freshness monitoring right to your warehouse.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="#marketplace"
                className="w-full py-3.5 px-6 bg-[#0F3826] hover:bg-[#164E35] text-amber-50 font-black rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-sm hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{language === 'hi' ? 'फसलें खोजें और खरीदें (Explore Produce)' : 'Explore Marketplace (Buy Produce)'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 4-Step Direct Farm-to-Fork Process Strip */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-900/15 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
                {language === 'hi' ? 'पारदर्शी प्रक्रिया' : 'TRANSPARENT PROCESS'}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950 mt-1">
                {language === 'hi' ? 'खेत से प्लेट तक — 4 चरणों में सीधी व्यवस्था' : 'Farm-to-Fork in 4 Transparent Steps'}
              </h3>
            </div>
            <p className="text-xs text-emerald-800/70 max-w-md">
              {language === 'hi'
                ? 'कोई छुपा हुआ शुल्क नहीं, कोई अनावश्यक मध्यस्थ नहीं — सिर्फ तकनीकी रूप से सक्षम सीधी कृषि।'
                : 'Zero hidden fees, zero middlemen layers — purely AI-assisted direct agriculture.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-900/10 space-y-2 relative">
              <span className="text-2xl font-black text-emerald-800/20 font-mono">01</span>
              <h4 className="text-xs font-extrabold text-emerald-950">
                {language === 'hi' ? 'खेत से सीधी लिस्टिंग' : 'Direct Farm Listing'}
              </h4>
              <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                {language === 'hi'
                  ? 'किसान वेब पोर्टल या 1800-KISAN-AI पर कॉल करके अपनी फसल, मात्रा व अपेक्षित दाम दर्ज करता है।'
                  : 'Farmer registers produce via web portal or 1800-KISAN-AI toll-free phone with crop specs.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-900/10 space-y-2 relative">
              <span className="text-2xl font-black text-emerald-800/20 font-mono">02</span>
              <h4 className="text-xs font-extrabold text-emerald-950">
                {language === 'hi' ? 'AI कंप्यूटर विज़न ग्रेडिंग' : 'Computer Vision Grading'}
              </h4>
              <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                {language === 'hi'
                  ? 'फसल की तस्वीरों से एआई ग्रेडिंग व गुणवत्ता स्कोर तैयार होता है, जिससे FSSAI Grade-A प्रमाण पत्र मिलता है।'
                  : 'AI scans upload photos for quality defects, issuing verified Grade-A digital certificates.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-900/10 space-y-2 relative">
              <span className="text-2xl font-black text-emerald-800/20 font-mono">03</span>
              <h4 className="text-xs font-extrabold text-emerald-950">
                {language === 'hi' ? 'स्मार्ट एस्क्रो अनुबंध लॉक' : 'Smart Escrow Lock'}
              </h4>
              <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                {language === 'hi'
                  ? 'खरीदार अग्रिम राशि एस्क्रो में जमा करता है। दोनों पक्षों के बीच न्यूनतम समर्थन मूल्य का समझौता सुरक्षित होता है।'
                  : 'Buyer locks contract funds into banking escrow, guaranteeing full payment before truck dispatch.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-900/10 space-y-2 relative">
              <span className="text-2xl font-black text-emerald-800/20 font-mono">04</span>
              <h4 className="text-xs font-extrabold text-emerald-950">
                {language === 'hi' ? 'ओटीपी डिलीवरी व त्वरित भुगतान' : 'OTP Delivery & Instant Payout'}
              </h4>
              <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                {language === 'hi'
                  ? 'लॉजिस्टिक्स द्वारा माल पहुंचाने पर खरीदार ओटीपी देता है, और किसान के बैंक में तुरंत 100% राशि रिलीज हो जाती है।'
                  : 'On OTP delivery verification, 100% of escrow funds are released to the farmer bank account instantly.'}
              </p>
            </div>
          </div>
        </div>

        {/* 6 Specialized Persona Nodes Strip */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <span>{t.selectDashboardTitle || 'एकीकृत 6 हितधारक भूमिकाएँ (All 6 Roles)'}</span>
            </h3>
            <span className="text-xs text-emerald-800/60 font-semibold">{t.integratedRolesCount}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              href="/farmer"
              onClick={() => setRole('FARMER')}
              className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between h-28 ${
                role === 'FARMER'
                  ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/80 hover:bg-white border-emerald-900/15 text-emerald-950 shadow-xs'
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
                  ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/80 hover:bg-white border-emerald-900/15 text-emerald-950 shadow-xs'
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
                  ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/80 hover:bg-white border-emerald-900/15 text-emerald-950 shadow-xs'
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
                  ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/80 hover:bg-white border-emerald-900/15 text-emerald-950 shadow-xs'
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
                  ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/80 hover:bg-white border-emerald-900/15 text-emerald-950 shadow-xs'
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
                  ? 'bg-[#0F3826] text-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-white/80 hover:bg-white border-emerald-900/15 text-emerald-950 shadow-xs'
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
      </div>

      {/* Main Produce Marketplace */}
      <div id="marketplace" className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/10 pb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-900 font-extrabold text-[11px] rounded-full border border-amber-500/30">
                {language === 'hi' ? '100% प्रत्यक्ष कृषि हाट' : 'Direct Farm Marketplace'}
              </span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'hi' ? 'FSSAI और कंप्यूटर विज़न प्रमाणित' : 'FSSAI & CV Certified'}</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2 mt-1">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
              <span>{t.marketplaceTitle}</span>
            </h2>
            <p className="text-xs text-emerald-800/80">
              {t.marketplaceSubtitle}
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
