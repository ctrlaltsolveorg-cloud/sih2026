'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  VehicleType,
  OptimizationGoal,
  RouteStop,
  RouteOptimizationResult,
  VEHICLE_CONFIGS,
  VehicleConfig,
} from '@/lib/route-optimizer';
import {
  Truck,
  Navigation,
  Fuel,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Thermometer,
  Zap,
  Phone,
  Package,
  Layers,
  Eye,
} from 'lucide-react';

interface RouteOptimizerMapProps {
  initialVehicle?: VehicleType;
  initialGoal?: OptimizationGoal;
  onVerifyPickup?: (orderId: string, otp: string) => Promise<void>;
  onVerifyDelivery?: (orderId: string, otp: string) => Promise<void>;
}

export default function RouteOptimizerMap({
  initialVehicle = 'REEFER_VAN',
  initialGoal = 'COLD_CHAIN_PRIORITY',
  onVerifyPickup,
  onVerifyDelivery,
}: RouteOptimizerMapProps) {
  const [vehicleType, setVehicleType] = useState<VehicleType>(initialVehicle);
  const [goal, setGoal] = useState<OptimizationGoal>(initialGoal);
  const [routeData, setRouteData] = useState<RouteOptimizationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simIndex, setSimIndex] = useState(0);
  const [simSpeed, setSimSpeed] = useState<number>(5); // 1x, 5x, 10x
  const [showSteps, setShowSteps] = useState(false);
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null);

  // OTP Verification inputs
  const [otpInputs, setOtpInputs] = useState<Record<string, string>>({});
  const [verifyingOtp, setVerifyingOtp] = useState<Record<string, boolean>>({});
  const [otpSuccess, setOtpSuccess] = useState<Record<string, string>>({});

  // Leaflet references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const polylineLayerRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const truckMarkerRef = useRef<any>(null);
  const animFrameRef = useRef<any>(null);

  // Fetch optimized route from backend
  const fetchRoute = async (selectedVehicle = vehicleType, selectedGoal = goal) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `/api/v1/logistics/optimize-route?vehicleType=${selectedVehicle}&goal=${selectedGoal}`
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to optimize route');
      }
      setRouteData(data);
      setSimIndex(0);
      setIsSimulating(false);
    } catch (err: any) {
      console.error('Route fetch failed:', err);
      setError(err.message || 'Unable to calculate route');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoute(vehicleType, goal);
  }, [vehicleType, goal]);

  // Initialize and update Leaflet Map
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      // Dynamically import Leaflet
      const L = (await import('leaflet')).default;

      if (!isMounted) return;

      if (!mapInstanceRef.current) {
        // Initial center on Nashik / Maharashtra agro-belt
        const map = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
        }).setView([19.8, 73.8], 9);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // High-contrast clean dark/light OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors | KisanBandhan AI',
        }).addTo(map);

        markersGroupRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      const markersGroup = markersGroupRef.current;

      if (!routeData || !routeData.orderedStops || routeData.orderedStops.length === 0) {
        return;
      }

      markersGroup.clearLayers();
      if (polylineLayerRef.current) {
        map.removeLayer(polylineLayerRef.current);
      }
      if (truckMarkerRef.current) {
        map.removeLayer(truckMarkerRef.current);
      }

      // 1. Draw Route Polyline
      const latLngs = routeData.routeCoordinates;
      if (latLngs && latLngs.length > 0) {
        // Glow backdrop
        const glowPolyline = L.polyline(latLngs, {
          color: '#10B981',
          weight: 7,
          opacity: 0.4,
        }).addTo(markersGroup);

        // Core road line
        polylineLayerRef.current = L.polyline(latLngs, {
          color: '#F59E0B',
          weight: 4,
          opacity: 0.95,
          dashArray: '8, 4',
        }).addTo(markersGroup);

        map.fitBounds(glowPolyline.getBounds(), { padding: [40, 40] });
      }

      // 2. Add Stop Markers
      routeData.orderedStops.forEach((stop, index) => {
        let markerHtml = '';
        let badgeColor = '#F59E0B'; // Amber for pickup
        let label = `#${index + 1}`;

        if (stop.type === 'ORIGIN') {
          badgeColor = '#3B82F6';
          label = 'HUB';
        } else if (stop.type === 'DROP') {
          badgeColor = '#10B981';
          label = `D${index}`;
        }

        markerHtml = `
          <div style="
            background: ${badgeColor};
            color: #061e12;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 11px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.4);
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: transform 0.2s;
          " class="hover:scale-110">
            ${label}
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: 'kb-map-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([stop.lat, stop.lng], { icon: customIcon })
          .addTo(markersGroup)
          .bindPopup(`
            <div style="font-family: sans-serif; padding: 4px; color: #111;">
              <b style="font-size: 13px; color: #047857;">${stop.name}</b>
              <div style="font-size: 11px; margin-top: 2px;"><b>Type:</b> ${stop.type}</div>
              ${stop.cropName ? `<div style="font-size: 11px;"><b>Produce:</b> ${stop.cropName} (${stop.quantityKg || 0} kg)</div>` : ''}
              ${stop.contactName ? `<div style="font-size: 11px;"><b>Contact:</b> ${stop.contactName} (${stop.contactPhone || ''})</div>` : ''}
              <div style="font-size: 11px; margin-top: 4px; color: #d97706;"><b>ETA:</b> +${stop.etaMinutes || 0} mins</div>
            </div>
          `);

        marker.on('click', () => {
          setSelectedStopIndex(index);
        });
      });

      // 3. Create Live Truck Marker for Simulation
      if (latLngs && latLngs.length > 0) {
        const truckIcon = L.divIcon({
          html: `
            <div style="
              background: #10B981;
              color: white;
              width: 38px;
              height: 38px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.9);
              border: 3px solid #ffffff;
              animation: pulse 1.5s infinite;
              font-size: 18px;
            ">
              🚚
            </div>
          `,
          className: 'kb-truck-marker',
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });

        truckMarkerRef.current = L.marker(latLngs[0], { icon: truckIcon }).addTo(map);
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [routeData]);

  // Simulation Animation Loop
  useEffect(() => {
    if (!isSimulating || !routeData || !routeData.routeCoordinates.length) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const coords = routeData.routeCoordinates;
    let curr = simIndex;

    const step = () => {
      curr += simSpeed;
      if (curr >= coords.length) {
        curr = coords.length - 1;
        setIsSimulating(false);
      }

      setSimIndex(curr);

      if (truckMarkerRef.current && coords[curr]) {
        truckMarkerRef.current.setLatLng(coords[curr]);
      }

      if (curr < coords.length - 1 && isSimulating) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSimulating, simSpeed, routeData]);

  // Handle Verify OTP Handshake
  const handleVerifyOtp = async (stop: RouteStop, otpType: 'pickup' | 'delivery') => {
    const entered = (otpInputs[stop.id] || '').trim();
    if (!entered) return;

    setVerifyingOtp((prev) => ({ ...prev, [stop.id]: true }));
    try {
      if (otpType === 'pickup' && onVerifyPickup && stop.orderId) {
        await onVerifyPickup(stop.orderId, entered);
      } else if (otpType === 'delivery' && onVerifyDelivery && stop.orderId) {
        await onVerifyDelivery(stop.orderId, entered);
      } else {
        // Direct local verification check
        const res = await fetch('/api/v1/orders/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: stop.orderId || 'ord_demo',
            otpType,
            enteredOtp: entered,
          }),
        });
        const d = await res.json();
        if (!res.ok || !d.success) throw new Error(d.message || 'Invalid OTP');
      }

      setOtpSuccess((prev) => ({
        ...prev,
        [stop.id]: `✅ Verified! ${otpType === 'pickup' ? 'Loaded' : 'Delivered'}`,
      }));
    } catch (err: any) {
      alert(err.message || 'OTP verification failed');
    } finally {
      setVerifyingOtp((prev) => ({ ...prev, [stop.id]: false }));
    }
  };

  const currentVehicleConfig = VEHICLE_CONFIGS[vehicleType];

  return (
    <div className="bg-[#0b271a] text-amber-50 rounded-3xl p-5 sm:p-7 shadow-2xl border border-emerald-500/20 space-y-6">
      {/* HEADER WITH AI BADGE */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-800/60 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-emerald-950 font-bold shadow-lg">
              <Navigation className="w-5 h-5 text-emerald-950" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              AI Multi-Stop Route Optimizer
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                OSRM + TSP v2.4
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200/70">
            Automated farm-gate multi-stop pickup aggregation, APMC mandi transit & cold-chain shelf-life protection.
          </p>
        </div>

        {/* PRIORITY GOAL SELECTOR */}
        <div className="flex flex-wrap items-center gap-2 bg-emerald-950/80 p-1.5 rounded-2xl border border-emerald-800/80">
          <button
            onClick={() => setGoal('SHORTEST_DISTANCE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              goal === 'SHORTEST_DISTANCE'
                ? 'bg-amber-500 text-emerald-950 shadow-md font-black'
                : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Shortest Distance
          </button>
          <button
            onClick={() => setGoal('FASTEST_TIME')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              goal === 'FASTEST_TIME'
                ? 'bg-amber-500 text-emerald-950 shadow-md font-black'
                : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Fastest Time
          </button>
          <button
            onClick={() => setGoal('COLD_CHAIN_PRIORITY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              goal === 'COLD_CHAIN_PRIORITY'
                ? 'bg-emerald-500 text-emerald-950 shadow-md font-black'
                : 'text-amber-200/70 hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Cold-Chain Priority
          </button>
        </div>
      </div>

      {/* VEHICLE FLEET SELECTOR BAR */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          Select Active Dispatch Vehicle:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {Object.values(VEHICLE_CONFIGS).map((v) => {
            const isSelected = vehicleType === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setVehicleType(v.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-900 to-emerald-950 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-emerald-950/40 border-emerald-800/60 hover:border-emerald-700 text-emerald-200/80'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-amber-400" />
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xl">{v.icon}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-bold">
                    ₹{v.costPerKmRupees}/km
                  </span>
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-white leading-tight">{v.name}</div>
                  <div className="text-[10px] text-emerald-300/70 mt-0.5">
                    Cap: {v.maxPayloadKg} kg • {v.mileageKmPerL > 0 ? `${v.mileageKmPerL} km/L` : 'EV Zero-Emission'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* EFFICIENCY METRICS 4-CARD HUD */}
      {routeData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/80">
            <div className="text-[11px] text-amber-200/70 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              Total Transit
            </div>
            <div className="text-xl font-black text-white mt-1">
              {routeData.totalDistanceKm}{' '}
              <span className="text-xs font-normal text-emerald-300">km</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5 font-bold">
              -{routeData.distanceSavedKm} km deadhead saved
            </div>
          </div>

          <div className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/80">
            <div className="text-[11px] text-amber-200/70 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Trip Duration
            </div>
            <div className="text-xl font-black text-white mt-1">
              {Math.floor(routeData.totalDurationMinutes / 60)}h{' '}
              {routeData.totalDurationMinutes % 60}m
            </div>
            <div className="text-[10px] text-amber-300 mt-0.5">
              {routeData.orderedStops.length} stops scheduled
            </div>
          </div>

          <div className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/80">
            <div className="text-[11px] text-amber-200/70 flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-amber-400" />
              Diesel Saved
            </div>
            <div className="text-xl font-black text-amber-400 mt-1">
              ₹{routeData.dieselCostSavedRupees.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5 font-bold">
              +{routeData.fuelSavedLitres} L ({routeData.carbonEmissionSavedKg} kg CO₂)
            </div>
          </div>

          <div className="bg-emerald-950/60 p-3.5 rounded-2xl border border-emerald-800/80">
            <div className="text-[11px] text-amber-200/70 flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
              Spoilage Risk
            </div>
            <div className="text-xl font-black text-emerald-400 mt-1">
              {routeData.spoilageRiskScorePercent}%
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">
              {currentVehicleConfig.coldChainCapable ? '❄️ Active Chilling 4°C' : 'Normal Ventilated'}
            </div>
          </div>
        </div>
      )}

      {/* MAP & SIMULATOR CONTAINER */}
      <div className="space-y-3">
        {/* SIMULATION CONTROL TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-950/90 p-3 rounded-2xl border border-emerald-800">
          <div className="flex items-center gap-2">
            {!isSimulating ? (
              <button
                onClick={() => setIsSimulating(true)}
                disabled={loading || !routeData}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
              >
                <Play className="w-4 h-4 fill-emerald-950" />
                Start Trip Guidance
              </button>
            ) : (
              <button
                onClick={() => setIsSimulating(false)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs flex items-center gap-2 shadow-lg transition"
              >
                <Pause className="w-4 h-4 fill-white" />
                Pause Guidance
              </button>
            )}

            <button
              onClick={() => {
                setIsSimulating(false);
                setSimIndex(0);
                if (truckMarkerRef.current && routeData?.routeCoordinates[0]) {
                  truckMarkerRef.current.setLatLng(routeData.routeCoordinates[0]);
                }
              }}
              className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-amber-200 text-xs flex items-center gap-1 border border-emerald-700 transition"
              title="Reset Route"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* SPEED MULTIPLIER */}
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-xl text-xs">
              <span className="text-[10px] text-emerald-400 font-bold">Sim Speed:</span>
              {[2, 5, 12].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSimSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    simSpeed === spd
                      ? 'bg-amber-400 text-emerald-950'
                      : 'text-amber-200/60 hover:text-white'
                  }`}
                >
                  {spd === 2 ? '1x' : spd === 5 ? '3x' : '10x'}
                </button>
              ))}
            </div>
          </div>

          {/* SIMULATION LIVE HUD */}
          {routeData && (
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-300 font-bold">LIVE TELEMETRY:</span>
                <span className="text-amber-300 font-bold">
                  {isSimulating ? '52 km/h (Active)' : 'Stationary (Ready)'}
                </span>
              </div>
              <div className="hidden sm:block text-amber-200/70">
                Progress:{' '}
                <span className="text-white font-bold">
                  {routeData.routeCoordinates.length > 0
                    ? Math.round((simIndex / (routeData.routeCoordinates.length - 1)) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>
          )}
        </div>

        {/* MAP ELEMENT */}
        <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border-2 border-emerald-600/40 shadow-inner bg-[#12281e]">
          {loading && (
            <div className="absolute inset-0 bg-[#0c2217]/90 backdrop-blur-sm z-[1000] flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-bold text-amber-300">
                Calculating Optimal Multi-Stop Road Network...
              </p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 bg-[#0c2217]/95 z-[1000] flex flex-col items-center justify-center p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-amber-400 mb-2" />
              <p className="text-sm font-bold text-white">{error}</p>
              <button
                onClick={() => fetchRoute()}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs"
              >
                Retry Calculation
              </button>
            </div>
          )}

          {/* Leaflet container */}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* FLOATING MAP OVERLAY BADGE */}
          <div className="absolute top-3 left-3 z-[400] bg-emerald-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-700/80 text-[11px] text-amber-200 shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <b>OpenStreetMap National Road Network</b>
          </div>
        </div>
      </div>

      {/* GEMINI AI LOGISTICS ADVISORY */}
      {routeData?.aiLogisticsInsights && (
        <div className="bg-gradient-to-r from-emerald-950 via-[#0d3422] to-emerald-950 p-4 rounded-2xl border border-emerald-700/70 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Gemini AI Logistics Corridor Advisory
          </div>
          <p className="text-xs text-white/90 leading-relaxed font-medium">
            {routeData.aiLogisticsInsights.corridorSummary}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-emerald-800/60 text-xs">
            <div className="bg-black/20 p-2.5 rounded-xl">
              <span className="text-emerald-400 font-bold block mb-0.5">❄️ Cold-Chain:</span>
              <span className="text-amber-100/80 text-[11px]">
                {routeData.aiLogisticsInsights.coldChainAdvisory}
              </span>
            </div>
            <div className="bg-black/20 p-2.5 rounded-xl">
              <span className="text-amber-400 font-bold block mb-0.5">🏬 APMC Mandi Gates:</span>
              <span className="text-amber-100/80 text-[11px]">
                {routeData.aiLogisticsInsights.apmcCongestionTips}
              </span>
            </div>
            <div className="bg-black/20 p-2.5 rounded-xl">
              <span className="text-emerald-300 font-bold block mb-0.5">⛽ Driving Economy:</span>
              <span className="text-amber-100/80 text-[11px]">
                {routeData.aiLogisticsInsights.fuelConservationTip}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MULTI-STOP SCHEDULE TIMELINE */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Multi-Stop Itinerary & OTP Verification Handshakes
          </span>
          <span className="text-xs text-amber-200/70 font-normal">
            Sequence optimized for zero deadhead & low spoilage
          </span>
        </h3>

        <div className="space-y-3">
          {routeData?.orderedStops.map((stop, idx) => {
            const isOrigin = stop.type === 'ORIGIN';
            const isPickup = stop.type === 'PICKUP';
            const isDrop = stop.type === 'DROP';

            return (
              <div
                key={stop.id}
                className={`p-4 rounded-2xl border transition-all ${
                  selectedStopIndex === idx
                    ? 'bg-emerald-900/60 border-amber-400 shadow-lg'
                    : 'bg-emerald-950/60 border-emerald-800 hover:border-emerald-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        isOrigin
                          ? 'bg-blue-500 text-white'
                          : isPickup
                          ? 'bg-amber-500 text-emerald-950'
                          : 'bg-emerald-500 text-emerald-950'
                      }`}
                    >
                      {isOrigin ? 'HUB' : `#${idx + 1}`}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white">{stop.name}</h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isOrigin
                              ? 'bg-blue-500/20 text-blue-300'
                              : isPickup
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {stop.type}
                        </span>
                      </div>
                      <p className="text-xs text-amber-200/70 mt-0.5 flex items-center gap-2">
                        <span>📍 {stop.address || 'Designated Route Stop'}</span>
                        {stop.cropName && (
                          <span>
                            • 🌾 {stop.cropName} ({stop.quantityKg || 0} kg)
                          </span>
                        )}
                      </p>
                      {stop.contactName && (
                        <p className="text-xs text-emerald-300/80 mt-0.5 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-emerald-400" />
                          {stop.contactName} ({stop.contactPhone || ''})
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ETA & OTP ACTION HANDSHAKE */}
                  <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2 shrink-0">
                    <div className="text-xs font-mono text-amber-300 bg-black/40 px-2.5 py-1 rounded-lg">
                      ETA: +{stop.etaMinutes} mins ({stop.distanceFromPrevKm} km)
                    </div>

                    {/* OTP Handshake button if applicable */}
                    {(isPickup || isDrop) && (
                      <div className="w-full sm:w-auto flex items-center gap-2">
                        {otpSuccess[stop.id] ? (
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-900/50 px-3 py-1.5 rounded-xl border border-emerald-600">
                            {otpSuccess[stop.id]}
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5 w-full sm:w-auto">
                            <input
                              type="text"
                              maxLength={4}
                              placeholder={isPickup ? 'Farmer OTP' : 'Buyer OTP'}
                              value={otpInputs[stop.id] || ''}
                              onChange={(e) =>
                                setOtpInputs((prev) => ({ ...prev, [stop.id]: e.target.value }))
                              }
                              className="w-24 px-2 py-1.5 bg-emerald-900/80 border border-emerald-700 rounded-xl text-center text-xs font-mono font-bold text-white placeholder-emerald-400/50 focus:border-amber-400 outline-none"
                            />
                            <button
                              onClick={() => handleVerifyOtp(stop, isPickup ? 'pickup' : 'delivery')}
                              disabled={verifyingOtp[stop.id] || !(otpInputs[stop.id] || '').trim()}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-emerald-950 font-bold text-xs transition"
                            >
                              {verifyingOtp[stop.id] ? 'Verifying...' : 'Verify'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXPANDABLE TURN-BY-TURN NAVIGATION DRAWER */}
      {routeData?.navigationSteps && routeData.navigationSteps.length > 0 && (
        <div className="border border-emerald-800 rounded-2xl overflow-hidden bg-emerald-950/40">
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-amber-300 hover:bg-emerald-900/40 transition"
          >
            <span className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              Turn-by-Turn Road Instructions ({routeData.navigationSteps.length} Maneuvers)
            </span>
            {showSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showSteps && (
            <div className="p-4 border-t border-emerald-800/60 max-h-60 overflow-y-auto space-y-2 text-xs divide-y divide-emerald-800/40">
              {routeData.navigationSteps.map((step, i) => (
                <div key={i} className="pt-2 flex items-start justify-between gap-3 text-emerald-100">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono font-bold">{i + 1}.</span>
                    <span>{step.instruction}</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 shrink-0">
                    {(step.distanceMeters / 1000).toFixed(1)} km
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
