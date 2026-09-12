'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedFarmer, getLocalizedLocation, getLocalizedCropName } from '@/lib/i18n';
import { useRole } from '@/context/RoleContext';
import { useCart } from '@/context/CartContext';
import PortalGuard from '@/components/PortalGuard';
import BulmaProductCard from '@/components/BulmaProductCard';
import {
  ShoppingBag,
  Plus,
  Clock,
  CheckCircle2,
  FileText,
  Sparkles,
  MapPin,
  X,
  Search,
  Filter,
  Tractor,
  Layers,
  ArrowRight,
  ShieldCheck,
  User,
  Phone
} from 'lucide-react';

export default function BuyerDashboardPage() {
  const { t, language } = useLanguage();
  const { userName, userPhone } = useRole();
  const { addToCart } = useCart();
  const [successSignal, setSuccessSignal] = useState<string | null>(null);

  const [showAddReqModal, setShowAddReqModal] = useState(false);
  const [buyerName, setBuyerName] = useState(userName || 'रमेश ट्रेडिंग कं.');
  const [buyerContact, setBuyerContact] = useState(userPhone || '+91 98230 45678');
  const [cropName, setCropName] = useState('टमाटर');
  const [requiredQty, setRequiredQty] = useState('1500');
  const [maxPriceRs, setMaxPriceRs] = useState('29.00');
  const [deliveryLoc, setDeliveryLoc] = useState('अन्नपूर्णा पुणे संकलन हब');

  useEffect(() => {
    if (userName) setBuyerName((prev) => (!prev || prev === 'रमेश ट्रेडिंग कं.' ? userName : prev));
    if (userPhone) setBuyerContact((prev) => (!prev || prev === '+91 98230 45678' ? userPhone : prev));
  }, [userName, userPhone]);

  // Produce board search state - ONLY farmer inserted crops
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [farmerProduce, setFarmerProduce] = useState<any[]>([]);
  const [loadingProduce, setLoadingProduce] = useState(true);

  const [buyerOrders] = useState([
    {
      id: 301,
      farmer_name: 'रामेश्वर यादव',
      delivery_address: 'नासिक हब से पुणे प्रेषित',
      total_amount_paise: 4140000, // ₹41,400.00
      status: 'परिवहन में',
    },
    {
      id: 302,
      farmer_name: 'सुरेश पाटिल',
      delivery_address: 'इन्दौर हब से सीधा पिकअप',
      total_amount_paise: 2250000, // ₹22,500.00
      status: 'सफलतापूर्वक हस्तांतरित',
    },
  ]);

  // Load produce from Farmer Desk (DB + localStorage)
  useEffect(() => {
    async function fetchFarmerProduce() {
      setLoadingProduce(true);
      try {
        let localList: any[] = [];
        try {
          const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
          localList = stored.map((item: any) => {
            let photos: string[] = [];
            if (Array.isArray(item.photos)) {
              photos = item.photos;
            } else if (item.imageUrl) {
              photos = [item.imageUrl, item.imageUrl];
            }
            return {
              id: item.id || `local_${Date.now()}`,
              crop_name: item.crop || item.crop_name || 'ताज़ा फसल',
              crop_name_hi: item.crop_name_hi,
              category: item.category || 'Vegetables',
              variety: item.variety || 'हाइब्रिड उच्च उपज',
              quantity_kg: parseInt(item.qty || item.quantity_available) || 500,
              price_paise_per_kg: item.pricePaise || Math.round((parseFloat(item.priceRupees) || 32) * 100),
              quality_grade: item.grade || 'उच्चतम श्रेणी A+',
              cv_trust_score: 98,
              harvest_date: item.harvestDate || '2026-09-08',
              is_organic: item.isOrganic || 0,
              farmer_name: item.farmer_name || 'किसान (Farmer)',
              location: item.location || 'नासिक मंडी संकलन हब',
              images: photos,
              unit: item.unit || 'kg',
              isDirectFromFarmer: true,
            };
          });
        } catch (e) { }

        let apiList: any[] = [];
        try {
          const res = await fetch('/api/v1/crops');
          const data = await res.json();
          if (data.success && data.crops && data.crops.length > 0) {
            apiList = data.crops.map((c: any) => {
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
                quantity_kg: c.quantity_available,
                price_paise_per_kg: c.price_paise,
                quality_grade: c.grade || 'उच्चतम श्रेणी A+',
                cv_trust_score: 97,
                harvest_date: c.harvest_date || '2026-09-08',
                is_organic: c.organic_certified || 0,
                farmer_name: c.farmer_name || 'किसान (Farmer)',
                location: c.location || 'नासिक मंडी संकलन हब',
                images: photoList,
                unit: c.unit || 'kg',
                isDirectFromFarmer: true,
              };
            });
          }
        } catch (e) { }

        const combined = [...localList, ...apiList];
        const seen = new Set();
        const unique = combined.filter((it) => {
          if (seen.has(it.id)) return false;
          seen.add(it.id);
          return true;
        });

        setFarmerProduce(unique);
      } finally {
        setLoadingProduce(false);
      }
    }

    fetchFarmerProduce();
  }, []);

  // Direct buyer board: ONLY crops inserted by farmers!
  const filteredProduce = useMemo(() => {
    let result = farmerProduce;
    if (selectedCategory !== 'All') {
      result = result.filter(
        (it) => it.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (it) =>
          it.crop_name.toLowerCase().includes(q) ||
          (it.crop_name_hi && it.crop_name_hi.includes(q)) ||
          (it.variety && it.variety.toLowerCase().includes(q)) ||
          (it.farmer_name && it.farmer_name.toLowerCase().includes(q))
      );
    }
    return result;
  }, [farmerProduce, selectedCategory, searchQuery]);

  const handlePostRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddReqModal(false);
    setSuccessSignal(
      language === 'hi'
        ? `थोक मांग प्रस्ताव दर्ज! (${buyerName} • ${buyerContact})`
        : `Bulk Requirement Posted! (${buyerName} • ${buyerContact})`
    );
    setTimeout(() => setSuccessSignal(null), 4000);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      listingId: item.listingId || item.id,
      cropName: item.cropName || item.crop_name,
      pricePaisePerKg: item.pricePaisePerKg || item.price_paise_per_kg,
      quantityKg: item.quantityKg || 100,
      grade: item.grade || item.quality_grade,
      farmerName: item.farmerName || item.farmer_name,
      location: item.location,
      imageUrl: item.imageUrl || (item.photos && item.photos[0]),
    });
    setSuccessSignal(
      language === 'hi'
        ? `${item.cropName || item.crop_name} कार्ट में जोड़ा गया!`
        : `${item.cropName || item.crop_name} added to procurement cart!`
    );
    setTimeout(() => setSuccessSignal(null), 4000);
  };

  return (
    <PortalGuard
      requiredRole="BUYER"
      portalName={language === 'hi' ? 'प्रत्यक्ष खरीदार पोर्टल (Buyer Desk)' : 'Buyer Desk'}
      portalDescription={
        language === 'hi'
          ? 'यह पोर्टल केवल सत्यापित थोक एवं खुदरा खरीदारों के लिए है जहाँ वे किसान डेस्क बोर्ड से सीधे प्रेषित 350+ फसलें 2 से 6 तस्वीरों के साथ देख व खरीद सकते हैं।'
          : 'This portal is restricted to verified Bulk and Retail Buyers to procure directly from Farmer Desk listings with 2-6 verified photos.'
      }
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {t.buyerHeaderBadge}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                {t.buyerWelcome}, {userName}
              </h1>
              <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
                {language === 'hi'
                  ? 'किसानों से सीधे ताज़ा फसलें, बेहतर दामों पर उच्च गुणवत्ता वाले उत्पाद'
                  : 'Fresh Crops Direct from Farmers with Quality Produce at Better prices.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link
              href="/farmer"
              className="px-4 py-3 bg-emerald-950/80 hover:bg-emerald-900 text-amber-300 font-bold rounded-xl border border-amber-400/30 transition flex items-center gap-2 text-xs shadow"
            >
              <Tractor className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'किसान डेस्क देखें' : 'Farmer Desk Board'}</span>
            </Link>

            <button
              onClick={() => setShowAddReqModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition flex items-center gap-2 text-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'hi' ? 'थोक आवश्यकता प्रस्ताव भेजें' : 'Post Bulk Demand Request'}</span>
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-emerald-700">
            <span className="text-xs font-bold text-emerald-800">{t.buyerStatTotalPurchase}</span>
            <div className="text-2xl font-extrabold text-emerald-950">₹63,900.00</div>
            <span className="text-[11px] text-emerald-700 font-bold">{t.buyerStatMandiSavings}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-amber-600">
            <span className="text-xs font-bold text-emerald-800">{t.buyerStatActiveOrders}</span>
            <div className="text-2xl font-extrabold text-amber-800">{buyerOrders.length} {language === 'hi' ? 'ऑर्डर' : 'Orders'}</div>
            <span className="text-[11px] text-amber-700 font-medium">{t.buyerStatGPSLogistics}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-purple-600">
            <span className="text-xs font-bold text-emerald-800">{language === 'hi' ? 'सीधे किसान लॉट्स' : 'Direct Farmer Lots'}</span>
            <div className="text-2xl font-extrabold text-purple-900">{farmerProduce.length} {language === 'hi' ? 'ताज़ा लॉट' : 'Fresh Lots'}</div>
            <span className="text-[11px] text-purple-700 font-medium">{language === 'hi' ? 'किसान डेस्क से लाइव' : 'Live from Farmer Desk'}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-blue-600">
            <span className="text-xs font-bold text-emerald-800">{t.buyerStatRecurringContracts}</span>
            <div className="text-2xl font-extrabold text-blue-700">2 {language === 'hi' ? 'अनुबंध' : 'Contracts'}</div>
            <span className="text-[11px] text-blue-600 font-medium">{t.buyerStatFPOGuarantee}</span>
          </div>
        </div>

        {/* ===================================================
            DIRECT FARMER PRODUCE PROCUREMENT BOARD (BULMA CARDS)
            =================================================== */}
        <div className="space-y-6" id="buyer-produce-board">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-900 text-amber-300 font-extrabold text-[11px] rounded-full">
                  {language === 'hi' ? 'किसान डेस्क से सीधा संकलन' : 'Direct from Farmer Desk'}
                </span>
                <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'hi' ? '2-6 फोटो सत्यापित' : '2-6 Photos Verified'}</span>
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-emerald-950 mt-1">
                {language === 'hi' ? 'ताज़ा कृषि उत्पाद बोर्ड' : 'Live Produce Procurement Board'}
              </h2>
              <p className="text-xs text-emerald-800/70">
                {language === 'hi'
                  ? 'आपकी फसल सफलतापूर्वक आपकी फसल सूची में जोड़ दी गई है और अब यह प्लेटफ़ॉर्म पर उपलब्ध है।'
                  : 'Your crop has been added successfully to your crop list and is now available on the platform.'}
              </p>
            </div>

            {/* Total Results Count & Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Category Dropdown List: Vegetables, Fruits, Pulses, Grains */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3.5 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm cursor-pointer hover:border-emerald-800 transition"
                >
                  <option value="All">{language === 'hi' ? '🌐 सभी श्रेणियां' : '🌐 All Categories'}</option>
                  <option value="Vegetables">{language === 'hi' ? '🥦 सब्जियाँ (Vegetables)' : '🥦 Vegetables'}</option>
                  <option value="Fruits">{language === 'hi' ? '🍎 फल (Fruits)' : '🍎 Fruits'}</option>
                  <option value="Pulses">{language === 'hi' ? '🫘 दालें / दलहन (Pulses)' : '🫘 Pulses'}</option>
                  <option value="Grains">{language === 'hi' ? '🌾 अनाज (Grains)' : '🌾 Grains'}</option>
                </select>
              </div>

              <span className="text-xs font-bold text-emerald-900 bg-white px-3 py-2 rounded-xl border border-emerald-900/15 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                <Tractor className="w-4 h-4 text-amber-600" />
                <span>
                  {filteredProduce.length} {language === 'hi' ? 'किसान फसलें' : 'Farmer Crop(s)'}
                </span>
              </span>

              {/* Real-time Search Box */}
              <div className="relative min-w-[180px] sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-emerald-800/50" />
                <input
                  type="text"
                  placeholder={
                    language === 'hi'
                      ? 'किसान फसल खोजें...'
                      : 'Search farmer produce...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2 text-xs text-emerald-800 hover:text-emerald-950"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Produce Cards Grid: ONLY Farmer-Inserted Crops (Bulma Responsive Cards) */}
          {loadingProduce ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-white/70 animate-pulse rounded-3xl border border-emerald-900/10 shadow-sm"
                />
              ))}
            </div>
          ) : filteredProduce.length === 0 ? (
            <div className="py-16 px-4 text-center bg-white/80 rounded-3xl border-2 border-dashed border-emerald-900/15 space-y-4">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center">
                <Tractor className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-emerald-950">
                  {language === 'hi'
                    ? 'वर्तमान में किसान द्वारा कोई फसल उपलब्ध नहीं है'
                    : 'No Farmer Produce Currently Listed'}
                </h3>
                <p className="text-xs text-emerald-800/70 max-w-md mx-auto mt-1">
                  {language === 'hi'
                    ? 'पंजीकृत किसान अपने किसान पोर्टल (Farmer Desk) में जाकर 2 से 6 तस्वीरों के साथ अपनी ताज़ा फसलें दर्ज करेंगे, वह सीधे यहाँ खरीदार बोर्ड पर दिखाई देंगी।'
                    : 'When registered farmers list their fresh harvest with 2 to 6 photos on the Farmer Desk, it will appear directly here on the Buyer Desk.'}
                </p>
              </div>
              <Link
                href="/farmer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-xs shadow-md transition"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>{language === 'hi' ? 'किसान डेस्क पर फसल दर्ज करें' : 'Go to Farmer Desk to Insert Crop'}</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProduce.map((crop) => (
                <BulmaProductCard
                  key={crop.id}
                  id={crop.id}
                  crop_name={crop.crop_name}
                  crop_name_hi={crop.crop_name_hi}
                  category={crop.category}
                  variety={crop.variety}
                  quantity_kg={crop.quantity_kg}
                  price_paise_per_kg={crop.price_paise_per_kg}
                  quality_grade={crop.quality_grade}
                  cv_trust_score={crop.cv_trust_score}
                  harvest_date={crop.harvest_date}
                  is_organic={crop.is_organic}
                  farmer_name={crop.farmer_name}
                  location={crop.location}
                  images={crop.images}
                  unit={crop.unit}
                  description={crop.description}
                  badge={crop.isDirectFromFarmer ? (language === 'hi' ? 'किसान डेस्क से' : 'Farmer Direct') : undefined}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Active Orders & Recurring Contracts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {/* Active Orders */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <span>{t.buyerActiveOrdersHeader}</span>
            </h2>

            <div className="space-y-4">
              {buyerOrders.map((ord) => (
                <div key={ord.id} className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-800">
                      {language === 'hi' ? 'ऑर्डर #' : 'Order #'}{ord.id}
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 bg-emerald-900 text-amber-200 font-bold rounded-full">
                      {ord.status === 'परिवहन में'
                        ? (language === 'hi' ? 'परिवहन में' : 'In Transit')
                        : (language === 'hi' ? 'सफलतापूर्वक हस्तांतरित' : 'Successfully Delivered')}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-emerald-950">
                    {language === 'hi' ? 'किसान: ' : 'Farmer: '}{getLocalizedFarmer(ord.farmer_name, language)}
                  </h3>
                  <p className="text-xs text-emerald-800/80 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>
                      {ord.delivery_address === 'नासिक हब से पुणे प्रेषित'
                        ? (language === 'hi' ? 'नासिक हब से पुणे प्रेषित' : 'Dispatched from Nashik Hub to Pune')
                        : (language === 'hi' ? 'इन्दौर हब से सीधा पिकअप' : 'Direct Pickup from Indore Hub')}
                    </span>
                  </p>

                  <div className="pt-3 border-t border-emerald-900/10 flex items-center justify-between">
                    <div className="text-base font-extrabold text-amber-800">
                      ₹{(ord.total_amount_paise / 100).toFixed(2)}{' '}
                      <span className="text-[10px] text-emerald-700 font-normal">
                        ({ord.total_amount_paise} {t.paiseSuffix})
                      </span>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      {language === 'hi' ? 'GPS लाइव ट्रैकिंग' : 'GPS Live Tracking'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recurring Contracts */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>{t.buyerRecurringContractsHeader}</span>
            </h2>

            <div className="space-y-4">
              <div className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-emerald-950">
                    {language === 'hi' ? 'साप्ताहिक टमाटर आपूर्ति अनुबंध' : 'Weekly Fresh Tomato Supply Contract'}
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                    {language === 'hi' ? 'सक्रिय' : 'Active'}
                  </span>
                </div>
                <p className="text-xs text-emerald-800/80">
                  {language === 'hi'
                    ? '100 किग्रा ताज़ा टमाटर प्रत्येक सोमवार और गुरुवार नासिक FPO हब से सीधा वितरण।'
                    : '100 kg Fresh Tomatoes dispatched every Monday & Thursday directly from Nashik FPO Hub.'}
                </p>
                <button className="w-full py-2 bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-950 font-bold rounded-xl text-xs transition">
                  {language === 'hi' ? 'अनुबंध की शर्तें देखें (एस्क्रौ सुरक्षा)' : 'View Contract Terms (Escrow Protection)'}
                </button>
              </div>

              <div className="glass-card p-5 rounded-2xl space-y-3 border border-emerald-900/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-emerald-950">
                    {language === 'hi' ? 'मासिक शरबाती गेहूं आपूर्ति अनुबंध' : 'Monthly Sharbati Wheat Supply Contract'}
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full">
                    {language === 'hi' ? 'नवीनीकरण हेतु तैयार' : 'Ready for Renewal'}
                  </span>
                </div>
                <p className="text-xs text-emerald-800/80">
                  {language === 'hi'
                    ? '500 किग्रा शरबाती गेहूं उज्जैन साइलो हब से प्रत्यक्ष मासिक प्रेषण।'
                    : '500 kg Sharbati Wheat monthly dispatch directly from Ujjain Silo Hub.'}
                </p>
                <button className="w-full py-2 bg-[#0F3826] text-amber-50 hover:bg-emerald-900 font-bold rounded-xl text-xs shadow transition">
                  {language === 'hi' ? 'अनुबंध नवीनीकृत करें' : 'Renew Contract'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Posting Bulk Requirement */}
        {showAddReqModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-emerald-900/20 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                <h3 className="font-extrabold text-lg text-emerald-950">
                  {language === 'hi' ? 'थोक आवश्यकता प्रस्ताव भेजें' : 'Post Bulk Demand Requirement'}
                </h3>
                <button
                  onClick={() => setShowAddReqModal(false)}
                  className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePostRequirement} className="space-y-4">
                {/* Buyer Name & Contact Input Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/90 p-3 rounded-2xl border border-amber-200/80 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-700" />
                      <span>{language === 'hi' ? 'नाम (Name)' : 'Name'}</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder={language === 'hi' ? 'उदा. रमेश ट्रेडिंग / नाम' : 'e.g. Ramesh Traders / Name'}
                      className="w-full px-3.5 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{language === 'hi' ? 'संपर्क (Contact)' : 'Contact'}</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyerContact}
                      onChange={(e) => setBuyerContact(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    {language === 'hi' ? 'फसल का नाम' : 'Crop Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      {language === 'hi' ? 'आवश्यक मात्रा (किग्रा)' : 'Required Quantity (kg)'}
                    </label>
                    <input
                      type="number"
                      required
                      value={requiredQty}
                      onChange={(e) => setRequiredQty(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      {language === 'hi' ? 'अधिकतम दर (₹/किग्रा)' : 'Max Price Rate (₹/kg)'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={maxPriceRs}
                      onChange={(e) => setMaxPriceRs(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    {language === 'hi' ? 'डिलीवरी स्थान / हब' : 'Delivery Location / Hub'}
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryLoc}
                    onChange={(e) => setDeliveryLoc(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddReqModal(false)}
                    className="flex-1 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition"
                  >
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-extrabold rounded-xl text-xs shadow-md transition"
                  >
                    {language === 'hi' ? 'प्रस्ताव सबमिट करें' : 'Submit Requirement'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Signal Toast */}
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
      </div>
    </PortalGuard>
  );
}
