'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedCropName, getLocalizedGrade, getLocalizedLocation } from '@/lib/i18n';
import { useRole } from '@/context/RoleContext';
import { useAuth } from '@/context/AuthContext';
import PortalGuard from '@/components/PortalGuard';
import BulmaProductCard from '@/components/BulmaProductCard';
import CropImageDropdown from '@/components/CropImageDropdown';
import {
  FULL_CROP_CATALOG,
  VEGETABLES_CATALOG,
  FRUITS_CATALOG,
  PULSES_CATALOG,
  SEEDS_CATALOG,
  GRAINS_CATALOG,
  CATALOG_STATS,
  CatalogCropItem,
  createCustomCatalogItem,
  saveCustomCatalogItem,
  deleteCustomCatalogItem,
  getStoredCustomCatalogItems
} from '@/lib/cropCatalogData';
import {
  Tractor,
  Plus,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  X,
  Loader2,
  Trash2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Camera,
  Image as ImageIcon,
  ArrowRight,
  Search,
  Check,
  Layers,
  ShoppingBag,
  ExternalLink,
  Edit3,
  Save,
  RefreshCw
} from 'lucide-react';

export default function FarmerDashboardPage() {
  const { t, language } = useLanguage();
  const { userName } = useRole();
  const { user, verifyCredentials } = useAuth();

  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ivrResponse, setIvrResponse] = useState<string | null>(null);
  const [selectedKeypad, setSelectedKeypad] = useState('1');
  const [successSignal, setSuccessSignal] = useState<
    | string
    | {
      cropName: string;
      cropNameHi: string;
      logo: string;
      photos: string[];
      details: string[];
    }
    | null
  >(null);
  const [viewFormat, setViewFormat] = useState<'bulma' | 'table'>('bulma');

  // Security Verification Delete Modal State
  const [cropToDelete, setCropToDelete] = useState<{ id: string; name: string } | null>(null);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showVerifyPass, setShowVerifyPass] = useState(false);
  const [isVerifyingDelete, setIsVerifyingDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Form states for adding/updating produce (Product Details + 2-6 Photos mandatory)
  const [editingCropId, setEditingCropId] = useState<string | null>(null);
  const [customCropSubMode, setCustomCropSubMode] = useState<'new' | 'update'>('new');
  const [unlistedCategoryFilter, setUnlistedCategoryFilter] = useState<'All' | 'Vegetables' | 'Fruits' | 'Pulses' | 'Grains'>('All');
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [cropName, setCropName] = useState('टमाटर (Pusa Ruby)');
  const [cropNameHi, setCropNameHi] = useState('टमाटर (लाल देशी)');
  const [category, setCategory] = useState<'Vegetables' | 'Fruits' | 'Pulses' | 'Grains' | 'Seeds'>('Vegetables');
  const [variety, setVariety] = useState('Pusa Ruby');
  const [quantityKg, setQuantityKg] = useState('500');
  const [unit, setUnit] = useState('kg');
  const [basePriceRupees, setBasePriceRupees] = useState('34');
  const [grade, setGrade] = useState('उच्चतम श्रेणी A+');
  const [location, setLocation] = useState('नासिक मंडी संकलन हब');
  const [isOrganic, setIsOrganic] = useState(false);

  // 2 to 6 Photos Mandatory State
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80'
  ]);
  const [urlInput, setUrlInput] = useState('');
  const [photoError, setPhotoError] = useState<string | null>(null);

  // Catalog Fast-Autocomplete states
  const [produceSourceMode, setProduceSourceMode] = useState<'catalog' | 'custom'>('catalog');
  const [catalogTab, setCatalogTab] = useState<'All' | 'Vegetables' | 'Fruits' | 'Pulses' | 'Grains'>('Vegetables');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>('veg_1');

  // User-isolated active listings
  const [myListings, setMyListings] = useState<any[]>([]);

  // Filtered catalog items for quick-picker
  const filteredCatalogItems = useMemo(() => {
    let pool = FULL_CROP_CATALOG;
    if (catalogTab !== 'All') {
      pool = pool.filter((item) => item.category === catalogTab);
    }
    if (catalogSearch.trim()) {
      const q = catalogSearch.toLowerCase();
      pool = pool.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.nameHi.includes(q) ||
          item.variety.toLowerCase().includes(q)
      );
    }
    return pool.slice(0, 30); // show top 30 for performance
  }, [catalogTab, catalogSearch]);

  // Unlisted custom crops (crops not in the 352 catalog or custom added)
  const unlistedCustomCrops = useMemo(() => {
    return myListings.filter((c) => {
      if (c.isCustom) return true;
      const name = (c.crop || c.crop_name || '').trim().toLowerCase();
      const inCatalog = FULL_CROP_CATALOG.some(
        (cat) => cat.name.toLowerCase() === name || (c.crop_name_hi && cat.nameHi === c.crop_name_hi)
      );
      return !inCatalog;
    });
  }, [myListings]);

  // Convert unlisted custom crops to standard CatalogCropItem format for image dropdown
  const customCatalogItems: CatalogCropItem[] = useMemo(() => {
    return unlistedCustomCrops.map((c) => {
      const pRupees = parseFloat(c.priceRupees) || (c.pricePaise ? c.pricePaise / 100 : 40);
      const photoArray = Array.isArray(c.photos) && c.photos.length > 0
        ? c.photos
        : [c.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'];

      return createCustomCatalogItem({
        id: String(c.id),
        name: c.crop || c.crop_name,
        nameHi: c.crop_name_hi || c.crop || c.crop_name,
        category: c.category || 'Vegetables',
        variety: c.variety || 'देसी / स्थानीय फसल (Local Harvest)',
        priceRupees: pRupees,
        unit: c.unit || 'kg',
        grade: c.grade || 'उच्चतम श्रेणी A+',
        isOrganic: c.isOrganic || (c.grade && (c.grade.includes('जैविक') || c.grade.includes('Organic')) ? 1 : 0),
        photos: photoArray,
        farmerId: c.farmerId || user?.id,
        farmerName: c.farmer_name || userName,
        quantityKg: parseInt(c.qty || c.quantity_available) || 500,
        location: c.location,
      });
    });
  }, [unlistedCustomCrops, user?.id, userName]);



  const loadCrops = async () => {
    if (!user?.id) {
      setMyListings([]);
      return;
    }

    try {
      const res = await fetch(`/api/v1/crops?farmerId=${encodeURIComponent(user.id)}`);
      const data = await res.json();
      let apiCrops: any[] = [];
      if (data.success && data.crops && data.crops.length > 0) {
        apiCrops = data.crops.map((c: any) => {
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
            id: String(c.id),
            crop: c.crop_name,
            qty: c.quantity_available,
            priceRupees: (c.price_paise / 100).toFixed(2),
            pricePaise: c.price_paise,
            grade: c.grade || 'उच्चतम श्रेणी A+',
            location: c.location || 'नासिक मंडी संकलन हब',
            status: 'सत्यापित फसल',
            imageUrl: photoList[0],
            photos: photoList,
            farmerId: c.farmer_id,
            category: c.category || 'Vegetables',
            unit: c.unit || 'kg',
            isOrganic: c.organic_certified || 0,
            harvestDate: c.harvest_date || '2026-09-08',
            cvTrustScore: 97,
          };
        });
      }

      // Get local storage crops specifically belonging to this logged-in farmer
      let localCrops: any[] = [];
      try {
        const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
        localCrops = stored.filter((item: any) => item.farmerId === user.id);
      } catch (e) { }

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
  };

  useEffect(() => {
    loadCrops();
  }, [user?.id]);

  const triggerSuccessSignal = (
    msg:
      | string
      | {
        cropName: string;
        cropNameHi: string;
        logo: string;
        photos: string[];
        details: string[];
      }
  ) => {
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
        triggerSuccessSignal(
          language === 'hi' ? 'IVR वॉयस प्रविष्टि सफलतापूर्वक दर्ज की गई!' : 'IVR Voice Entry Registered Successfully!'
        );
      }
    } catch (e) {
      setIvrResponse('IVR वॉयस सेवा: "1 बटन दबाया गया — 500 किग्रा टमाटर सफलतापूर्वक दर्ज हो गए हैं।"');
    }
  };

  // Select item from 352+ Catalog or Unlisted Custom Produce
  const handleSelectCatalogItem = (item: CatalogCropItem) => {
    setSelectedCatalogId(item.id);
    setCropName(item.name);
    setCropNameHi(item.nameHi);
    setCategory(item.category);
    setVariety(item.variety);
    setBasePriceRupees(String(item.priceRupees));
    setUnit(item.unit);
    setGrade(item.grade);
    setIsOrganic(item.isOrganic === 1);
    // Pre-fills with verified photo set (meets 2-6 mandatory photo rule!)
    setPhotos([...item.photos]);
    setPhotoError(null);

    // If selected crop is unlisted custom produce (not in 352 catalog):
    if (item.isCustom || item.id.startsWith('custom_')) {
      const rawId = item.id.startsWith('custom_') ? item.id.replace('custom_', '') : item.id;
      setEditingCropId(rawId);
      setProduceSourceMode('custom');
      setCustomCropSubMode('update');
      if (item.quantityKg) setQuantityKg(String(item.quantityKg));
      if (item.location) setLocation(item.location);
      triggerSuccessSignal(
        language === 'hi'
          ? `✏️ अनलिस्टेड फसल "${item.nameHi || item.name}" संपादन मोड सक्रिय — बदलाव करें और 2-6 फोटो सहित अपडेट करें!`
          : `✏️ Editing unlisted crop "${item.name}". Make updates with 2-6 photos!`
      );
    } else {
      setEditingCropId(null);
    }
  };

  // Photo handlers (2 to 6 photos validation - supports multiple file upload from camera/device)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 6 - photos.length;
    if (remainingSlots <= 0) {
      alert(language === 'hi' ? 'अधिकतम 6 तस्वीरें ही जोड़ी जा सकती हैं' : 'Maximum 6 photos allowed');
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const validFiles = filesToProcess.filter((f) => f.size <= 5 * 1024 * 1024);

    if (validFiles.length < filesToProcess.length) {
      alert(language === 'hi' ? 'कुछ फोटो 5MB से बड़ी थीं और छोड़ दी गईं' : 'Some photos exceeded 5MB and were skipped');
    }

    const readPromises = validFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then((newPhotos) => {
      setPhotos((prev) => {
        const combined = [...prev, ...newPhotos];
        if (combined.length >= 2) setPhotoError(null);
        return combined;
      });
    });
    e.target.value = '';
  };

  // Best solution for unlisted custom crops: 1-click auto-suggest 3 high-res realistic photos
  const handleLoadSamplePhotosForCategory = (cat: 'Vegetables' | 'Fruits' | 'Pulses' | 'Grains' | 'Seeds' | string) => {
    const samplePool: Record<string, string[]> = {
      Vegetables: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80',
      ],
      Fruits: [
        'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
      ],
      Pulses: [
        'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      ],
      Grains: [
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80',
      ],
    };
    const targetPhotos = samplePool[cat] || samplePool.Vegetables;
    setPhotos([...targetPhotos]);
    setPhotoError(null);
    triggerSuccessSignal(
      language === 'hi'
        ? `${cat} श्रेणी हेतु 3 सत्यापित तस्वीरें लोड की गईं!`
        : `Loaded 3 verified high-res photos for ${cat}!`
    );
  };

  const handleStartCustomProduce = (cat?: 'Vegetables' | 'Fruits' | 'Pulses' | 'Grains') => {
    setEditingCropId(null);
    setProduceSourceMode('custom');
    setCustomCropSubMode('new');
    if (cat) setCategory(cat);
    setCropName('');
    setCropNameHi('');
    setVariety('देसी / स्थानीय फसल (Local Harvest)');
    setQuantityKg('500');
    setBasePriceRupees('40');
    setGrade('उच्चतम श्रेणी A+');
    handleLoadSamplePhotosForCategory(cat || category);
    triggerSuccessSignal(
      language === 'hi'
        ? 'नया अनलिस्टेड उत्पाद मोड सक्रिय — विवरण व 2-6 फोटो दर्ज करें'
        : 'Custom Unlisted Produce mode active — enter details and 2-6 photos'
    );
  };

  const handleStartEditCrop = (crop: any) => {
    setEditingCropId(crop.id);
    setProduceSourceMode('custom');
    setCustomCropSubMode('update');
    setCropName(crop.crop || crop.crop_name || '');
    setCropNameHi(crop.crop_name_hi || '');
    setCategory(crop.category || 'Vegetables');
    setVariety(crop.variety || 'देसी / स्थानीय फसल (Local Harvest)');
    setQuantityKg(String(crop.qty || crop.quantity_available || '500'));
    setBasePriceRupees(String(crop.priceRupees || (crop.pricePaise ? (crop.pricePaise / 100).toFixed(2) : '34')));
    setGrade(crop.grade || 'उच्चतम श्रेणी A+');
    setLocation(crop.location || 'नासिक मंडी संकलन हब');
    setUnit(crop.unit || 'kg');
    setIsOrganic(
      crop.isOrganic === 1 ||
      String(crop.grade || '').includes('जैविक') ||
      String(crop.grade || '').includes('Organic')
    );

    let cropPhotos: string[] = [];
    if (Array.isArray(crop.photos) && crop.photos.length > 0) {
      cropPhotos = crop.photos;
    } else if (crop.imageUrl) {
      cropPhotos = [crop.imageUrl, crop.imageUrl];
    } else {
      cropPhotos = [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      ];
    }
    setPhotos(cropPhotos);
    setPhotoError(null);

    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    triggerSuccessSignal(
      language === 'hi'
        ? `✏️ फसल "${crop.crop || crop.crop_name}" संपादन मोड लोड हो गया। बदलाव करें और अपडेट करें!`
        : `✏️ Editing "${crop.crop || crop.crop_name}". Make changes and update!`
    );
  };

  const handleCancelEdit = () => {
    setEditingCropId(null);
    setCustomCropSubMode('new');
    setCropName('');
    setCropNameHi('');
    setVariety('देसी / स्थानीय फसल (Local Harvest)');
    setQuantityKg('500');
    setBasePriceRupees('40');
    setGrade('उच्चतम श्रेणी A+');
    handleLoadSamplePhotosForCategory(category);
    triggerSuccessSignal(
      language === 'hi'
        ? 'संपादन रद्द किया गया — नया उत्पाद प्रविष्टि मोड तैयार'
        : 'Edit cancelled — ready for new custom produce entry'
    );
  };

  const handleAddUrlPhoto = () => {
    if (!urlInput.trim()) return;
    if (photos.length >= 6) {
      alert(language === 'hi' ? 'अधिकतम 6 तस्वीरें ही जोड़ी जा सकती हैं' : 'Maximum 6 photos allowed');
      return;
    }
    setPhotos((prev) => {
      const next = [...prev, urlInput.trim()];
      if (next.length >= 2) setPhotoError(null);
      return next;
    });
    setUrlInput('');
  };

  const handleRemovePhoto = (idx: number) => {
    const next = photos.filter((_, i) => i !== idx);
    setPhotos(next);
    if (next.length < 2) {
      setPhotoError(
        language === 'hi'
          ? 'कम से कम 2 तस्वीरें अनिवार्य हैं! कृपया एक और तस्वीर जोड़ें।'
          : 'At least 2 photos are mandatory! Please upload another photo.'
      );
    } else {
      setPhotoError(null);
    }
  };

  // Produce Submission (Farmer Desk to Buyer) - Handles Both New Registration & Existing Update
  const handleAddProduce = async (e: React.FormEvent) => {
    e.preventDefault();

    // STRICT VALIDATION: 2 photos mandatory and maximum 6 photos!
    if (photos.length < 2) {
      setPhotoError(
        language === 'hi'
          ? 'फसल पंजीकरण / अपडेट हेतु कम से कम 2 तस्वीरें अनिवार्य हैं! (अधिकतम 6 तस्वीरें)'
          : 'Minimum 2 photos are mandatory for produce registration or update! (Max 6 photos)'
      );
      return;
    }

    if (photos.length > 6) {
      setPhotoError(
        language === 'hi'
          ? 'अधिकतम 6 तस्वीरें ही अनुमत हैं!'
          : 'Maximum 6 photos allowed!'
      );
      return;
    }

    setIsSubmitting(true);
    setPhotoError(null);

    // ============================================
    // BRANCH A: UPDATE EXISTING UNLISTED CROP
    // ============================================
    if (editingCropId) {
      const updatedCrop = {
        id: editingCropId,
        crop: cropName || 'अद्यतन फसल',
        crop_name: cropName || 'अद्यतन फसल',
        crop_name_hi: cropNameHi,
        category: category,
        variety: variety,
        qty: parseInt(quantityKg) || 500,
        quantity_available: parseInt(quantityKg) || 500,
        priceRupees: basePriceRupees || '34.00',
        pricePaise: Math.round((parseFloat(basePriceRupees) || 34) * 100),
        grade: isOrganic ? '100% जैविक (Organic)' : grade,
        location: location,
        status: 'सत्यापित फसल',
        imageUrl: photos[0],
        photos: photos,
        unit: unit,
        farmerId: user?.id || 'u_farmer_1',
        farmer_name: user?.name || userName || 'किसान (Farmer)',
        isOrganic: isOrganic ? 1 : 0,
        harvestDate: new Date().toISOString().split('T')[0],
        cvTrustScore: 98,
        isCustom: true,
      };

      try {
        await fetch('/api/v1/crops', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingCropId,
            cropName: cropName || 'अद्यतन फसल',
            quantityKg: quantityKg || '500',
            priceRupees: basePriceRupees || '34.00',
            grade: isOrganic ? '100% जैविक (Organic)' : grade,
            location: location,
            farmerId: user?.id || 'u_farmer_1',
            category: category,
            unit: unit,
            images: photos,
            isOrganic: isOrganic ? 1 : 0,
          }),
        });
      } catch (err) {
        console.log('Backend update fallback to local storage:', err);
      } finally {
        setMyListings((prev) => prev.map((item) => (item.id === editingCropId ? updatedCrop : item)));

        try {
          const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
          const updatedStored = stored.map((item: any) => (item.id === editingCropId ? updatedCrop : item));
          if (!stored.some((item: any) => item.id === editingCropId)) {
            updatedStored.unshift(updatedCrop);
          }
          localStorage.setItem('kb_custom_crops', JSON.stringify(updatedStored));

          // Sync into custom CatalogCropItem store
          saveCustomCatalogItem(
            createCustomCatalogItem({
              id: editingCropId,
              name: cropName || 'अद्यतन फसल',
              nameHi: cropNameHi,
              category: category,
              variety: variety,
              priceRupees: parseFloat(basePriceRupees) || 34,
              unit: unit,
              grade: isOrganic ? '100% जैविक (Organic)' : grade,
              isOrganic: isOrganic ? 1 : 0,
              photos: photos,
              farmerId: user?.id || 'u_farmer_1',
              farmerName: user?.name || userName,
              quantityKg: parseInt(quantityKg) || 500,
              location: location,
            })
          );
        } catch (e) { }

        setIsSubmitting(false);
        setEditingCropId(null);
        setShowAddModal(false);
        triggerSuccessSignal({
          cropName,
          cropNameHi: cropNameHi || cropName,
          logo: FULL_CROP_CATALOG.find((item) => item.id === selectedCatalogId)?.sideLogo || photos[0],
          photos: photos.slice(0, 6),
          details: [category, variety, `${quantityKg} ${unit}`, grade, location],
        });
      }
      return;
    }

    // ============================================
    // BRANCH B: ADD NEW PRODUCE (CATALOG OR UNLISTED)
    // ============================================
    const isUnlistedNew = produceSourceMode === 'custom' || !FULL_CROP_CATALOG.some((c) => c.id === selectedCatalogId);
    const fallbackCrop = {
      id: String(Date.now()),
      crop: cropName || 'नयी फसल',
      crop_name: cropName || 'नयी फसल',
      crop_name_hi: cropNameHi,
      category: category,
      variety: variety,
      qty: parseInt(quantityKg) || 500,
      quantity_available: parseInt(quantityKg) || 500,
      priceRupees: basePriceRupees || '34.00',
      pricePaise: Math.round((parseFloat(basePriceRupees) || 34) * 100),
      grade: isOrganic ? '100% जैविक (Organic)' : grade,
      location: location,
      status: 'सत्यापित फसल',
      imageUrl: photos[0],
      photos: photos,
      unit: unit,
      farmerId: user?.id || 'u_farmer_1',
      farmer_name: user?.name || userName || 'किसान (Farmer)',
      isOrganic: isOrganic ? 1 : 0,
      harvestDate: new Date().toISOString().split('T')[0],
      cvTrustScore: 98,
      isCustom: isUnlistedNew,
    };

    let cropToAdd = fallbackCrop;

    try {
      const res = await fetch('/api/v1/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropName: cropName || 'नयी फसल',
          quantityKg: quantityKg || '500',
          priceRupees: basePriceRupees || '34.00',
          grade: isOrganic ? '100% जैविक (Organic)' : grade,
          location: location,
          farmerId: user?.id || 'u_farmer_1',
          farmerName: user?.name || userName,
          category: category,
          unit: unit,
          images: photos, // 2 to 6 photos passed
        }),
      });

      const data = await res.json();
      if (data.success && data.crop) {
        cropToAdd = {
          id: String(data.crop.id),
          crop: data.crop.crop,
          crop_name: data.crop.crop,
          crop_name_hi: cropNameHi,
          category: category,
          variety: variety,
          qty: data.crop.qty,
          quantity_available: data.crop.qty,
          priceRupees: data.crop.priceRupees,
          pricePaise: Math.round(parseFloat(data.crop.priceRupees) * 100),
          grade: data.crop.grade,
          location: data.crop.location,
          status: 'सत्यापित फसल',
          imageUrl: photos[0],
          photos: photos,
          unit: unit,
          farmerId: user?.id || 'u_farmer_1',
          farmer_name: user?.name || userName || 'किसान (Farmer)',
          isOrganic: isOrganic ? 1 : 0,
          harvestDate: new Date().toISOString().split('T')[0],
          cvTrustScore: 98,
          isCustom: isUnlistedNew,
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

        if (isUnlistedNew) {
          saveCustomCatalogItem(
            createCustomCatalogItem({
              id: cropToAdd.id,
              name: cropName || 'नयी फसल',
              nameHi: cropNameHi,
              category: category,
              variety: variety,
              priceRupees: parseFloat(basePriceRupees) || 34,
              unit: unit,
              grade: isOrganic ? '100% जैविक (Organic)' : grade,
              isOrganic: isOrganic ? 1 : 0,
              photos: photos,
              farmerId: user?.id || 'u_farmer_1',
              farmerName: user?.name || userName,
              quantityKg: parseInt(quantityKg) || 500,
              location: location,
            })
          );
        }
      } catch (e) { }

      setIsSubmitting(false);
      setShowAddModal(false);
      triggerSuccessSignal({
        cropName,
        cropNameHi: cropNameHi || cropName,
        logo: FULL_CROP_CATALOG.find((item) => item.id === selectedCatalogId)?.sideLogo || photos[0],
        photos: photos.slice(0, 6),
        details: [category, variety, `${quantityKg} ${unit}`, grade, location],
      });
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
      const verifyRes = await verifyCredentials(verifyEmail, verifyPassword);
      if (!verifyRes.success) {
        setDeleteError(
          verifyRes.error ||
          (language === 'hi' ? 'सत्यापन विफल! ईमेल या पासवर्ड गलत है।' : 'Verification failed! Invalid Email or Password.')
        );
        setIsVerifyingDelete(false);
        return;
      }

      const id = cropToDelete.id;
      setMyListings((prev) => prev.filter((item) => item.id !== id));

      try {
        const stored = JSON.parse(localStorage.getItem('kb_custom_crops') || '[]');
        const filtered = stored.filter((item: any) => item.id !== id);
        localStorage.setItem('kb_custom_crops', JSON.stringify(filtered));
        deleteCustomCatalogItem(id);
      } catch (e) { }

      try {
        await fetch(`/api/v1/crops?id=${id}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Delete crop API error:', err);
      }

      setCropToDelete(null);
      triggerSuccessSignal(
        language === 'hi' ? `फसल सफलतापूर्वक हटा दी गई!` : `Crop deleted successfully!`
      );
    } catch (err) {
      setDeleteError('An error occurred during verification.');
    } finally {
      setIsVerifyingDelete(false);
    }
  };

  return (
    <PortalGuard
      requiredRole="FARMER"
      portalName={language === 'hi' ? 'किसान डैशबोर्ड (Farmer Desk)' : 'Farmer Desk'}
      portalDescription={
        language === 'hi'
          ? 'यह पोर्टल केवल पंजीकृत किसानों के लिए सुरक्षित है जहाँ वे अपनी फसलों को 2 से 6 तस्वीरों के साथ पंजीकृत करके सीधे खरीदारों तक पहुँचा सकते हैं।'
          : 'This portal is restricted to registered Farmers to list, photograph (2-6 mandatory photos), and sell produce directly to buyers.'
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
                {language === 'hi'
                  ? 'फसल जोड़ें (2 से 6 तस्वीरें अनिवार्य) और सीधे खरीदार पोर्टल (Buyer Desk) तक पहुँचाएं'
                  : 'Add produce with 2-6 mandatory photos and broadcast directly to Buyer Desk'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => { setProduceSourceMode('catalog'); setShowAddModal(true); }}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-extrabold rounded-xl shadow-lg hover:from-amber-400 hover:to-amber-500 transition flex items-center gap-2 text-sm"
            >
              <Layers className="w-4 h-4" />
              <span>{language === 'hi' ? '352+ कैटलॉग से चुनें' : '352+ Catalog Produce'}</span>
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-emerald-700">
            <span className="text-xs font-bold text-emerald-800">{t.statEarnedIncome}</span>
            <div className="text-2xl font-extrabold text-emerald-950">₹1,11,400.00</div>
            <span className="text-[11px] text-emerald-700 font-mono">{t.statZeroCommission}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-amber-600">
            <span className="text-xs font-bold text-emerald-800">{t.statActiveListings}</span>
            <div className="text-2xl font-extrabold text-amber-800">{myListings.length} {language === 'hi' ? 'फसलें' : 'Crops'}</div>
            <span className="text-[11px] text-amber-700 font-medium">{language === 'hi' ? 'सीधे खरीदार से कनेक्ट' : 'Connected to Buyer Desk'}</span>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-purple-600">
            <span className="text-xs font-bold text-emerald-800">{language === 'hi' ? 'उपलब्ध कैटलॉग' : 'Catalog Ready'}</span>
            <div className="text-2xl font-extrabold text-purple-900">{CATALOG_STATS.totalCount}+ {language === 'hi' ? 'किस्में' : 'Items'}</div>
            <span className="text-[11px] text-purple-700 font-medium">100 सब्जियाँ • 100 फल • 100 दालें • 52 अनाज</span>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-l-4 border-l-blue-600">
            <span className="text-xs font-bold text-emerald-800">{t.statSmartContracts}</span>
            <div className="text-2xl font-extrabold text-blue-700">3 {language === 'hi' ? 'अनुबंध' : 'Contracts'}</div>
            <span className="text-[11px] text-blue-600 font-medium">{t.statEscrowProtected}</span>
          </div>
        </div>

        {/* ===================================================
            INSERT SECTION: FAST PRODUCE REGISTRATION BOARD
            =================================================== */}
        <div ref={formContainerRef} className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 bg-gradient-to-b from-white via-white to-amber-50/40 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-900/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-900 font-extrabold text-[11px] rounded-full border border-amber-500/30">
                  {language === 'hi' ? 'किसान डेस्क बोर्ड से खरीदार बोर्ड' : 'Farmer Desk Board to Buyer'}
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'hi' ? '2 से 6 फोटो अनिवार्य' : '2-6 Photos Mandatory'}</span>
                </span>
                {editingCropId && (
                  <span className="px-2.5 py-0.5 bg-amber-500 text-emerald-950 font-black text-[11px] rounded-full shadow-xs flex items-center gap-1">
                    <Edit3 className="w-3 h-3" />
                    <span>{language === 'hi' ? '✏️ संपादन मोड सक्रिय' : '✏️ Edit Mode Active'}</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 mt-1">
                {editingCropId
                  ? (language === 'hi' ? `फसल अपडेट करें: "${cropName}"` : `Update Crop: "${cropName}"`)
                  : (language === 'hi' ? 'फसल प्रविष्टि बोर्ड (Insert Produce to Buyer)' : 'Insert Produce to Buyer Desk')}
              </h2>
              <p className="text-xs text-emerald-800/70">
                {language === 'hi'
                  ? '352+ कैटलॉग से फसल चुनें या सब्जियाँ, फल, दालें, अनाज में से नया अनलिस्टेड उत्पाद जोड़ें और पूर्व दर्ज फसलों को तुरंत अपडेट करें।'
                  : 'Select from 352+ catalog or add new unlisted produce (Vegetables, Fruits, Pulses, Grains) & update existing custom crops.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {editingCropId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <X className="w-4 h-4" />
                  <span>{language === 'hi' ? 'संपादन रद्द करें' : 'Cancel Edit'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-100 rounded-xl font-bold text-xs flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>{language === 'hi' ? 'विस्तृत मॉडल खोलें' : 'Open Full Screen Modal'}</span>
              </button>
            </div>
          </div>

          {/* Produce Source Mode Switcher: 352+ Catalog vs Custom Unlisted Produce */}
          <div className="flex items-center gap-2 p-1.5 bg-emerald-950/10 rounded-2xl border border-emerald-900/10 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (editingCropId) handleCancelEdit();
                setProduceSourceMode('catalog');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${produceSourceMode === 'catalog'
                  ? 'bg-[#0F3826] text-amber-300 shadow-md ring-2 ring-amber-400/40'
                  : 'text-emerald-950 hover:bg-emerald-100/70'
                }`}
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>{language === 'hi' ? '1. कैटलॉग से चुनें (352+ फसलें)' : '1. Select from 352+ Catalog'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleStartCustomProduce()}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition ${produceSourceMode === 'custom'
                  ? 'bg-[#0F3826] text-amber-300 shadow-md ring-2 ring-amber-400/40'
                  : 'text-emerald-950 hover:bg-emerald-100/70'
                }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                {language === 'hi'
                  ? '2. ➕ कस्टम अनलिस्टेड उत्पाद (जो 352 कैटलॉग में नहीं है)'
                  : '2. ➕ Custom Unlisted Produce (Not in 352 Catalog)'}
              </span>
            </button>
          </div>

          {/* Mode 1: Rich Image Dropdown for Catalog Produce */}
          {produceSourceMode === 'catalog' ? (
            <div className="bg-gradient-to-r from-emerald-950/5 via-amber-500/5 to-emerald-950/5 p-4 sm:p-6 rounded-2xl border border-amber-500/30 space-y-3 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-900/10 pb-2.5">
                <div>
                  <span className="text-xs sm:text-sm font-black text-emerald-950 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>
                      {language === 'hi'
                        ? 'फोटो सहित ड्रॉपडाउन लिस्ट से फसल चुनें (सब्जियाँ, फल, दालें, अनाज):'
                        : 'Select Produce from Image Dropdown (Vegetables, Fruits, Pulses, Grains):'}
                    </span>
                  </span>
                  <p className="text-[11px] text-emerald-800/80 mt-0.5">
                    {language === 'hi'
                      ? 'ड्रॉपडाउन खोलें, किसी भी फसल की तस्वीर व विवरण देखें और 1-क्लिक में 2-6 फोटो सहित ऑटोफिल करें।'
                      : 'Open the image dropdown to preview real crop photos, varieties, and benchmark prices.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {unlistedCustomCrops.length > 0 && (
                    <span className="text-[11px] font-extrabold text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-full border border-emerald-400">
                      +{unlistedCustomCrops.length} {language === 'hi' ? 'अनलिस्टेड' : 'Custom'}
                    </span>
                  )}
                  <span className="text-[11px] font-extrabold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-400 shrink-0">
                    {CATALOG_STATS.totalCount} {language === 'hi' ? 'फसलें उपलब्ध' : 'Produce Ready'}
                  </span>
                </div>
              </div>

              {/* Live Interactive Crop Image Dropdown with custom crops included */}
              <CropImageDropdown
                selectedId={selectedCatalogId}
                onSelectCrop={handleSelectCatalogItem}
                onEditCrop={(crop) => {
                  const rawId = crop.id.startsWith('custom_') ? crop.id.replace('custom_', '') : crop.id;
                  const found = myListings.find((l) => l.id === rawId || `custom_${l.id}` === crop.id);
                  if (found) {
                    handleStartEditCrop(found);
                  } else {
                    handleSelectCatalogItem(crop);
                  }
                }}
                customCrops={customCatalogItems}
              />
            </div>
          ) : (
            /* Mode 2: Custom Unlisted Produce Management Hub (New + Update Function) */
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/15 via-emerald-900/10 to-amber-500/15 p-4 sm:p-5 rounded-2xl border-2 border-amber-500/40 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-emerald-950">
                        {language === 'hi'
                          ? 'कस्टम अनलिस्टेड फसल केंद्र (सब्जियाँ, फल, दालें, अनाज)'
                          : 'Custom Unlisted Produce Hub (Vegetables, Fruits, Pulses, Grains)'}
                      </h3>
                      <p className="text-[11px] text-emerald-800/80">
                        {language === 'hi'
                          ? 'जो फसल 352 कैटलॉग में नहीं है उसे यहाँ नया जोड़ें अथवा पूर्व दर्ज अनलिस्टेड फसल का विवरण/फोटो अपडेट करें।'
                          : 'Add new produce not in the 352 catalog or update details & photos of your unlisted crops.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleLoadSamplePhotosForCategory(category)}
                      className="px-3 py-1.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>{language === 'hi' ? '✨ 3 फोटो ऑटो-सजेस्ट करें' : '✨ Auto-Suggest 3 Photos'}</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Mode Operation Switcher: [➕ 1. नया जोड़ें] or [✏️ 2. अपडेट / संपादित करें] */}
                <div className="flex items-center gap-2 pt-1 border-t border-emerald-900/10 flex-wrap">
                  <span className="text-[11px] font-extrabold text-emerald-950">
                    {language === 'hi' ? 'कार्यविधि चुनें:' : 'Select Action:'}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setCustomCropSubMode('new');
                      if (editingCropId) handleCancelEdit();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${customCropSubMode === 'new' && !editingCropId
                        ? 'bg-[#0F3826] text-amber-300 shadow font-black'
                        : 'bg-white/80 hover:bg-white text-emerald-950 border border-emerald-900/15'
                      }`}
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'hi' ? '➕ नया उत्पाद जोड़ें' : '➕ Add New Produce'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCustomCropSubMode('update');
                      if (unlistedCustomCrops.length > 0 && !editingCropId) {
                        handleStartEditCrop(unlistedCustomCrops[0]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${customCropSubMode === 'update' || editingCropId !== null
                        ? 'bg-[#0F3826] text-amber-300 shadow font-black ring-2 ring-amber-400/40'
                        : 'bg-white/80 hover:bg-white text-emerald-950 border border-emerald-900/15'
                      }`}
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {language === 'hi' ? '✏️ अनलिस्टेड फसल अपडेट करें' : '✏️ Update Unlisted Crop'} ({unlistedCustomCrops.length})
                    </span>
                  </button>
                </div>

                {/* 4 Category Quick Selection Pills for Unlisted Produce */}
                <div className="space-y-1.5 pt-1 border-t border-emerald-900/10">
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950">
                    <span>{language === 'hi' ? 'श्रेणी चुनें (Select 4 Categories):' : 'Select Category:'}</span>
                    <span className="text-amber-800 font-extrabold">{category}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Vegetables');
                        if (!editingCropId) handleLoadSamplePhotosForCategory('Vegetables');
                      }}
                      className={`p-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition ${category === 'Vegetables'
                          ? 'bg-emerald-800 text-amber-200 border-amber-400 shadow'
                          : 'bg-white/90 hover:bg-emerald-50 text-emerald-950 border-emerald-900/15'
                        }`}
                    >
                      <span>🥦</span>
                      <span>{language === 'hi' ? 'सब्जियाँ (Vegetables)' : 'Vegetables'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Fruits');
                        if (!editingCropId) handleLoadSamplePhotosForCategory('Fruits');
                      }}
                      className={`p-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition ${category === 'Fruits'
                          ? 'bg-emerald-800 text-amber-200 border-amber-400 shadow'
                          : 'bg-white/90 hover:bg-emerald-50 text-emerald-950 border-emerald-900/15'
                        }`}
                    >
                      <span>🍎</span>
                      <span>{language === 'hi' ? 'फल (Fruits)' : 'Fruits'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Pulses');
                        if (!editingCropId) handleLoadSamplePhotosForCategory('Pulses');
                      }}
                      className={`p-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition ${category === 'Pulses'
                          ? 'bg-emerald-800 text-amber-200 border-amber-400 shadow'
                          : 'bg-white/90 hover:bg-emerald-50 text-emerald-950 border-emerald-900/15'
                        }`}
                    >
                      <span>🫘</span>
                      <span>{language === 'hi' ? 'दालें / दलहन (Pulses)' : 'Pulses'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCategory('Grains');
                        if (!editingCropId) handleLoadSamplePhotosForCategory('Grains');
                      }}
                      className={`p-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 border transition ${category === 'Grains'
                          ? 'bg-emerald-800 text-amber-200 border-amber-400 shadow'
                          : 'bg-white/90 hover:bg-emerald-50 text-emerald-950 border-emerald-900/15'
                        }`}
                    >
                      <span>🌾</span>
                      <span>{language === 'hi' ? 'अनाज (Grains)' : 'Grains'}</span>
                    </button>
                  </div>
                </div>

                {/* Existing Unlisted Crops Fast Picker for Updating */}
                {(customCropSubMode === 'update' || unlistedCustomCrops.length > 0) && (
                  <div className="pt-2 border-t border-emerald-900/10 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-extrabold text-emerald-950">
                      <span className="flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                        <span>{language === 'hi' ? 'अपडेट करने हेतु पंजीकृत अनलिस्टेड फसल चुनें:' : 'Pick Unlisted Crop to Update:'}</span>
                      </span>
                      <span className="text-[11px] text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md font-mono">
                        {unlistedCustomCrops.length} {language === 'hi' ? 'फसलें' : 'Crops'}
                      </span>
                    </div>

                    {unlistedCustomCrops.length === 0 ? (
                      <div className="p-3 bg-white/60 rounded-xl text-center text-xs text-emerald-900/70">
                        {language === 'hi'
                          ? 'अभी तक कोई अनलिस्टेड फसल पंजीकृत नहीं है। ऊपर दिए गए फॉर्म से नयी फसल जोड़ें।'
                          : 'No custom unlisted crops found yet. Add one using the form below.'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                        <button
                          type="button"
                          onClick={() => handleStartCustomProduce()}
                          className="p-2.5 px-3.5 rounded-xl flex items-center gap-1.5 shrink-0 transition bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs border border-amber-600 shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{language === 'hi' ? '➕ नयी अनलिस्टेड' : '➕ New Unlisted'}</span>
                        </button>
                        {unlistedCustomCrops.map((c) => {
                          const isCurrentlyEditing = editingCropId === c.id;
                          const cropThumb = (c.photos && c.photos[0]) || c.imageUrl;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => handleStartEditCrop(c)}
                              className={`p-2 rounded-xl flex items-center gap-2 shrink-0 transition text-left border ${isCurrentlyEditing
                                  ? 'bg-[#0F3826] text-amber-200 border-amber-400 ring-2 ring-amber-400/40 shadow'
                                  : 'bg-white hover:bg-amber-50 text-emerald-950 border-emerald-900/20'
                                }`}
                            >
                              <img
                                src={cropThumb}
                                alt={c.crop || c.crop_name}
                                className="w-10 h-10 object-cover rounded-lg border border-amber-500/30 shrink-0"
                              />
                              <div className="min-w-0 pr-1">
                                <div className="font-extrabold text-xs truncate max-w-[130px]">
                                  {c.crop || c.crop_name}
                                </div>
                                <div className="text-[10px] opacity-80 flex items-center gap-1">
                                  <span>₹{c.priceRupees || (c.pricePaise ? c.pricePaise / 100 : 40)}</span>
                                  <span>•</span>
                                  <span>{c.category}</span>
                                </div>
                              </div>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold shrink-0 ${isCurrentlyEditing ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-100 text-emerald-900'
                                }`}>
                                {isCurrentlyEditing ? 'Editing' : 'Update'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Active Editing Notification Banner */}
                {editingCropId && (
                  <div className="p-3 bg-amber-400/20 border-2 border-amber-500/50 rounded-xl flex items-center justify-between gap-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping shrink-0" />
                      <div>
                        <span className="text-xs font-black text-emerald-950">
                          {language === 'hi' ? '✏️ संपादन मोड सक्रिय:' : '✏️ Edit Mode Active:'}{' '}
                          <span className="text-amber-900 underline">{cropName}</span> ({category})
                        </span>
                        <p className="text-[10px] text-emerald-900/70">
                          {language === 'hi'
                            ? 'नीचे दिए गए विवरण व फोटो बदलकर "फसल अपडेट करें" पर क्लिक करें।'
                            : 'Update fields & photos below, then click "Update Crop" to sync with Buyer Desk.'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-700 font-extrabold text-[11px] rounded-lg border border-red-300 transition shrink-0"
                    >
                      {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Quick Insert Form Container */}
          <form onSubmit={handleAddProduce} className="space-y-6 pt-2">
            {/* Upper: Product Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'फसल का नाम (अंग्रेज़ी / मुख्य)' : 'Crop Name (Primary)'}
                </label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'फसल का हिंदी नाम' : 'Crop Hindi Name'}
                </label>
                <input
                  type="text"
                  value={cropNameHi}
                  onChange={(e) => setCropNameHi(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'श्रेणी (Category)' : 'Category'}
                </label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                >
                  <option value="Vegetables">{language === 'hi' ? 'सब्जियाँ (Vegetables)' : 'Vegetables'}</option>
                  <option value="Fruits">{language === 'hi' ? 'फल (Fruits)' : 'Fruits'}</option>
                  <option value="Pulses">{language === 'hi' ? 'दालें / दलहन (Pulses)' : 'Pulses'}</option>
                  <option value="Grains">{language === 'hi' ? 'अनाज (Grains)' : 'Grains'}</option>
                </select>
              </div>
            </div>

            {/* ===================================================
                MIDDLE: 2 PHOTO MANDATORY & MAXIMUM 6 PHOTO MANAGER
                =================================================== */}
            <div className="p-4 sm:p-5 bg-emerald-950/5 rounded-2xl border-2 border-emerald-900/15 space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-600" />
                  <div>
                    <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                      {language === 'hi' ? 'फसल की तस्वीरें (2 से 6 फोटो अनिवार्य)' : 'Crop Photos (2 to 6 Photos Mandatory)'}
                    </h3>
                    <p className="text-[11px] text-emerald-800/80">
                      {language === 'hi'
                        ? 'कैमरा/गैलरी से अपलोड करें, लिंक डालें, या नीचे 1-क्लिक ऑटो-सजेस्ट से तुरंत 3 फोटो लगाएं।'
                        : 'Upload from camera/device, paste link, or use 1-click auto-suggest.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick 1-Click Auto-Suggest Photos button */}
                  <button
                    type="button"
                    onClick={() => handleLoadSamplePhotosForCategory(category)}
                    className="px-3 py-1.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-300 font-bold rounded-xl text-[11px] flex items-center gap-1.5 shadow transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'hi' ? '✨ 3 फोटो ऑटो-सजेस्ट करें' : '✨ Auto-Suggest Photos'}</span>
                  </button>

                  {/* Photo Counter Pill */}
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${photos.length >= 2 && photos.length <= 6
                        ? 'bg-emerald-700 text-white'
                        : 'bg-red-600 text-white animate-pulse'
                      }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>
                      {language === 'hi' ? 'तस्वीरें: ' : 'Photos: '}
                      {photos.length} / 6
                    </span>
                    <span>{photos.length >= 2 ? '✓' : '(न्यूनतम 2 अनिवार्य)'}</span>
                  </div>
                </div>
              </div>

              {/* Photo Error Banner if under 2 photos */}
              {photoError && (
                <div className="p-2.5 bg-red-100/90 border border-red-300 text-red-800 rounded-xl text-xs flex items-center gap-2 font-bold animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{photoError}</span>
                </div>
              )}

              {/* Photos Preview Gallery (2 to 6 Photos) */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {photos.map((ph, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border-2 border-emerald-900/20 shadow bg-white h-28"
                  >
                    <img src={ph} alt={`Produce Angle ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 shadow transition"
                      title={language === 'hi' ? 'तस्वीर हटाएं' : 'Remove photo'}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 right-1 bg-amber-500 text-emerald-950 font-extrabold text-[8px] text-center py-0.5 rounded shadow">
                        {language === 'hi' ? 'मुख्य लोगो/फोटो' : 'Side Logo / Main'}
                      </span>
                    )}
                  </div>
                ))}

                {/* Upload More Photos Trigger (supports multiple selection from camera or files) */}
                {photos.length < 6 && (
                  <label className="h-28 border-2 border-dashed border-emerald-900/30 hover:border-amber-500 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-white/70 hover:bg-amber-50/50 transition p-2 text-center text-emerald-950 group">
                    <Camera className="w-6 h-6 text-amber-600 mb-1 group-hover:scale-110 transition" />
                    <span className="text-[11px] font-black leading-tight">
                      {language === 'hi' ? '+ कैमरा / गैलरी' : '+ Camera / File'}
                    </span>
                    <span className="text-[9px] text-emerald-800/70 font-semibold">
                      ({photos.length}/6 फ़ोटो)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Add by URL input */}
              {photos.length < 6 && (
                <div className="flex gap-2 pt-1">
                  <input
                    type="url"
                    placeholder={
                      language === 'hi'
                        ? 'या फोटो का वेब लिंक (URL) यहाँ डालें...'
                        : 'Or paste image URL (e.g. Unsplash or Cloud URL)...'
                    }
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddUrlPhoto}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-sm transition"
                  >
                    {language === 'hi' ? 'लिंक जोड़ें' : 'Add URL'}
                  </button>
                </div>
              )}
            </div>

            {/* ===================================================
                NICHE: PRODUCT DETAILS (Stock, Pricing, Location, Grade)
                =================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'मात्रा (Quantity)' : 'Quantity'}
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    required
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="px-2 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold"
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">quintal</option>
                    <option value="packet">packet</option>
                    <option value="dozen">dozen</option>
                    <option value="piece">piece</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'वांछित मूल्य (₹ / यूनिट)' : 'Expected Price (₹/unit)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={basePriceRupees}
                  onChange={(e) => setBasePriceRupees(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'गुणवत्ता ग्रेड (Grade)' : 'Quality Grade'}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold"
                >
                  <option value="उच्चतम श्रेणी A+">उच्चतम श्रेणी A+ (Premium)</option>
                  <option value="ग्रेड A">ग्रेड A (Standard Market)</option>
                  <option value="ग्रेड B">ग्रेड B (Bulk Commercial)</option>
                  <option value="100% जैविक (Organic Certified)">100% जैविक (Organic Certified)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  {language === 'hi' ? 'संकलन मंडी केंद्र' : 'Collection Hub Location'}
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Organic Checkbox & Submit */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-emerald-900/10">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-950">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded focus:ring-amber-500"
                />
                <span>{language === 'hi' ? 'यह फसल 100% प्राकृतिक/जैविक प्रमाणित है' : '100% Certified Organic produce'}</span>
              </label>

              <div className="flex items-center gap-3">
                {editingCropId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-3.5 bg-gray-200 hover:bg-gray-300 text-emerald-950 font-bold rounded-2xl transition text-xs"
                  >
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || photos.length < 2 || photos.length > 6}
                  className={`px-8 py-3.5 font-extrabold rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${editingCropId
                      ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-emerald-950 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-emerald-800 via-[#0F3826] to-emerald-950 hover:from-emerald-700 hover:to-emerald-900 text-amber-50'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>
                        {editingCropId
                          ? (language === 'hi' ? 'अपडेट हो रहा है...' : 'Updating...')
                          : (language === 'hi' ? 'दर्ज हो रहा है...' : 'Publishing to Buyer...')}
                      </span>
                    </>
                  ) : editingCropId ? (
                    <>
                      <Save className="w-4 h-4 text-emerald-950" />
                      <span>
                        {language === 'hi'
                          ? `फसल अपडेट करें (${photos.length} फोटो) → खरीदार डेस्क पर अपडेट करें`
                          : `Update Crop (${photos.length} Photos) → Refresh on Buyer Desk`}
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>
                        {language === 'hi'
                          ? `फसल दर्ज करें (${photos.length} फोटो) → खरीदार डेस्क भेजें`
                          : `Publish Crop (${photos.length} Photos) → to Buyer Desk`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

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

        {/* ===================================================
            REGISTERED PRODUCE LISTINGS: BULMA RESPONSIVE CARDS
            =================================================== */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-xl text-emerald-950 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <span>{language === 'hi' ? 'मेरी पंजीकृत फसलें' : 'My Registered Crops'}</span>
              </h3>
              <p className="text-xs text-emerald-800/70">
                {language === 'hi'
                  ? 'आपकी फसल सफलतापूर्वक आपकी फसल सूची में जोड़ दी गई है और अब यह प्लेटफॉर्म पर उपलब्ध है।'
                  : 'Your crop has been added successfully to your crop list and is now available on the platform.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                {myListings.length} {language === 'hi' ? 'सक्रिय फसलें' : 'Active Crops'}
              </span>
              <div className="flex items-center bg-white border border-emerald-900/15 rounded-xl p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewFormat('bulma')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${viewFormat === 'bulma' ? 'bg-[#0F3826] text-amber-100' : 'text-emerald-900'
                    }`}
                >
                  {language === 'hi' ? 'Bulma कार्ड्स' : 'Bulma Cards'}
                </button>
                <button
                  type="button"
                  onClick={() => setViewFormat('table')}
                  className={`px-3 py-1 rounded-lg font-bold transition ${viewFormat === 'table' ? 'bg-[#0F3826] text-amber-100' : 'text-emerald-900'
                    }`}
                >
                  {language === 'hi' ? 'तालिका' : 'Table'}
                </button>
              </div>
            </div>
          </div>

          {myListings.length === 0 ? (
            <div className="py-16 px-4 text-center bg-white/70 border-2 border-dashed border-emerald-900/15 rounded-3xl space-y-3">
              <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center">
                <Tractor className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-emerald-950 text-lg">
                  {language === 'hi' ? 'अभी आपकी कोई फसल पंजीकृत नहीं है' : 'No produce registered yet'}
                </h4>
                <p className="text-xs text-emerald-800/70 max-w-sm mx-auto mt-1">
                  {language === 'hi'
                    ? 'ऊपर दिए गए प्रविष्टि अनुभाग से अपनी फसल 2 से 6 तस्वीरों के साथ दर्ज करें।'
                    : 'Use the produce insert board above to add crops with 2-6 photos.'}
                </p>
              </div>
            </div>
          ) : viewFormat === 'bulma' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((crop) => (
                <div key={crop.id} className="relative group/wrapper">
                  <BulmaProductCard
                    id={crop.id}
                    crop_name={crop.crop || crop.crop_name}
                    crop_name_hi={crop.crop_name_hi}
                    category={crop.category || 'Vegetables'}
                    variety={crop.variety}
                    quantity_kg={crop.qty || crop.quantity_available}
                    price_paise_per_kg={crop.pricePaise || Math.round(parseFloat(crop.priceRupees) * 100)}
                    quality_grade={crop.grade}
                    cv_trust_score={crop.cvTrustScore || 98}
                    harvest_date={crop.harvestDate || '2026-09-08'}
                    is_organic={crop.isOrganic || 0}
                    farmer_name={crop.farmer_name || userName || 'किसान (Farmer)'}
                    location={crop.location}
                    images={crop.photos || [crop.imageUrl]}
                    unit={crop.unit || 'kg'}
                    badge={language === 'hi' ? 'मेरी फसल' : 'My Crop'}
                  />

                  {/* Action Buttons overlay on top right: Edit & Delete */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleStartEditCrop(crop)}
                      className="p-2 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-md transition flex items-center gap-1"
                      title={language === 'hi' ? 'फसल विवरण व फोटो अपडेट करें' : 'Edit / Update Crop'}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(crop.id, crop.crop || crop.crop_name)}
                      className="p-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl shadow-md transition"
                      title={language === 'hi' ? 'सत्यापन करके हटाएं' : 'Delete listing'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {myListings.map((crop) => (
                <div
                  key={crop.id}
                  className="p-4 bg-white rounded-2xl border border-emerald-900/10 shadow-sm flex items-center justify-between gap-3 group hover:border-emerald-900/20 transition"
                >
                  <img
                    src={crop.imageUrl || (crop.photos && crop.photos[0])}
                    alt={crop.crop}
                    className="w-14 h-14 object-cover rounded-xl border border-emerald-900/10 shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                      {getLocalizedGrade(crop.grade, language)}
                    </span>
                    <h4 className="font-extrabold text-emerald-950 text-base mt-1 truncate">
                      {getLocalizedCropName(crop.crop || crop.crop_name, language)}
                    </h4>
                    <p className="text-xs text-emerald-800/70 mt-0.5 truncate">
                      {crop.qty || crop.quantity_available} {crop.unit || 'kg'} • {getLocalizedLocation(crop.location, language)} •{' '}
                      <span className="font-mono text-emerald-800">
                        {crop.photos ? `${crop.photos.length} फोटो` : '2 फोटो'}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-amber-800">
                        ₹{crop.priceRupees} <span className="text-xs font-normal text-emerald-900">/ {crop.unit || 'kg'}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                        {crop.status || 'सत्यापित फसल'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStartEditCrop(crop)}
                      className="p-2 text-amber-800 hover:text-amber-950 hover:bg-amber-100 rounded-xl transition"
                      title={language === 'hi' ? 'फसल विवरण व फोटो अपडेट करें' : 'Edit / Update Crop'}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(crop.id, crop.crop || crop.crop_name)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition"
                      title={language === 'hi' ? 'हटाएं' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Green Pulse Success Signal Toast */}
        {successSignal && (
          <div className="fixed bottom-6 right-6 z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-[#0F3826] text-amber-50 shadow-2xl border border-emerald-500/40 animate-fadeIn">
            {typeof successSignal === 'string' ? (
              <div className="flex items-center gap-3 px-5 py-3.5">
                <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-full animate-pulse">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-xs font-medium text-amber-100/90">{successSignal}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b border-emerald-500/20 px-4 py-3">
                  <img
                    src={successSignal.logo}
                    alt={successSignal.cropName}
                    className="h-12 w-12 shrink-0 rounded-xl border-2 border-amber-400/70 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                      {language === 'hi' ? 'फसल सफलतापूर्वक दर्ज' : 'Crop registered successfully'}
                    </p>
                    <h3 className="truncate text-sm font-extrabold text-amber-50">
                      {language === 'hi' ? successSignal.cropNameHi : successSignal.cropName}
                    </h3>
                    <p className="truncate text-[11px] text-emerald-200/80">
                      {language === 'hi' ? successSignal.cropName : successSignal.cropNameHi}
                    </p>
                  </div>
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-400" />
                </div>

                <div className="grid grid-cols-3 gap-1.5 bg-emerald-950/40 p-3">
                  {successSignal.photos.map((photo, index) => (
                    <img
                      key={`${photo}-${index}`}
                      src={photo}
                      alt={`${successSignal.cropName} ${index + 1}`}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                  ))}
                </div>

                <div className="border-t border-emerald-500/20 px-4 py-3">
                  <p className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                    {language === 'hi' ? 'फसल विवरण' : 'Crop details'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {successSignal.details.map((detail) => (
                      <span key={detail} className="rounded-md bg-emerald-900/80 px-2 py-1 text-[10px] font-bold text-emerald-100">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Security Verification Modal Before Deletion */}
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
              </div>

              {deleteError && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 font-bold">
                  {deleteError}
                </div>
              )}

              <form onSubmit={handleConfirmDelete} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    {language === 'hi' ? 'सत्यापन हेतु ईमेल (Account Email)' : 'Account Email'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-emerald-800/60" />
                    <input
                      type="email"
                      required
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

        {/* Modal for Adding/Updating Produce (Alternative Popup Interface) */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
            <div className="bg-[#FAF5EB] rounded-3xl p-6 w-full max-w-2xl shadow-2xl border border-emerald-900/20 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-900 font-extrabold text-[10px] rounded-full border border-amber-500/30">
                      {editingCropId ? (language === 'hi' ? '✏️ फसल अपडेट मोड' : '✏️ Edit Produce Mode') : (language === 'hi' ? '➕ नयी प्रविष्टि' : '➕ New Entry')}
                    </span>
                    <span className="text-[11px] text-emerald-800 font-bold">2-6 फोटो अनिवार्य</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-emerald-950 mt-0.5">
                    {editingCropId
                      ? (language === 'hi' ? `फसल अपडेट करें: "${cropName}"` : `Update Produce: "${cropName}"`)
                      : (language === 'hi' ? 'नयी फसल दर्ज करें (2 से 6 तस्वीरें अनिवार्य)' : 'Register Produce (2-6 Photos Mandatory)')}
                  </h3>
                  <p className="text-xs text-emerald-800/70">
                    {language === 'hi'
                      ? 'किसान डेस्क बोर्ड से खरीदार पोर्टल तक सीधा प्रवाह • 352 कैटलॉग अथवा अनलिस्टेड उत्पाद'
                      : 'Direct pipeline from Farmer Desk to Buyer • 352 Catalog or Unlisted Produce'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    if (editingCropId) handleCancelEdit();
                  }}
                  className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Switcher inside Modal */}
              <div className="flex items-center gap-2 p-1.5 bg-emerald-950/10 rounded-2xl flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    if (editingCropId) handleCancelEdit();
                    setProduceSourceMode('catalog');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${produceSourceMode === 'catalog' && !editingCropId
                      ? 'bg-[#0F3826] text-amber-300 shadow'
                      : 'text-emerald-950 hover:bg-emerald-100/70'
                    }`}
                >
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'hi' ? '352+ कैटलॉग से चुनें' : '352+ Catalog Produce'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStartCustomProduce()}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${produceSourceMode === 'custom' && !editingCropId
                      ? 'bg-[#0F3826] text-amber-300 shadow'
                      : 'text-emerald-950 hover:bg-emerald-100/70'
                    }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'hi' ? '➕ नया अनलिस्टेड (जो 352 में नहीं है)' : '➕ Add Unlisted (Not in 352)'}</span>
                </button>
              </div>

              {/* Active Edit Alert Banner in Modal */}
              {editingCropId && (
                <div className="p-3 bg-amber-400/25 border-2 border-amber-500/60 rounded-2xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping shrink-0" />
                    <div>
                      <span className="text-xs font-black text-emerald-950">
                        {language === 'hi' ? '✏️ संपादन मोड सक्रिय:' : '✏️ Edit Mode Active:'} <span className="text-amber-900 underline">{cropName}</span>
                      </span>
                      <p className="text-[11px] text-emerald-900/80">
                        {language === 'hi' ? 'विवरण या तस्वीरें बदलकर नीचे "फसल अपडेट करें" दबाएं।' : 'Modify details/photos and click "Update Crop" below.'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-700 font-extrabold text-[11px] rounded-lg border border-red-300 shrink-0"
                  >
                    {language === 'hi' ? 'रद्द करें' : 'Cancel Edit'}
                  </button>
                </div>
              )}

              {/* Autocomplete from Catalog Dropdown */}
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-900/10 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-emerald-950">
                    {language === 'hi' ? '352+ कैटलॉग या अनलिस्टेड फसल चुनें:' : 'Select from 352+ Catalog or Unlisted:'}
                  </label>
                  {unlistedCustomCrops.length > 0 && (
                    <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                      ✨ {unlistedCustomCrops.length} {language === 'hi' ? 'अनलिस्टेड फसलें' : 'Unlisted Crops'}
                    </span>
                  )}
                </div>
                <select
                  value={selectedCatalogId}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '__new_unlisted__') {
                      handleStartCustomProduce();
                    } else if (val.startsWith('custom_')) {
                      const unlisted = unlistedCustomCrops.find((it) => `custom_${it.id}` === val);
                      if (unlisted) handleStartEditCrop(unlisted);
                    } else {
                      const found = FULL_CROP_CATALOG.find((it) => it.id === val);
                      if (found) handleSelectCatalogItem(found);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-emerald-50/50 border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="__new_unlisted__">
                    ➕ {language === 'hi' ? 'नया उत्पाद जोड़ें (जो 352 कैटलॉग में नहीं है)' : 'Add New Produce (Not in 352 Catalog)'}
                  </option>
                  {unlistedCustomCrops.length > 0 && (
                    <optgroup label="✨ मेरी अनलिस्टेड फसलें (Custom Unlisted Produce)">
                      {unlistedCustomCrops.map((c) => (
                        <option key={c.id} value={`custom_${c.id}`}>
                          ✨ {c.crop_name_hi || c.crop || c.crop_name} ({c.crop || c.crop_name}) - ₹{c.priceRupees || (c.pricePaise ? (c.pricePaise / 100).toFixed(2) : '40')}/{c.unit || 'kg'}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup label="100 Vegetables (सब्जियाँ)">
                    {VEGETABLES_CATALOG.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameHi} ({c.name}) - ₹{c.priceRupees}/{c.unit}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="100 Fruits (फल)">
                    {FRUITS_CATALOG.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameHi} ({c.name}) - ₹{c.priceRupees}/{c.unit}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="100 Pulses (दालें / दलहन)">
                    {PULSES_CATALOG.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameHi} ({c.name}) - ₹{c.priceRupees}/{c.unit}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="52 Grains (अनाज)">
                    {GRAINS_CATALOG.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameHi} ({c.name}) - ₹{c.priceRupees}/{c.unit}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Photo Manager inside Modal */}
              <div className="p-4 bg-emerald-950/5 rounded-2xl border border-emerald-900/10 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-emerald-950">
                      {language === 'hi' ? 'फसल की तस्वीरें (2-6 अनिवार्य):' : 'Crop Photos (2-6 Mandatory):'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleLoadSamplePhotosForCategory(category)}
                      className="px-2.5 py-1 bg-[#0F3826] hover:bg-emerald-900 text-amber-300 font-bold rounded-lg text-[10px] flex items-center gap-1 shadow"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{language === 'hi' ? '3 फोटो ऑटो-सजेस्ट' : 'Auto-Suggest 3'}</span>
                    </button>

                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${photos.length >= 2 && photos.length <= 6
                          ? 'bg-emerald-700 text-white'
                          : 'bg-red-600 text-white animate-pulse'
                        }`}
                    >
                      {photos.length} / 6
                    </span>
                  </div>
                </div>

                {photoError && (
                  <div className="p-2.5 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-bold">
                    {photoError}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  {photos.map((ph, idx) => (
                    <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-emerald-900/20 bg-white shadow-xs">
                      <img src={ph} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs shadow"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1 rounded font-bold">
                        #{idx + 1}
                      </span>
                    </div>
                  ))}
                  {photos.length < 6 && (
                    <label className="h-24 border-2 border-dashed border-emerald-900/30 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-emerald-50 text-center p-2">
                      <Camera className="w-5 h-5 text-amber-600" />
                      <span className="text-[10px] font-bold text-emerald-950">+ फोटो</span>
                      <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>

                {photos.length < 6 && (
                  <div className="flex gap-2 pt-1">
                    <input
                      type="url"
                      placeholder={language === 'hi' ? 'फोटो वेब लिंक (URL) डालें...' : 'Or paste photo URL...'}
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddUrlPhoto}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-sm"
                    >
                      {language === 'hi' ? 'जोड़ें' : 'Add'}
                    </button>
                  </div>
                )}
              </div>

              {/* Product Details Form */}
              <form onSubmit={handleAddProduce} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      {language === 'hi' ? 'फसल नाम' : 'Crop Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      {language === 'hi' ? 'श्रेणी (Category)' : 'Category'}
                    </label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold"
                    >
                      <option value="Vegetables">{language === 'hi' ? 'सब्जियाँ (Vegetables)' : 'Vegetables'}</option>
                      <option value="Fruits">{language === 'hi' ? 'फल (Fruits)' : 'Fruits'}</option>
                      <option value="Pulses">{language === 'hi' ? 'दालें / दलहन (Pulses)' : 'Pulses'}</option>
                      <option value="Grains">{language === 'hi' ? 'अनाज (Grains)' : 'Grains'}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      {language === 'hi' ? 'मात्रा' : 'Quantity'}
                    </label>
                    <input
                      type="number"
                      required
                      value={quantityKg}
                      onChange={(e) => setQuantityKg(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      {language === 'hi' ? 'मूल्य दर (₹)' : 'Price Rate (₹)'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={basePriceRupees}
                      onChange={(e) => setBasePriceRupees(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950 mb-1">
                    {language === 'hi' ? 'मंडी संकलन स्थान' : 'Hub Location'}
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      if (editingCropId) handleCancelEdit();
                    }}
                    className="flex-1 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition"
                  >
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || photos.length < 2 || photos.length > 6}
                    className={`flex-1 py-3 font-extrabold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 ${editingCropId
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-emerald-950'
                        : 'bg-[#0F3826] hover:bg-emerald-900 text-amber-50'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>{editingCropId ? (language === 'hi' ? 'अपडेट हो रहा है...' : 'Updating...') : (language === 'hi' ? 'दर्ज हो रहा है...' : 'Registering...')}</span>
                      </>
                    ) : editingCropId ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-950" />
                        <span>{language === 'hi' ? `फसल अपडेट करें (${photos.length} फोटो)` : `Update Crop (${photos.length} Photos)`}</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 text-amber-400" />
                        <span>{language === 'hi' ? `सत्यापित करके बाज़ार में भेजें (${photos.length} फोटो)` : `Publish Produce (${photos.length} Photos)`}</span>
                      </>
                    )}
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
