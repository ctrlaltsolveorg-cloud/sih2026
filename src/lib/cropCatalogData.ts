export type CropCategory =
  | 'Vegetables'
  | 'Fruits'
  | 'Pulses'
  | 'Grains'
  | 'Seeds'
  | 'Spices'
  | 'Dairy'
  | 'Herbs'
  | 'Cash Crops'
  | 'Flowers';

export const ALL_AGRICULTURAL_CATEGORIES: { value: CropCategory; labelHi: string; labelEn: string }[] = [
  { value: 'Vegetables', labelHi: 'सब्जियाँ (Vegetables)', labelEn: 'Vegetables' },
  { value: 'Fruits', labelHi: 'फल (Fruits)', labelEn: 'Fruits' },
  { value: 'Grains', labelHi: 'अनाज एवं खाद्यान्न (Grains & Cereals)', labelEn: 'Grains & Cereals' },
  { value: 'Pulses', labelHi: 'दालें / दलहन (Pulses & Legumes)', labelEn: 'Pulses & Legumes' },
  { value: 'Seeds', labelHi: 'बीज (Agricultural Seeds)', labelEn: 'Seeds' },
  { value: 'Spices', labelHi: 'मसाले (Spices & Condiments)', labelEn: 'Spices' },
  { value: 'Dairy', labelHi: 'डेयरी व पशुधन (Dairy & Livestock)', labelEn: 'Dairy & Livestock' },
  { value: 'Herbs', labelHi: 'जैविक व औषधीय (Herbs & Medicinal)', labelEn: 'Herbs & Medicinal' },
  { value: 'Cash Crops', labelHi: 'नकदी फसलें - गन्ना/कपास (Cash Crops)', labelEn: 'Cash Crops' },
  { value: 'Flowers', labelHi: 'पुष्प एवं बागवानी (Flowers & Floriculture)', labelEn: 'Flowers' },
];

export interface CatalogCropItem {
  id: string;
  name: string;
  nameHi: string;
  category: CropCategory;
  variety: string;
  priceRupees: number;
  pricePaise: number;
  unit: string;
  grade: string;
  isOrganic: number;
  photos: string[];
  thumbnail: string;
  sideLogo?: string;
  logo_url?: string;
  description: string;
  isCustom?: boolean;
  farmerId?: string;
  farmerName?: string;
  farmerPhone?: string;
  quantityKg?: number;
  location?: string;
}

