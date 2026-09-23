'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import { getLocalizedFarmer, getLocalizedLocation, stripIndicParens } from '@/lib/i18n';
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

const RouteOptimizerMap = dynamic(() => import('@/components/RouteOptimizerMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#0b271a] p-12 rounded-3xl border border-emerald-500/20 text-center text-amber-200 space-y-3">
      <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="font-bold text-sm">Initializing AI Multi-Stop Route Optimizer & Leaflet GIS Engine...</p>
    </div>
  ),
});

const LiveGpsTrackingModal = dynamic(() => import('@/components/LiveGpsTrackingModal'), {
  ssr: false,
});

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

  // GPS Tracking & Broadcaster states
  const [trackingModalOrderId, setTrackingModalOrderId] = useState<string | null>(null);
  const [activeGpsOrderId, setActiveGpsOrderId] = useState<string | null>(null);
  const [currentGpsCoords, setCurrentGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsBroadcastCount, setGpsBroadcastCount] = useState<number>(0);
  const watchIdRef = useRef<number | null>(null);

  // Continuous driver GPS watcher & backend broadcaster
  const startGpsTracking = (orderId: string, initialLat?: number, initialLng?: number) => {
    setActiveGpsOrderId(orderId);
    if (initialLat !== undefined && initialLng !== undefined) {
      setCurrentGpsCoords({ lat: initialLat, lng: initialLng });
    }

    if (typeof window === 'undefined' || !navigator.geolocation) {
      return;
    }

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    const id = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const speed = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : 34;
        const heading = pos.coords.heading || 45;
        setCurrentGpsCoords({ lat, lng });

        try {
          await fetch('/api/v1/logistics/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId,
              latitude: lat,
              longitude: lng,
              speed,
              heading,
            }),
          });
          setGpsBroadcastCount((c) => c + 1);
        } catch (err) {
          console.warn('GPS broadcast sync notice:', err);
        }
      },
      (err) => {
        console.warn('Geolocation notice / fallback:', err.message);
        if (!currentGpsCoords) {
          setCurrentGpsCoords({ lat: 20.0059, lng: 73.7898 });
        }
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );

    watchIdRef.current = id;
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

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

  // Accept an available delivery job with instant GPS tracking request
  const handleAcceptDelivery = async (orderId: string) => {
    setActionLoading((prev) => ({ ...prev, [orderId]: true }));
    setFeedback((prev) => ({ ...prev, [orderId]: null }));

    // Request browser Geolocation permission immediately
    let initialLat: number | undefined;
    let initialLng: number | undefined;

    if (typeof window !== 'undefined' && navigator.geolocation) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
          });
        });
        initialLat = pos.coords.latitude;
        initialLng = pos.coords.longitude;
      } catch (geoErr: any) {
        console.warn('Driver GPS prompt result:', geoErr.message);
      }
    }

    try {
      const res = await fetch('/api/v1/orders/accept-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          partnerId: 'u_partner_1',
          driverName: userName || 'Vikram Shinde',
          driverPhone: '+91 99000 11122',
          driverVehicle: 'MH-15-EG-8821 (Tata Ace Gold)',
          initialLatitude: initialLat,
          initialLongitude: initialLng,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to accept delivery task.');
      }

      // Start continuous background GPS broadcaster
      startGpsTracking(orderId, initialLat, initialLng);

      setFeedback((prev) => ({
        ...prev,
        [orderId]: { 
          type: 'success', 
          message: '✅ कार्य स्वीकृत! GPS ट्रैकिंग शुरू हो गई है और क्रेता व किसान के पोर्टल पर लाइव दिख रही है।' 
        },
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
        [orderId]: { type: 'error', message: 'Please enter the 4-digit pickup OTP provided by the farmer.' },
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
        throw new Error(data.message || 'Pickup OTP verification failed.');
      }

      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'success', message: data.message || '✅ Pickup verified! Produce loaded onto vehicle.' },
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
        [orderId]: { type: 'error', message: '⚠️ Please confirm first that you have collected the cash amount from the buyer.' },
      }));
      return;
    }

    const entered = (deliveryInputs[orderId] || '').trim();
    if (!entered) {
      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'error', message: 'Please enter the 4-digit delivery OTP received from the buyer.' },
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
        throw new Error(data.message || 'Delivery OTP verification failed.');
      }

      setFeedback((prev) => ({
        ...prev,
        [orderId]: { type: 'success', message: data.message || '🎉 Delivery completed! Escrow payment released to farmer.' },
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
      portalName="Transporter Fleet"
      portalDescription="This portal is restricted to Transporters and Logistics Partners for cold-chain routing and OTP verification."
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
                  Direct Fleet & Cold-Chain Logistics
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-300 font-bold bg-emerald-900/60 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  GPS Live
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Green-Way Logistics Fleet Partner
              </h1>
              <p className="text-xs sm:text-sm text-amber-200/80 mt-0.5">
                Driver: {userName || 'Vikram Shinde'} • Vehicle: MH-15-EG-8821 • 2-Stage OTP Handshake
              </p>
            </div>
          </div>

          <button
            onClick={loadOrders}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-900/80 hover:bg-emerald-800 text-amber-200 rounded-xl text-xs font-bold border border-emerald-700 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            <span>Refresh Orders</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-emerald-900/20 dark:border-emerald-500/20 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'active'
                ? 'bg-[#0F3826] dark:bg-emerald-700 text-amber-400 dark:text-amber-200 shadow-md'
                : 'bg-emerald-950/10 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-900/10 dark:hover:bg-emerald-800/40'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Active Trips & OTPs</span>
            <span className="px-2 py-0.5 bg-amber-400 dark:bg-amber-300 text-emerald-950 rounded-full text-[10px] font-black">
              {activeOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('available')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'available'
                ? 'bg-[#0F3826] dark:bg-emerald-700 text-amber-400 dark:text-amber-200 shadow-md'
                : 'bg-emerald-950/10 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-900/10 dark:hover:bg-emerald-800/40'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Available Deliveries</span>
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
                ? 'bg-[#0F3826] dark:bg-emerald-700 text-amber-400 dark:text-amber-200 shadow-md'
                : 'bg-emerald-950/10 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-900/10 dark:hover:bg-emerald-800/40'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Delivered History</span>
            <span className="px-2 py-0.5 bg-emerald-800/30 dark:bg-emerald-700/50 text-emerald-950 dark:text-emerald-100 rounded-full text-[10px] font-bold">
              {deliveredOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('route')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 ${
              activeTab === 'route'
                ? 'bg-[#0F3826] dark:bg-emerald-700 text-amber-400 dark:text-amber-200 shadow-md'
                : 'bg-emerald-950/10 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-900/10 dark:hover:bg-emerald-800/40'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>AI Route Optimizer</span>
          </button>
        </div>

        {/* TAB 1: ACTIVE TRIPS & 2-STAGE OTP VERIFICATION */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            {activeOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#0c1f15] p-12 rounded-3xl border border-emerald-900/10 dark:border-emerald-500/20 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
                    No Active Trips Right Now
                  </h3>
                  <p className="text-xs text-emerald-900/70 dark:text-emerald-300/70 max-w-sm mx-auto mt-1">
                    Switch to the "Available Deliveries" tab to accept pending farmer orders.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('available')}
                  className="px-5 py-2.5 bg-[#0F3826] dark:bg-emerald-700 text-amber-400 dark:text-amber-200 rounded-xl text-xs font-bold hover:bg-emerald-900 dark:hover:bg-emerald-600 transition shadow"
                >
                  View Available Orders
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
                      className="bg-white dark:bg-[#081B13] rounded-3xl border border-emerald-900/20 dark:border-emerald-500/30 shadow-xl overflow-hidden transition-colors"
                    >
                      {/* Trip Card Top Ribbon */}
                      <div className="bg-[#0F3826] dark:bg-[#05130d] text-amber-50 p-5 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-800/40">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full text-xs font-mono font-black">
                            #{ord.id}
                          </span>
                          <div>
                            <span className="text-xs text-amber-200/80 block">
                              {new Date(ord.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            <span className="text-sm font-extrabold text-white">
                              {ord.items?.[0] ? `${ord.items[0].crop_name} (${ord.items[0].quantity} ${ord.items[0].unit})` : 'Fresh Tomatoes - Vaishali 108 (100 kg)'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setTrackingModalOrderId(ord.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-black rounded-lg transition shadow border border-emerald-300 animate-pulse"
                            title="Open Real-Time GPS Tracking Map"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>📍 {language === 'hi' ? 'लाइव GPS ट्रैक' : 'Live GPS'}</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('route')}
                            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-800/80 hover:bg-emerald-700 text-amber-200 text-xs font-bold rounded-lg transition border border-emerald-600/50"
                            title="Open AI Route Optimizer"
                          >
                            <Navigation className="w-3.5 h-3.5 text-amber-400" />
                            <span>AI Route</span>
                          </button>
                          <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                            isPickedUp
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}>
                            <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
                            {isPickedUp ? 'In Transit to Buyer' : 'At Farm / Pickup'}
                          </span>
                          <span className="text-base font-black text-amber-400">
                            ₹{ord.total_rupees}
                          </span>
                        </div>
                      </div>

                      {/* Live GPS Telemetry Broadcaster Status Banner */}
                      <div className="bg-emerald-950/40 dark:bg-black/30 px-5 py-2.5 border-b border-emerald-900/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </span>
                          <span className="font-extrabold text-emerald-300">
                            {language === 'hi' ? 'चालक लाइव GPS ब्रॉडकास्टर चालू' : 'Driver Live GPS Broadcaster Active'}
                          </span>
                          <span className="text-amber-300 font-mono text-[11px] bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700">
                            {currentGpsCoords ? `Lat: ${currentGpsCoords.lat.toFixed(4)}, Lng: ${currentGpsCoords.lng.toFixed(4)}` : 'Broadcasting Live Telemetry'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setTrackingModalOrderId(ord.id)}
                            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs rounded-lg transition shadow flex items-center gap-1.5"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{language === 'hi' ? 'मानचित्र पर देखें' : 'View Live Map'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Dynamic Feedback Box for this Order */}
                      {orderFeedback && (
                        <div
                          className={`p-4 mx-6 mt-4 rounded-2xl text-xs font-bold border animate-fadeIn flex items-center gap-3 ${
                            orderFeedback.type === 'success'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                              : 'bg-red-50 dark:bg-red-950/60 text-red-900 dark:text-red-200 border-red-300 dark:border-red-700'
                          }`}
                        >
                          {orderFeedback.type === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                          )}
                          <span className="flex-1">{orderFeedback.message}</span>
                        </div>
                      )}

                      {/* Main Dual Stage Workflow */}
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* ================= STAGE 1: FARMER PICKUP ================= */}
                        <div className={`p-5 rounded-2xl border transition-all ${
                          isPickedUp 
                            ? 'bg-emerald-50/70 dark:bg-[#0b2419] border-emerald-300/80 dark:border-emerald-600/40 text-emerald-950 dark:text-emerald-100' 
                            : 'bg-white dark:bg-[#0e2a1d] border-amber-400 dark:border-amber-500/60 shadow-md ring-2 ring-amber-400/20 text-emerald-950 dark:text-emerald-100'
                        }`}>
                          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10 dark:border-emerald-500/20 mb-4">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                                isPickedUp ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-emerald-950'
                              }`}>
                                {isPickedUp ? '✓' : '1'}
                              </span>
                              <h4 className="font-extrabold text-sm text-emerald-950 dark:text-emerald-100">
                                Stage 1: Farmer Farm Pickup
                              </h4>
                            </div>
                            {isPickedUp && (
                              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700/40">
                                Produce Loaded ✓
                              </span>
                            )}
                          </div>

                          <div className="space-y-2.5 text-xs">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-emerald-950 dark:text-emerald-200 block">
                                  Farm Pickup Location:
                                </strong>
                                <span className="text-emerald-900/90 dark:text-emerald-300/90">
                                  {ord.pickup_location || 'Farm Collection Center #04, Nashik Mandi Hub'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                              <span className="text-emerald-950 dark:text-emerald-200">
                                <strong>{language === 'hi' ? 'किसान:' : 'Farmer:'}</strong> {getLocalizedFarmer(ord.farmer_name || 'Ramesh Patil', language)}
                              </span>
                              <a
                                href={`tel:${ord.farmer_phone || '+919876543210'}`}
                                className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-1 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 border border-emerald-300 dark:border-emerald-700/50"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{ord.farmer_phone || '+91 98765 43210'}</span>
                              </a>
                            </div>
                          </div>

                          {/* Pickup OTP Action Area */}
                          {!isPickedUp ? (
                            <div className="mt-5 pt-4 border-t border-emerald-900/10 dark:border-emerald-500/20 space-y-3">
                              <div className="p-3 bg-amber-500/15 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-700/50 text-[11px] text-amber-950 dark:text-amber-200 space-y-1">
                                <p className="font-bold">
                                  🤝 <strong>Farmer Handshake Directive:</strong>
                                </p>
                                <p>
                                  Arrive at the farm, load the produce, and enter the 4-digit pickup OTP provided by the farmer on-site.
                                </p>
                              </div>

                              <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-emerald-950 dark:text-emerald-200">
                                  Enter 4-Digit Pickup Handover OTP:
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
                                    placeholder="4829"
                                    className="flex-1 text-center font-mono font-black text-lg tracking-widest px-3 py-2 bg-white dark:bg-[#07170f] rounded-xl border-2 border-amber-400 dark:border-amber-500 focus:border-emerald-700 dark:focus:border-emerald-400 outline-none text-emerald-950 dark:text-emerald-100 shadow-inner"
                                  />
                                  <button
                                    onClick={() => handleVerifyPickup(ord.id)}
                                    disabled={actionLoading[ord.id] || (pickupInputs[ord.id] || '').length !== 4}
                                    className="px-4 py-2 bg-[#0F3826] hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 disabled:opacity-50 text-amber-300 dark:text-amber-100 font-bold rounded-xl text-xs shadow transition shrink-0"
                                  >
                                    {actionLoading[ord.id]
                                      ? 'Verifying...'
                                      : 'Verify Pickup'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-700/40 text-center">
                              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                Farm Handshake Verified & Loaded
                              </span>
                            </div>
                          )}
                        </div>

                        {/* ================= STAGE 2: BUYER DROPOFF & PAYMENT ================= */}
                        <div className={`p-5 rounded-2xl border transition-all ${
                          !isPickedUp
                            ? 'bg-gray-50/70 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 opacity-60 pointer-events-none'
                            : 'bg-white dark:bg-[#0e2a1d] border-emerald-600 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/20 text-emerald-950 dark:text-emerald-100'
                        }`}>
                          <div className="flex items-center justify-between pb-3 border-b border-emerald-900/10 dark:border-emerald-500/20 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#0F3826] text-amber-400 flex items-center justify-center text-xs font-black">
                                2
                              </span>
                              <h4 className="font-extrabold text-sm text-emerald-950 dark:text-emerald-100">
                                Stage 2: Buyer Delivery & Settlement
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-300 dark:border-amber-700/50">
                              {isCod ? 'Cash on Delivery (COD)' : 'Online Escrow'}
                            </span>
                          </div>

                          <div className="space-y-2.5 text-xs">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-emerald-950 dark:text-emerald-200 block">
                                  Buyer Delivery Address:
                                </strong>
                                <span className="text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed block">
                                  {ord.delivery_address}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                              <span className="text-emerald-950 dark:text-emerald-200">
                                <strong>Buyer:</strong> {ord.buyer_name || 'Annapurna Hotel & Catering'}
                              </span>
                              <a
                                href={`tel:${ord.buyer_phone || '+919822233344'}`}
                                className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-1 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 border border-emerald-300 dark:border-emerald-700/50"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{ord.buyer_phone || '+91 98222 33344'}</span>
                              </a>
                            </div>
                          </div>

                          {/* Payment Checkpoint */}
                          <div className="mt-4 pt-3 border-t border-emerald-900/10 dark:border-emerald-500/20 space-y-3">
                            {isCod ? (
                              <div className="p-3 bg-amber-500/15 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-600/50 rounded-xl space-y-2 text-amber-950 dark:text-amber-100">
                                <div className="flex items-center justify-between text-xs font-extrabold text-amber-950 dark:text-amber-200">
                                  <span>💵 Cash Collection Required (COD):</span>
                                  <span className="text-sm font-black text-emerald-950 dark:text-amber-300 bg-white dark:bg-[#07170f] px-2.5 py-0.5 rounded border border-amber-400 dark:border-amber-600">
                                    ₹{ord.total_rupees}
                                  </span>
                                </div>
                                <label className="flex items-start gap-2.5 cursor-pointer bg-white dark:bg-[#07170f] p-2.5 rounded-xl border border-amber-400 dark:border-amber-600/70 hover:border-amber-500 transition">
                                  <input
                                    type="checkbox"
                                    checked={Boolean(codCheckboxes[ord.id])}
                                    onChange={(e) =>
                                      setCodCheckboxes((prev) => ({
                                        ...prev,
                                        [ord.id]: e.target.checked,
                                      }))
                                    }
                                    className="mt-0.5 w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 cursor-pointer shrink-0"
                                  />
                                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-100 leading-tight">
                                    Yes, I have collected full cash amount of <strong className="text-amber-700 dark:text-amber-300">₹{ord.total_rupees}</strong> from the buyer.
                                  </span>
                                </label>
                              </div>
                            ) : (
                              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200">
                                <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                                  <span>Digital Escrow Payment:</span>
                                </div>
                                <span className="font-extrabold text-emerald-950 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700/50">
                                  ₹{ord.total_rupees} Protected ✓
                                </span>
                              </div>
                            )}

                            {/* Buyer Delivery OTP Input */}
                            <div className="space-y-1.5">
                              <label className="block text-xs font-bold text-emerald-950 dark:text-emerald-200">
                                Enter 4-Digit Buyer Delivery OTP:
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
                                  placeholder={isCod && !codCheckboxes[ord.id] ? 'Confirm Cash First' : '9103'}
                                  className="flex-1 text-center font-mono font-black text-lg tracking-widest px-3 py-2 bg-white dark:bg-[#07170f] rounded-xl border-2 border-emerald-600 dark:border-emerald-500 disabled:bg-gray-100 dark:disabled:bg-[#07170f]/70 disabled:border-gray-300 dark:disabled:border-emerald-900/40 focus:border-emerald-800 dark:focus:border-emerald-400 outline-none text-emerald-950 dark:text-emerald-100 disabled:text-gray-400 dark:disabled:text-emerald-500/40 shadow-inner"
                                />
                                <button
                                  onClick={() => handleVerifyDelivery(ord.id, ord.payment_method)}
                                  disabled={
                                    actionLoading[ord.id] ||
                                    (deliveryInputs[ord.id] || '').length !== 4 ||
                                    (isCod && !codCheckboxes[ord.id])
                                  }
                                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-amber-50 font-bold rounded-xl text-xs shadow-lg transition shrink-0"
                                >
                                  {actionLoading[ord.id]
                                    ? 'Verifying...'
                                    : 'Complete Delivery'}
                                </button>
                              </div>
                              {isCod && !codCheckboxes[ord.id] && (
                                <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1 mt-1">
                                  <span>⚠️</span>
                                  <span>Check the cash received box above to unlock delivery OTP input.</span>
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
            <div className="bg-amber-500/15 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-amber-900 dark:text-amber-300" />
                <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  New orders available for farm-to-buyer delivery. Accept to start pickup immediately.
                </span>
              </div>
              <span className="text-xs font-black text-amber-950 dark:text-amber-200 bg-amber-400 dark:bg-amber-600/60 px-2.5 py-1 rounded-full">
                {availableOrders.length} Available
              </span>
            </div>

            {availableOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#0c1f15] p-12 rounded-3xl border border-emerald-900/10 dark:border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="font-bold text-base text-emerald-950 dark:text-emerald-100">
                  All available orders are accepted
                </h3>
                <p className="text-xs text-emerald-900/60 dark:text-emerald-300/60">
                  As soon as a buyer places an order, it will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableOrders.map((ord) => {
                  return (
                    <div
                      key={ord.id}
                      className="bg-white dark:bg-[#081B13] p-5 rounded-3xl border border-emerald-900/15 dark:border-emerald-500/30 shadow-sm space-y-4 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-emerald-500/20 pb-3">
                        <div>
                          <span className="text-xs font-mono font-black text-emerald-950 dark:text-amber-300">
                            #{ord.id}
                          </span>
                          <h4 className="font-extrabold text-sm text-emerald-950 dark:text-emerald-100 mt-0.5">
                            {ord.items?.[0] ? `${ord.items[0].crop_name} (${ord.items[0].quantity} ${ord.items[0].unit})` : 'Farm Produce'}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">
                            Total: ₹{ord.total_rupees}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-700">
                            Freight: ₹{(ord.delivery_fee_paise / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0"></span>
                          <div>
                            <span className="text-gray-500 dark:text-emerald-400/80 block text-[10px]">
                              Pickup (Farmer Farm):
                            </span>
                            <span className="font-bold text-emerald-950 dark:text-emerald-100">
                              {getLocalizedFarmer(ord.farmer_name || 'Ramesh Patil', language)} • {getLocalizedLocation(ord.pickup_location || 'Nashik Mandi Hub', language)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400 mt-1.5 shrink-0"></span>
                          <div>
                            <span className="text-gray-500 dark:text-amber-400/80 block text-[10px]">
                              Drop (Buyer Address):
                            </span>
                            <span className="font-bold text-emerald-950 dark:text-emerald-100">
                              {ord.buyer_name || 'Hotel Annapurna'} • {ord.delivery_address}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAcceptDelivery(ord.id)}
                        disabled={actionLoading[ord.id]}
                        className="w-full py-3 bg-[#0F3826] hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 disabled:opacity-50 text-amber-400 dark:text-amber-200 font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow"
                      >
                        <Truck className="w-4 h-4" />
                        <span>
                          {actionLoading[ord.id]
                            ? 'Accepting...'
                            : 'Accept Delivery Task'}
                        </span>
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
              <div className="bg-white dark:bg-[#0c1f15] p-12 rounded-3xl border border-emerald-900/10 dark:border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="font-bold text-base text-emerald-950 dark:text-emerald-100">
                  No Delivered Orders Yet
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliveredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white dark:bg-[#081B13] p-5 rounded-3xl border border-emerald-900/15 dark:border-emerald-500/30 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-emerald-500/20 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-mono font-bold text-emerald-950 dark:text-amber-300">#{ord.id}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                        Delivered ✓
                      </span>
                    </div>

                    <p className="text-xs font-bold text-emerald-950 dark:text-emerald-100">
                      {ord.items?.[0] ? `${ord.items[0].crop_name} (${ord.items[0].quantity} ${ord.items[0].unit})` : 'Produce'}
                    </p>

                    <div className="text-[11px] text-emerald-900/80 dark:text-emerald-300/80 space-y-1">
                      <p>{language === 'hi' ? 'किसान:' : 'Farmer:'} <strong>{getLocalizedFarmer(ord.farmer_name || 'Ramesh Patil', language)}</strong></p>
                      <p>{language === 'hi' ? 'खरीदार:' : 'Buyer:'} <strong>{stripIndicParens(ord.buyer_name || 'Hotel Annapurna')}</strong></p>
                      <p>{language === 'hi' ? 'कुल राशि:' : 'Total:'} <strong>₹{ord.total_rupees}</strong> ({ord.payment_method})</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: AI ROUTE OPTIMIZER */}
        {activeTab === 'route' && (
          <RouteOptimizerMap
            initialVehicle="REEFER_VAN"
            initialGoal="COLD_CHAIN_PRIORITY"
            onVerifyPickup={async (orderId, otp) => {
              setPickupInputs((prev) => ({ ...prev, [orderId]: otp }));
              await handleVerifyPickup(orderId);
            }}
            onVerifyDelivery={async (orderId, otp) => {
              setDeliveryInputs((prev) => ({ ...prev, [orderId]: otp }));
              await handleVerifyDelivery(orderId, 'UPI');
            }}
          />
        )}

        {/* Real-Time Driver GPS Tracking Modal */}
        {trackingModalOrderId && (
          <LiveGpsTrackingModal
            orderId={trackingModalOrderId}
            isOpen={Boolean(trackingModalOrderId)}
            onClose={() => setTrackingModalOrderId(null)}
            userRole="TRANSPORTER"
          />
        )}

      </div>
    </PortalGuard>
  );
}
