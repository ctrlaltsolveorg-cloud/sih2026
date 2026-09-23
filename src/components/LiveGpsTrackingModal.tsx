'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Truck, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  RefreshCw, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface LiveGpsTrackingModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'BUYER' | 'FARMER' | 'TRANSPORTER' | 'ADMIN';
}

interface TrackingData {
  orderId: string;
  orderStatus: string;
  deliveryStatus: string;
  driver: {
    name: string;
    phone: string;
    vehicle: string;
    currentLocation: {
      lat: number;
      lng: number;
      speedKmh: number;
      heading: number;
      lastUpdated: string;
    };
  };
  pickup: {
    locationName: string;
    lat: number;
    lng: number;
    farmerName: string;
    farmerPhone: string;
  };
  drop: {
    address: string;
    lat: number;
    lng: number;
    buyerName: string;
    buyerPhone: string;
  };
  locationHistory: Array<{
    lat: number;
    lng: number;
    timestamp: string;
    speed?: number;
    heading?: number;
  }>;
  estimatedDistanceKm: number;
  estimatedEtaMinutes: number;
  totalRupees: string;
  items?: Array<{
    crop_name: string;
    quantity: number;
    unit: string;
  }>;
}

export default function LiveGpsTrackingModal({
  orderId,
  isOpen,
  onClose,
  userRole = 'BUYER',
}: LiveGpsTrackingModalProps) {
  const { language } = useLanguage();
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState(0);

  // Simulation controls (for instant desktop demonstration)
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const simIntervalRef = useRef<any>(null);

  // Leaflet refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const driverMarkerRef = useRef<any>(null);
  const breadcrumbLayerRef = useRef<any>(null);
  const plannedRouteLayerRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);

  // 1. Fetch tracking data from backend
  const fetchTracking = async (silent = false) => {
    if (!orderId) return;
    try {
      if (!silent) setLoading(true);
      setError(null);

      const res = await fetch(`/api/v1/logistics/location?orderId=${encodeURIComponent(orderId)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Tracking telemetry not available');
      }

      setTracking(data);
      setLastSyncTime(new Date());
      setSecondsAgo(0);
    } catch (err: any) {
      console.error('Error loading GPS tracking:', err);
      if (!silent) setError(err.message || 'Failed to load tracking data');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Initial fetch & continuous 3-second live polling while modal is open
  useEffect(() => {
    if (!isOpen || !orderId) return;

    fetchTracking(false);
    const pollInterval = setInterval(() => {
      fetchTracking(true);
    }, 3500);

    const secondsCounter = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(pollInterval);
      clearInterval(secondsCounter);
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    };
  }, [isOpen, orderId]);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined') return;
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
        }).setView([19.8, 73.8], 10);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // High visual contrast tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap | KisanBandhan Live GPS',
        }).addTo(map);

        markersLayerRef.current = L.layerGroup().addTo(map);
        plannedRouteLayerRef.current = L.layerGroup().addTo(map);
        breadcrumbLayerRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      const markersLayer = markersLayerRef.current;
      const plannedLayer = plannedRouteLayerRef.current;
      const breadcrumbLayer = breadcrumbLayerRef.current;

      if (!tracking) return;

      markersLayer.clearLayers();
      plannedLayer.clearLayers();
      breadcrumbLayer.clearLayers();

      const { pickup, drop, driver, locationHistory } = tracking;

      // Draw Planned Road Corridor (Pickup -> Drop)
      const plannedCoords: [number, number][] = [
        [pickup.lat, pickup.lng],
        [drop.lat, drop.lng],
      ];

      // Outer glow line
      L.polyline(plannedCoords, {
        color: '#10B981',
        weight: 6,
        opacity: 0.35,
      }).addTo(plannedLayer);

      // Inner dashed road polyline
      L.polyline(plannedCoords, {
        color: '#F59E0B',
        weight: 3,
        dashArray: '6, 6',
        opacity: 0.9,
      }).addTo(plannedLayer);

      // Draw Historical Breadcrumb Trail ("Pura Track")
      if (locationHistory && locationHistory.length > 1) {
        const trailCoords: [number, number][] = locationHistory.map((pt) => [pt.lat, pt.lng]);
        L.polyline(trailCoords, {
          color: '#059669',
          weight: 4,
          opacity: 0.85,
        }).addTo(breadcrumbLayer);
      }

      // 1. Pickup Marker (Farmer / Mandi)
      const pickupHtml = `
        <div style="
          background: #047857;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 15px rgba(4, 120, 87, 0.6);
          border: 3px solid #ffffff;
        ">
          🚜
        </div>
      `;
      const pickupIcon = L.divIcon({
        html: pickupHtml,
        className: 'kb-pickup-marker',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });
      L.marker([pickup.lat, pickup.lng], { icon: pickupIcon })
        .addTo(markersLayer)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; color: #111;">
            <b style="color: #047857;">🌱 ${language === 'hi' ? 'खेत पिकअप बिंदु' : 'Farm Pickup Point'}</b>
            <div><b>${pickup.farmerName}</b></div>
            <div style="color: #666; font-size: 11px;">${pickup.locationName}</div>
            <a href="tel:${pickup.farmerPhone}" style="color: #047857; font-weight: bold;">📞 ${pickup.farmerPhone}</a>
          </div>
        `);

      // 2. Drop Marker (Buyer Delivery)
      const dropHtml = `
        <div style="
          background: #2563EB;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.6);
          border: 3px solid #ffffff;
        ">
          🏠
        </div>
      `;
      const dropIcon = L.divIcon({
        html: dropHtml,
        className: 'kb-drop-marker',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });
      L.marker([drop.lat, drop.lng], { icon: dropIcon })
        .addTo(markersLayer)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; color: #111;">
            <b style="color: #1D4ED8;">📦 ${language === 'hi' ? 'क्रेता सुपुर्दगी गंतव्य' : 'Buyer Delivery Destination'}</b>
            <div><b>${drop.buyerName}</b></div>
            <div style="color: #666; font-size: 11px;">${drop.address}</div>
            <a href="tel:${drop.buyerPhone}" style="color: #1D4ED8; font-weight: bold;">📞 ${drop.buyerPhone}</a>
          </div>
        `);

      // 3. Driver Live Location Marker (🚚)
      const currentLat = driver.currentLocation?.lat || pickup.lat;
      const currentLng = driver.currentLocation?.lng || pickup.lng;

      const driverHtml = `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="
            position: absolute;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.35);
            animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            position: relative;
            background: #064e3b;
            color: #fbbf24;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 0 16px rgba(16, 185, 129, 0.9);
            border: 3px solid #ffffff;
            cursor: pointer;
          ">
            🚚
          </div>
        </div>
      `;
      const driverIcon = L.divIcon({
        html: driverHtml,
        className: 'kb-driver-marker',
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker([currentLat, currentLng], { icon: driverIcon }).addTo(markersLayer);
      } else {
        driverMarkerRef.current.setLatLng([currentLat, currentLng]).addTo(markersLayer);
      }

      driverMarkerRef.current.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; color: #111;">
          <b style="color: #047857;">🚚 ${language === 'hi' ? 'लाइव चालक' : 'Live Driver'}: ${driver.name}</b>
          <div><b>${driver.vehicle}</b></div>
          <div style="color: #d97706; font-weight: bold; margin-top: 2px;">
            ${language === 'hi' ? 'गति' : 'Speed'}: ${driver.currentLocation.speedKmh || 32} km/h • ETA: ~${tracking.estimatedEtaMinutes} mins
          </div>
          <a href="tel:${driver.phone}" style="color: #047857; font-weight: bold;">📞 ${driver.phone}</a>
        </div>
      `);

      // Fit map bounds smoothly to include driver, pickup, and drop
      const allPoints: [number, number][] = [
        [pickup.lat, pickup.lng],
        [drop.lat, drop.lng],
        [currentLat, currentLng],
      ];
      map.fitBounds(L.latLngBounds(allPoints), { padding: [50, 50], maxZoom: 14 });
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [isOpen, tracking]);

  // 3. Desktop Live Simulation Handler
  // Allows testing and viewing the vehicle drive along the path even on static desktop
  const handleToggleSimulation = () => {
    if (isSimulating) {
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
      setIsSimulating(false);
      return;
    }

    if (!tracking) return;
    setIsSimulating(true);

    const { pickup, drop } = tracking;
    const totalSteps = 40;
    let step = simProgress;

    simIntervalRef.current = setInterval(async () => {
      step = (step + 1) % (totalSteps + 1);
      setSimProgress(step);

      const ratio = step / totalSteps;
      const simLat = pickup.lat + (drop.lat - pickup.lat) * ratio;
      const simLng = pickup.lng + (drop.lng - pickup.lng) * ratio;
      const simSpeed = step > 0 && step < totalSteps ? Math.floor(35 + Math.random() * 15) : 0;

      // Broadcast simulated step to backend so all portals (buyer & farmer) see it live!
      try {
        await fetch('/api/v1/logistics/location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            latitude: simLat,
            longitude: simLng,
            speed: simSpeed,
            heading: 45,
          }),
        });

        // Update local map driver marker immediately
        if (driverMarkerRef.current && mapInstanceRef.current) {
          driverMarkerRef.current.setLatLng([simLat, simLng]);
        }
      } catch (e) {}

      if (step === totalSteps) {
        clearInterval(simIntervalRef.current);
        setIsSimulating(false);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  const isPickedUp = tracking?.orderStatus === 'Out for Delivery' || tracking?.deliveryStatus === 'IN_TRANSIT';
  const isDelivered = tracking?.orderStatus === 'Delivered' || tracking?.deliveryStatus === 'DELIVERED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0c2419] text-amber-50 w-full max-w-4xl max-h-[92vh] rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="p-4 sm:p-5 bg-[#081B13] border-b border-emerald-800/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-400/30">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-950 border border-emerald-400/40 text-emerald-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {language === 'hi' ? 'लाइव GPS ट्रैकिंग चालू' : 'Live Driver GPS Active'}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  #{orderId}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {language === 'hi' ? 'खेत से खरीदार तक लाइव मार्ग' : 'Farm-to-Doorstep Live Tracking'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchTracking(false)}
              disabled={loading}
              className="p-2 bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 rounded-xl border border-emerald-700/50 transition"
              title="Refresh GPS Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-emerald-950 hover:bg-rose-950 text-amber-200 hover:text-rose-200 rounded-xl border border-emerald-800 transition"
              title="Close Map"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 sm:p-4 bg-[#0A1F16] border-b border-emerald-900/50 text-xs">
          <div className="p-2.5 bg-[#0F3826] rounded-2xl border border-emerald-800/60">
            <span className="text-[10px] font-extrabold text-amber-300/80 block uppercase">
              {language === 'hi' ? 'अनुमानित समय (ETA)' : 'Estimated ETA'}
            </span>
            <span className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-1 mt-0.5">
              <Clock className="w-4 h-4 text-amber-400" />
              ~{tracking?.estimatedEtaMinutes || 25} mins
            </span>
          </div>

          <div className="p-2.5 bg-[#0F3826] rounded-2xl border border-emerald-800/60">
            <span className="text-[10px] font-extrabold text-amber-300/80 block uppercase">
              {language === 'hi' ? 'शेष दूरी' : 'Remaining Distance'}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-300 flex items-center gap-1 mt-0.5">
              <Navigation className="w-4 h-4 text-emerald-400" />
              {tracking?.estimatedDistanceKm || 12.4} km
            </span>
          </div>

          <div className="p-2.5 bg-[#0F3826] rounded-2xl border border-emerald-800/60">
            <span className="text-[10px] font-extrabold text-amber-300/80 block uppercase">
              {language === 'hi' ? 'चालक की गति' : 'Vehicle Speed'}
            </span>
            <span className="text-base sm:text-lg font-black text-white flex items-center gap-1 mt-0.5">
              <Truck className="w-4 h-4 text-emerald-400" />
              {tracking?.driver?.currentLocation?.speedKmh || 34} km/h
            </span>
          </div>

          <div className="p-2.5 bg-[#0F3826] rounded-2xl border border-emerald-800/60">
            <span className="text-[10px] font-extrabold text-amber-300/80 block uppercase">
              {language === 'hi' ? 'यात्रा स्थिति' : 'Trip Status'}
            </span>
            <span className="text-xs font-bold text-amber-200 block truncate mt-1">
              {isDelivered
                ? (language === 'hi' ? '✓ सुरक्षित सुपुर्द' : '✓ Delivered')
                : isPickedUp
                ? (language === 'hi' ? '🚚 रास्ते में (In Transit)' : '🚚 In Transit')
                : (language === 'hi' ? '🌱 खेत की ओर (To Farm)' : '🌱 Heading to Farm')}
            </span>
          </div>
        </div>

        {/* Map View Area */}
        <div className="relative flex-1 min-h-[340px] sm:min-h-[420px] bg-emerald-950">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

          {/* Map Floating Legend */}
          <div className="absolute top-3 left-3 z-[400] bg-[#0c2419]/90 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-500/30 text-[11px] space-y-1.5 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white shrink-0"></span>
              <span className="font-bold text-amber-200">
                {language === 'hi' ? 'खेत पिकअप (किसान)' : 'Farm Pickup'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 border border-white animate-pulse shrink-0"></span>
              <span className="font-bold text-emerald-300">
                {language === 'hi' ? 'चालक की वर्तमान स्थिति' : 'Live Driver (Tata Ace)'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 border border-white shrink-0"></span>
              <span className="font-bold text-blue-200">
                {language === 'hi' ? 'खरीदार पता' : 'Buyer Drop'}
              </span>
            </div>
          </div>

          {/* Simulation / Demonstration Controller */}
          <div className="absolute top-3 right-3 z-[400]">
            <button
              onClick={handleToggleSimulation}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-lg border ${
                isSimulating
                  ? 'bg-amber-500 text-emerald-950 border-amber-300 animate-pulse'
                  : 'bg-[#0F3826]/90 hover:bg-emerald-900 text-amber-200 border-emerald-600/60 backdrop-blur-md'
              }`}
              title="Simulate driving along route for demonstration"
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
              <span>
                {isSimulating 
                  ? (language === 'hi' ? 'सिम्युलेशन चालू...' : 'Simulating...') 
                  : (language === 'hi' ? 'लाइव ड्राइव चलाएं (Demo)' : 'Simulate Drive (Demo)')}
              </span>
            </button>
          </div>

          {/* Live Heartbeat Indicator */}
          <div className="absolute bottom-3 left-3 z-[400] bg-[#0c2419]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 text-[10px] text-emerald-300 font-mono flex items-center gap-2 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>
              {language === 'hi' ? 'सिंक हुआ:' : 'Last Synced:'} {secondsAgo}s {language === 'hi' ? 'पहले' : 'ago'}
            </span>
          </div>
        </div>

        {/* Driver & Contact Footer Card */}
        <div className="p-4 sm:p-5 bg-[#081B13] border-t border-emerald-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-sm shrink-0">
              {tracking?.driver?.name ? tracking.driver.name.charAt(0) : 'V'}
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-amber-300/80 uppercase block">
                {language === 'hi' ? 'लॉजिस्टिक्स चालक विवरण' : 'Assigned Logistics Driver'}
              </span>
              <h4 className="text-sm font-extrabold text-white">
                {tracking?.driver?.name || 'Vikram Shinde'} • <span className="text-amber-300 font-mono">{tracking?.driver?.vehicle || 'MH-15-EG-8821'}</span>
              </h4>
              <p className="text-xs text-emerald-300/80">
                {language === 'hi' ? 'खेत:' : 'Farm:'} {tracking?.pickup?.locationName} ➔ {language === 'hi' ? 'गंतव्य:' : 'Drop:'} {tracking?.drop?.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {tracking?.driver?.phone && (
              <a
                href={`tel:${tracking.driver.phone}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'hi' ? 'ड्राइवर को कॉल करें' : 'Call Driver'}</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-amber-200 text-xs font-bold rounded-xl border border-emerald-700/60 transition"
            >
              {language === 'hi' ? 'बंद करें' : 'Close Map'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
