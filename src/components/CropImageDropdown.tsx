'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  Check,
  Sparkles,
  Layers,
  Image as ImageIcon,
  X,
  Edit3
} from 'lucide-react';
import {
  CatalogCropItem,
  FULL_CROP_CATALOG,
  VEGETABLES_CATALOG,
  FRUITS_CATALOG,
  PULSES_CATALOG,
  GRAINS_CATALOG,
  CATALOG_STATS
} from '@/lib/cropCatalogData';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCropName, getLocalizedCategory } from '@/lib/i18n';

interface CropImageDropdownProps {
  selectedId: string;
  onSelectCrop: (crop: CatalogCropItem) => void;
  onEditCrop?: (crop: CatalogCropItem) => void;
  customCrops?: CatalogCropItem[];
  className?: string;
}

export default function CropImageDropdown({
  selectedId,
  onSelectCrop,
  onEditCrop,
  customCrops = [],
  className = ''
}: CropImageDropdownProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Vegetables' | 'Fruits' | 'Pulses' | 'Grains' | 'Custom'>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Combined catalog: custom unlisted crops first, followed by full 352 catalog
  const allPool = useMemo(() => {
    return [...customCrops, ...FULL_CROP_CATALOG];
  }, [customCrops]);

  // Find currently selected item
  const selectedCrop = useMemo(() => {
    return allPool.find((item) => item.id === selectedId) || allPool[0] || FULL_CROP_CATALOG[0];
  }, [selectedId, allPool]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input on open
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter items by category and search query
  const filteredList = useMemo(() => {
    let pool = allPool;
    if (activeCategory === 'Custom') {
      pool = customCrops;
    } else if (activeCategory !== 'All') {
      pool = pool.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      pool = pool.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.nameHi.includes(q) ||
          item.variety.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    return pool;
  }, [activeCategory, searchQuery, allPool, customCrops]);

  const handleSelect = (crop: CatalogCropItem) => {
    onSelectCrop(crop);
    setIsOpen(false);
  };

  const categoryEmoji: Record<string, string> = {
    Vegetables: '🥦',
    Fruits: '🍎',
    Pulses: '🫘',
    Grains: '🌾',
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* =========================================================
          TRIGGER BUTTON: Displays Selected Crop with Rich Image & Logo
          ========================================================= */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-white hover:bg-amber-50/40 border-2 border-emerald-900/20 hover:border-amber-500 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-md transition-all duration-200 text-left focus:outline-none focus:ring-4 focus:ring-amber-400/20 group"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Crop Image Thumbnail */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-sm shrink-0 bg-emerald-950/10">
            <img
              src={selectedCrop.sideLogo || selectedCrop.thumbnail || selectedCrop.photos[0]}
              alt={selectedCrop.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <span className="absolute bottom-1 right-1 text-[10px] leading-none bg-black/60 backdrop-blur-xs text-white px-1 py-0.5 rounded font-mono font-bold">
              {selectedCrop.photos.length}📷
            </span>
          </div>

          {/* Crop Details */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {(selectedCrop.isCustom || selectedCrop.id.startsWith('custom_')) && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-emerald-950 shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-950" />
                  <span>{language === 'hi' ? 'अनलिस्टेड (352 में नहीं)' : 'Unlisted (Not in 352)'}</span>
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-900 text-amber-200 uppercase tracking-wide">
                {categoryEmoji[selectedCrop.category] || '🌱'} {getLocalizedCategory(selectedCrop.category, language)}
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                {selectedCrop.variety}
              </span>
              {selectedCrop.isOrganic === 1 && (
                <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                  100% {language === 'hi' ? 'जैविक' : 'Organic'}
                </span>
              )}
            </div>

            <h4 className="font-black text-sm sm:text-base text-emerald-950 truncate mt-0.5">
              {selectedCrop.nameHi} <span className="text-emerald-800/80 font-bold text-xs sm:text-sm">({selectedCrop.name})</span>
            </h4>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mt-0.5">
              <span className="text-amber-800 font-extrabold">₹{selectedCrop.priceRupees}/{selectedCrop.unit}</span>
              <span className="text-emerald-900/30">•</span>
              <span className="text-[11px] text-emerald-700 font-semibold">{selectedCrop.grade}</span>
            </div>
          </div>
        </div>

        {/* Action Button & Chevron */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
            <span>{language === 'hi' ? 'फसल बदलें' : 'Change Crop'}</span>
          </span>
          <div className={`p-1.5 rounded-lg bg-emerald-900/5 text-emerald-900 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-amber-500 text-emerald-950' : ''}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* =========================================================
          DROPDOWN POPUP MENU WITH LIVE IMAGE LIST
          ========================================================= */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-emerald-900/20 overflow-hidden animate-fadeIn">
          {/* Header with Search & Category Tabs */}
          <div className="p-3 bg-gradient-to-b from-[#0F3826] to-emerald-900 text-white space-y-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-amber-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? '352 फसलों में खोजें (उदा. टमाटर, आम, चना, गेहूं, मिर्च...)'
                    : 'Search 352+ crops by name or variety (e.g. Tomato, Mango, Chana, Sharbati...)'
                }
                className="w-full pl-9 pr-8 py-2 bg-emerald-950/90 text-white placeholder-emerald-300/60 rounded-xl text-xs font-bold border border-amber-400/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-emerald-300 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Tabs with Item Counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-extrabold">
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'All'
                    ? 'bg-amber-400 text-emerald-950 shadow'
                    : 'bg-emerald-950/60 hover:bg-emerald-800 text-emerald-100'
                }`}
              >
                🌐 {language === 'hi' ? 'सभी' : 'All'} ({CATALOG_STATS.totalCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('Vegetables')}
                className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'Vegetables'
                    ? 'bg-amber-400 text-emerald-950 shadow'
                    : 'bg-emerald-950/60 hover:bg-emerald-800 text-emerald-100'
                }`}
              >
                🥦 {language === 'hi' ? 'सब्जियाँ' : 'Vegetables'} (100)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('Fruits')}
                className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'Fruits'
                    ? 'bg-amber-400 text-emerald-950 shadow'
                    : 'bg-emerald-950/60 hover:bg-emerald-800 text-emerald-100'
                }`}
              >
                🍎 {language === 'hi' ? 'फल' : 'Fruits'} (100)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('Pulses')}
                className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'Pulses'
                    ? 'bg-amber-400 text-emerald-950 shadow'
                    : 'bg-emerald-950/60 hover:bg-emerald-800 text-emerald-100'
                }`}
              >
                🫘 {language === 'hi' ? 'दालें' : 'Pulses'} (100)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('Grains')}
                className={`px-3 py-1 rounded-lg transition whitespace-nowrap ${
                  activeCategory === 'Grains'
                    ? 'bg-amber-400 text-emerald-950 shadow'
                    : 'bg-emerald-950/60 hover:bg-emerald-800 text-emerald-100'
                }`}
              >
                🌾 {language === 'hi' ? 'अनाज' : 'Grains'} (52)
              </button>
              {customCrops && customCrops.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('Custom')}
                  className={`px-3 py-1 rounded-lg transition whitespace-nowrap flex items-center gap-1 ${
                    activeCategory === 'Custom'
                      ? 'bg-amber-400 text-emerald-950 shadow font-black'
                      : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{language === 'hi' ? 'मेरी अनलिस्टेड' : 'My Unlisted'} ({customCrops.length})</span>
                </button>
              )}
            </div>
          </div>


          {/* Scrollable List of Crop Items with Images */}
          <div className="max-h-80 sm:max-h-96 overflow-y-auto divide-y divide-emerald-900/10 p-2 scrollbar-thin">
            {filteredList.length === 0 ? (
              <div className="text-center py-8 text-xs text-emerald-800">
                <ImageIcon className="w-8 h-8 mx-auto text-emerald-400 mb-1 opacity-60" />
                <p className="font-bold">{language === 'hi' ? 'कोई फसल नहीं मिली' : 'No crops found matching your search'}</p>
                <p className="text-[11px] text-emerald-600 mt-0.5">
                  {language === 'hi' ? 'कृपया अलग नाम खोजें' : 'Try searching for Tomato, Mango, Chana, or Wheat'}
                </p>
              </div>
            ) : (
              filteredList.map((crop) => {
                const isSelected = crop.id === selectedId;
                const cropImg = crop.sideLogo || crop.thumbnail || crop.photos[0];

                return (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => handleSelect(crop)}
                    className={`w-full p-2.5 sm:p-3 rounded-xl text-left flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? 'bg-emerald-900 text-amber-50 shadow-sm'
                        : 'hover:bg-amber-50/70 text-emerald-950'
                    }`}
                  >
                    {/* Left: Crop Image & Texts */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Image Thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-500/40 shrink-0 bg-emerald-950/20 shadow-xs">
                        <img
                          src={cropImg}
                          alt={crop.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-amber-300 text-[9px] font-mono px-1 rounded">
                          {crop.photos.length}P
                        </span>
                      </div>

                      {/* Names & Specs */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {(crop.id.startsWith('custom_') || crop.isCustom) && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-400 text-emerald-950 shadow-xs flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>{language === 'hi' ? '✨ अनलिस्टेड (352 में नहीं)' : '✨ Unlisted (Not in 352)'}</span>
                            </span>
                          )}
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-extrabold ${
                              isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {categoryEmoji[crop.category] || '🌱'} {getLocalizedCategory(crop.category, language)}
                          </span>
                          <span
                            className={`text-[10px] font-bold ${
                              isSelected ? 'text-amber-200' : 'text-emerald-700'
                            }`}
                          >
                            {crop.variety}
                          </span>
                        </div>

                        <div className="font-black text-xs sm:text-sm truncate mt-0.5">
                          {crop.nameHi} <span className={isSelected ? 'text-amber-200 font-semibold' : 'text-emerald-800/80 font-normal'}>({crop.name})</span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-bold mt-0.5">
                          <span className={isSelected ? 'text-amber-300 font-extrabold' : 'text-amber-800 font-extrabold'}>
                            ₹{crop.priceRupees}/{crop.unit}
                          </span>
                          <span className="opacity-40">•</span>
                          <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-emerald-700'}`}>
                            {crop.grade}
                          </span>
                          <span className="opacity-40">•</span>
                          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-100/70 px-1 rounded">
                            {crop.photos.length}📷
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions (Direct Edit or Select Checkmark) */}
                    <div className="shrink-0 flex items-center gap-2">
                      {(crop.id.startsWith('custom_') || crop.isCustom) && onEditCrop && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditCrop(crop);
                            setIsOpen(false);
                          }}
                          className="px-2 py-1 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-[10px] rounded-lg shadow-xs flex items-center gap-1 transition cursor-pointer"
                          title={language === 'hi' ? 'फसल विवरण व 2-6 फोटो अपडेट करें' : 'Update produce & photos'}
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{language === 'hi' ? 'अपडेट' : 'Update'}</span>
                        </span>
                      )}

                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-800/50 hover:text-emerald-950">
                          {language === 'hi' ? 'चुनें' : 'Select'} →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Status */}
          <div className="px-3 py-2 bg-emerald-950/5 border-t border-emerald-900/10 flex items-center justify-between text-[11px] text-emerald-800">
            <span>
              {language === 'hi'
                ? `प्रदर्शित: ${filteredList.length} फसलें (2-6 फोटो सहित)`
                : `Showing: ${filteredList.length} produce (2-6 photos verified)`}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-amber-700 hover:text-amber-900"
            >
              {language === 'hi' ? 'बंद करें ✕' : 'Close ✕'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
