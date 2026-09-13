'use client';

import React, { useState } from 'react';
import {
  Award,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Info,
  Calendar,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCategory, getLocalizedCropName, getLocalizedGrade, getLocalizedLocation, getLocalizedFarmer } from '@/lib/i18n';

export interface BulmaProductCardProps {
  id: string | number;
  crop_name: string;
  crop_name_hi?: string;
  category: string;
  variety?: string;
  quantity_kg?: number;
  price_paise_per_kg: number;
  quality_grade?: string;
  cv_trust_score?: number;
  harvest_date?: string;
  is_organic?: number;
  farmer_name?: string;
  location?: string;
  hub_location?: string;
  image_url?: string;
  images?: string[];
  side_logo?: string;
  logo_url?: string;
  logo?: any;
  unit?: string;
  description?: string;
  onAddToCart?: (item: any) => void;
  onDirectBuy?: (item: any) => void;
  badge?: string;
}

export default function BulmaProductCard({
  id,
  crop_name,
  crop_name_hi,
  category,
  variety,
  quantity_kg = 500,
  price_paise_per_kg,
  quality_grade = 'उच्चतम श्रेणी A+',
  cv_trust_score = 96,
  harvest_date = '2026-09-08',
  is_organic = 0,
  farmer_name = 'किसान (Farmer)',
  location = 'नासिक मंडी संकलन हब',
  hub_location,
  image_url,
  images,
  side_logo,
  logo_url,
  logo,
  unit = 'kg',
  description,
  onAddToCart,
  onDirectBuy,
  badge
}: BulmaProductCardProps) {
  const { language } = useLanguage();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [orderQty, setOrderQty] = useState(Math.min(100, quantity_kg || 100));

  const priceRupees = (price_paise_per_kg / 100).toFixed(2);

  // Parse photos and logos
  let photoList: string[] = [];
  if (Array.isArray(images) && images.length > 0) {
    photoList = images.filter((img) => typeof img === 'string' && img.trim().length > 0);
  } else if (image_url) {
    if (typeof image_url === 'string' && image_url.startsWith('[') && image_url.endsWith(']')) {
      try {
        photoList = JSON.parse(image_url);
      } catch (e) {
        photoList = [image_url];
      }
    } else {
      photoList = [image_url];
    }
  }

  const effectiveLogo = logo_url || logo?.url || side_logo || (photoList.length > 0 ? photoList[0] : null);
  const primaryPhoto = photoList.length > 0 ? photoList[0] : effectiveLogo;
  const [activePhoto, setActivePhoto] = useState<string | null>(primaryPhoto);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        listingId: id,
        cropName: crop_name,
        pricePaisePerKg: price_paise_per_kg,
        quantityKg: orderQty,
        grade: quality_grade,
        farmerName: farmer_name,
        location: location,
        unit,
        imageUrl: primaryPhoto,
      });
    }
  };

  return (
    <>
      <div className="bulma-card group flex flex-col justify-between overflow-hidden" id={`produce-card-${id}`}>
        {/* ===================================================
            CARD HEADER: Product Logo, Name & Category / Grade
            =================================================== */}
        <div className="card-header-custom pb-2">
          <div className="bulma-media items-start">
            {/* Dedicated Product Logo Emblem */}
            {effectiveLogo && (
              <div className="bulma-media-left mr-3 shrink-0">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-emerald-800/15 shadow-sm bg-white p-0.5 group-hover:border-emerald-600 transition-all">
                  <img
                    src={effectiveLogo}
                    alt={`${crop_name} logo`}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Product Name & Badges */}
            <div className="bulma-media-content min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="bulma-tag is-success-light text-[10px]">
                  {getLocalizedCategory(category, language)}
                </span>
                {variety && (
                  <span className="text-[10px] text-emerald-800/80 font-mono bg-amber-50/80 border border-amber-200 px-1.5 py-0.5 rounded">
                    {variety}
                  </span>
                )}
                {badge && (
                  <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded">
                    {badge}
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-lg text-emerald-950 leading-snug truncate">
                {getLocalizedCropName(crop_name, language)}
              </h3>

              {crop_name_hi && crop_name_hi !== crop_name && (
                <p className="text-xs text-emerald-700/80 font-medium truncate mt-0.5">
                  {crop_name_hi}
                </p>
              )}
            </div>

            {/* Upper Right Badges */}
            <div className="bulma-media-right flex flex-col items-end gap-1 shrink-0">
              <span className="bulma-tag is-warning-dark shadow-sm text-[10px]">
                <Award className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{getLocalizedGrade(quality_grade, language)}</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                <span>CV {cv_trust_score}%</span>
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            PRODUCT IMAGE BANNER: High Quality Photo Showcase
            =================================================== */}
        {primaryPhoto && (
          <div className="relative w-full h-40 bg-emerald-950/5 overflow-hidden border-y border-emerald-900/10">
            <img
              src={primaryPhoto}
              alt={crop_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 flex gap-1.5 z-10">
              {is_organic === 1 && (
                <span className="bg-emerald-900/85 backdrop-blur-sm text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{language === 'hi' ? '100% जैविक' : '100% Organic'}</span>
                </span>
              )}
              {photoList.length > 1 && (
                <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <span>📷 {photoList.length} Photos</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* ===================================================
            CARD CONTENT: Detailed Product Specifications
            =================================================== */}
        <div className="card-content space-y-3">
          {/* Price & Quantity Available Highlight */}
          <div className="flex items-center justify-between bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-900/80 block">
                {language === 'hi' ? 'Fair Price AI दर' : 'Fair Price AI Rate'}
              </span>
              <div className="text-2xl font-extrabold text-amber-900 flex items-baseline gap-1">
                <span>₹{priceRupees}</span>
                <span className="text-xs font-semibold text-emerald-950">/ {unit}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 block">
                ({price_paise_per_kg} {language === 'hi' ? 'पैसे' : 'paise'})
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-900/80 block">
                {language === 'hi' ? 'उपलब्ध स्टॉक' : 'Stock Ready'}
              </span>
              <div className="text-lg font-extrabold text-emerald-950">
                {quantity_kg.toLocaleString()} {unit}
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded-full inline-block mt-0.5">
                {language === 'hi' ? 'सत्यापित लॉट' : 'Verified Lot'}
              </span>
            </div>
          </div>

          {/* Farmer & Location Niche Info */}
          <div className="text-xs space-y-2 text-emerald-900/90 bg-[#FAF5EB] p-3 rounded-xl border border-emerald-900/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-bold truncate">
                  {getLocalizedFarmer(farmer_name, language)}
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase bg-emerald-200/60 px-1.5 py-0.5 rounded">
                {language === 'hi' ? 'किसान' : 'Farmer'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-800/80 text-[11px] truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{getLocalizedLocation(location, language)}</span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-emerald-700/80 pt-1.5 border-t border-emerald-900/10">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-600" />
                <span>{language === 'hi' ? 'कटाई:' : 'Harvest:'} {harvest_date}</span>
              </span>
              <button
                onClick={() => setShowDetailsModal(true)}
                className="text-amber-800 hover:text-amber-900 font-bold underline flex items-center gap-0.5"
              >
                <Info className="w-3 h-3" />
                <span>{language === 'hi' ? 'सम्पूर्ण विवरण' : 'Full Specs'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
            CARD FOOTER: Quantity Selector & Action Buttons
            =================================================== */}
        <div className="card-footer flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Quick Quantity Counter */}
          <div className="flex items-center justify-between sm:justify-start gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-emerald-900/15">
            <span className="text-[11px] font-bold text-emerald-900">
              {language === 'hi' ? 'मात्रा:' : 'Qty:'}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setOrderQty((q) => Math.max(10, q - 10))}
                className="w-6 h-6 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs flex items-center justify-center transition"
              >
                -
              </button>
              <input
                type="number"
                value={orderQty}
                onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center text-xs font-bold text-emerald-950 focus:outline-none border-b border-emerald-900/30"
              />
              <span className="text-[10px] text-emerald-800 font-semibold">{unit}</span>
              <button
                type="button"
                onClick={() => setOrderQty((q) => Math.min(quantity_kg, q + 10))}
                className="w-6 h-6 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs flex items-center justify-center transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Button: Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 px-4 py-2.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>{language === 'hi' ? 'खरीदें / कार्ट में जोड़ें' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>

      {/* ===================================================
          PRODUCT DETAILS MODAL (Full Specifications)
          =================================================== */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-emerald-900/20 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <div className="flex items-center gap-3">
                {effectiveLogo && (
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-emerald-800/20 shadow-sm bg-white p-0.5 shrink-0">
                    <img src={effectiveLogo} alt={crop_name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                )}
                <div>
                  <h3 className="font-extrabold text-xl text-emerald-950">
                    {getLocalizedCropName(crop_name, language)}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bulma-tag is-success-light text-[10px]">
                      {getLocalizedCategory(category, language)} {variety ? `• ${variety}` : ''}
                    </span>
                    {is_organic === 1 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {language === 'hi' ? '100% जैविक' : '100% Organic'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Gallery */}
            {photoList.length > 0 && (
              <div className="space-y-2">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-emerald-900/15 shadow-inner">
                  <img
                    src={activePhoto || primaryPhoto || effectiveLogo || ''}
                    alt={crop_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {photoList.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {photoList.map((photo, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActivePhoto(photo)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                          (activePhoto || primaryPhoto) === photo
                            ? 'border-emerald-700 ring-2 ring-emerald-500/30 shadow-sm scale-105'
                            : 'border-emerald-900/20 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Details Table */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-emerald-900/5">
                <span className="text-emerald-800/80">{language === 'hi' ? 'मूल्य दर:' : 'Rate:'}</span>
                <span className="font-bold text-amber-900">₹{priceRupees} / {unit}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/5">
                <span className="text-emerald-800/80">{language === 'hi' ? 'उपलब्ध मात्रा:' : 'Available Stock:'}</span>
                <span className="font-bold text-emerald-950">{quantity_kg} {unit}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/5">
                <span className="text-emerald-800/80">{language === 'hi' ? 'गुणवत्ता ग्रेड:' : 'Grade:'}</span>
                <span className="font-bold text-emerald-950">{quality_grade}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/5">
                <span className="text-emerald-800/80">{language === 'hi' ? 'CV विश्वासांक:' : 'CV Confidence:'}</span>
                <span className="font-bold text-emerald-700">{cv_trust_score}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/5">
                <span className="text-emerald-800/80">{language === 'hi' ? 'उत्पादक किसान:' : 'Farmer:'}</span>
                <span className="font-bold text-emerald-950">{farmer_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-900/5">
                <span className="text-emerald-800/80">{language === 'hi' ? 'मंडी / संकलन केंद्र:' : 'Hub Location:'}</span>
                <span className="font-bold text-emerald-950">{location}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-emerald-800/80">{language === 'hi' ? 'कटाई तिथि:' : 'Harvest Date:'}</span>
                <span className="font-bold text-emerald-950">{harvest_date}</span>
              </div>
            </div>

            {description && (
              <p className="text-xs text-emerald-800/90 italic bg-emerald-50/50 p-3 rounded-xl border border-emerald-900/5">
                {description}
              </p>
            )}

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  handleAddToCart();
                  setShowDetailsModal(false);
                }}
                className="flex-1 py-3 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>{language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
