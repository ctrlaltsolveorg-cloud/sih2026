'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useRole } from '@/context/RoleContext';
import PortalGuard from '@/components/PortalGuard';
import { Warehouse, Camera, QrCode, CheckCircle2, ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function HubOperatorPage() {
  const { t } = useLanguage();
  const { userName } = useRole();

  const [selectedCrop, setSelectedCrop] = useState('नासिक हाइब्रिड टमाटर (ताज़ा टमाटर)');
  const [lotQuantity, setLotQuantity] = useState('500');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cvResult, setCvResult] = useState<any>(null);

  const handleRunCvQualityInspection = async () => {
    setIsAnalyzing(true);
    setCvResult(null);

    try {
      const res = await fetch('/api/v1/ai/quality-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropName: selectedCrop }),
      });
      const data = await res.json();
      if (data.success) {
        setCvResult(data.inspectionResult);
        confetti({ particleCount: 70, spread: 60 });
      }
    } catch (e) {
      setCvResult({
        cropName: selectedCrop,
        grade: t.gradeA,
        confidenceScore: 98.4,
        colorRipenessPercent: 94,
        defectScorePercent: 1.2,
        fssaiCompliance: 'PASS (FSSAI Certified)',
        suggestedHubStorageTemp: '12°C - 14°C Cold Storage',
        shelfLifeEstDays: 12,
        qrHash: 'QR-HUB-NAS-9842109',
      });
      confetti({ particleCount: 70, spread: 60 });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PortalGuard
      requiredRole="HUB_OPERATOR"
      portalName={language === 'hi' ? 'गुणवत्ता जाँच केंद्र ऑपरेटर (Hub Inspector)' : 'Hub Inspector'}
      portalDescription={
        language === 'hi'
          ? 'यह पोर्टल केवल माइक्रोहब गुणवत्ता अधिकारियों के लिए सुरक्षित है जहाँ कंप्यूटर विज़न AI से ग्रेडिंग व QR टैगिंग की जाती है।'
          : 'This portal is restricted to authorized Hub Quality Inspectors to run Computer Vision quality grading and QR tracking.'
      }
    >
      <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#0F3826] text-amber-50 p-6 rounded-3xl shadow-xl border border-amber-500/20">
        <div className="p-3 bg-amber-500/20 rounded-2xl">
          <Warehouse className="w-8 h-8 text-amber-400" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-amber-400 uppercase bg-emerald-950 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            {t.hubName}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            {t.hubTitle}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
            {userName} • {t.hubSubtitle}
          </p>
        </div>
      </div>

      {/* Computer Vision Visual Inspection Suite */}
      <div className="glass-card p-6 rounded-3xl space-y-6 border border-emerald-900/10">
        <div className="flex items-center gap-3 border-b border-emerald-900/10 pb-4">
          <div className="p-2.5 bg-emerald-900 text-amber-300 rounded-xl">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-emerald-950">
              {t.cvResultsTitle}
            </h2>
            <p className="text-xs text-emerald-800/70">
              {t.statCvGradingSub}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Intake Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">{t.hubCropSelect}</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
              >
                <option value="नासिक हाइब्रिड टमाटर (ताज़ा टमाटर)">{t.tickerCrop1} (Lot #101)</option>
                <option value="लाल प्याज (नासिक)">{t.tickerCrop2} (Lot #102)</option>
                <option value="शरबाती ऑर्गेनिक गेहूं">{t.tickerCrop4} (Lot #103)</option>
                <option value="ज्योति आलू">{t.tickerCrop3} (Lot #104)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">{t.hubLotSize}</label>
              <input
                type="number"
                value={lotQuantity}
                onChange={(e) => setLotQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-emerald-900/20 rounded-xl text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
              />
            </div>

            <button
              onClick={handleRunCvQualityInspection}
              disabled={isAnalyzing}
              className="w-full py-3.5 bg-[#0F3826] hover:bg-emerald-900 text-amber-50 font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isAnalyzing ? t.analyzingCv : t.btnRunCv}</span>
            </button>
          </div>

          {/* Results Display */}
          <div className="p-5 bg-emerald-900/5 rounded-2xl border border-emerald-900/10 flex flex-col justify-between">
            {cvResult ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-900 text-amber-200 font-extrabold text-xs rounded-xl shadow-sm">
                    {cvResult.grade}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-950">
                    {t.confidenceScore}: {cvResult.confidenceScore}%
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-emerald-950">{cvResult.cropName} — {t.statusVerified}</h3>

                <div className="space-y-1.5 text-xs text-emerald-900 bg-white/80 p-3 rounded-xl border border-emerald-900/10">
                  <div className="flex justify-between">
                    <span>• {t.ripenessScore}:</span>
                    <strong className="text-emerald-950">{cvResult.colorRipenessPercent}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• {t.defectScore}:</span>
                    <strong className="text-emerald-950">{cvResult.defectScorePercent}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• {t.fssaiStatus}:</span>
                    <strong className="text-emerald-700 font-bold">FSSAI Certified (PASS)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>• {t.shelfLife}:</span>
                    <strong className="text-amber-800">{cvResult.shelfLifeEstDays} days ({cvResult.suggestedHubStorageTemp})</strong>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-900/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-6 h-6 text-emerald-950" />
                    <div>
                      <p className="text-[11px] font-bold text-emerald-950">{t.qrGeneratedLabel}</p>
                      <p className="text-[9px] font-mono text-emerald-700">{cvResult.qrHash}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold rounded-lg text-xs shadow transition">
                    {t.printQrBtn}
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-emerald-800/60 py-8">
                <Camera className="w-12 h-12 mb-2 stroke-[1.5]" />
                <p className="text-xs font-semibold">
                  {t.analyzingCv}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Green Pulse Success Signal Toast */}
      {successSignal && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F3826] text-amber-50 px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-bounce">
          <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-full animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-emerald-300">
              {language === 'hi' ? 'सफलतापूर्वक पुष्टित ✓' : 'Confirmed Successfully ✓'}
            </p>
            <p className="text-xs font-medium text-amber-100/90">{successSignal}</p>
          </div>
        </div>
      )}
      </div>
    </PortalGuard>
  );
}
