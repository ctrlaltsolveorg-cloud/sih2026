'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { getLocalizedCropName, getLocalizedGrade } from '@/lib/i18n';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2, ShieldCheck, Lock, LogIn, UserCheck, ShieldAlert, AlertCircle, MapPin, Phone, User, Home, Building2, Store, FileText, Check } from 'lucide-react';

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
  'Himachal Pradesh',
  'Uttarakhand',
  'Jharkhand',
  'Chhattisgarh',
  'Goa',
];

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotalPaise,
    logisticsFeePaise,
    totalPaise,
    clearCart,
  } = useCart();
  const { t, language } = useLanguage();
  const { isAuthenticated, user, openAuthModal } = useAuth();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [contractId, setContractId] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [deliveryOtpCode, setDeliveryOtpCode] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [userConfirmedIdentity, setUserConfirmedIdentity] = useState(true);
  const [savedOrderData, setSavedOrderData] = useState<any>(null);

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

  if (!isCartOpen) return null;

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

  const handleInitiateCheckout = () => {
    if (!isAuthenticated || !user) {
      openAuthModal('login');
      return;
    }
    if (cart.length === 0) return;
    
    const validationErr = validateShippingForm();
    if (validationErr) {
      setCheckoutError(validationErr);
      return;
    }

    setCheckoutError(null);
    setShowVerifyModal(true);
  };

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

    const canonicalAddress = `${shippingForm.fullName} | Phone: ${shippingForm.mobileNumber}${shippingForm.altPhone ? ', Alt: ' + shippingForm.altPhone : ''} | ${shippingForm.flatBuilding}, ${shippingForm.areaStreet}, Landmark: ${shippingForm.landmark}, P.O.: ${shippingForm.postOffice}, ${shippingForm.district}, ${shippingForm.state} - ${shippingForm.pincode} (${shippingForm.addressType})`;

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
        notes: `Direct Farm Purchase by ${shippingForm.fullName} (ID: ${user?.id || 'u_buyer_1'}) | ${shippingForm.deliveryInstructions}`,
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
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'ऑर्डर दर्ज करने में त्रुटि आई। कृपया पुनः प्रयास करें।');
      }

      const hash = data.smartContractHash || 'KB-ESCROW-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      setContractId(hash);
      setPlacedOrderId(data.orderId);
      setDeliveryOtpCode(data.deliveryOtp);

      // Create persistent order object
      const fullOrderObj = {
        id: data.orderId,
        buyer_id: user?.id || 'u_buyer_1',
        buyer_name: shippingForm.fullName,
        buyer_phone: shippingForm.mobileNumber,
        recipient_name: shippingForm.fullName,
        recipient_phone: shippingForm.mobileNumber,
        alt_phone: shippingForm.altPhone,
        flat_building: shippingForm.flatBuilding,
        area_street: shippingForm.areaStreet,
        landmark: shippingForm.landmark,
        post_office: shippingForm.postOffice,
        district: shippingForm.district,
        state: shippingForm.state,
        pin_code: shippingForm.pincode,
        address_type: shippingForm.addressType,
        delivery_instructions: shippingForm.deliveryInstructions,
        shipping: shippingForm,
        farmer_id: data.farmerId || 'u_farmer_1',
        farmer_name: cart[0]?.farmerName || 'किसान (Farmer)',
        farmer_phone: '9876543210',
        delivery_id: data.deliveryId,
        delivery_status: 'ASSIGNED',
        pickup_otp: data.pickupOtp,
        delivery_otp: data.deliveryOtp,
        pickup_location: cart[0]?.location || 'नासिक संकलन केंद्र',
        drop_location: canonicalAddress,
        delivery_address: canonicalAddress,
        total_amount_paise: totalPaise,
        subtotal_paise: subtotalPaise,
        delivery_fee_paise: logisticsFeePaise,
        total_rupees: (totalPaise / 100).toFixed(2),
        subtotal_rupees: (subtotalPaise / 100).toFixed(2),
        delivery_fee_rupees: (logisticsFeePaise / 100).toFixed(2),
        payment_method: paymentMethod,
        payment_status: 'PENDING',
        status: 'Placed',
        notes: `Contract: ${hash}`,
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        items: cart.map((it, idx) => ({
          id: idx + 1,
          order_id: data.orderId,
          listing_id: it.listingId,
          crop_name: it.cropName,
          quantity: it.quantityKg,
          unit: 'kg',
          unit_price_paise: it.pricePaisePerKg,
        })),
      };

      setSavedOrderData(fullOrderObj);

      // Save to localStorage immediately so it survives refresh & navigation
      try {
        const existing = JSON.parse(localStorage.getItem('kb_buyer_active_orders') || '[]');
        localStorage.setItem('kb_buyer_active_orders', JSON.stringify([fullOrderObj, ...existing.filter((x: any) => x.id !== fullOrderObj.id)]));
        localStorage.setItem('kb_recent_placed_order', JSON.stringify(fullOrderObj));
      } catch (e) {}

      setShowVerifyModal(false);
      setOrderPlaced(true);

      // Notify dashboard pages to refresh orders
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('kb_order_updated'));
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'ऑर्डर असफल रहा।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    // Ensure the order is safely in localStorage
    if (savedOrderData) {
      try {
        const existing = JSON.parse(localStorage.getItem('kb_buyer_active_orders') || '[]');
        localStorage.setItem('kb_buyer_active_orders', JSON.stringify([savedOrderData, ...existing.filter((x: any) => x.id !== savedOrderData.id)]));
      } catch (e) {}
    }

    setOrderPlaced(false);
    clearCart();
    setIsCartOpen(false);

    // Navigate to buyer dashboard active orders view
    if (typeof window !== 'undefined') {
      window.location.href = '/buyer#active-orders';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF5EB] h-full shadow-2xl flex flex-col border-l border-emerald-900/10">
        {/* Header */}
        <div className="p-5 bg-[#0F3826] text-amber-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">{t.cartTitle}</h2>
              <p className="text-xs text-amber-200/80">स्मार्ट अनुबंध और प्रत्यक्ष प्रेषण</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-emerald-800 rounded-full transition"
          >
            <X className="w-5 h-5 text-amber-100" />
          </button>
        </div>

        {/* Body */}
        {orderPlaced ? (
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 text-emerald-700 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-emerald-950 mb-1">सुरक्षित एस्क्रो ऑर्डर निष्पादित!</h3>
            <p className="text-xs text-emerald-800/80 mb-4">
              ऑर्डर ID: <span className="font-mono font-bold text-emerald-900">{placedOrderId}</span>
            </p>

            {/* Zero-Trust OTP Security Box */}
            <div className="w-full bg-amber-500/10 border-2 border-amber-600/30 rounded-2xl p-4 mb-4 text-left shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-amber-950">
                  डिलीवरी सत्यापन कोड (Delivery Handover OTP)
                </span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-amber-300 text-center mb-2 shadow-inner">
                <span className="text-3xl font-mono font-black tracking-[0.3em] text-emerald-950">
                  {deliveryOtpCode || '----'}
                </span>
              </div>
              <p className="text-[11px] text-amber-950 leading-relaxed">
                <strong className="text-amber-900">सुरक्षा चेतावनी:</strong> यह 4-अंकीय OTP डिलीवरी एजेंट को <strong>केवल तभी दें जब आप फसल की गुणवत्ता व वजन जांच लें</strong>। आपके OTP देने के बाद ही एस्क्रो से किसान को भुगतान जारी होगा!
              </p>
            </div>

            <div className="p-3.5 bg-emerald-900/5 rounded-xl border border-emerald-900/10 w-full mb-5 text-left text-xs space-y-1.5 font-mono">
              <p className="text-emerald-900 font-bold">स्मार्ट कॉन्ट्रैक्ट ID: {contractId}</p>
              <p className="text-emerald-800">भुगतान माध्यम: {paymentMethod === 'UPI' ? 'सुरक्षित एस्क्रो (Escrow Hold)' : 'कैश ऑन डिलीवरी (COD)'}</p>
              <p className="text-emerald-800">कुल राशि: ₹{(totalPaise / 100).toFixed(2)}</p>
              <p className="text-emerald-700">एस्क्रो स्थिति: <span className="text-amber-700 font-bold">सुरक्षित लॉक्ड (Held in Escrow)</span></p>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full py-3.5 bg-[#0F3826] text-amber-50 font-bold rounded-xl shadow-lg hover:bg-emerald-900 transition flex items-center justify-center gap-2 text-sm"
            >
              पूर्ण करें एवं डैशबोर्ड में देखें <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-emerald-800/60 text-center py-12">
                  <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.5]" />
                  <p className="font-medium">{t.cartEmpty}</p>
                </div>
              ) : (
                cart.map((item) => {
                  const itemTotalPaise = Math.round(item.pricePaisePerKg * item.quantityKg);
                  return (
                    <div
                      key={item.listingId}
                      className="p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-900/10 shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-emerald-950">{getLocalizedCropName(item.cropName, language)}</span>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-medium">
                            {getLocalizedGrade(item.grade, language)}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800/70 mb-2">
                          किसान: {item.farmerName} • {item.location}
                        </p>
                        <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                          <span>
                            ₹{(item.pricePaisePerKg / 100).toFixed(2)} / kg ({item.pricePaisePerKg} पैसे)
                          </span>
                          <span className="text-amber-800">
                            कुल: ₹{(itemTotalPaise / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-emerald-900/20 rounded-lg overflow-hidden bg-emerald-50/50">
                          <button
                            onClick={() => updateQuantity(item.listingId, item.quantityKg - 50)}
                            className="px-2 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-emerald-950">
                            {item.quantityKg}kg
                          </span>
                          <button
                            onClick={() => updateQuantity(item.listingId, item.quantityKg + 50)}
                            className="px-2 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.listingId)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-5 bg-white/90 border-t border-emerald-900/10 space-y-3 shadow-lg">
                <div className="space-y-1.5 text-xs text-emerald-900">
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80">{t.cartSubtotal}:</span>
                    <span className="font-semibold">₹{(subtotalPaise / 100).toFixed(2)} ({subtotalPaise} पैसे)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80">{t.logisticsFee} (4%):</span>
                    <span className="font-semibold">₹{(logisticsFeePaise / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-800/80">{t.gstTax}:</span>
                    <span className="font-semibold text-emerald-700">₹0.00 (exempt)</span>
                  </div>
                  <div className="pt-2 border-t border-dashed border-emerald-900/20 flex justify-between text-base font-bold text-emerald-950">
                    <span>{t.totalAmount}:</span>
                    <span className="text-amber-800">
                      ₹{(totalPaise / 100).toFixed(2)} <span className="text-xs text-emerald-700 font-normal">({totalPaise} पैसे)</span>
                    </span>
                  </div>
                </div>

                {/* Flipkart / Amazon Style Comprehensive Shipping Details Form */}
                <div className="space-y-3 pt-3 border-t border-emerald-900/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{language === 'hi' ? 'डिलीवरी पता एवं संपर्क विवरण (अनिवार्य)' : 'Delivery Address & Contact Details (Mandatory)'}</span>
                    </span>
                    <span className="text-[10px] text-red-600 font-bold">* सभी फ़ील्ड्स अनिवार्य हैं</span>
                  </div>

                  {/* Recipient Name & Phone Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'प्राप्तकर्ता का नाम *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        placeholder="उदा. पीयूष कुमार"
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? '10-अंकीय मोबाइल नंबर *' : 'Mobile Number (10 digits) *'}
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={shippingForm.mobileNumber}
                        onChange={(e) => setShippingForm({ ...shippingForm, mobileNumber: e.target.value.replace(/\D/g, '') })}
                        placeholder="9876543210"
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>
                  </div>

                  {/* Alternate Mobile & PIN Code Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'वैकल्पिक फोन (Alternate)' : 'Alternate Phone (Optional)'}
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={shippingForm.altPhone}
                        onChange={(e) => setShippingForm({ ...shippingForm, altPhone: e.target.value.replace(/\D/g, '') })}
                        placeholder="9811122233"
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'पिन कोड (PIN Code) *' : 'PIN Code (6 digits) *'}
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={shippingForm.pincode}
                        onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value.replace(/\D/g, '') })}
                        placeholder="411014"
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Flat / Building */}
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                      {language === 'hi' ? 'मकान नं. / फ्लैट / बिल्डिंग / फर्म *' : 'Flat / House No. / Building / Firm *'}
                    </label>
                    <input
                      type="text"
                      value={shippingForm.flatBuilding}
                      onChange={(e) => setShippingForm({ ...shippingForm, flatBuilding: e.target.value })}
                      placeholder="उदा. फ्लैट 402, ग्रीन एकर्स अपार्टमेंट"
                      className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                    />
                  </div>

                  {/* Area / Street & Landmark */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'सड़क / क्षेत्र / मोहल्ला / गाँव *' : 'Area / Street / Sector / Village *'}
                      </label>
                      <input
                        type="text"
                        value={shippingForm.areaStreet}
                        onChange={(e) => setShippingForm({ ...shippingForm, areaStreet: e.target.value })}
                        placeholder="उदा. विमान नगर मेन रोड"
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'लैंडमार्क (पहचान स्थल) *' : 'Landmark (Near by) *'}
                      </label>
                      <input
                        type="text"
                        value={shippingForm.landmark}
                        onChange={(e) => setShippingForm({ ...shippingForm, landmark: e.target.value })}
                        placeholder="उदा. कृषि संकलन हब के सामने"
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>
                  </div>

                  {/* Post Office, District & State */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'डाकघर (Post Office) *' : 'Post Office *'}
                      </label>
                      <input
                        type="text"
                        value={shippingForm.postOffice}
                        onChange={(e) => setShippingForm({ ...shippingForm, postOffice: e.target.value })}
                        placeholder="उदा. विमान नगर P.O."
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'शहर / जिला (District) *' : 'District / City *'}
                      </label>
                      <input
                        type="text"
                        value={shippingForm.district}
                        onChange={(e) => setShippingForm({ ...shippingForm, district: e.target.value })}
                        placeholder="उदा. पुणे (Pune)"
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                        {language === 'hi' ? 'राज्य (State) *' : 'State *'}
                      </label>
                      <select
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Address Type Selector */}
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-900 mb-1">
                      {language === 'hi' ? 'पता प्रकार (Address Type):' : 'Address Type:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setShippingForm({ ...shippingForm, addressType: 'HOME' })}
                        className={`p-1.5 rounded-lg border text-center font-bold flex items-center justify-center gap-1 transition ${
                          shippingForm.addressType === 'HOME'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <Home className="w-3.5 h-3.5" />
                        <span>घर (Home)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShippingForm({ ...shippingForm, addressType: 'WORK' })}
                        className={`p-1.5 rounded-lg border text-center font-bold flex items-center justify-center gap-1 transition ${
                          shippingForm.addressType === 'WORK'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>दुकान/ऑफिस (Work)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShippingForm({ ...shippingForm, addressType: 'MANDI_SHOP' })}
                        className={`p-1.5 rounded-lg border text-center font-bold flex items-center justify-center gap-1 transition ${
                          shippingForm.addressType === 'MANDI_SHOP'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>थोक मंडी (Mandi)</span>
                      </button>
                    </div>
                  </div>

                  {/* Delivery Instructions */}
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-900 mb-0.5">
                      {language === 'hi' ? 'विशेष डिलीवरी निर्देश (Delivery Instructions):' : 'Special Delivery Instructions:'}
                    </label>
                    <input
                      type="text"
                      value={shippingForm.deliveryInstructions}
                      onChange={(e) => setShippingForm({ ...shippingForm, deliveryInstructions: e.target.value })}
                      placeholder="उदा. पहुंचने से पहले फोन करें; पिछले गेट पर माल उतारें"
                      className="w-full text-xs p-2 rounded-lg border border-emerald-900/20 bg-emerald-50/50 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-emerald-950 font-medium"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="pt-2 border-t border-emerald-900/10">
                    <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                      {language === 'hi' ? 'भुगतान विधि (Payment Method):' : 'Payment Method:'}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-2 rounded-lg border text-left flex flex-col transition ${
                          paymentMethod === 'UPI'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="font-bold">एस्क्रो UPI (Escrow)</span>
                        <span className={`text-[10px] ${paymentMethod === 'UPI' ? 'text-amber-200' : 'text-emerald-700/70'}`}>
                          OTP सत्यापन पर रिलीज़
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('COD')}
                        className={`p-2 rounded-lg border text-left flex flex-col transition ${
                          paymentMethod === 'COD'
                            ? 'bg-emerald-800 text-amber-50 border-emerald-900 shadow-sm'
                            : 'bg-white text-emerald-900 border-emerald-900/20 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="font-bold">कैश ऑन डिलीवरी</span>
                        <span className={`text-[10px] ${paymentMethod === 'COD' ? 'text-amber-200' : 'text-emerald-700/70'}`}>
                          COD + हैंडओवर OTP
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700/80 bg-emerald-50 p-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'hi' ? 'शून्य-जोखिम सुरक्षा — डिलीवरी OTP सत्यापित होने तक भुगतान सुरक्षित लॉक रहता है।' : 'Zero-Risk Security — Funds released only after delivery OTP verification.'}</span>
                </div>

                {checkoutError && (
                  <div className="p-2.5 bg-red-100 border border-red-300 rounded-lg text-xs text-red-800 font-medium flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                {!isAuthenticated && (
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-950 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      {language === 'hi'
                        ? 'ऑर्डर पूरा करने और सुरक्षित एस्क्रौ भुगतान के लिए लॉगिन आवश्यक है।'
                        : 'Login is required to place an order and execute smart contract payment.'}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleInitiateCheckout}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#0F3826] text-amber-50 font-bold rounded-xl shadow-lg hover:bg-emerald-900 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>अनुबंध निष्पादित हो रहा है... (Securing Order...)</span>
                  ) : isAuthenticated ? (
                    <>
                      {t.proceedOrder} <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 text-amber-400" />
                      <span>{language === 'hi' ? 'लॉगिन करें और ऑर्डर दें' : 'Log In to Place Order'}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* User Order Verification & Confirmation Modal (Flipkart / Amazon Review Card) */}
        {showVerifyModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#FAF5EB] rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-800/20 text-emerald-950 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-emerald-800 text-amber-100 rounded-xl">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base leading-tight">ऑर्डर एवं डिलीवरी पता सत्यापन</h3>
                    <p className="text-[11px] text-emerald-800/70">Shipping Address & Escrow Order Confirmation</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="p-1.5 hover:bg-emerald-100 rounded-full transition text-emerald-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Verified Comprehensive Address Card */}
              <div className="p-4 bg-white/95 rounded-2xl border border-emerald-900/15 shadow-sm space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-700" />
                    {shippingForm.fullName}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 text-[10px] font-bold rounded-full">
                    {shippingForm.addressType === 'HOME' ? '🏠 घर (HOME)' : shippingForm.addressType === 'WORK' ? '🏢 ऑफिस (WORK)' : '🏪 थोक मंडी'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-emerald-900">
                  <span className="flex items-center gap-1 font-bold">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    +91 {shippingForm.mobileNumber}
                  </span>
                  {shippingForm.altPhone && (
                    <span className="text-emerald-700">
                      वैकल्पिक: +91 {shippingForm.altPhone}
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-emerald-900/10 text-emerald-950 space-y-0.5 leading-relaxed font-medium">
                  <p>{shippingForm.flatBuilding}, {shippingForm.areaStreet}</p>
                  <p><strong className="text-emerald-900">पहचान स्थल (Landmark):</strong> {shippingForm.landmark}</p>
                  <p><strong className="text-emerald-900">डाकघर (P.O.):</strong> {shippingForm.postOffice}</p>
                  <p className="font-bold text-amber-900">
                    {shippingForm.district}, {shippingForm.state} — {shippingForm.pincode}
                  </p>
                </div>

                {shippingForm.deliveryInstructions && (
                  <div className="p-2 bg-emerald-50 rounded-lg text-[11px] text-emerald-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>निर्देश:</strong> {shippingForm.deliveryInstructions}</span>
                  </div>
                )}
              </div>

              {/* Order Items & Escrow Breakdown */}
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-600/30 text-xs space-y-2 text-amber-950">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>फ़सल एवं सुरक्षित एस्क्रो सारांश</span>
                </div>
                <div className="space-y-1 bg-white/80 p-2.5 rounded-xl border border-amber-300">
                  {cart.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span>{getLocalizedCropName(it.cropName, language)} ({it.quantityKg}kg)</span>
                      <span className="font-bold">₹{((it.quantityKg * it.pricePaisePerKg) / 100).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-[11px] text-emerald-800">
                    <span>लॉजिस्टिक्स व एक्सप्रेस प्रेषण:</span>
                    <span className="font-bold">₹{(logisticsFeePaise / 100).toFixed(2)}</span>
                  </div>
                  <div className="pt-1.5 border-t border-amber-200 flex justify-between font-extrabold text-sm text-emerald-950">
                    <span>कुल देय राशि (Total):</span>
                    <span className="text-amber-900 text-base">₹{(totalPaise / 100).toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-[11px] text-amber-900">
                  भुगतान माध्यम: <strong>{paymentMethod === 'UPI' ? 'सुरक्षित एस्क्रो UPI (Held in Escrow)' : 'कैश ऑन डिलीवरी (COD)'}</strong>
                </p>
              </div>

              {/* Explicit Confirmation Checkbox */}
              <label className="flex items-start gap-2.5 p-3 bg-emerald-50 rounded-xl border border-emerald-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userConfirmedIdentity}
                  onChange={(e) => setUserConfirmedIdentity(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-emerald-950 leading-snug">
                  मैं पुष्टि करता/करती हूँ कि प्राप्तकर्ता <strong>{shippingForm.fullName}</strong> (+91 {shippingForm.mobileNumber}) का डिलीवरी पता पूर्ण व सही है। यह ऑर्डर मेरे खाते (<span className="font-mono text-emerald-800">{user?.id}</span>) में दर्ज हो और किसान पोर्टल पर प्रेषित किया जाए।
                </span>
              </label>

              {checkoutError && (
                <div className="p-2.5 bg-red-100 border border-red-300 rounded-xl text-xs text-red-800 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{checkoutError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl text-xs transition"
                >
                  संशोधन करें (Edit Address)
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCheckout}
                  disabled={isSubmitting || !userConfirmedIdentity}
                  className="flex-1 py-3 bg-[#0F3826] hover:bg-emerald-900 text-amber-100 font-extrabold rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'सुरक्षित ऑर्डर दर्ज हो रहा है...' : '✓ पुष्टि करें एवं ऑर्डर दें'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
