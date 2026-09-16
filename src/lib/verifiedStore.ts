'use client';

export interface ProduceVerificationRecord {
  id: string;
  isVerified: boolean;
  isOrganic: boolean;
  grade: 'A+' | 'A' | 'B' | 'C' | string;
  verifiedAt?: string;
  auditor?: string;
  notes?: string;
}

const STORAGE_KEY = 'kb_verified_produce_registry';

// Default official verifications for the 3 primary catalog crops
const DEFAULT_VERIFIED_MAP: Record<string, ProduceVerificationRecord> = {
  prod_tomato_1: {
    id: 'prod_tomato_1',
    isVerified: true,
    isOrganic: true,
    grade: 'A+',
    verifiedAt: '2026-09-14',
    auditor: 'FSSAI & National Mandi Quality Board',
    notes: '100% Organic certified farm lot with grade A+ premium audit pass.',
  },
  prod_onion_1: {
    id: 'prod_onion_1',
    isVerified: true,
    isOrganic: false,
    grade: 'A',
    verifiedAt: '2026-09-15',
    auditor: 'Nashik APMC Mandi Inspection Cell',
    notes: 'Grade A export lot certified for zero chemical residue.',
  },
  prod_wheat_1: {
    id: 'prod_wheat_1',
    isVerified: true,
    isOrganic: true,
    grade: 'A+',
    verifiedAt: '2026-09-15',
    auditor: 'Madhya Pradesh Mandi Board Lab',
    notes: '100% Organic certified Sharbati gold wheat with A+ high protein count.',
  },
};

export function getVerificationRegistry(): Record<string, ProduceVerificationRecord> {
  if (typeof window === 'undefined') return DEFAULT_VERIFIED_MAP;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VERIFIED_MAP));
      return DEFAULT_VERIFIED_MAP;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_VERIFIED_MAP, ...parsed };
  } catch (e) {
    return DEFAULT_VERIFIED_MAP;
  }
}

export function getProduceVerification(cropId: string | number): ProduceVerificationRecord {
  const idStr = String(cropId);
  const registry = getVerificationRegistry();
  if (registry[idStr]) {
    return registry[idStr];
  }
  // Default for unverified newly registered crops
  return {
    id: idStr,
    isVerified: false,
    isOrganic: false,
    grade: 'A',
    notes: 'Pending Admin & Quality Lab verification',
  };
}

export function setProduceVerification(
  cropId: string | number,
  verification: Partial<ProduceVerificationRecord>
): ProduceVerificationRecord {
  const idStr = String(cropId);
  const current = getProduceVerification(idStr);
  const updated: ProduceVerificationRecord = {
    ...current,
    ...verification,
    id: idStr,
    verifiedAt: verification.isVerified ? new Date().toISOString().split('T')[0] : undefined,
    auditor: verification.isVerified ? 'Mandi Governance Admin Desk' : undefined,
  };

  if (typeof window !== 'undefined') {
    const registry = getVerificationRegistry();
    registry[idStr] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registry));
    window.dispatchEvent(new CustomEvent('kb:produce-verified-change', { detail: updated }));
  }

  return updated;
}
