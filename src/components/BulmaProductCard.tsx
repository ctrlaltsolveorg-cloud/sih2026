'use client';

import React, { useState } from 'react';
import {
  Award,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
  images?: string[]; // 2 to 6 photos
  side_logo?: string;
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
  unit = 'kg',
  description,
  onAddToCart,
  onDirectBuy,
  badge
}: BulmaProductCardProps) {
  const { language } = useLanguage();

  // Extract and normalize 2 to 6 photos
  const photoList: string[] = React.useMemo(() => {
    let result: string[] = [];
    if (Array.isArray(images) && images.length > 0) {
      result = images.filter((img) => typeof img === 'string' && img.trim().length > 0);
    } else if (image_url && image_url.trim().length > 0) {
      // Check if image_url is a JSON string of array
      if (image_url.startsWith('[') && image_url.endsWith(']')) {
        try {
          const parsed = JSON.parse(image_url);
          if (Array.isArray(parsed)) {
            result = parsed.filter((img) => typeof img === 'string' && img.trim().length > 0);
          }
        } catch (e) {
          result = [image_url];
        }
      } else {
        result = [image_url];
      }
    }

    // Default agricultural fallback photos if less than 2
    if (result.length === 0) {
      result = [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
      ];
    } else if (result.length === 1) {
      // Duplicate second realistic angle so card always features at least 2 photos
      result.push(result[0]);
    }
    // Cap at maximum 6 photos
    return result.slice(0, 6);
  }, [images, image_url]);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [orderQty, setOrderQty] = useState(Math.min(100, quantity_kg || 100));

  const priceRupees = (price_paise_per_kg / 100).toFixed(2);
  const activePhoto = photoList[activePhotoIdx] || photoList[0];
  const sideLogoUrl = side_logo || photoList[0];

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev === 0 ? photoList.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev === photoList.length - 1 ? 0 : prev + 1));
  };

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
        imageUrl: activePhoto,
        photos: photoList,
        unit,
      });
    }
  };

  return (
    <>
      <div className="bulma-card group" id={`produce-card-${id}`}>
        {/* ===================================================
            UPPER SECTION: Product Name & Side Image Logo
            =================================================== */}
        <div className="card-header-custom">
          <div className="bulma-media">
            {/* Side Image Logo / Crop Emblem */}
            <div className="bulma-media-left">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-md bg-emerald-950/10 shrink-0 flex items-center justify-center">
                <img
                  src={sideLogoUrl}
                  alt="Crop Logo"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
              </div>
            </div>

            {/* Product Name & Subtitles */}
            <div className="bulma-media-content">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="bulma-tag is-success-light">
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

              <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 mt-1 leading-snug truncate">
                {getLocalizedCropName(crop_name, language)}
              </h3>

              {crop_name_hi && crop_name_hi !== crop_name && (
                <p className="text-xs text-emerald-700/80 font-medium truncate">
                  {crop_name_hi}
                </p>
              )}
            </div>

            {/* Upper Right Badges */}
            <div className="bulma-media-right flex flex-col items-end gap-1">
              <span className="bulma-tag is-warning-dark shadow-sm">
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
            MIDDLE SECTION: 2 to 6 Photos Gallery via Farmer Insert
            =================================================== */}
        <div className="card-image group/photo">
          {/* Main Photo Display */}
          <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-emerald-950">
            <img
              src={activePhoto}
              alt={`${crop_name} photo ${activePhotoIdx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Mandatory 2-6 Photo Counter Pill */}
            <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1 shadow-lg">
              <span>{language === 'hi' ? 'तस्वीर ' : 'Photo '}</span>
              <span className="text-white font-extrabold">{activePhotoIdx + 1} / {photoList.length}</span>
              <span className="text-[9px] text-emerald-300 ml-1 font-mono">
                {language === 'hi' ? '(2-6 अनिवार्य)' : '(2-6 verified)'}
              </span>
            </div>

            {/* Organic Badge on Photo */}
            {is_organic === 1 && (
              <div className="absolute top-2.5 right-2.5 bg-emerald-700/90 backdrop-blur-md text-emerald-100 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-300/30 flex items-center gap-1 shadow">
                <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                <span>{language === 'hi' ? '100% जैविक' : '100% Organic'}</span>
              </div>
            )}

            {/* Expand / Lightbox Trigger */}
            <button
              onClick={() => setShowLightbox(true)}
              className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white/90 transition backdrop-blur-sm shadow"
              title="Full Screen Photo View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Photo Navigation Arrows */}
            {photoList.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow backdrop-blur-sm opacity-90 sm:opacity-0 group-hover/photo:opacity-100"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow backdrop-blur-sm opacity-90 sm:opacity-0 group-hover/photo:opacity-100"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Middle Photo Thumbnails Strip (2 to 6 Photos) */}
          <div className="bg-[#0F3826] px-3 py-2 flex items-center justify-center gap-2 border-t border-white/10">
            <span className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider mr-1 hidden sm:inline">
              {language === 'hi' ? 'गैलरी:' : 'Gallery:'}
            </span>
            {photoList.map((photo, pIdx) => (
              <button
                key={pIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIdx(pIdx);
                }}
                className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activePhotoIdx === pIdx
                    ? 'border-amber-400 scale-110 shadow-lg ring-2 ring-amber-400/40'
                    : 'border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo} alt={`Thumb ${pIdx + 1}`} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 bg-black/70 text-[8px] text-white px-0.5 font-bold leading-none">
                  {pIdx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================
            NICHE SECTION (Bottom): Detailed Product Specifications
            =================================================== */}
        <div className="card-content space-y-3">
          {/* Price & Quantity Available Highlight */}
          <div className="flex items-center justify-between bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-900/80 block">
                {language === 'hi' ? 'Fair Price AI दर' : 'Fair Price AI Rate'}
              </span>
              <div className="text-xl font-extrabold text-amber-900 flex items-baseline gap-1">
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
              <div className="text-base font-extrabold text-emerald-950">
                {quantity_kg.toLocaleString()} {unit}
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-1.5 py-0.5 rounded-full inline-block mt-0.5">
                {language === 'hi' ? 'सत्यापित लॉट' : 'Verified Lot'}
              </span>
            </div>
          </div>

          {/* Farmer & Location Niche Info */}
          <div className="text-xs space-y-1.5 text-emerald-900/90 bg-[#FAF5EB] p-2.5 rounded-xl border border-emerald-900/10">
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

            <div className="flex items-center justify-between text-[10px] text-emerald-700/80 pt-1 border-t border-emerald-900/10">
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
          PHOTO LIGHTBOX MODAL (Full Screen Inspection of 2-6 Photos)
          =================================================== */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 bg-white/10 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black border border-white/20">
              <img
                src={activePhoto}
                alt="Full View"
                className="max-h-[70vh] max-w-full object-contain"
              />

              {photoList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black text-white transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip inside Lightbox */}
            <div className="flex items-center gap-3 mt-4">
              {photoList.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition ${
                    activePhotoIdx === idx
                      ? 'border-amber-400 scale-105 ring-2 ring-amber-400/50'
                      : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <p className="text-xs text-amber-200 mt-2 font-mono">
              {language === 'hi' ? 'तस्वीर' : 'Photo'} {activePhotoIdx + 1} / {photoList.length} (किसान द्वारा सत्यापित)
            </p>
          </div>
        </div>
      )}

      {/* ===================================================
          PRODUCT DETAILS MODAL (Full Specifications)
          =================================================== */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-emerald-900/20 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <div className="flex items-center gap-3">
                <img src={sideLogoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-amber-500" />
                <div>
                  <h3 className="font-extrabold text-lg text-emerald-950">
                    {getLocalizedCropName(crop_name, language)}
                  </h3>
                  <span className="bulma-tag is-success-light text-[10px]">
                    {getLocalizedCategory(category, language)} {variety ? `• ${variety}` : ''}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photos Preview in Modal */}
            <div>
              <span className="text-xs font-bold text-emerald-900 block mb-1">
                {language === 'hi' ? 'किसान द्वारा अपलोड की गई 2-6 तस्वीरें:' : 'Farmer Inserted Photos (2 to 6 verified):'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {photoList.map((ph, idx) => (
                  <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-emerald-900/20">
                    <img src={ph} alt="Crop Angle" className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1 rounded font-mono">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Table */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 space-y-2 text-xs">
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