export const VEGETABLES_CATALOG: CatalogCropItem[] = [
  {
    id: "prod_tomato_1",
    name: "Tomato (Vaishali 108)",
    nameHi: "ताज़ा टमाटर (वैशाली 108)",
    category: "Vegetables",
    variety: "Vaishali 108",
    priceRupees: 34.5,
    pricePaise: 3450,
    unit: "kg",
    grade: "A+",
    isOrganic: 1,
    photos: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    sideLogo: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    description: "ताज़ा संकलित टमाटर - उच्च गुणवत्ता, नासिक मंडी हब द्वारा प्रमाणित। 100% जैविक और सीधा खेत से।",
    farmerId: "u_farmer_1",
    farmerName: "Ramesh Patil",
    farmerPhone: "+91 98765 43210",
    quantityKg: 500,
    location: "Farm Collection Center #04, Nashik Hub"
  },
  {
    id: "prod_onion_1",
    name: "Onion (Nashik Red)",
    nameHi: "नाशिक लाल प्याज (गरवा)",
    category: "Vegetables",
    variety: "Garwa Export Quality",
    priceRupees: 28.0,
    pricePaise: 2800,
    unit: "kg",
    grade: "A",
    isOrganic: 0,
    photos: [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    sideLogo: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    description: "नाशिक का प्रसिद्ध लाल प्याज - निर्यात स्तर का सूखा और टिकाऊ लॉट, न्यूनतम नमी और लंबे समय तक सुरक्षित।",
    farmerId: "u_farmer_2",
    farmerName: "Harpreet Singh",
    farmerPhone: "+91 98765 43211",
    quantityKg: 800,
    location: "Pimplgaon Mandi Hub, Nashik"
  }
];

export const GRAINS_CATALOG: CatalogCropItem[] = [
  {
    id: "prod_wheat_1",
    name: "Wheat (Sharbati Gold)",
    nameHi: "शरबाती प्रीमियम गेहूं (C-306)",
    category: "Grains",
    variety: "Sharbati Gold C-306",
    priceRupees: 38.0,
    pricePaise: 3800,
    unit: "kg",
    grade: "A+",
    isOrganic: 1,
    photos: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    sideLogo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    description: "सीहोर मध्य प्रदेश का वास्तविक शरबाती गेहूं - 100% शुद्ध, उच्च प्रोटीन और चपाती के लिए सर्वोत्तम।",
    farmerId: "u_farmer_3",
    farmerName: "Suresh Gaikwad",
    farmerPhone: "+91 98765 43212",
    quantityKg: 1200,
    location: "Sehore Mandi Hub, MP"
  }
];

export const FRUITS_CATALOG: CatalogCropItem[] = [];
export const PULSES_CATALOG: CatalogCropItem[] = [];
export const SEEDS_CATALOG: CatalogCropItem[] = [];

// Exactly 3 Verified Primary Products
export const FULL_CROP_CATALOG: CatalogCropItem[] = [
  ...VEGETABLES_CATALOG,
  ...GRAINS_CATALOG,
];

export const CATALOG_STATS = {
  vegetablesCount: 2,
  fruitsCount: 0,
  pulsesCount: 0,
  seedsCount: 0,
  grainsCount: 1,
  totalCount: 3,
};

export function createCustomCatalogItem(params: {
  id?: string;
  name: string;
  nameHi?: string;
  category: CropCategory;
  variety?: string;
  priceRupees: number;
  unit?: string;
  grade?: string;
  isOrganic?: number | boolean;
  photos?: string[];
  description?: string;
  farmerId?: string;
  farmerName?: string;
  quantityKg?: number;
  location?: string;
}): CatalogCropItem {
  const pRupees = Math.max(1, params.priceRupees || 30);
  const isOrg = typeof params.isOrganic === 'boolean' ? (params.isOrganic ? 1 : 0) : (params.isOrganic || 0);
  const cleanId = params.id ? String(params.id) : `custom_${Date.now()}`;
  const engName = params.name.trim();
  const hiName = params.nameHi?.trim() || engName;

  return {
    id: cleanId.startsWith('custom_') ? cleanId : `custom_${cleanId}`,
    name: engName,
    nameHi: hiName,
    category: params.category || 'Vegetables',
    variety: params.variety?.trim() || 'देसी / स्थानीय फसल (Local Harvest)',
    priceRupees: pRupees,
    pricePaise: Math.round(pRupees * 100),
    unit: params.unit || 'kg',
    grade: params.grade || 'A+',
    isOrganic: isOrg,
    photos: [],
    thumbnail: '',
    sideLogo: '',
    description: params.description || `${hiName} (${engName}) - किसान द्वारा सीधे पंजीकृत।`,
    isCustom: true,
    farmerId: params.farmerId,
    farmerName: params.farmerName,
    quantityKg: params.quantityKg,
    location: params.location,
  };
}

export function getStoredCustomCatalogItems(): CatalogCropItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('kb_custom_catalog_items');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function saveCustomCatalogItem(item: CatalogCropItem): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getStoredCustomCatalogItems();
    const existingIdx = list.findIndex((c) => c.id === item.id);
    if (existingIdx >= 0) {
      list[existingIdx] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem('kb_custom_catalog_items', JSON.stringify(list));
  } catch (e) {}
}

export function deleteCustomCatalogItem(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getStoredCustomCatalogItems();
    const filtered = list.filter((c) => c.id !== id && `custom_${c.id}` !== id);
    localStorage.setItem('kb_custom_catalog_items', JSON.stringify(filtered));
  } catch (e) {}
}
