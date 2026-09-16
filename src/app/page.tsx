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
  PhoneCall,
  CheckCircle,
  MapPin,
  Search
} from 'lucide-react';
import Link from 'next/link';
import BulmaProductCard from '@/components/BulmaProductCard';
import HeroCarousel from '@/components/HeroCarousel';
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

        // Exactly 3 Verified Staple Products
        const catalogProduce: Listing[] = FULL_CROP_CATALOG.map((item) => ({
          id: item.id,
          crop_name: item.name,
          crop_name_hi: item.nameHi,
          category: item.category,
          variety: item.variety,
          quantity_kg: item.quantityKg || 500,
          price_paise_per_kg: item.pricePaise,
          quality_grade: item.grade,
          cv_trust_score: 98,
          harvest_date: '2026-09-14',
          is_organic: item.isOrganic,
          farmer_name: item.farmerName || 'Ramesh Patil (रमेश पाटिल)',
          location: item.location || 'खेत संकलन केंद्र #04, नासिक (Nashik Hub)',
          hub_location: 'नासिक एग्रो-हब #04',
          image_url: undefined,
          images: [],
          logo_url: undefined,
          side_logo: undefined,
          unit: item.unit || 'kg',
        }));

        setListings(catalogProduce);
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
    <div className="space-y-8 sm:space-y-10">
      {/* Hero Banner Carousel Section with Agriculture Imagery, Navigation Controls & Floating Live Mandi Ticker */}
      <HeroCarousel
        tickerSlot={
          <div className="w-full bg-[#072014]/65 dark:bg-[#03100a]/75 backdrop-blur-md text-amber-100 rounded-2xl py-2 px-3 sm:px-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden border border-white/15 dark:border-emerald-500/25 flex items-center gap-3 transition-all hover:bg-[#072014]/75">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 shrink-0 bg-emerald-950/85 px-2.5 py-1 rounded-xl border border-amber-400/25 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{t.liveMandiTicker}</span>
            </div>
            <div className="overflow-hidden relative w-full">
              <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs">
                {tickerItems.concat(tickerItems).map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 font-medium">
                    <span className="text-amber-50">{getLocalizedCropName(item.crop, language)}</span>
                    <span className="font-mono text-amber-300 font-bold">{language === 'hi' ? item.price : item.price.replace('/किग्रा', '/kg')}</span>
                    <span className="text-emerald-400 text-[11px] font-bold">{item.trend}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
      />


      {/* Main Produce Marketplace */}
      <div id="marketplace" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/10 dark:border-emerald-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-900 dark:text-amber-300 font-extrabold text-[11px] rounded-full border border-amber-500/30">
                {language === 'hi' ? 'किसान डेस्क से सीधा संकलन' : 'Direct from Farmer Desk'}
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{language === 'hi' ? '2 से 6 फोटो सत्यापित' : '2-6 Photos Verified'}</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-50 flex items-center gap-2 mt-1">
              <ShoppingBag className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <span>{t.marketplaceTitle}</span>
            </h2>
            <p className="text-xs text-emerald-800/70 dark:text-emerald-300/80">
              {t.marketplaceSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-white dark:bg-[#07170f] px-3 py-1.5 rounded-xl border border-emerald-900/15 dark:border-emerald-500/20 shadow-sm">
              {filteredListings.length} {language === 'hi' ? 'फसलें उपलब्ध' : 'Produce Listed'}
            </span>
          </div>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Navigation Pills */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#07170f] p-1 rounded-2xl border border-emerald-900/15 dark:border-emerald-500/20 shadow-sm overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedCropCategory('All')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'All'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}
              >
                {language === 'hi' ? 'सभी ' : 'All '}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Vegetables')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Vegetables'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}
              >
                {language === 'hi' ? '+100 सब्जियाँ' : '+100 Vegetables'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Fruits')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Fruits'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}
              >
                {language === 'hi' ? '+100 फल' : '+100 Fruits'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Pulses')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Pulses'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}
              >
                {language === 'hi' ? '+100 दालें' : '+100 Pulses'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedCropCategory('Grains')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap ${selectedCropCategory === 'Grains'
                    ? 'bg-[#0F3826] text-amber-100 shadow'
                    : 'text-emerald-950 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                  }`}
              >
                {language === 'hi' ? '+50 अनाज' : '+50 Grains'}
              </button>
            </div>

            {/* Real-time Search Box */}
            <div className="relative min-w-[240px] sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-emerald-800/50 dark:text-emerald-400/60" />
              <input
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'फसल, किस्म या किसान खोजें...'
                    : 'Search crop, variety, farmer...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#07170f] border border-emerald-900/20 dark:border-emerald-500/30 rounded-2xl text-xs text-emerald-950 dark:text-white placeholder-emerald-800/40 dark:placeholder-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Secondary Quality Filters */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-emerald-900/70 dark:text-emerald-300/70">
              {language === 'hi' ? 'गुणवत्ता फिल्टर:' : 'Quality Filter:'}
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-900/5 dark:bg-emerald-950/40 p-1 rounded-xl border border-emerald-900/10 dark:border-emerald-500/20 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition ${filter === 'all'
                    ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                    : 'text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40'
                  }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setFilter('gradeA')}
                className={`px-3 py-1 rounded-lg font-bold transition ${filter === 'gradeA'
                    ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                    : 'text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40'
                  }`}
              >
                {t.filterGradeA}
              </button>
              <button
                onClick={() => setFilter('organic')}
                className={`px-3 py-1 rounded-lg font-bold transition ${filter === 'organic'
                    ? 'bg-[#0F3826] text-amber-50 shadow-sm'
                    : 'text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40'
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
