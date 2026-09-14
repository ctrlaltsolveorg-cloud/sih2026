'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { getLocalizedCropName, getLocalizedGrade } from '@/lib/i18n';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Lock,
  LogIn,
  UserCheck,
  ShieldAlert,
  AlertCircle,
  MapPin,
  Phone,
  User,
  Home,
  Building2,
  Store,
  FileText,
  ChevronLeft,
  Truck,
  CreditCard,
  Check,
} from 'lucide-react';

const INDIAN_STATES = [
  'Maharashtra',
  'Punjab',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Gujarat',
  'Rajasthan',
  'Haryana',
  'West Bengal',
  'Bihar',
  'Karnataka',
  'Tamil Nadu',
  'Andhra Pradesh',
  'Telangana',
  'Delhi NCR',
  'Kerala',
  'Odisha',
  'Assam',
  'Jharkhand',
  'Uttarakhand',
  'Himachal Pradesh',
  'Chhattisgarh',
  'Jammu & Kashmir',
];

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const { language } = useLanguage();
  const { isAuthenticated, user, openAuthModal } = useAuth();

  // State management
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [contractId, setContractId] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [deliveryOtpCode, setDeliveryOtpCode] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Dedicated Checkout Popup State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'ADDRESS' | 'CONFIRM' | 'SUCCESS'>('ADDRESS');
  const [userConfirmedIdentity, setUserConfirmedIdentity] = useState(true);

  // Flipkart/Amazon-style comprehensive mandatory shipping details
  const [shippingForm, setShippingForm] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kb_buyer_shipping_address');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      fullName: 'Piyush Kumar',
      mobileNumber: '9999999999',
      altPhone: '9811122233',
      pincode: '411014',
      flatBuilding: 'Flat 402, Green Acres Apartment',
      areaStreet: 'Viman Nagar Main Road, Clover Park',
      landmark: 'Near Agri Collection Hub & Symbiosis',
      postOffice: 'Viman Nagar Post Office',
      district: 'Pune',
      state: 'Maharashtra',
      addressType: 'HOME' as 'HOME' | 'WORK' | 'MANDI_SHOP',
      deliveryInstructions: 'Call upon arrival; deliver at gate',
    };
  });

  // Sync user name/phone into shippingForm when logged in
  useEffect(() => {
    if (user) {
      setShippingForm((prev: any) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        mobileNumber: prev.mobileNumber || user.phone || '',
      }));
    }
  }, [user]);

  if (!isCartOpen && !isCheckoutModalOpen) return null;

  const subtotalPaise = cart.reduce(
    (acc, item) => acc + Math.round(item.pricePaisePerKg * item.quantityKg),
    0
  );
  const logisticsFeePaise = Math.round(subtotalPaise * 0.04);
  const totalPaise = subtotalPaise + logisticsFeePaise;

  const validateShippingForm = () => {
    if (!shippingForm.fullName.trim()) return 'कृपया प्राप्तकर्ता का पूरा नाम दर्ज करें (Recipient Name is mandatory)';
    if (!shippingForm.mobileNumber.trim() || shippingForm.mobileNumber.replace(/\D/g, '').length < 10) {
      return 'कृपया 10-अंकीय वैध मोबाइल नंबर दर्ज करें (Valid 10-digit mobile is mandatory)';
    }
    if (!shippingForm.pincode.trim() || shippingForm.pincode.replace(/\D/g, '').length !== 6) {
      return 'कृपया 6-अंकीय वैध पिन कोड दर्ज करें (Valid 6-digit PIN code is mandatory)';
    }
    if (!shippingForm.flatBuilding.trim()) return 'कृपया मकान / फ्लैट / बिल्डिंग विवरण दर्ज करें (Flat/House No is mandatory)';
    if (!shippingForm.areaStreet.trim()) return 'कृपया सड़क / मोहल्ला / क्षेत्र दर्ज करें (Street/Area is mandatory)';
    if (!shippingForm.landmark.trim()) return 'कृपया नजदीकी लैंडमार्क दर्ज करें (Landmark is mandatory)';
    if (!shippingForm.postOffice.trim()) return 'कृपया डाकघर / कस्बा दर्ज करें (Post Office is mandatory)';
    if (!shippingForm.district.trim()) return 'कृपया शहर / जिला दर्ज करें (District/City is mandatory)';
    if (!shippingForm.state.trim()) return 'कृपया राज्य चुनें (State is mandatory)';
    return null;
  };

  // Open Checkout Popup
  const handleProceedToCheckout = () => {
    if (!isAuthenticated || !user) {
      openAuthModal('login');
      return;
    }
    if (cart.length === 0) return;
    setCheckoutError(null);
    setCheckoutStep('ADDRESS');
    setIsCheckoutModalOpen(true);
  };

  // Step 1 -> Step 2 Review
  const handleReviewOrder = () => {
    const validationErr = validateShippingForm();
    if (validationErr) {
      setCheckoutError(validationErr);
      return;
    }
    setCheckoutError(null);
    setCheckoutStep('CONFIRM');
  };

  // Step 2 Confirm & Place Order
  const handleConfirmCheckout = async () => {
    if (!userConfirmedIdentity) {
      setCheckoutError('कृपया आदेश की पुष्टि के लिए नियम व पहचान सत्यापन चेकबॉक्स पर टिक करें।');
      return;
    }

    const validationErr = validateShippingForm();
    if (validationErr) {
      setCheckoutError(validationErr);
      return;
    }

    setIsSubmitting(true);
    setCheckoutError(null);

    // Save shipping details for future autofill
    try {
      localStorage.setItem('kb_buyer_shipping_address', JSON.stringify(shippingForm));
    } catch (e) {}

    const canonicalAddress = `${shippingForm.fullName} | Phone: ${shippingForm.mobileNumber}${
      shippingForm.altPhone ? ', Alt: ' + shippingForm.altPhone : ''
    } | ${shippingForm.flatBuilding}, ${shippingForm.areaStreet}, Landmark: ${
      shippingForm.landmark
    }, P.O.: ${shippingForm.postOffice}, ${shippingForm.district}, ${shippingForm.state} - ${
      shippingForm.pincode
    } (${shippingForm.addressType})`;

    try {
      const payload = {
        buyerId: user?.id || 'u_buyer_1',
        buyerName: shippingForm.fullName.trim() || user?.name || 'Verified Buyer',
        buyerPhone: shippingForm.mobileNumber.trim() || user?.phone || '9811122233',
        buyerEmail: user?.email || 'buyer@kisanbandhan.ai',
        shipping: shippingForm,
        deliveryAddress: canonicalAddress,
        deliveryType: 'EXPRESS',
        paymentMethod,
        notes: `Direct Farm Purchase by ${shippingForm.fullName} (ID: ${
          user?.id || 'u_buyer_1'
        }) | ${shippingForm.deliveryInstructions}`,
        items: cart.map((it) => ({
          listingId: it.listingId,
          cropName: it.cropName,
          quantity: it.quantityKg,
          unitPricePaise: it.pricePaisePerKg,
          unit: 'kg',
        })),
      };

      const res = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.message || data.error || 'Failed to place order');
      }

      setPlacedOrderId(data.orderId || data.order?.id || `ord_${Date.now()}`);
      setContractId(data.smartContractHash || data.order?.contract_id || `KB-ESCROW-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
      setDeliveryOtpCode(data.deliveryOtp || data.order?.delivery_otp || '4829');

      // Local storage active orders cache for 0ms refresh hydration
      try {
        const existingLocal = JSON.parse(localStorage.getItem('kb_buyer_active_orders') || '[]');
        const newOrderObj = {
          ...data.order,
          recipient_name: shippingForm.fullName,
          recipient_phone: shippingForm.mobileNumber,
          alt_phone: shippingForm.altPhone,
          shipping: shippingForm,
          delivery_address: canonicalAddress,
          status: 'Placed',
          payment_status: 'ESCROW_LOCKED',
          created_at: new Date().toISOString(),
          items: cart.map((it) => ({
            crop_name: it.cropName,
            quantity: it.quantityKg,
            unit: 'kg',
            unit_price_paise: it.pricePaisePerKg,
          })),
          total_rupees: (totalPaise / 100).toFixed(2),
          delivery_otp: data.order?.delivery_otp || '4829',
          pickup_otp: data.order?.pickup_otp || '7137',
        };
        localStorage.setItem(
          'kb_buyer_active_orders',
          JSON.stringify([newOrderObj, ...existingLocal.filter((o: any) => o.id !== newOrderObj.id)])
        );
      } catch (e) {}

      setCheckoutStep('SUCCESS');
    } catch (err: any) {
      setCheckoutError(err.message || 'त्रुटि: ऑर्डर प्रोसेस नहीं हो सका।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishAndGoToDashboard = () => {
    setIsCheckoutModalOpen(false);
    clearCart();
    setIsCartOpen(false);

    if (typeof window !== 'undefined') {
      window.location.href = '/buyer#active-orders';
    }
  };

  return (
    <>
      {/* 1. SLIDE-OVER CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
          <div className="w-full max-w-md bg-[#FAF5EB] dark:bg-[#081710] text-[#1A2E26] dark:text-[#E2E8F0] h-full shadow-2xl flex flex-col border-l border-emerald-900/10 dark:border-emerald-500/20 transition-colors duration-200">
            {/* Header */}
            <div className="p-5 bg-[#0F3826] text-amber-50 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">
                    {language === 'hi' ? 'आपकी खरीदारी टोकरी' : 'Your Shopping Cart'}
                  </h2>
                  <p className="text-xs text-amber-200/80">
                    {cart.length > 0 ? `${cart.length} फसलें चुनी गईं` : 'खाली टोकरी'} • प्रत्यक्ष किसान प्रेषण
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-emerald-800 rounded-full transition"
              >
                <X className="w-5 h-5 text-amber-100" />
              </button>
            </div>

            {/* Scrollable Cart Items Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-emerald-800/60 dark:text-emerald-400/60 text-center py-16">
                  <div className="w-16 h-16 bg-emerald-900/5 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-3">
                    <ShoppingBag className="w-8 h-8 text-emerald-800/40 dark:text-emerald-300/60" />
                  </div>
                  <p className="font-bold text-emerald-950 dark:text-amber-100 text-base mb-1">आपकी टोकरी खाली है</p>
                  <p className="text-xs text-emerald-800/70 dark:text-emerald-300/70 max-w-xs">
                    मंडी और खेत से ताज़ा फ़सलें जोड़ने के लिए मार्केटप्लेस में जाएं।
                  </p>
                </div>
              ) : (
                cart.map((item) => {
                  const itemTotalPaise = Math.round(item.pricePaisePerKg * item.quantityKg);
                  return (
                    <div
                      key={item.listingId}
                      className="p-3.5 bg-white dark:bg-[#0d2218] rounded-2xl border border-emerald-900/10 dark:border-emerald-500/20 shadow-sm flex items-center justify-between gap-3 hover:border-emerald-900/25 transition"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm text-emerald-950 dark:text-amber-100 truncate">
                            {getLocalizedCropName(item.cropName, language)}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 rounded-full font-medium shrink-0">
                            {getLocalizedGrade(item.grade, language)}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800/70 dark:text-emerald-300/70 mb-1 truncate">
                          किसान: {item.farmerName} • {item.location}
                        </p>
                        <div className="flex items-center gap-3 text-xs font-semibold">
                          <span className="text-emerald-900 dark:text-emerald-200">
                            ₹{(item.pricePaisePerKg / 100).toFixed(2)}/kg
                          </span>
                          <span className="text-amber-800 dark:text-amber-300 font-bold">
                            कुल: ₹{(itemTotalPaise / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center border border-emerald-900/20 dark:border-emerald-500/30 rounded-lg overflow-hidden bg-emerald-50/50 dark:bg-emerald-950/60">
                          <button
                            onClick={() => updateQuantity(item.listingId, item.quantityKg - 50)}
                            className="px-2 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-emerald-950 dark:text-emerald-100 min-w-[45px] text-center">
                            {item.quantityKg}kg
                          </span>
                          <button
                            onClick={() => updateQuantity(item.listingId, item.quantityKg + 50)}
                            className="px-2 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.listingId)}
                          className="text-red-500 hover:text-red-700 p-1 transition"
                          title="हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Trust Badge */}
              {cart.length > 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-600/20 rounded-xl text-xs text-amber-950 dark:text-amber-200 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
                  <span>
                    <strong>100% शून्य-जोखिम एस्क्रो:</strong> डिलीवरी के समय OTP सत्यापन के बाद ही किसान को भुगतान रिलीज़ किया जाएगा।
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Summary & Checkout Trigger (Always Visible & Accessible) */}
            {cart.length > 0 && (
              <div className="p-4 bg-white/95 dark:bg-[#0d2218] border-t border-emerald-900/10 dark:border-emerald-500/20 space-y-3 shadow-xl shrink-0">
                <div className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80 dark:text-emerald-300/80">फ़सल उप-कुल (Subtotal):</span>
                    <span className="font-semibold">₹{(subtotalPaise / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80 dark:text-emerald-300/80">स्मार्ट लॉजिस्टिक्स शुल्क (4%):</span>
                    <span className="font-semibold">₹{(logisticsFeePaise / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80 dark:text-emerald-300/80">जीएसटी (GST Exemption):</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">₹0.00 (कृषि छूट)</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-emerald-900/20 dark:border-emerald-500/20 flex justify-between text-base font-bold text-emerald-950 dark:text-emerald-100">
                    <span>कुल देय राशि (Total):</span>
                    <span className="text-amber-800 dark:text-amber-300 text-lg">₹{(totalPaise / 100).toFixed(2)}</span>
                  </div>
                </div>

                {!isAuthenticated ? (
                  <button
                    onClick={() => openAuthModal('login')}
                    className="w-full py-3.5 bg-[#0F3826] text-amber-50 font-bold rounded-xl shadow-lg hover:bg-emerald-900 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <LogIn className="w-4 h-4 text-amber-400" />
                    <span>लॉगिन करें और ऑर्डर दें</span>
                  </button>
                ) : (
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 bg-[#0F3826] text-amber-50 font-extrabold rounded-xl shadow-lg hover:bg-emerald-900 transition flex items-center justify-center gap-2 text-sm active:scale-[0.99]"
                  >
                    <span>ऑर्डर आगे बढ़ाएं (डिलीवरी विवरण भरें)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. DEDICATED FULL CHECKOUT & ADDRESS MODAL (FLIPKART / AMAZON STYLE POPUP) */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FAF5EB] rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-emerald-800/20 text-emerald-950 flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#0F3826] text-amber-50 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <Truck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                    {checkoutStep === 'ADDRESS' && 'डिलीवरी पता एवं संपर्क विवरण'}
                    {checkoutStep === 'CONFIRM' && 'ऑर्डर समीक्षा एवं पुष्टि'}
                    {checkoutStep === 'SUCCESS' && 'ऑर्डर सफलतापूर्वक निष्पादित!'}
                  </h3>
                  <p className="text-xs text-amber-200/80">
                    {checkoutStep === 'ADDRESS' && 'चरण 1/2: सभी आवश्यक विवरण दर्ज करें'}
                    {checkoutStep === 'CONFIRM' && 'चरण 2/2: विवरण की पुनः जांच करें और सुरक्षित लॉक करें'}
                    {checkoutStep === 'SUCCESS' && 'शून्य-जोखिम एस्क्रो अनुबंध सक्रिय'}
                  </p>
                </div>
              </div>

              {checkoutStep !== 'SUCCESS' && (
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="p-2 hover:bg-emerald-800 rounded-full transition text-amber-100"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* STEP 1: ADDRESS & PAYMENT FORM */}
              {checkoutStep === 'ADDRESS' && (
                <div className="space-y-4">
                  {/* Order Quick Summary Banner */}
                  <div className="p-3 bg-emerald-900/5 rounded-2xl border border-emerald-900/10 flex items-center justify-between text-xs">
                    <span className="text-emerald-900 font-medium">
                      कुल वस्तुएं: <strong>{cart.length} फ़सलें ({cart.reduce((a, b) => a + b.quantityKg, 0)} kg)</strong>
                    </span>
                    <span className="text-sm font-extrabold text-amber-900">
                      कुल देय राशि: ₹{(totalPaise / 100).toFixed(2)}
                    </span>
                  </div>

                  {/* Flipkart / Amazon Section Title */}
                  <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2">
                    <span className="text-xs sm:text-sm font-black text-emerald-950 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>डिलीवरी का पूरा पता (Delivery Postal Details)</span>
                    </span>
                    <span className="text-[11px] text-red-600 font-bold">* सभी फ़ील्ड्स अनिवार्य हैं</span>
                  </div>

                  {/* Row 1: Full Name & Primary Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        प्राप्तकर्ता का पूरा नाम *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        placeholder="उदा. पीयूष कुमार"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        10-अंकीय प्राथमिक मोबाइल नंबर *
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={shippingForm.mobileNumber}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, mobileNumber: e.target.value.replace(/\D/g, '') })
                        }
                        placeholder="9876543210"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: Alternate Mobile & PIN Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        वैकल्पिक मोबाइल नंबर (Optional)
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={shippingForm.altPhone}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, altPhone: e.target.value.replace(/\D/g, '') })
                        }
                        placeholder="उदा. 9811122233"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        पिन कोड (6-Digit PIN Code) *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={shippingForm.pincode}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, pincode: e.target.value.replace(/\D/g, '') })
                        }
                        placeholder="उदा. 411014"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Row 3: Flat / House No. & Street / Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        मकान / फ्लैट / भवन / फर्म संख्या *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.flatBuilding}
                        onChange={(e) => setShippingForm({ ...shippingForm, flatBuilding: e.target.value })}
                        placeholder="उदा. फ्लैट 402, ग्रीन एकर्स अपार्टमेंट"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        सड़क / मोहल्ला / गाँव / सेक्टर *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.areaStreet}
                        onChange={(e) => setShippingForm({ ...shippingForm, areaStreet: e.target.value })}
                        placeholder="उदा. विमान नगर मुख्य मार्ग, क्लोवर पार्क"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 4: Landmark & Post Office */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        प्रमुख पहचान स्थल (Landmark) *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.landmark}
                        onChange={(e) => setShippingForm({ ...shippingForm, landmark: e.target.value })}
                        placeholder="उदा. सिम्बायोसिस इंटरनेशनल स्कूल के पास"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        डाकघर / कस्बा (Post Office / Town) *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.postOffice}
                        onChange={(e) => setShippingForm({ ...shippingForm, postOffice: e.target.value })}
                        placeholder="उदा. विमान नगर पोस्ट ऑफिस"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 5: District & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        जिला / शहर (District / City) *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.district}
                        onChange={(e) => setShippingForm({ ...shippingForm, district: e.target.value })}
                        placeholder="उदा. पुणे"
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-900 mb-1">
                        राज्य (State) *
                      </label>
                      <select
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium cursor-pointer"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 6: Address Type Selector */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-900 mb-1.5">
                      पते का प्रकार (Address Type):
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setShippingForm({ ...shippingForm, addressType: 'HOME' })}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                          shippingForm.addressType === 'HOME'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <Home className="w-4 h-4" />
                        <span>घर (Home)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShippingForm({ ...shippingForm, addressType: 'WORK' })}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                          shippingForm.addressType === 'WORK'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>दुकान/ऑफिस (Work)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShippingForm({ ...shippingForm, addressType: 'MANDI_SHOP' })}
                        className={`p-2.5 rounded-xl border text-center font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                          shippingForm.addressType === 'MANDI_SHOP'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        <span>थोक मंडी (Mandi)</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 7: Special Delivery Instructions */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-900 mb-1">
                      विशेष डिलीवरी निर्देश (Delivery Instructions - Optional):
                    </label>
                    <input
                      type="text"
                      value={shippingForm.deliveryInstructions}
                      onChange={(e) => setShippingForm({ ...shippingForm, deliveryInstructions: e.target.value })}
                      placeholder="उदा. पहुंचने से 10 मिनट पहले कॉल करें; पिछले गेट पर माल उतारें"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-emerald-900/20 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 text-emerald-950 font-medium"
                    />
                  </div>

                  {/* Row 8: Payment Method Selection */}
                  <div className="pt-2 border-t border-emerald-900/10">
                    <label className="block text-xs font-bold text-emerald-900 mb-1.5">
                      भुगतान का तरीका (Payment Method):
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-3 rounded-xl border text-left flex flex-col transition ${
                          paymentMethod === 'UPI'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="font-extrabold text-xs sm:text-sm">एस्क्रो UPI (Zero-Risk)</span>
                        <span className={`text-[11px] ${paymentMethod === 'UPI' ? 'text-amber-200' : 'text-emerald-700/80'}`}>
                          डिलीवरी OTP सत्यापन पर ही रिलीज़
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('COD')}
                        className={`p-3 rounded-xl border text-left flex flex-col transition ${
                          paymentMethod === 'COD'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="font-extrabold text-xs sm:text-sm">कैश ऑन डिलीवरी (COD)</span>
                        <span className={`text-[11px] ${paymentMethod === 'COD' ? 'text-amber-200' : 'text-emerald-700/80'}`}>
                          सामान मिलने पर भुगतान + OTP
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Validation Error Alert */}
                  {checkoutError && (
                    <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{checkoutError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: REVIEW & CONFIRMATION MODAL CARD */}
              {checkoutStep === 'CONFIRM' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-emerald-900/15 shadow-sm space-y-2.5 text-xs">
                    <div className="flex items-center justify-between border-b border-emerald-900/10 pb-2">
                      <span className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                        <User className="w-4 h-4 text-emerald-700" />
                        {shippingForm.fullName}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 text-[11px] font-bold rounded-full">
                        {shippingForm.addressType === 'HOME'
                          ? '🏠 घर (HOME)'
                          : shippingForm.addressType === 'WORK'
                          ? '🏢 ऑफिस (WORK)'
                          : '🏪 थोक मंडी'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-emerald-900 font-semibold">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        +91 {shippingForm.mobileNumber}
                      </span>
                      {shippingForm.altPhone && (
                        <span className="text-emerald-700">
                          वैकल्पिक: +91 {shippingForm.altPhone}
                        </span>
                      )}
                    </div>

                    <div className="pt-1 text-emerald-950 space-y-1 font-medium leading-relaxed">
                      <p>{shippingForm.flatBuilding}, {shippingForm.areaStreet}</p>
                      <p><strong className="text-emerald-900">लैंडमार्क:</strong> {shippingForm.landmark}</p>
                      <p><strong className="text-emerald-900">डाकघर:</strong> {shippingForm.postOffice}</p>
                      <p className="font-bold text-amber-900 text-sm">
                        {shippingForm.district}, {shippingForm.state} — {shippingForm.pincode}
                      </p>
                    </div>

                    {shippingForm.deliveryInstructions && (
                      <div className="p-2.5 bg-emerald-50 rounded-xl text-xs text-emerald-800 flex items-center gap-1.5 border border-emerald-200/60">
                        <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>निर्देश:</strong> {shippingForm.deliveryInstructions}</span>
                      </div>
                    )}
                  </div>

                  {/* Items & Smart Contract Summary */}
                  <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-600/30 text-xs space-y-2 text-amber-950">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4" />
                      <span>फ़सल एवं सुरक्षित एस्क्रो सारांश</span>
                    </div>
                    <div className="space-y-1.5 bg-white/90 p-3 rounded-xl border border-amber-300">
                      {cart.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span>{getLocalizedCropName(it.cropName, language)} ({it.quantityKg}kg)</span>
                          <span className="font-bold">₹{((it.quantityKg * it.pricePaisePerKg) / 100).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-xs text-emerald-800">
                        <span>लॉजिस्टिक्स व एक्सप्रेस प्रेषण (4%):</span>
                        <span className="font-bold">₹{(logisticsFeePaise / 100).toFixed(2)}</span>
                      </div>
                      <div className="pt-2 border-t border-amber-200 flex justify-between font-extrabold text-sm text-emerald-950">
                        <span>कुल देय राशि (Total Amount):</span>
                        <span className="text-amber-900 text-base">₹{(totalPaise / 100).toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-amber-900">
                      भुगतान माध्यम:{' '}
                      <strong>
                        {paymentMethod === 'UPI' ? 'सुरक्षित एस्क्रो UPI (Held in Escrow)' : 'कैश ऑन डिलीवरी (COD)'}
                      </strong>
                    </p>
                  </div>

                  {/* Confirmation Checkbox */}
                  <label className="flex items-start gap-2.5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userConfirmedIdentity}
                      onChange={(e) => setUserConfirmedIdentity(e.target.checked)}
                      className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-emerald-950 leading-snug">
                      मैं पुष्टि करता/करती हूँ कि प्राप्तकर्ता <strong>{shippingForm.fullName}</strong> (+91{' '}
                      {shippingForm.mobileNumber}) का डिलीवरी पता पूर्ण व सही है। यह ऑर्डर किसान पोर्टल पर लाइव प्रेषित
                      किया जाए और मेरे खाते (<span className="font-mono text-emerald-800">{user?.id}</span>) में दर्ज हो।
                    </span>
                  </label>

                  {checkoutError && (
                    <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{checkoutError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: ORDER SUCCESS & ESCROW OTP */}
              {checkoutStep === 'SUCCESS' && (
                <div className="py-4 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-emerald-950 mb-1">सुरक्षित एस्क्रो ऑर्डर निष्पादित!</h3>
                    <p className="text-xs text-emerald-800/80">
                      ऑर्डर ID: <span className="font-mono font-bold text-emerald-900">{placedOrderId}</span>
                    </p>
                  </div>

                  {/* Zero-Trust Delivery OTP Box */}
                  <div className="w-full bg-amber-500/10 border-2 border-amber-600/30 rounded-2xl p-4 text-left shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-amber-700" />
                      <span className="font-extrabold text-xs uppercase tracking-wider text-amber-950">
                        डिलीवरी सत्यापन कोड (Delivery Handover OTP)
                      </span>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-amber-300 text-center mb-2 shadow-inner">
                      <span className="text-3xl font-mono font-black tracking-[0.3em] text-emerald-950">
                        {deliveryOtpCode || '4829'}
                      </span>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      <strong className="text-amber-900">सुरक्षा निर्देश:</strong> यह 4-अंकीय OTP डिलीवरी एजेंट को{' '}
                      <strong>केवल तभी बताएं जब आप फसल का वजन और गुणवत्ता जांच लें</strong>। आपके OTP सत्यापित करने के
                      बाद ही एस्क्रो से किसान को भुगतान रिलीज़ होगा।
                    </p>
                  </div>

                  <div className="p-3.5 bg-emerald-900/5 rounded-xl border border-emerald-900/10 w-full text-left text-xs space-y-1.5 font-mono">
                    <p className="text-emerald-900 font-bold">स्मार्ट कॉन्ट्रैक्ट ID: {contractId}</p>
                    <p className="text-emerald-800">
                      भुगतान स्थिति: <span className="text-amber-700 font-bold">एस्क्रो में सुरक्षित लॉक (Held in Escrow)</span>
                    </p>
                    <p className="text-emerald-800">किसान पोर्टल: <span className="text-emerald-700 font-bold">सक्रिय खरीद आदेश में प्रेषित</span></p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Sticky Footer Actions */}
            <div className="p-4 bg-white border-t border-emerald-900/10 flex items-center justify-between gap-3 shrink-0">
              {checkoutStep === 'ADDRESS' && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs sm:text-sm transition"
                  >
                    टोकरी पर वापस (Back)
                  </button>
                  <button
                    type="button"
                    onClick={handleReviewOrder}
                    className="px-6 py-2.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-extrabold rounded-xl text-xs sm:text-sm shadow-lg transition flex items-center gap-2 ml-auto"
                  >
                    <span>समीक्षा एवं पुष्टि करें (Review Order)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {checkoutStep === 'CONFIRM' && (
                <>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('ADDRESS')}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>पता बदलें (Edit Address)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmCheckout}
                    disabled={isSubmitting || !userConfirmedIdentity}
                    className="px-6 py-2.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-100 font-extrabold rounded-xl text-xs sm:text-sm shadow-lg transition flex items-center gap-2 ml-auto disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>ऑर्डर निष्पादित हो रहा है...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>✓ पुष्टि करें एवं ऑर्डर दें</span>
                      </>
                    )}
                  </button>
                </>
              )}

              {checkoutStep === 'SUCCESS' && (
                <button
                  type="button"
                  onClick={handleFinishAndGoToDashboard}
                  className="w-full py-3 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl text-sm shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>पूर्ण करें एवं डैशबोर्ड में देखें (View Orders Dashboard)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
