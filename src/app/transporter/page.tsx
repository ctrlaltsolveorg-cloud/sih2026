'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import PortalGuard from '@/components/PortalGuard';
import { 
  Truck, 
  Navigation, 
  Key, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Package, 
  DollarSign, 
  RefreshCw,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  UserCheck,
  Fuel
} from 'lucide-react';

interface OrderItem {
  id: number;
  crop_name: string;
  quantity: number;
  unit: string;
  unit_price_paise: number;
}

interface OrderRecord {
  id: string;
  buyer_id: string;
  farmer_id: string;
  status: string;
  subtotal_paise: number;
  delivery_fee_paise: number;
  total_amount_paise: number;
  total_rupees: string;
  delivery_address: string;
  delivery_type: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  buyer_name?: string;
  buyer_phone?: string;
  farmer_name?: string;
  farmer_phone?: string;
  delivery_id?: string;
  delivery_status?: string;
  pickup_otp?: string;
  delivery_otp?: string;
  pickup_location?: string;
  drop_location?: string;
  estimated_distance_km?: number;
  estimated_eta_minutes?: number;
  driver_name?: string;
  driver_phone?: string;
  driver_vehicle?: string;
  cod_collected?: number;
  items?: OrderItem[];
}

export default function TransporterDashboardPage() {
  const { t, language } = useLanguage();
  const { userName } = useRole();

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'available' | 'delivered' | 'route'>('active');

  // Per-order inputs & states
  const [pickupInputs, setPickupInputs] = useState<Record<string, string>>({});
  const [deliveryInputs, setDeliveryInputs] = useState<Record<string, string>>({});
  const [codCheckboxes, setCodCheckboxes] = useState<Record<string, boolean>>({});
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<Record<string, { type: 'success' | 'error'; message: string } | null>>({});

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/orders?role=TRANSPORTER');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load transporter orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Filter orders by category
  const availableOrders = orders.filter(
    (o) => o.status === 'Placed' && (!o.driver_name || o.driver_name === 'Pending')
  );

  const activeOrders = orders.filter(
    (o) => o.status === 'Accepted' || o.status === 'Picked Up' || o.status === 'Out for Delivery' || (o.status === 'Placed' && o.driver_name && o.driver_name !== 'Pending')
  );

  const deliveredOrders = orders.filter((o) => o.status === 'Delivered');

  // Accept an available delivery job
  const handleAcceptDelivery = async (orderId: string) => {
    setActionLoading((prev) => ({ ...prev, [orderId]: true }));
    setFeedback((prev) => ({ ...prev, [orderId]: null }));

    try {
      const res = await fetch('/api/v1/orders/accept-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          partnerId: 'u_partner_1',
          driverName: userName || 'विक्रम शिंदे (Vikram Shinde)',
          driverPhone: '+91 99000 11122',
          driverVehicle: 'MH-15-EG-8821 (Tata Ace Gold)',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'डिलीवरी स्वीकार करने में विफल।');
      }

      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'success', message: 'डिलीवरी कार्य स्वीकृत! ऑर्डर सक्रिय यात्राओं में जोड़ा गया है।' },
      }));
      await loadOrders();
      setActiveTab('active');
    } catch (err: any) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'error', message: err.message },
      }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // Verify Farmer Pickup OTP (Handshake)
  const handleVerifyPickup = async (orderId: string) => {
    const entered = (pickupInputs[orderId] || '').trim();
    if (!entered) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'error', message: 'कृपया किसान द्वारा दिया गया 4-अंकीय पिकअप OTP दर्ज करें।' },
      }));
      return;
    }

    setActionLoading((prev) => ({ ...prev, [orderId]: true }));
    setFeedback((prev) => ({ ...prev, [orderId]: null }));

    try {
      const res = await fetch('/api/v1/orders/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          otpType: 'pickup',
          enteredOtp: entered,
          partnerId: 'u_partner_1',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'पिकअप OTP सत्यापन असफल रहा।');
      }

      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'success', message: data.message || '✅ पिकअप सत्यापित! माल वाहन में लोड हो चुका है।' },
      }));
      setPickupInputs((prev) => ({ ...prev, [orderId]: '' }));
      await loadOrders();
    } catch (err: any) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'error', message: err.message },
      }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // Verify Buyer Delivery OTP (Release Escrow + Check COD)
  const handleVerifyDelivery = async (orderId: string, paymentMethod: string) => {
    const isCod = paymentMethod === 'COD';
    const isCodChecked = Boolean(codCheckboxes[orderId]);

    if (isCod && !isCodChecked) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'error', message: '⚠️ कृपया पहले पुष्टि करें कि आपने खरीदार से नकद राशि प्राप्त कर ली है।' },
      }));
      return;
    }

    const entered = (deliveryInputs[orderId] || '').trim();
    if (!entered) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'error', message: 'कृपया खरीदार से प्राप्त 4-अंकीय डिलीवरी OTP दर्ज करें।' },
      }));
      return;
    }

    setActionLoading((prev) => ({ ...prev, [orderId]: true }));
    setFeedback((prev) => ({ ...prev, [orderId]: null }));

    try {
      const res = await fetch('/api/v1/orders/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          otpType: 'delivery',
          enteredOtp: entered,
          codCollected: isCodChecked,
          partnerId: 'u_partner_1',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'डिलीवरी OTP सत्यापन असफल रहा।');
      }

      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'success', message: data.message || '🎉 डिलीवरी पूर्ण! एस्क्रो भुगतान किसान खाते में रिलीज़ हो गया।' },
      }));
      setDeliveryInputs((prev) => ({ ...prev, [orderId]: '' }));
      await loadOrders();
    } catch (err: any) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'error', message: err.message },
      }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  return (
    <PortalGuard
      requiredRole="TRANSPORTER"
      portalName={language === 'hi' ? 'परिवहन एवं रसद फ्लीट (Transporter Fleet)' : 'Transporter Fleet'}
      portalDescription={
        language === 'hi'
          ? 'यह पोर्टल केवल रसद एवं वाहन चालकों के लिए सुरक्षित है जहाँ रूट अनुकूलन और OTP हैंडशेक डिलीवरी होती है।'
          : 'This portal is restricted to Transporters and Logistics Partners for cold-chain routing and OTP verification.'
      }
    >
      <div className="space-y-8 max-w-7xl mx-auto pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#0F3826] text-amber-50 p-6 md:p-8 rounded-3xl shadow-xl border border-amber-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-amber-500/20 rounded-2xl border border-amber-400/30">
              <Truck className="w-9 h-9 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {language === 'hi' ? 'प्रत्यक्ष रसद एवं वाहन फ्लीट' : 'Direct Fleet & Cold-Chain Logistics'}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-300 font-bold bg-emerald-900/60 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  GPS लाइव
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                {language === 'hi' ? 'ग्रीन-वे लॉजिस्टिक्स पार्टनर' : 'Green-Way Logistics Fleet Partner'}
              </h1>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-0.5">
                {language === 'hi'
                  ? `चालक: ${userName || 'विक्रम शिंदे'} • वाहन: MH-15-EG-8821 • 2-चरणीय OTP सुरक्षित हैंडशेक`
                  : `Driver: ${userName || 'Vikram Shinde'} • Vehicle: MH-15-EG-8821 • 2-Stage OTP Handshake`}
              </p>
            </div>
          </div>

          <button
            onClick={loadOrders}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-900/80 hover:bg-emerald-800 text-amber-200 rounded-xl text-xs font-bold border border-emerald-700 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            <span>{language === 'hi' ? 'रिफ्रेश करें' : 'Refresh Orders'}</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-emerald-900/20 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'active'
                ? 'bg-[#0F3826] text-amber-400 shadow-md'
                : 'bg-emerald-950/10 text-emerald-950 hover:bg-emerald-900/10'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>{language === 'hi' ? 'सक्रिय यात्राएं व हैंडशेक' : 'Active Trips & OTPs'}</span>
            <span className="px-2 py-0.5 bg-amber-400 text-emerald-950 rounded-full text-[10px] font-black">
              {activeOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('available')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'available'
                ? 'bg-[#0F3826] text-amber-400 shadow-md'
                : 'bg-emerald-950/10 text-emerald-950 hover:bg-emerald-900/10'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{language === 'hi' ? 'उपलब्ध डिलीवरी कार्य' : 'Available Deliveries'}</span>
            {availableOrders.length > 0 && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-black">
                {availableOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('delivered')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'delivered'
                ? 'bg-[#0F3826] text-amber-400 shadow-md'
                : 'bg-emerald-950/10 text-emerald-950 hover:bg-emerald-900/10'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'पूर्ण डिलीवरी इतिहास' : 'Delivered History'}</span>
            <span className="px-2 py-0.5 bg-emerald-800/30 text-emerald-950 rounded-full text-[10px] font-bold">
              {deliveredOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('route')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'route'
                ? 'bg-[#0F3826] text-amber-400 shadow-md'
                : 'bg-emerald-950/10 text-emerald-950 hover:bg-emerald-900/10'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>{language === 'hi' ? 'AI मार्ग अनुकूलन' : 'AI Route Optimizer'}</span>
          </button>
        </div>

        {/* TAB 1: ACTIVE TRIPS & 2-STAGE OTP VERIFICATION */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            {activeOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-emerald-900/10 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-950">
                    {language === 'hi' ? 'कोई सक्रिय डिलीवरी नहीं है' : 'No Active Trips Right Now'}
                  </h3>
                  <p className="text-xs text-emerald-900/60 max-w-sm mx-auto mt-1">
                    {language === 'hi'
                      ? 'नई डिलीवरी स्वीकार करने के लिए "उपलब्ध डिलीवरी कार्य" टैब पर जाएं।'
                      : 'Switch to the "Available Deliveries" tab to accept pending farmer orders.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('available')}
                  className="px-5 py-2.5 bg-[#0F3826] text-amber-400 rounded-xl text-xs font-bold hover:bg-emerald-900 transition shadow"
                >
                  {language === 'hi' ? 'उपलब्ध ऑर्डर्स देखें' : 'View Available Orders'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {activeOrders.map((ord) => {
                  const isPickedUp = ord.status === 'Out for Delivery' || ord.delivery_status === 'IN_TRANSIT';
                  const isCod = ord.payment_method === 'COD';
                  const orderFeedback = feedback[ord.id];

                  return (
                    <div
                      key={ord.id}
                      className="bg-white rounded-3xl border border-emerald-900/20 shadow-xl overflow-hidden"
                    >
                      {/* Trip Card Top Ribbon */}
                      <div className="bg-[#0F3826] text-amber-50 p-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full text-xs font-mono font-black">
                            #{ord.id}
                          </span>
                          <div>
                            <span className="text-xs text-amber-200/80 block">
                              {new Date(ord.created_at).toLocaleDateString('hi-IN', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            <span className="text-sm font-extrabold text-white">
                              {ord.items?.[0] ? `${ord.items[0].crop_name} (${ord.items[0].quantity} ${ord.items[0].unit})` : 'कृषि उपज'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                            isPickedUp
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}>
                            <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
                            {isPickedUp ? 'रवाना (In Transit to Buyer)' : 'पिकअप प्रतीक्षारत (At Farm / Pickup)'}
                          </span>
                          <span className="text-base font-black text-amber-400">
                            ₹{ord.total_rupees}
                          </span>
                        </div>
                      </div>

                      {/* Dynamic Feedback Box for this Order */}
                      {orderFeedback && (
                        <div
                          className={`p-4 mx-6 mt-4 rounded-2xl text-xs font-bold border animate-fadeIn flex items-center gap-3 ${
                            orderFeedback.type === 'success'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                              : 'bg-red-50 text-red-900 border-red-300'
                          }`}
                        >
                          {orderFeedback.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : (
                            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                          <span className="flex-1">{orderFeedback.message}</span>
                        </div>
                      )}

                      {/* Main Dual Stage Workflow */}
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* ================= STAGE 1: FARMER PICKUP ================= */}
                        <div className={`p-5 rounded-2xl border transition-all ${
                          isPickedUp 
                            ? 'bg-emerald-50/60 border-emerald-300/60 opacity-85' 
                            : 'bg-[#FFFDF9] border-amber-400 shadow-md ring-2 ring-amber-400/20'
                        }`}>
                          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10 mb-4">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                                isPickedUp ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-emerald-950'
                              }`}>
                                {isPickedUp ? '✓' : '1'}
                              </span>
                              <h4 className="font-extrabold text-sm text-emerald-950">
                                {language === 'hi' ? 'चरण 1: किसान खेत पिकअप (Handshake)' : 'Stage 1: Farmer Farm Pickup'}
                              </h4>
                            </div>
                            {isPickedUp && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                माल लोड संपन्न ✓
                              </span>
                            )}
                          </div>

                          <div className="space-y-2.5 text-xs">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-emerald-950 block">खेत / पिकअप स्थान:</strong>
                                <span className="text-emerald-900/80">{ord.pickup_location || 'नासिक संकलन केंद्र (Nashik Mandi Hub)'}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                              <span className="text-emerald-950">
                                <strong>किसान:</strong> {ord.farmer_name || 'रमेश पाटिल'}
                              </span>
                              {ord.farmer_phone && (
                                <a
                                  href={`tel:${ord.farmer_phone}`}
                                  className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg hover:bg-emerald-200"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{ord.farmer_phone}</span>
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Pickup OTP Action Area */}
                          {!isPickedUp ? (
                            <div className="mt-5 pt-4 border-t border-emerald-900/10 space-y-3">
                              <div className="p-3 bg-amber-500/15 rounded-xl border border-amber-300 text-[11px] text-amber-950 space-y-1">
                                <p className="font-bold">
                                  🤝 <strong>किसान हैंडशेक निर्देश:</strong>
                                </p>
                                <p>
                                  खेत पर पहुँचकर सारा माल अपनी गाड़ी में लोड करें। इसके बाद किसान अपने फोन से <strong>"पिकअप OTP"</strong> जनरेट करेगा। वह 4-अंकीय कोड यहाँ दर्ज करें।
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-emerald-950">
                                  किसान द्वारा दिया गया 4-अंकीय पिकअप OTP:
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    maxLength={4}
                                    value={pickupInputs[ord.id] || ''}
                                    onChange={(e) =>
                                      setPickupInputs((prev) => ({
                                        ...prev,
                                        [ord.id]: e.target.value.replace(/\D/g, ''),
                                      }))
                                    }
                                    placeholder="उदा. 4829"
                                    className="flex-1 text-center font-mono font-black text-lg tracking-widest px-3 py-2 bg-white rounded-xl border-2 border-amber-400 focus:border-emerald-700 outline-none text-emerald-950 shadow-inner"
                                  />
                                  <button
                                    onClick={() => handleVerifyPickup(ord.id)}
                                    disabled={actionLoading[ord.id] || (pickupInputs[ord.id] || '').length !== 4}
                                    className="px-4 py-2 bg-[#0F3826] hover:bg-emerald-900 disabled:opacity-50 text-amber-300 font-bold rounded-xl text-xs shadow transition shrink-0"
                                  >
                                    {actionLoading[ord.id] ? 'सत्यापित हो रहा...' : 'पिकअप सत्यापित करें'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 pt-3 border-t border-emerald-200 text-center">
                              <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                खेत से माल लोड हो चुका है (Handshake Verified)
                              </span>
                            </div>
                          )}
                        </div>

                        {/* ================= STAGE 2: BUYER DROPOFF & PAYMENT ================= */}
                        <div className={`p-5 rounded-2xl border transition-all ${
                          !isPickedUp
                            ? 'bg-gray-50/70 border-gray-200 opacity-60 pointer-events-none'
                            : 'bg-[#FFFDF9] border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                        }`}>
                          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#0F3826] text-amber-400 flex items-center justify-center text-xs font-black">
                                2
                              </span>
                              <h4 className="font-extrabold text-sm text-emerald-950">
                                {language === 'hi' ? 'चरण 2: खरीदार डिलीवरी व भुगतान' : 'Stage 2: Buyer Delivery & Settlement'}
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                              {isCod ? 'नकद भुगतान (COD)' : 'ऑनलाइन एस्क्रो'}
                            </span>
                          </div>

                          <div className="space-y-2.5 text-xs">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-emerald-950 block">खरीदार का पता:</strong>
                                <span className="text-emerald-900/80">{ord.delivery_address}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                              <span className="text-emerald-950">
                                <strong>खरीदार:</strong> {ord.buyer_name || 'होटल अन्नपूर्णा'}
                              </span>
                              {ord.buyer_phone && (
                                <a
                                  href={`tel:${ord.buyer_phone}`}
                                  className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-lg hover:bg-emerald-200"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{ord.buyer_phone}</span>
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Payment Checkpoint */}
                          <div className="mt-4 pt-3 border-t border-emerald-900/10 space-y-3">
                            {isCod ? (
                              <div className="p-3 bg-amber-500/15 border-2 border-amber-400 rounded-xl space-y-2">
                                <div className="flex items-center justify-between text-xs font-extrabold text-amber-950">
                                  <span>💵 नकद संग्रह आवश्यक (COD Amount):</span>
                                  <span className="text-sm font-black text-emerald-950 bg-white px-2 py-0.5 rounded border border-amber-300">
                                    ₹{ord.total_rupees}
                                  </span>
                                </div>
                                <label className="flex items-start gap-2 cursor-pointer bg-white p-2 rounded-lg border border-amber-300">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(codCheckboxes[ord.id])}
                                    onChange={(e) =>
                                      setCodCheckboxes((prev) => ({
                                        ...prev,
                                        [ord.id]: e.target.checked,
                                      }))
                                    }
                                    className="mt-0.5 w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
                                  />
                                  <span className="text-[11px] font-bold text-emerald-950 leading-tight">
                                    हाँ, मैंने खरीदार से <strong className="text-amber-800">₹{ord.total_rupees}</strong> नकद राशि पूरी प्राप्त कर ली है।
                                  </span>
                                </label>
                              </div>
                            ) : (
                              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-900">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                                  <span>डिजिटल भुगतान (UPI/Escrow):</span>
                                </div>
                                <span className="font-extrabold text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded">
                                  ₹{ord.total_rupees} सुरक्षित ✓
                                </span>
                              </div>
                            )}

                            {/* Buyer Delivery OTP Input */}
                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold text-emerald-950">
                                खरीदार द्वारा दिया जाने वाला 4-अंकीय डिलीवरी OTP:
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  maxLength={4}
                                  disabled={isCod && !codCheckboxes[ord.id]}
                                  value={deliveryInputs[ord.id] || ''}
                                  onChange={(e) =>
                                    setDeliveryInputs((prev) => ({
                                      ...prev,
                                      [ord.id]: e.target.value.replace(/\D/g, ''),
                                    }))
                                  }
                                  placeholder={isCod && !codCheckboxes[ord.id] ? 'पहले नकद पुष्टि करें' : 'उदा. 9103'}
                                  className="flex-1 text-center font-mono font-black text-lg tracking-widest px-3 py-2 bg-white rounded-xl border-2 border-emerald-600 disabled:bg-gray-100 disabled:border-gray-300 focus:border-emerald-800 outline-none text-emerald-950 shadow-inner"
                                />
                                <button
                                  onClick={() => handleVerifyDelivery(ord.id, ord.payment_method)}
                                  disabled={
                                    actionLoading[ord.id] ||
                                    (deliveryInputs[ord.id] || '').length !== 4 ||
                                    (isCod && !codCheckboxes[ord.id])
                                  }
                                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-amber-50 font-bold rounded-xl text-xs shadow transition shrink-0"
                                >
                                  {actionLoading[ord.id] ? 'सत्यापित हो रहा...' : 'डिलीवरी पूर्ण करें'}
                                </button>
                              </div>
                              {isCod && !codCheckboxes[ord.id] && (
                                <p className="text-[10px] text-amber-800 font-medium">
                                  ⚠️ डिलीवरी OTP अनलॉक करने के लिए ऊपर नकद रसीद चेकबॉक्स पर टिक करें।
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AVAILABLE DELIVERIES TO ACCEPT */}
        {activeTab === 'available' && (
          <div className="space-y-6">
            <div className="bg-amber-500/15 border border-amber-300 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-amber-900" />
                <span className="text-xs font-bold text-amber-950">
                  किसान-से-खरीदार तक डिलीवरी के लिए उपलब्ध नए ऑर्डर्स। तुरंत स्वीकार करें और पिकअप शुरू करें।
                </span>
              </div>
              <span className="text-xs font-black text-amber-950 bg-amber-400 px-2.5 py-1 rounded-full">
                {availableOrders.length} कार्य उपलब्ध
              </span>
            </div>

            {availableOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-emerald-900/10 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base text-emerald-950">
                  {language === 'hi' ? 'फिलहाल कोई नया ऑर्डर लंबित नहीं है' : 'All available orders are accepted'}
                </h3>
                <p className="text-xs text-emerald-900/60">
                  जैसे ही कोई खरीदार नया ऑर्डर देगा, वह तुरंत यहाँ दिखाई देगा।
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableOrders.map((ord) => {
                  return (
                    <div
                      key={ord.id}
                      className="bg-white p-5 rounded-3xl border border-emerald-900/15 shadow-sm space-y-4 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                        <div>
                          <span className="text-xs font-mono font-black text-emerald-950">
                            #{ord.id}
                          </span>
                          <h4 className="font-extrabold text-sm text-emerald-950 mt-0.5">
                            {ord.items?.[0] ? `${ord.items[0].crop_name} (${ord.items[0].quantity} ${ord.items[0].unit})` : 'कृषि उपज'}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-800 block">
                            कुल मूल्य: ₹{ord.total_rupees}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            भाड़ा: ₹{(ord.delivery_fee_paise / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                          <div>
                            <span className="text-gray-500 block text-[10px]">पिकअप (किसान का खेत):</span>
                            <span className="font-bold text-emerald-950">
                              {ord.farmer_name || 'रमेश पाटिल'} • {ord.pickup_location || 'नासिक मंडी हब'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                          <div>
                            <span className="text-gray-500 block text-[10px]">ड्रॉप (खरीदार का पता):</span>
                            <span className="font-bold text-emerald-950">
                              {ord.buyer_name || 'होटल अन्नपूर्णा'} • {ord.delivery_address}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAcceptDelivery(ord.id)}
                        disabled={actionLoading[ord.id]}
                        className="w-full py-3 bg-[#0F3826] hover:bg-emerald-900 disabled:opacity-50 text-amber-400 font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow"
                      >
                        <Truck className="w-4 h-4" />
                        <span>{actionLoading[ord.id] ? 'स्वीकार किया जा रहा...' : 'डिलीवरी कार्य स्वीकार करें'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DELIVERED HISTORY */}
        {activeTab === 'delivered' && (
          <div className="space-y-4">
            {deliveredOrders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-emerald-900/10 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base text-emerald-950">
                  {language === 'hi' ? 'अभी तक कोई डिलीवरी पूर्ण नहीं हुई है' : 'No Delivered Orders Yet'}
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliveredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-5 rounded-3xl border border-emerald-900/15 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-mono font-bold text-emerald-950">#{ord.id}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        डिलीवर हुआ ✓
                      </span>
                    </div>

                    <p className="text-xs font-bold text-emerald-950">
                      {ord.items?.[0] ? `${ord.items[0].crop_name} (${ord.items[0].quantity} ${ord.items[0].unit})` : 'उपज'}
                    </p>

                    <div className="text-[11px] text-emerald-900/70 space-y-1">
                      <p>किसान: <strong>{ord.farmer_name || 'रमेश पाटिल'}</strong></p>
                      <p>खरीदार: <strong>{ord.buyer_name || 'अन्नपूर्णा होटल'}</strong></p>
                      <p>कुल राशि: <strong>₹{ord.total_rupees}</strong> ({ord.payment_method})</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ROUTE OPTIMIZER */}
        {activeTab === 'route' && (
          <div className="bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl space-y-6 border border-amber-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
              <div className="flex items-center gap-3">
                <Navigation className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-lg font-bold">
                    {language === 'hi' ? 'AI रसद एवं मल्टी-स्टॉप अनुकूलित मार्ग नियोजन' : 'AI Multi-Stop Route Optimizer Engine'}
                  </h2>
                  <p className="text-xs text-amber-200/70">
                    {language === 'hi' ? 'न्यूनतम दूरी, 0% भोजन खराबी, और ईंधन बचत दर' : 'Minimal transit distance, zero spoilage & optimal fuel rate'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold bg-emerald-950/80 px-4 py-2 rounded-2xl border border-emerald-800">
                <div>{language === 'hi' ? 'दूरी: ' : 'Distance: '}<span className="text-amber-400">42.5 किमी</span></div>
                <div>{language === 'hi' ? 'अनुमानित समय: ' : 'ETA: '}<span className="text-amber-400">55 मिनट</span></div>
                <div>{language === 'hi' ? 'ईंधन बचत: ' : 'Fuel Saved: '}<span className="text-emerald-400">+24.0%</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-500 text-emerald-950 font-black flex items-center justify-center text-xs">
                    #1
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">स्टॉप 1: नासिक संकलन केंद्र (Nashik Mandi Hub)</h4>
                    <p className="text-xs text-amber-200/70">पिकअप • किसान: रमेश पाटिल (टमाटर 500 किग्रा)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-mono font-bold rounded-lg">
                  पिकअप OTP हैंडशेक
                </span>
              </div>

              <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-emerald-950 font-black flex items-center justify-center text-xs">
                    #2
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white">स्टॉप 2: होटल अन्नपूर्णा (Swargate, Pune)</h4>
                    <p className="text-xs text-amber-200/70">ड्रॉप • खरीदार: रोहन शर्मा (डिलीवरी एवं एस्क्रो रिलीज)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold rounded-lg">
                  डिलीवरी OTP हैंडशेक
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </PortalGuard>
  );
}
