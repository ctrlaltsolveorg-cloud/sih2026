// Auto-generated 352 Crop Catalog Data: 100 Vegetables, 100 Fruits, 100 Pulses, 52 Grains
export interface CatalogCropItem {
  id: string;
  name: string;
  nameHi: string;
  category: 'Vegetables' | 'Fruits' | 'Pulses' | 'Grains' | 'Seeds';
  variety: string;
  priceRupees: number;
  pricePaise: number;
  unit: string;
  grade: string;
  isOrganic: number;
  photos: string[]; // 2 to 6 photos mandatory
  thumbnail: string;
  sideLogo?: string;
  description: string;
  isCustom?: boolean; // Flag for produce not in the 352 catalog
  farmerId?: string;
  farmerName?: string;
  quantityKg?: number;
  location?: string;
}

export const VEGETABLES_CATALOG: CatalogCropItem[] = [
  {
    "id": "veg_1",
    "name": "Tomato (Red)",
    "nameHi": "टमाटर (लाल देशी)",
    "category": "Vegetables",
    "variety": "Pusa Ruby",
    "priceRupees": 34,
    "pricePaise": 3400,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "टमाटर (लाल देशी) (Tomato (Red)) - Pusa Ruby। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_2",
    "name": "Tomato (Hybrid)",
    "nameHi": "टमाटर (हाइब्रिड)",
    "category": "Vegetables",
    "variety": "Vaishali 108",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "टमाटर (हाइब्रिड) (Tomato (Hybrid)) - Vaishali 108। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_3",
    "name": "Onion (Nashik Red)",
    "nameHi": "प्याज (नाशिक लाल)",
    "category": "Vegetables",
    "variety": "Bhima Red",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "प्याज (नाशिक लाल) (Onion (Nashik Red)) - Bhima Red। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_4",
    "name": "Onion (White)",
    "nameHi": "सफेद प्याज",
    "category": "Vegetables",
    "variety": "Bhima Shweta",
    "priceRupees": 32,
    "pricePaise": 3200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद प्याज (Onion (White)) - Bhima Shweta। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_5",
    "name": "Potato (Jyoti)",
    "nameHi": "आलू (कुफरी ज्योति)",
    "category": "Vegetables",
    "variety": "Kufri Jyoti",
    "priceRupees": 22,
    "pricePaise": 2200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "आलू (कुफरी ज्योति) (Potato (Jyoti)) - Kufri Jyoti। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_6",
    "name": "Potato (Chandramukhi)",
    "nameHi": "आलू (कुफरी चंद्रमुखी)",
    "category": "Vegetables",
    "variety": "Kufri Chandramukhi",
    "priceRupees": 24,
    "pricePaise": 2400,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "आलू (कुफरी चंद्रमुखी) (Potato (Chandramukhi)) - Kufri Chandramukhi। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_7",
    "name": "Potato (Chipsona)",
    "nameHi": "आलू (चिप्सोना)",
    "category": "Vegetables",
    "variety": "Kufri Chipsona 1",
    "priceRupees": 26,
    "pricePaise": 2600,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "आलू (चिप्सोना) (Potato (Chipsona)) - Kufri Chipsona 1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_8",
    "name": "Cauliflower",
    "nameHi": "फूलगोभी",
    "category": "Vegetables",
    "variety": "Pusa Snowball",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "फूलगोभी (Cauliflower) - Pusa Snowball। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_9",
    "name": "Cabbage (Green)",
    "nameHi": "हरी पत्तागोभी",
    "category": "Vegetables",
    "variety": "Golden Acre",
    "priceRupees": 20,
    "pricePaise": 2000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "हरी पत्तागोभी (Cabbage (Green)) - Golden Acre। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_10",
    "name": "Cabbage (Red)",
    "nameHi": "लाल पत्तागोभी",
    "category": "Vegetables",
    "variety": "Red Dynasty",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "लाल पत्तागोभी (Cabbage (Red)) - Red Dynasty। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_11",
    "name": "Spinach (Palak)",
    "nameHi": "देसी पालक",
    "category": "Vegetables",
    "variety": "All Green",
    "priceRupees": 25,
    "pricePaise": 2500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "देसी पालक (Spinach (Palak)) - All Green। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_12",
    "name": "Ladyfinger / Okra",
    "nameHi": "भिंडी",
    "category": "Vegetables",
    "variety": "Pusa Sawani",
    "priceRupees": 42,
    "pricePaise": 4200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "भिंडी (Ladyfinger / Okra) - Pusa Sawani। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_13",
    "name": "Brinjal (Round Purple)",
    "nameHi": "गोल बैंगन (जामुनी)",
    "category": "Vegetables",
    "variety": "Pusa Purple Round",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "गोल बैंगन (जामुनी) (Brinjal (Round Purple)) - Pusa Purple Round। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_14",
    "name": "Brinjal (Long)",
    "nameHi": "लंबा बैंगन",
    "category": "Vegetables",
    "variety": "Pusa Purple Long",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "लंबा बैंगन (Brinjal (Long)) - Pusa Purple Long। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_15",
    "name": "Brinjal (Green Small)",
    "nameHi": "छोटा हरा बैंगन",
    "category": "Vegetables",
    "variety": "Kashi Green",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "छोटा हरा बैंगन (Brinjal (Green Small)) - Kashi Green। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_16",
    "name": "Green Chilli (Spicy)",
    "nameHi": "तीखी हरी मिर्च",
    "category": "Vegetables",
    "variety": "Jwala",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "तीखी हरी मिर्च (Green Chilli (Spicy)) - Jwala। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_17",
    "name": "Green Chilli (Mild)",
    "nameHi": "कम तीखी हरी मिर्च",
    "category": "Vegetables",
    "variety": "Pusa Sadabahar",
    "priceRupees": 50,
    "pricePaise": 5000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "कम तीखी हरी मिर्च (Green Chilli (Mild)) - Pusa Sadabahar। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_18",
    "name": "Capsicum (Green)",
    "nameHi": "हरी शिमला मिर्च",
    "category": "Vegetables",
    "variety": "California Wonder",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "हरी शिमला मिर्च (Capsicum (Green)) - California Wonder। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_19",
    "name": "Capsicum (Yellow)",
    "nameHi": "पीली शिमला मिर्च",
    "category": "Vegetables",
    "variety": "Golden Sun",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "पीली शिमला मिर्च (Capsicum (Yellow)) - Golden Sun। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_20",
    "name": "Capsicum (Red)",
    "nameHi": "लाल शिमला मिर्च",
    "category": "Vegetables",
    "variety": "Red Bull",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "लाल शिमला मिर्च (Capsicum (Red)) - Red Bull। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_21",
    "name": "Ginger (Fresh)",
    "nameHi": "ताज़ा अदरक",
    "category": "Vegetables",
    "variety": "Maran Ginger",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "ताज़ा अदरक (Ginger (Fresh)) - Maran Ginger। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_22",
    "name": "Garlic (Desi)",
    "nameHi": "देसी लहसुन",
    "category": "Vegetables",
    "variety": "Yamuna Safed",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "देसी लहसुन (Garlic (Desi)) - Yamuna Safed। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_23",
    "name": "Garlic (Ooty)",
    "nameHi": "ऊटी लहसुन",
    "category": "Vegetables",
    "variety": "Ooty 1",
    "priceRupees": 180,
    "pricePaise": 18000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "ऊटी लहसुन (Garlic (Ooty)) - Ooty 1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_24",
    "name": "Bottle Gourd (Lauki)",
    "nameHi": "हरी लौकी",
    "category": "Vegetables",
    "variety": "Pusa Naveen",
    "priceRupees": 25,
    "pricePaise": 2500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "हरी लौकी (Bottle Gourd (Lauki)) - Pusa Naveen। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_25",
    "name": "Bitter Gourd (Karela)",
    "nameHi": "देसी करेला",
    "category": "Vegetables",
    "variety": "Pusa Vishesh",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "देसी करेला (Bitter Gourd (Karela)) - Pusa Vishesh। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_26",
    "name": "Ridge Gourd (Torai)",
    "nameHi": "तोरई",
    "category": "Vegetables",
    "variety": "Pusa Nasdar",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "तोरई (Ridge Gourd (Torai)) - Pusa Nasdar। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_27",
    "name": "Sponge Gourd (Ghia Torai)",
    "nameHi": "नेनुआ / घिया तोरई",
    "category": "Vegetables",
    "variety": "Pusa Chikni",
    "priceRupees": 32,
    "pricePaise": 3200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "नेनुआ / घिया तोरई (Sponge Gourd (Ghia Torai)) - Pusa Chikni। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_28",
    "name": "Snake Gourd (Chichinda)",
    "nameHi": "चिचिंडा / सांप लौकी",
    "category": "Vegetables",
    "variety": "Co 1",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "चिचिंडा / सांप लौकी (Snake Gourd (Chichinda)) - Co 1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_29",
    "name": "Pointed Gourd (Parwal)",
    "nameHi": "परवल",
    "category": "Vegetables",
    "variety": "Rajendra Parwal 1",
    "priceRupees": 60,
    "pricePaise": 6000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "परवल (Pointed Gourd (Parwal)) - Rajendra Parwal 1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_30",
    "name": "Ivy Gourd (Kundru)",
    "nameHi": "कुंदरू",
    "category": "Vegetables",
    "variety": "Indira Kundru 5",
    "priceRupees": 40,
    "pricePaise": 4000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "कुंदरू (Ivy Gourd (Kundru)) - Indira Kundru 5। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_31",
    "name": "Ash Gourd (Petha)",
    "nameHi": "पेठा कद्दू / भतुआ",
    "category": "Vegetables",
    "variety": "Kashi Dhawal",
    "priceRupees": 22,
    "pricePaise": 2200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "पेठा कद्दू / भतुआ (Ash Gourd (Petha)) - Kashi Dhawal। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_32",
    "name": "Pumpkin (Yellow)",
    "nameHi": "पीला कद्दू",
    "category": "Vegetables",
    "variety": "Arka Chandan",
    "priceRupees": 20,
    "pricePaise": 2000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "पीला कद्दू (Pumpkin (Yellow)) - Arka Chandan। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_33",
    "name": "Radish (White Mooli)",
    "nameHi": "सफेद मूली",
    "category": "Vegetables",
    "variety": "Pusa Chetki",
    "priceRupees": 22,
    "pricePaise": 2200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद मूली (Radish (White Mooli)) - Pusa Chetki। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_34",
    "name": "Radish (Red)",
    "nameHi": "लाल मूली",
    "category": "Vegetables",
    "variety": "Rapid Red White Tipped",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "लाल मूली (Radish (Red)) - Rapid Red White Tipped। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_35",
    "name": "Carrot (Red Desi)",
    "nameHi": "देसी लाल गाजर",
    "category": "Vegetables",
    "variety": "Pusa Rudhira",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "देसी लाल गाजर (Carrot (Red Desi)) - Pusa Rudhira। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_36",
    "name": "Carrot (Orange)",
    "nameHi": "ऑरेंज गाजर",
    "category": "Vegetables",
    "variety": "Nantes",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "ऑरेंज गाजर (Carrot (Orange)) - Nantes। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_37",
    "name": "Beetroot",
    "nameHi": "चुकंदर",
    "category": "Vegetables",
    "variety": "Crimson Globe",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "चुकंदर (Beetroot) - Crimson Globe। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_38",
    "name": "Turnip (Shalgam)",
    "nameHi": "सफेद शलजम",
    "category": "Vegetables",
    "variety": "Pusa Sweti",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद शलजम (Turnip (Shalgam)) - Pusa Sweti। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_39",
    "name": "Sweet Potato (Shakarkand)",
    "nameHi": "शकरकंद",
    "category": "Vegetables",
    "variety": "Sree Bhadra",
    "priceRupees": 32,
    "pricePaise": 3200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "शकरकंद (Sweet Potato (Shakarkand)) - Sree Bhadra। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_40",
    "name": "Elephant Foot Yam (Jimikand)",
    "nameHi": "जिमीकंद / सूरन",
    "category": "Vegetables",
    "variety": "Gajendra",
    "priceRupees": 48,
    "pricePaise": 4800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "जिमीकंद / सूरन (Elephant Foot Yam (Jimikand)) - Gajendra। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_41",
    "name": "Colocasia (Arbi)",
    "nameHi": "अरबी / घुइयां",
    "category": "Vegetables",
    "variety": "Pusa Panchmukhi",
    "priceRupees": 42,
    "pricePaise": 4200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "अरबी / घुइयां (Colocasia (Arbi)) - Pusa Panchmukhi। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_42",
    "name": "Green Peas (Fresh)",
    "nameHi": "ताज़ी हरी मटर",
    "category": "Vegetables",
    "variety": "Arkel",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "ताज़ी हरी मटर (Green Peas (Fresh)) - Arkel। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_43",
    "name": "French Beans",
    "nameHi": "फ्रेंच बीन्स",
    "category": "Vegetables",
    "variety": "Pusa Parvati",
    "priceRupees": 58,
    "pricePaise": 5800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "फ्रेंच बीन्स (French Beans) - Pusa Parvati। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_44",
    "name": "Cluster Beans (Guar)",
    "nameHi": "ग्वार फली",
    "category": "Vegetables",
    "variety": "Pusa Navbahar",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "ग्वार फली (Cluster Beans (Guar)) - Pusa Navbahar। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_45",
    "name": "Cowpea Pods (Lobia Phali)",
    "nameHi": "लोबिया फली / बोड़ा",
    "category": "Vegetables",
    "variety": "Pusa Komal",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "लोबिया फली / बोड़ा (Cowpea Pods (Lobia Phali)) - Pusa Komal। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_46",
    "name": "Flat Beans (Sem Ki Phali)",
    "nameHi": "सेम की फली",
    "category": "Vegetables",
    "variety": "Pusa Early Prolific",
    "priceRupees": 40,
    "pricePaise": 4000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "सेम की फली (Flat Beans (Sem Ki Phali)) - Pusa Early Prolific। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_47",
    "name": "Drumstick (Moringa)",
    "nameHi": "सहजन की फली",
    "category": "Vegetables",
    "variety": "PKM-1",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "सहजन की फली (Drumstick (Moringa)) - PKM-1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_48",
    "name": "Fenugreek Leaves (Methi)",
    "nameHi": "हरी कसूरी मेथी पत्ता",
    "category": "Vegetables",
    "variety": "Pusa Early Bunching",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "हरी कसूरी मेथी पत्ता (Fenugreek Leaves (Methi)) - Pusa Early Bunching। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_49",
    "name": "Coriander Leaves (Dhaniya)",
    "nameHi": "हरा धनिया",
    "category": "Vegetables",
    "variety": "Pant Haritima",
    "priceRupees": 40,
    "pricePaise": 4000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "हरा धनिया (Coriander Leaves (Dhaniya)) - Pant Haritima। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_50",
    "name": "Mint Leaves (Pudina)",
    "nameHi": "ताज़ा पुदीना",
    "category": "Vegetables",
    "variety": "Kosi Mint",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "ताज़ा पुदीना (Mint Leaves (Pudina)) - Kosi Mint। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_51",
    "name": "Mustard Greens (Sarson Saag)",
    "nameHi": "सरसों का साग",
    "category": "Vegetables",
    "variety": "Pusa Sag-1",
    "priceRupees": 25,
    "pricePaise": 2500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "सरसों का साग (Mustard Greens (Sarson Saag)) - Pusa Sag-1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_52",
    "name": "Bathua Greens",
    "nameHi": "बथुआ साग",
    "category": "Vegetables",
    "variety": "Local Desi",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "बथुआ साग (Bathua Greens) - Local Desi। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_53",
    "name": "Amaranth Greens (Cholai)",
    "nameHi": "चौलाई साग (लाल व हरा)",
    "category": "Vegetables",
    "variety": "Pusa Kirti",
    "priceRupees": 26,
    "pricePaise": 2600,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "चौलाई साग (लाल व हरा) (Amaranth Greens (Cholai)) - Pusa Kirti। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_54",
    "name": "Dill Leaves (Suva / Shepu)",
    "nameHi": "सोया साग / शेपू",
    "category": "Vegetables",
    "variety": "Local Shepu",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "सोया साग / शेपू (Dill Leaves (Suva / Shepu)) - Local Shepu। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_55",
    "name": "Curry Leaves",
    "nameHi": "कढ़ी पत्ता",
    "category": "Vegetables",
    "variety": "Suhasini",
    "priceRupees": 70,
    "pricePaise": 7000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "कढ़ी पत्ता (Curry Leaves) - Suhasini। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_56",
    "name": "Spring Onion",
    "nameHi": "हरा प्याज / स्प्रिंग अनियन",
    "category": "Vegetables",
    "variety": "White Lisbon",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "हरा प्याज / स्प्रिंग अनियन (Spring Onion) - White Lisbon। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_57",
    "name": "Cucumber (Desi Kheera)",
    "nameHi": "देसी खीरा",
    "category": "Vegetables",
    "variety": "Pusa Uday",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "देसी खीरा (Cucumber (Desi Kheera)) - Pusa Uday। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_58",
    "name": "Cucumber (English / Seedless)",
    "nameHi": "इंग्लिश खीरा",
    "category": "Vegetables",
    "variety": "Kian Polyhouse",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "इंग्लिश खीरा (Cucumber (English / Seedless)) - Kian Polyhouse। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_59",
    "name": "Kakri (Armenian Cucumber)",
    "nameHi": "ककड़ी",
    "category": "Vegetables",
    "variety": "Lucknow Early",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "ककड़ी (Kakri (Armenian Cucumber)) - Lucknow Early। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_60",
    "name": "Raw Papaya (Kaccha Papita)",
    "nameHi": "कच्चा पपीता",
    "category": "Vegetables",
    "variety": "Pusa Nanha",
    "priceRupees": 24,
    "pricePaise": 2400,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "कच्चा पपीता (Raw Papaya (Kaccha Papita)) - Pusa Nanha। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_61",
    "name": "Raw Banana (Kaccha Kela)",
    "nameHi": "सब्जी वाला कच्चा केला",
    "category": "Vegetables",
    "variety": "Monthan",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "सब्जी वाला कच्चा केला (Raw Banana (Kaccha Kela)) - Monthan। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_62",
    "name": "Raw Jackfruit (Kaccha Kathal)",
    "nameHi": "कच्चा कटहल",
    "category": "Vegetables",
    "variety": "Rudrakshi",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "कच्चा कटहल (Raw Jackfruit (Kaccha Kathal)) - Rudrakshi। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_63",
    "name": "Raw Mango (Kaccha Aam / Kairi)",
    "nameHi": "कच्ची कैरी / टिकोरा",
    "category": "Vegetables",
    "variety": "Desi Sour",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "कच्ची कैरी / टिकोरा (Raw Mango (Kaccha Aam / Kairi)) - Desi Sour। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_64",
    "name": "Lemon (Desi Nimbu)",
    "nameHi": "देसी कागज़ी नींबू",
    "category": "Vegetables",
    "variety": "Kagzi Lime",
    "priceRupees": 80,
    "pricePaise": 8000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "देसी कागज़ी नींबू (Lemon (Desi Nimbu)) - Kagzi Lime। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_65",
    "name": "Mushroom (Button)",
    "nameHi": "बटन मशरूम",
    "category": "Vegetables",
    "variety": "Agaricus Bisporus",
    "priceRupees": 160,
    "pricePaise": 16000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "बटन मशरूम (Mushroom (Button)) - Agaricus Bisporus। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_66",
    "name": "Mushroom (Oyster)",
    "nameHi": "ढींगरी मशरूम",
    "category": "Vegetables",
    "variety": "Pleurotus Florida",
    "priceRupees": 180,
    "pricePaise": 18000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "ढींगरी मशरूम (Mushroom (Oyster)) - Pleurotus Florida। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_67",
    "name": "Broccoli",
    "nameHi": "हरी ब्रोकली",
    "category": "Vegetables",
    "variety": "Fiesta Hybrid",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "हरी ब्रोकली (Broccoli) - Fiesta Hybrid। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_68",
    "name": "Zucchini (Green)",
    "nameHi": "हरी जुकिनी",
    "category": "Vegetables",
    "variety": "Black Beauty",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "हरी जुकिनी (Zucchini (Green)) - Black Beauty। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_69",
    "name": "Zucchini (Yellow)",
    "nameHi": "पीली जुकिनी",
    "category": "Vegetables",
    "variety": "Gold Rush",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "पीली जुकिनी (Zucchini (Yellow)) - Gold Rush। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_70",
    "name": "Lettuce (Iceberg)",
    "nameHi": "आइसबर्ग लेट्यूस",
    "category": "Vegetables",
    "variety": "Iceberg Great Lakes",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "आइसबर्ग लेट्यूस (Lettuce (Iceberg)) - Iceberg Great Lakes। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_71",
    "name": "Lettuce (Romaine)",
    "nameHi": "रोमेन लेट्यूस",
    "category": "Vegetables",
    "variety": "Paris Island",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "रोमेन लेट्यूस (Lettuce (Romaine)) - Paris Island। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_72",
    "name": "Baby Corn",
    "nameHi": "बेबी कॉर्न",
    "category": "Vegetables",
    "variety": "HM-4 Hybrid",
    "priceRupees": 70,
    "pricePaise": 7000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "बेबी कॉर्न (Baby Corn) - HM-4 Hybrid। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_73",
    "name": "Sweet Corn Cob",
    "nameHi": "अमेरिकन स्वीट कॉर्न भुट्टा",
    "category": "Vegetables",
    "variety": "Madhuri Sweet",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "अमेरिकन स्वीट कॉर्न भुट्टा (Sweet Corn Cob) - Madhuri Sweet। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_74",
    "name": "Celery",
    "nameHi": "अजमोद / अजवाइन पत्ती",
    "category": "Vegetables",
    "variety": "Standard Celery",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "अजमोद / अजवाइन पत्ती (Celery) - Standard Celery। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_75",
    "name": "Parsley",
    "nameHi": "अजमोदा / पार्सले",
    "category": "Vegetables",
    "variety": "Italian Flat Leaf",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "अजमोदा / पार्सले (Parsley) - Italian Flat Leaf। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_76",
    "name": "Bok Choy",
    "nameHi": "बोक चोय / चीनी पत्तागोभी",
    "category": "Vegetables",
    "variety": "Baby Pak Choy",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "बोक चोय / चीनी पत्तागोभी (Bok Choy) - Baby Pak Choy। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_77",
    "name": "Cherry Tomato",
    "nameHi": "चेरी टमाटर",
    "category": "Vegetables",
    "variety": "Pusa Cherry 1",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "चेरी टमाटर (Cherry Tomato) - Pusa Cherry 1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_78",
    "name": "Leek",
    "nameHi": "लीक / विलायती प्याज",
    "category": "Vegetables",
    "variety": "London Flag",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "लीक / विलायती प्याज (Leek) - London Flag। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_79",
    "name": "Artichoke",
    "nameHi": "हाथीचक / आर्टिचोक",
    "category": "Vegetables",
    "variety": "Green Globe",
    "priceRupees": 210,
    "pricePaise": 21000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "हाथीचक / आर्टिचोक (Artichoke) - Green Globe। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_80",
    "name": "Asparagus",
    "nameHi": "शतावरी डंठल / एस्परैगस",
    "category": "Vegetables",
    "variety": "Mary Washington",
    "priceRupees": 260,
    "pricePaise": 26000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "शतावरी डंठल / एस्परैगस (Asparagus) - Mary Washington। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_81",
    "name": "Lotus Stem (Kamal Kakdi)",
    "nameHi": "कमल ककड़ी / भें",
    "category": "Vegetables",
    "variety": "Desi Dal Lake",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "कमल ककड़ी / भें (Lotus Stem (Kamal Kakdi)) - Desi Dal Lake। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_82",
    "name": "Water Chestnut (Singhara Fresh)",
    "nameHi": "ताज़ा सिंघाड़ा",
    "category": "Vegetables",
    "variety": "Green Singhara",
    "priceRupees": 42,
    "pricePaise": 4200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "ताज़ा सिंघाड़ा (Water Chestnut (Singhara Fresh)) - Green Singhara। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_83",
    "name": "Tinda (Indian Round Gourd)",
    "nameHi": "टिंडा",
    "category": "Vegetables",
    "variety": "Bikaneri Green",
    "priceRupees": 36,
    "pricePaise": 3600,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "टिंडा (Tinda (Indian Round Gourd)) - Bikaneri Green। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_84",
    "name": "Kantola / Spine Gourd",
    "nameHi": "कंटोला / खेखसा",
    "category": "Vegetables",
    "variety": "Indira Kankoda 1",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "कंटोला / खेखसा (Kantola / Spine Gourd) - Indira Kankoda 1। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_85",
    "name": "Gilki (Smooth Luffa)",
    "nameHi": "गिलकी",
    "category": "Vegetables",
    "variety": "Pusa Supriya",
    "priceRupees": 34,
    "pricePaise": 3400,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "गिलकी (Gilki (Smooth Luffa)) - Pusa Supriya। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_86",
    "name": "Chayote / Chow Chow",
    "nameHi": "चाउ चाउ / बैंगलोर बैंगन",
    "category": "Vegetables",
    "variety": "Green Pear Chow",
    "priceRupees": 40,
    "pricePaise": 4000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "चाउ चाउ / बैंगलोर बैंगन (Chayote / Chow Chow) - Green Pear Chow। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_87",
    "name": "Broad Beans (Bakla Fresh)",
    "nameHi": "बाकला फली",
    "category": "Vegetables",
    "variety": "Pusa Sumeet",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "बाकला फली (Broad Beans (Bakla Fresh)) - Pusa Sumeet। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_88",
    "name": "Chilli (Bhavnagri Mild)",
    "nameHi": "भावनगरी मोटी मिर्च",
    "category": "Vegetables",
    "variety": "Bhavnagri Bold",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "भावनगरी मोटी मिर्च (Chilli (Bhavnagri Mild)) - Bhavnagri Bold। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_89",
    "name": "Chilli (Guntur Sannam)",
    "nameHi": "गुंटूर तीखी मिर्च",
    "category": "Vegetables",
    "variety": "Guntur S4",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "गुंटूर तीखी मिर्च (Chilli (Guntur Sannam)) - Guntur S4। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_90",
    "name": "Chilli (Byadgi)",
    "nameHi": "ब्याडगी रंगीन मिर्च",
    "category": "Vegetables",
    "variety": "Byadgi Kaddi",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "ब्याडगी रंगीन मिर्च (Chilli (Byadgi)) - Byadgi Kaddi। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_91",
    "name": "Turmeric (Raw Raw Kacchi Haldi)",
    "nameHi": "कच्ची गांठ हल्दी",
    "category": "Vegetables",
    "variety": "Prathiba Raw",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "कच्ची गांठ हल्दी (Turmeric (Raw Raw Kacchi Haldi)) - Prathiba Raw। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_92",
    "name": "Amla / Indian Gooseberry",
    "nameHi": "ताज़ा आंवला",
    "category": "Vegetables",
    "variety": "Chakaiya / Banarasi",
    "priceRupees": 48,
    "pricePaise": 4800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "ताज़ा आंवला (Amla / Indian Gooseberry) - Chakaiya / Banarasi। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_93",
    "name": "Kohlrabi (Ganth Gobhi)",
    "nameHi": "गांठ गोभी",
    "category": "Vegetables",
    "variety": "White Vienna",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "गांठ गोभी (Kohlrabi (Ganth Gobhi)) - White Vienna। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_94",
    "name": "Red Onion (Sambar Small)",
    "nameHi": "सांभर छोटा प्याज",
    "category": "Vegetables",
    "variety": "CO 5 Small Onion",
    "priceRupees": 58,
    "pricePaise": 5800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "सांभर छोटा प्याज (Red Onion (Sambar Small)) - CO 5 Small Onion। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_95",
    "name": "Sweet Fennel Greens (Saunf Saag)",
    "nameHi": "सौंफ भाजी / साग",
    "category": "Vegetables",
    "variety": "Local Fennel",
    "priceRupees": 32,
    "pricePaise": 3200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
    "description": "सौंफ भाजी / साग (Sweet Fennel Greens (Saunf Saag)) - Local Fennel। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_96",
    "name": "Gongura (Roselle Leaves)",
    "nameHi": "गोंगुरा पत्ता / खट्टा साग",
    "category": "Vegetables",
    "variety": "Andhra Gongura",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    "description": "गोंगुरा पत्ता / खट्टा साग (Gongura (Roselle Leaves)) - Andhra Gongura। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_97",
    "name": "Malabar Spinach (Poi Saag)",
    "nameHi": "पोई साग",
    "category": "Vegetables",
    "variety": "Basella Alba",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    "description": "पोई साग (Malabar Spinach (Poi Saag)) - Basella Alba। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_98",
    "name": "Agathi Leaves (Hadga)",
    "nameHi": "अगस्तिया फूल व पत्ता",
    "category": "Vegetables",
    "variety": "White Agathi",
    "priceRupees": 50,
    "pricePaise": 5000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
    "description": "अगस्तिया फूल व पत्ता (Agathi Leaves (Hadga)) - White Agathi। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_99",
    "name": "Bamboo Shoots (Fresh)",
    "nameHi": "ताज़े बांस के करील / कॉपल",
    "category": "Vegetables",
    "variety": "Dendrocalamus",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड B",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80",
    "description": "ताज़े बांस के करील / कॉपल (Bamboo Shoots (Fresh)) - Dendrocalamus। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  },
  {
    "id": "veg_100",
    "name": "Banana Flower (Kele Ka Phool)",
    "nameHi": "केले का फूल / मोचा",
    "category": "Vegetables",
    "variety": "Robusta Flower",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    "description": "केले का फूल / मोचा (Banana Flower (Kele Ka Phool)) - Robusta Flower। उच्च गुणवत्ता युक्त, खेत से सीधे संकलित।"
  }
];

export const FRUITS_CATALOG: CatalogCropItem[] = [
  {
    "id": "fruit_1",
    "name": "Mango (Alphonso / Hapus)",
    "nameHi": "हापुस आम (रत्नागिरी)",
    "category": "Fruits",
    "variety": "Ratnagiri Alphonso",
    "priceRupees": 280,
    "pricePaise": 28000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "हापुस आम (रत्नागिरी) (Mango (Alphonso / Hapus)) - Ratnagiri Alphonso। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_2",
    "name": "Mango (Kesar)",
    "nameHi": "केसर आम (गिर जूनागढ़)",
    "category": "Fruits",
    "variety": "Gir Kesar",
    "priceRupees": 160,
    "pricePaise": 16000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "केसर आम (गिर जूनागढ़) (Mango (Kesar)) - Gir Kesar। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_3",
    "name": "Mango (Dasheri)",
    "nameHi": "दशहरी आम (मलिहाबाद)",
    "category": "Fruits",
    "variety": "Malihabadi Dasheri",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "दशहरी आम (मलिहाबाद) (Mango (Dasheri)) - Malihabadi Dasheri। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_4",
    "name": "Mango (Langra)",
    "nameHi": "लंगड़ा आम (बनारसी)",
    "category": "Fruits",
    "variety": "Banarasi Langra",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "लंगड़ा आम (बनारसी) (Mango (Langra)) - Banarasi Langra। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_5",
    "name": "Mango (Chausa)",
    "nameHi": "चौंसा आम",
    "category": "Fruits",
    "variety": "Hardoi Chausa",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "चौंसा आम (Mango (Chausa)) - Hardoi Chausa। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_6",
    "name": "Mango (Badami)",
    "nameHi": "बादामी आम (कर्नाटक)",
    "category": "Fruits",
    "variety": "Karnataka Badami",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "बादामी आम (कर्नाटक) (Mango (Badami)) - Karnataka Badami। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_7",
    "name": "Mango (Safeda / Banganapalli)",
    "nameHi": "सफेदा आम (बैंगनपल्ली)",
    "category": "Fruits",
    "variety": "AP Banganapalli",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "सफेदा आम (बैंगनपल्ली) (Mango (Safeda / Banganapalli)) - AP Banganapalli। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_8",
    "name": "Mango (Totapuri)",
    "nameHi": "तोतापुरी आम",
    "category": "Fruits",
    "variety": "Krishnagiri Totapuri",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "तोतापुरी आम (Mango (Totapuri)) - Krishnagiri Totapuri। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_9",
    "name": "Mango (Amrapali)",
    "nameHi": "आम्रपाली आम",
    "category": "Fruits",
    "variety": "Pusa Amrapali",
    "priceRupees": 80,
    "pricePaise": 8000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "आम्रपाली आम (Mango (Amrapali)) - Pusa Amrapali। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_10",
    "name": "Mango (Mallika)",
    "nameHi": "मल्लिका आम",
    "category": "Fruits",
    "variety": "Pusa Mallika",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "मल्लिका आम (Mango (Mallika)) - Pusa Mallika। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_11",
    "name": "Apple (Shimla Royal Delicious)",
    "nameHi": "शिमला सेब (रॉयल डेलिशियस)",
    "category": "Fruits",
    "variety": "Royal Delicious",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "शिमला सेब (रॉयल डेलिशियस) (Apple (Shimla Royal Delicious)) - Royal Delicious। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_12",
    "name": "Apple (Kinnaur Golden)",
    "nameHi": "किन्नौर गोल्डन सेब",
    "category": "Fruits",
    "variety": "Kinnaur Golden",
    "priceRupees": 165,
    "pricePaise": 16500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "किन्नौर गोल्डन सेब (Apple (Kinnaur Golden)) - Kinnaur Golden। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_13",
    "name": "Apple (Kashmiri Red Delicious)",
    "nameHi": "कश्मीरी सेब (लाल)",
    "category": "Fruits",
    "variety": "Kashmiri Delicious",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "कश्मीरी सेब (लाल) (Apple (Kashmiri Red Delicious)) - Kashmiri Delicious। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_14",
    "name": "Apple (Fuji Indian)",
    "nameHi": "फूजी सेब",
    "category": "Fruits",
    "variety": "Kullu Fuji",
    "priceRupees": 180,
    "pricePaise": 18000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "फूजी सेब (Apple (Fuji Indian)) - Kullu Fuji। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_15",
    "name": "Apple (Granny Smith Green)",
    "nameHi": "हरा सेब (ग्रैनी स्मिथ)",
    "category": "Fruits",
    "variety": "Himachal Green",
    "priceRupees": 195,
    "pricePaise": 19500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "हरा सेब (ग्रैनी स्मिथ) (Apple (Granny Smith Green)) - Himachal Green। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_16",
    "name": "Banana (Robusta)",
    "nameHi": "केला (रोबस्टा)",
    "category": "Fruits",
    "variety": "Grand Naine G9",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "केला (रोबस्टा) (Banana (Robusta)) - Grand Naine G9। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_17",
    "name": "Banana (Yellaki / Elaichi)",
    "nameHi": "इलायची केला (यलक्की)",
    "category": "Fruits",
    "variety": "Mysore Elaichi",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "इलायची केला (यलक्की) (Banana (Yellaki / Elaichi)) - Mysore Elaichi। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_18",
    "name": "Banana (Nendran)",
    "nameHi": "नेन्द्रन केला (केरल चिप्स)",
    "category": "Fruits",
    "variety": "Kerala Nendran",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "नेन्द्रन केला (केरल चिप्स) (Banana (Nendran)) - Kerala Nendran। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_19",
    "name": "Banana (Red Dacca)",
    "nameHi": "लाल केला (कमलापुर)",
    "category": "Fruits",
    "variety": "Red Banana",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "लाल केला (कमलापुर) (Banana (Red Dacca)) - Red Banana। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_20",
    "name": "Banana (Rasthali)",
    "nameHi": "रसथाली केला",
    "category": "Fruits",
    "variety": "Rasthali Silk",
    "priceRupees": 50,
    "pricePaise": 5000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "रसथाली केला (Banana (Rasthali)) - Rasthali Silk। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_21",
    "name": "Pomegranate (Bhagwa)",
    "nameHi": "अनार (भगवा सिंदूरी)",
    "category": "Fruits",
    "variety": "Solapur Bhagwa",
    "priceRupees": 135,
    "pricePaise": 13500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "अनार (भगवा सिंदूरी) (Pomegranate (Bhagwa)) - Solapur Bhagwa। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_22",
    "name": "Pomegranate (Arakta)",
    "nameHi": "अनार (आरक्ता)",
    "category": "Fruits",
    "variety": "Arakta Deep Red",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "अनार (आरक्ता) (Pomegranate (Arakta)) - Arakta Deep Red। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_23",
    "name": "Pomegranate (Ganesh)",
    "nameHi": "अनार (गणेश)",
    "category": "Fruits",
    "variety": "Ganesh Soft Seed",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "अनार (गणेश) (Pomegranate (Ganesh)) - Ganesh Soft Seed। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_24",
    "name": "Sweet Orange (Mosambi)",
    "nameHi": "मौसंबी / मीठा संतरा",
    "category": "Fruits",
    "variety": "Jalna Mosambi",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "मौसंबी / मीठा संतरा (Sweet Orange (Mosambi)) - Jalna Mosambi। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_25",
    "name": "Nagpur Orange (Santra)",
    "nameHi": "नागपुर संतरा (रसदार)",
    "category": "Fruits",
    "variety": "Nagpur Mandarin",
    "priceRupees": 60,
    "pricePaise": 6000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "नागपुर संतरा (रसदार) (Nagpur Orange (Santra)) - Nagpur Mandarin। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_26",
    "name": "Kinnow Mandarin",
    "nameHi": "पंजाब किन्नू",
    "category": "Fruits",
    "variety": "Abohar Kinnow",
    "priceRupees": 42,
    "pricePaise": 4200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "पंजाब किन्नू (Kinnow Mandarin) - Abohar Kinnow। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_27",
    "name": "Grapes (Thompson Seedless)",
    "nameHi": "अंगूर (थॉम्पसन सीडलेस)",
    "category": "Fruits",
    "variety": "Nashik White Seedless",
    "priceRupees": 80,
    "pricePaise": 8000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "अंगूर (थॉम्पसन सीडलेस) (Grapes (Thompson Seedless)) - Nashik White Seedless। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_28",
    "name": "Grapes (Sharad Seedless Black)",
    "nameHi": "काला अंगूर (शरद सीडलेस)",
    "category": "Fruits",
    "variety": "Sharad Seedless",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "काला अंगूर (शरद सीडलेस) (Grapes (Sharad Seedless Black)) - Sharad Seedless। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_29",
    "name": "Grapes (Tas-A-Ganesh)",
    "nameHi": "तास-ए-गणेश अंगूर",
    "category": "Fruits",
    "variety": "Tas-A-Ganesh",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "तास-ए-गणेश अंगूर (Grapes (Tas-A-Ganesh)) - Tas-A-Ganesh। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_30",
    "name": "Grapes (Red Globe)",
    "nameHi": "रेड ग्लोब अंगूर",
    "category": "Fruits",
    "variety": "Red Globe Table",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "रेड ग्लोब अंगूर (Grapes (Red Globe)) - Red Globe Table। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_31",
    "name": "Guava (Allahabad Safeda)",
    "nameHi": "इलाहाबादी सफेदा अमरूद",
    "category": "Fruits",
    "variety": "Allahabad Safeda",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "इलाहाबादी सफेदा अमरूद (Guava (Allahabad Safeda)) - Allahabad Safeda। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_32",
    "name": "Guava (Lucknow 49 / Sardar)",
    "nameHi": "सरदार अमरूद (L-49)",
    "category": "Fruits",
    "variety": "Lucknow 49",
    "priceRupees": 40,
    "pricePaise": 4000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "सरदार अमरूद (L-49) (Guava (Lucknow 49 / Sardar)) - Lucknow 49। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_33",
    "name": "Guava (Thai Pink Guava)",
    "nameHi": "थाई पिंक अमरूद",
    "category": "Fruits",
    "variety": "Thai VNR Bihi",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "थाई पिंक अमरूद (Guava (Thai Pink Guava)) - Thai VNR Bihi। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_34",
    "name": "Guava (Lalit Red Flesh)",
    "nameHi": "ललित लाल अमरूद",
    "category": "Fruits",
    "variety": "CISH Lalit",
    "priceRupees": 50,
    "pricePaise": 5000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "ललित लाल अमरूद (Guava (Lalit Red Flesh)) - CISH Lalit। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_35",
    "name": "Papaya (Taiwan 786 Red Lady)",
    "nameHi": "पपीता (रेड लेडी 786)",
    "category": "Fruits",
    "variety": "Taiwan Red Lady 786",
    "priceRupees": 32,
    "pricePaise": 3200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "पपीता (रेड लेडी 786) (Papaya (Taiwan 786 Red Lady)) - Taiwan Red Lady 786। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_36",
    "name": "Papaya (Pusa Delicious)",
    "nameHi": "पूसा डेलिशियस पपीता",
    "category": "Fruits",
    "variety": "Pusa Delicious",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा डेलिशियस पपीता (Papaya (Pusa Delicious)) - Pusa Delicious। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_37",
    "name": "Papaya (Honey Dew)",
    "nameHi": "हनी ड्यू पपीता",
    "category": "Fruits",
    "variety": "Madhubindu",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "हनी ड्यू पपीता (Papaya (Honey Dew)) - Madhubindu। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_38",
    "name": "Watermelon (Kiran Striped)",
    "nameHi": "तरबूज (किरण)",
    "category": "Fruits",
    "variety": "Kiran Hybrid",
    "priceRupees": 18,
    "pricePaise": 1800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "तरबूज (किरण) (Watermelon (Kiran Striped)) - Kiran Hybrid। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_39",
    "name": "Watermelon (Black Jumbo)",
    "nameHi": "काला तरबूज (जंबो)",
    "category": "Fruits",
    "variety": "Namdhari Black Jumbo",
    "priceRupees": 20,
    "pricePaise": 2000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "काला तरबूज (जंबो) (Watermelon (Black Jumbo)) - Namdhari Black Jumbo। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_40",
    "name": "Watermelon (Yellow Flesh)",
    "nameHi": "पीला तरबूज (अनोखा)",
    "category": "Fruits",
    "variety": "Yellow Honey",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "पीला तरबूज (अनोखा) (Watermelon (Yellow Flesh)) - Yellow Honey। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_41",
    "name": "Muskmelon (Kharbuja Desi)",
    "nameHi": "देसी गोल खरबूजा",
    "category": "Fruits",
    "variety": "Hara Madhu",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "देसी गोल खरबूजा (Muskmelon (Kharbuja Desi)) - Hara Madhu। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_42",
    "name": "Muskmelon (Kundan Striped)",
    "nameHi": "कुंदन खरबूजा",
    "category": "Fruits",
    "variety": "Kundan Hybrid",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "कुंदन खरबूजा (Muskmelon (Kundan Striped)) - Kundan Hybrid। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_43",
    "name": "Cantaloupe / Rockmelon",
    "nameHi": "कैंटालूप रॉकमेलन",
    "category": "Fruits",
    "variety": "Sarda Melon",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "कैंटालूप रॉकमेलन (Cantaloupe / Rockmelon) - Sarda Melon। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_44",
    "name": "Pineapple (Queen)",
    "nameHi": "रानी अनानास (त्रिपुरा)",
    "category": "Fruits",
    "variety": "Tripura Queen",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "रानी अनानास (त्रिपुरा) (Pineapple (Queen)) - Tripura Queen। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_45",
    "name": "Pineapple (Kew Giant)",
    "nameHi": "केव अनानास (बड़ा रसदार)",
    "category": "Fruits",
    "variety": "Assam Giant Kew",
    "priceRupees": 48,
    "pricePaise": 4800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "केव अनानास (बड़ा रसदार) (Pineapple (Kew Giant)) - Assam Giant Kew। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_46",
    "name": "Sapota / Chiku (Kalipatti)",
    "nameHi": "चीकू (कालीपट्टी)",
    "category": "Fruits",
    "variety": "Dahanu Kalipatti",
    "priceRupees": 40,
    "pricePaise": 4000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "चीकू (कालीपट्टी) (Sapota / Chiku (Kalipatti)) - Dahanu Kalipatti। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_47",
    "name": "Sapota / Chiku (Cricket Ball)",
    "nameHi": "क्रिकेट बॉल चीकू",
    "category": "Fruits",
    "variety": "Cricket Ball Round",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "क्रिकेट बॉल चीकू (Sapota / Chiku (Cricket Ball)) - Cricket Ball Round। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_48",
    "name": "Custard Apple / Sitaphal (Balanagar)",
    "nameHi": "सीताफल / शरीफा (बालानगर)",
    "category": "Fruits",
    "variety": "Balanagar Sitaphal",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "सीताफल / शरीफा (बालानगर) (Custard Apple / Sitaphal (Balanagar)) - Balanagar Sitaphal। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_49",
    "name": "Custard Apple (Golden / NMK-1)",
    "nameHi": "गोल्डन सीताफल (NMK-1)",
    "category": "Fruits",
    "variety": "NMK-1 Super Golden",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "गोल्डन सीताफल (NMK-1) (Custard Apple (Golden / NMK-1)) - NMK-1 Super Golden। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_50",
    "name": "Litchi (Shahi Muzaffarpur)",
    "nameHi": "शाही लीची (मुजफ्फरपुर)",
    "category": "Fruits",
    "variety": "Muzaffarpur Shahi",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "शाही लीची (मुजफ्फरपुर) (Litchi (Shahi Muzaffarpur)) - Muzaffarpur Shahi। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_51",
    "name": "Litchi (China Late)",
    "nameHi": "चाइना लीची",
    "category": "Fruits",
    "variety": "China Late Seed",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "चाइना लीची (Litchi (China Late)) - China Late Seed। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_52",
    "name": "Strawberry (Winter Dawn)",
    "nameHi": "महाबलेश्वर स्ट्रॉबेरी",
    "category": "Fruits",
    "variety": "Winter Dawn",
    "priceRupees": 220,
    "pricePaise": 22000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "महाबलेश्वर स्ट्रॉबेरी (Strawberry (Winter Dawn)) - Winter Dawn। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_53",
    "name": "Strawberry (Camarosa)",
    "nameHi": "कैमारोसा स्ट्रॉबेरी",
    "category": "Fruits",
    "variety": "Camarosa Bright",
    "priceRupees": 250,
    "pricePaise": 25000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "कैमारोसा स्ट्रॉबेरी (Strawberry (Camarosa)) - Camarosa Bright। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_54",
    "name": "Fig / Anjeer (Poona Fig)",
    "nameHi": "ताज़ा अंजीर (पुणे)",
    "category": "Fruits",
    "variety": "Poona Fig Purple",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "ताज़ा अंजीर (पुणे) (Fig / Anjeer (Poona Fig)) - Poona Fig Purple। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_55",
    "name": "Fig / Anjeer (Dinkar)",
    "nameHi": "दिनकर मीठा अंजीर",
    "category": "Fruits",
    "variety": "Dinkar Hybrid",
    "priceRupees": 160,
    "pricePaise": 16000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "दिनकर मीठा अंजीर (Fig / Anjeer (Dinkar)) - Dinkar Hybrid। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_56",
    "name": "Dragon Fruit (Red Flesh)",
    "nameHi": "ड्रैगन फ्रूट (लाल गूदा)",
    "category": "Fruits",
    "variety": "Hylocereus Costaricensis",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "ड्रैगन फ्रूट (लाल गूदा) (Dragon Fruit (Red Flesh)) - Hylocereus Costaricensis। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_57",
    "name": "Dragon Fruit (White Flesh)",
    "nameHi": "ड्रैगन फ्रूट (सफेद गूदा)",
    "category": "Fruits",
    "variety": "Hylocereus Undatus",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "ड्रैगन फ्रूट (सफेद गूदा) (Dragon Fruit (White Flesh)) - Hylocereus Undatus। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_58",
    "name": "Kiwi Fruit (Himachal Hayward)",
    "nameHi": "हिमाचली कीवी फल",
    "category": "Fruits",
    "variety": "Hayward Kiwi",
    "priceRupees": 175,
    "pricePaise": 17500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "हिमाचली कीवी फल (Kiwi Fruit (Himachal Hayward)) - Hayward Kiwi। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_59",
    "name": "Jackfruit (Ripe Kathal)",
    "nameHi": "पका मीठा कटहल (बरहल)",
    "category": "Fruits",
    "variety": "Muttam Varikka",
    "priceRupees": 50,
    "pricePaise": 5000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "पका मीठा कटहल (बरहल) (Jackfruit (Ripe Kathal)) - Muttam Varikka। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_60",
    "name": "Pear / Nashpati (Babbugosha)",
    "nameHi": "बब्बूगोशा नाशपाती",
    "category": "Fruits",
    "variety": "Kashmir Babbugosha",
    "priceRupees": 80,
    "pricePaise": 8000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "बब्बूगोशा नाशपाती (Pear / Nashpati (Babbugosha)) - Kashmir Babbugosha। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_61",
    "name": "Pear / Nashpati (Patharnakh)",
    "nameHi": "पत्थरनख नाशपाती",
    "category": "Fruits",
    "variety": "Punjab Patharnakh",
    "priceRupees": 50,
    "pricePaise": 5000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "पत्थरनख नाशपाती (Pear / Nashpati (Patharnakh)) - Punjab Patharnakh। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_62",
    "name": "Peach / Aadu (Flordasun)",
    "nameHi": "आड़ू / पीच",
    "category": "Fruits",
    "variety": "Flordasun Low Chill",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "आड़ू / पीच (Peach / Aadu (Flordasun)) - Flordasun Low Chill। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_63",
    "name": "Plum / Aloo Bukhara (Satluj Purple)",
    "nameHi": "आलूबुखारा (सतलुज पर्पल)",
    "category": "Fruits",
    "variety": "Satluj Purple",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "आलूबुखारा (सतलुज पर्पल) (Plum / Aloo Bukhara (Satluj Purple)) - Satluj Purple। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_64",
    "name": "Apricot / Khubani (Ladakh Halman)",
    "nameHi": "लद्दाखी खुबानी (हलमान)",
    "category": "Fruits",
    "variety": "Ladakh Raktsey Karpo",
    "priceRupees": 210,
    "pricePaise": 21000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "लद्दाखी खुबानी (हलमान) (Apricot / Khubani (Ladakh Halman)) - Ladakh Raktsey Karpo। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_65",
    "name": "Cherry (Kashmiri Double Glass)",
    "nameHi": "कश्मीरी चेरी (डबल ग्लास)",
    "category": "Fruits",
    "variety": "Double Glass Red",
    "priceRupees": 260,
    "pricePaise": 26000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "कश्मीरी चेरी (डबल ग्लास) (Cherry (Kashmiri Double Glass)) - Double Glass Red। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_66",
    "name": "Cherry (Makhmali Mishri)",
    "nameHi": "मखमली मिश्री चेरी",
    "category": "Fruits",
    "variety": "Mishri Sweet Cherry",
    "priceRupees": 320,
    "pricePaise": 32000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "मखमली मिश्री चेरी (Cherry (Makhmali Mishri)) - Mishri Sweet Cherry। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_67",
    "name": "Sweet Lime / Mousambi Desi",
    "nameHi": "देसी मीठा नीम्बू",
    "category": "Fruits",
    "variety": "Coorg Mandarin Lime",
    "priceRupees": 60,
    "pricePaise": 6000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "देसी मीठा नीम्बू (Sweet Lime / Mousambi Desi) - Coorg Mandarin Lime। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_68",
    "name": "Grapefruit / Chakotra (Pink)",
    "nameHi": "गुलाबी चकोतरा",
    "category": "Fruits",
    "variety": "Ruby Red Pomelo",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "गुलाबी चकोतरा (Grapefruit / Chakotra (Pink)) - Ruby Red Pomelo। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_69",
    "name": "Pomelo (White Desi Batabi)",
    "nameHi": "सफेद बतावी नींबू / चकोतरा",
    "category": "Fruits",
    "variety": "Assam Batabi",
    "priceRupees": 50,
    "pricePaise": 5000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद बतावी नींबू / चकोतरा (Pomelo (White Desi Batabi)) - Assam Batabi। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_70",
    "name": "Ber / Indian Jujube (Apple Ber)",
    "nameHi": "सेब बेर (थाई ग्रीन)",
    "category": "Fruits",
    "variety": "Thai Apple Ber",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "सेब बेर (थाई ग्रीन) (Ber / Indian Jujube (Apple Ber)) - Thai Apple Ber। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_71",
    "name": "Ber / Jujube (Umran Bold)",
    "nameHi": "उमरान बेर (मीठा गोल)",
    "category": "Fruits",
    "variety": "Umran Late",
    "priceRupees": 42,
    "pricePaise": 4200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "उमरान बेर (मीठा गोल) (Ber / Jujube (Umran Bold)) - Umran Late। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_72",
    "name": "Ber / Jujube (Gola)",
    "nameHi": "गोला बेर",
    "category": "Fruits",
    "variety": "Gola Early",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "गोला बेर (Ber / Jujube (Gola)) - Gola Early। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_73",
    "name": "Jamun / Black Plum (Seedless Bold)",
    "nameHi": "बड़ा जामुन (राजा जामुन)",
    "category": "Fruits",
    "variety": "Konkan Bahadoli",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "बड़ा जामुन (राजा जामुन) (Jamun / Black Plum (Seedless Bold)) - Konkan Bahadoli। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_74",
    "name": "Wood Apple / Bel (Bael Fruit)",
    "nameHi": "बेल पत्र फल (शरबती)",
    "category": "Fruits",
    "variety": "CISH Bael 1",
    "priceRupees": 35,
    "pricePaise": 3500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "बेल पत्र फल (शरबती) (Wood Apple / Bel (Bael Fruit)) - CISH Bael 1। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_75",
    "name": "Wood Apple / Kaitha (Elephant Apple)",
    "nameHi": "कैथा / कबीट",
    "category": "Fruits",
    "variety": "Local Kaitha",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "कैथा / कबीट (Wood Apple / Kaitha (Elephant Apple)) - Local Kaitha। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_76",
    "name": "Karonda (Bengal Currant)",
    "nameHi": "करौंदा (आचार व चटनी)",
    "category": "Fruits",
    "variety": "Pant Manohar",
    "priceRupees": 60,
    "pricePaise": 6000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "करौंदा (आचार व चटनी) (Karonda (Bengal Currant)) - Pant Manohar। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_77",
    "name": "Phalsa (Sherbet Berry)",
    "nameHi": "फालसा (देसी शरबती)",
    "category": "Fruits",
    "variety": "Sharbati Phalsa",
    "priceRupees": 150,
    "pricePaise": 15000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "फालसा (देसी शरबती) (Phalsa (Sherbet Berry)) - Sharbati Phalsa। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_78",
    "name": "Mulberry (Shahtoot Long)",
    "nameHi": "शहतूत (लंबा मीठा)",
    "category": "Fruits",
    "variety": "Kashmiri Shahtoot",
    "priceRupees": 160,
    "pricePaise": 16000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "शहतूत (लंबा मीठा) (Mulberry (Shahtoot Long)) - Kashmiri Shahtoot। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_79",
    "name": "Passion Fruit (Purple)",
    "nameHi": "पैशन फ्रूट (बैंगनी)",
    "category": "Fruits",
    "variety": "Kaveri Purple",
    "priceRupees": 180,
    "pricePaise": 18000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "पैशन फ्रूट (बैंगनी) (Passion Fruit (Purple)) - Kaveri Purple। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_80",
    "name": "Passion Fruit (Yellow)",
    "nameHi": "पैशन फ्रूट (पीला खट्टा-मीठा)",
    "category": "Fruits",
    "variety": "Yellow Giant",
    "priceRupees": 160,
    "pricePaise": 16000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "पैशन फ्रूट (पीला खट्टा-मीठा) (Passion Fruit (Yellow)) - Yellow Giant। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_81",
    "name": "Avocado (Hass India)",
    "nameHi": "एवोकैडो (हैस बटर फ्रूट)",
    "category": "Fruits",
    "variety": "Kodaikanal Hass",
    "priceRupees": 230,
    "pricePaise": 23000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "एवोकैडो (हैस बटर फ्रूट) (Avocado (Hass India)) - Kodaikanal Hass। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_82",
    "name": "Avocado (Fuerte Green)",
    "nameHi": "फुएर्ते एवोकैडो",
    "category": "Fruits",
    "variety": "Coorg Fuerte",
    "priceRupees": 190,
    "pricePaise": 19000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "फुएर्ते एवोकैडो (Avocado (Fuerte Green)) - Coorg Fuerte। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_83",
    "name": "Blueberry (Indian Bilberry)",
    "nameHi": "ब्लूबेरी (नीलबदरी)",
    "category": "Fruits",
    "variety": "Nilgiri Blue",
    "priceRupees": 480,
    "pricePaise": 48000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "ब्लूबेरी (नीलबदरी) (Blueberry (Indian Bilberry)) - Nilgiri Blue। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_84",
    "name": "Raspberry (Himalayan Yellow)",
    "nameHi": "हिमालयन रसभरी",
    "category": "Fruits",
    "variety": "Rubus Ellipticus",
    "priceRupees": 340,
    "pricePaise": 34000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "हिमालयन रसभरी (Raspberry (Himalayan Yellow)) - Rubus Ellipticus। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_85",
    "name": "Cape Gooseberry (Rasbhari)",
    "nameHi": "रसभरी (पोहा बेरी)",
    "category": "Fruits",
    "variety": "Golden Berry Poha",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "रसभरी (पोहा बेरी) (Cape Gooseberry (Rasbhari)) - Golden Berry Poha। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_86",
    "name": "Mangosteen",
    "nameHi": "मैंगोस्टीन (फलों की रानी)",
    "category": "Fruits",
    "variety": "Kerala Mangosteen",
    "priceRupees": 310,
    "pricePaise": 31000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "मैंगोस्टीन (फलों की रानी) (Mangosteen) - Kerala Mangosteen। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_87",
    "name": "Rambutan",
    "nameHi": "रामबुतान (बालदार लीची)",
    "category": "Fruits",
    "variety": "Malwana Special",
    "priceRupees": 210,
    "pricePaise": 21000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "रामबुतान (बालदार लीची) (Rambutan) - Malwana Special। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_88",
    "name": "Star Fruit / Kamrakh",
    "nameHi": "कमरख / स्टार फ्रूट",
    "category": "Fruits",
    "variety": "Sweet Star Golden",
    "priceRupees": 60,
    "pricePaise": 6000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "कमरख / स्टार फ्रूट (Star Fruit / Kamrakh) - Sweet Star Golden। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_89",
    "name": "Tamarind (Sweet Imli)",
    "nameHi": "थाई मीठी इमली",
    "category": "Fruits",
    "variety": "Sweet Tamarind",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "थाई मीठी इमली (Tamarind (Sweet Imli)) - Sweet Tamarind। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_90",
    "name": "Tamarind (Sour Red Desi)",
    "nameHi": "देसी खट्टी लाल इमली",
    "category": "Fruits",
    "variety": "PKM 1 Sour",
    "priceRupees": 80,
    "pricePaise": 8000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "देसी खट्टी लाल इमली (Tamarind (Sour Red Desi)) - PKM 1 Sour। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_91",
    "name": "Date Palm (Barhee Fresh Yellow)",
    "nameHi": "बरही ताज़ा खजूर (पीला)",
    "category": "Fruits",
    "variety": "Kutch Barhee Date",
    "priceRupees": 180,
    "pricePaise": 18000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "बरही ताज़ा खजूर (पीला) (Date Palm (Barhee Fresh Yellow)) - Kutch Barhee Date। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_92",
    "name": "Date Palm (Medjool)",
    "nameHi": "मेदजूल खजूर (रसीला)",
    "category": "Fruits",
    "variety": "Rajasthan Medjool",
    "priceRupees": 350,
    "pricePaise": 35000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "मेदजूल खजूर (रसीला) (Date Palm (Medjool)) - Rajasthan Medjool। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_93",
    "name": "Olive (Rajasthan Green)",
    "nameHi": "जैतून फल (हरा)",
    "category": "Fruits",
    "variety": "Barnea Olive",
    "priceRupees": 240,
    "pricePaise": 24000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "जैतून फल (हरा) (Olive (Rajasthan Green)) - Barnea Olive। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_94",
    "name": "Water Apple / Wax Jambu",
    "nameHi": "पानी सेब / जाम्बु",
    "category": "Fruits",
    "variety": "Rose Apple Pink",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "पानी सेब / जाम्बु (Water Apple / Wax Jambu) - Rose Apple Pink। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_95",
    "name": "Malay Apple / Jamrul",
    "nameHi": "जामरुल / सफेद सेब",
    "category": "Fruits",
    "variety": "White Jamrul",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609842947419-ba4f04d5d60f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80",
    "description": "जामरुल / सफेद सेब (Malay Apple / Jamrul) - White Jamrul। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_96",
    "name": "Breadfruit (Nirphanas)",
    "nameHi": "नीर फणस / ब्रेडफ्रूट",
    "category": "Fruits",
    "variety": "Konkan Breadfruit",
    "priceRupees": 70,
    "pricePaise": 7000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589217157232-464b505b197f?auto=format&fit=crop&w=800&q=80",
    "description": "नीर फणस / ब्रेडफ्रूट (Breadfruit (Nirphanas)) - Konkan Breadfruit। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_97",
    "name": "Persimmon / Japani Phal",
    "nameHi": "जापानी फल (पर्सिमोन)",
    "category": "Fruits",
    "variety": "Fuyu Persimmon",
    "priceRupees": 170,
    "pricePaise": 17000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    "description": "जापानी फल (पर्सिमोन) (Persimmon / Japani Phal) - Fuyu Persimmon। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_98",
    "name": "Quince / Bihi",
    "nameHi": "बही फल (क्विंस)",
    "category": "Fruits",
    "variety": "Kashmir Quince",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    "description": "बही फल (क्विंस) (Quince / Bihi) - Kashmir Quince। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_99",
    "name": "Tender Coconut (Elaneer)",
    "nameHi": "नारियल पानी (डाभ / एलानीर)",
    "category": "Fruits",
    "variety": "Chowghat Orange Dwarf",
    "priceRupees": 45,
    "pricePaise": 4500,
    "unit": "piece",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    "description": "नारियल पानी (डाभ / एलानीर) (Tender Coconut (Elaneer)) - Chowghat Orange Dwarf। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  },
  {
    "id": "fruit_100",
    "name": "Mature Coconut (Copra Dry)",
    "nameHi": "सूखा गोला नारियल",
    "category": "Fruits",
    "variety": "West Coast Tall",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "piece",
    "grade": "प्रीमियम ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
    "description": "सूखा गोला नारियल (Mature Coconut (Copra Dry)) - West Coast Tall। मीठा, रसदार एवं प्राकृतिक रूप से परिपक्व।"
  }
];

export const PULSES_CATALOG: CatalogCropItem[] = [
  {
    "id": "pulse_1",
    "name": "Desi Chickpeas (Kala Chana)",
    "nameHi": "देसी काला चना",
    "category": "Pulses",
    "variety": "Pusa 362 Desi",
    "priceRupees": 68,
    "pricePaise": 6800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "देसी काला चना (Desi Chickpeas (Kala Chana)) - Pusa 362 Desi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_2",
    "name": "Kabuli Chana (Dollar Bold)",
    "nameHi": "काबुली चना (डॉलर बोल्ड)",
    "category": "Pulses",
    "variety": "Phule G-0517",
    "priceRupees": 125,
    "pricePaise": 12500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "काबुली चना (डॉलर बोल्ड) (Kabuli Chana (Dollar Bold)) - Phule G-0517। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_3",
    "name": "Chana Dal (Unpolished)",
    "nameHi": "चना दाल (बिना पॉलिश)",
    "category": "Pulses",
    "variety": "Desi Split Grade-A",
    "priceRupees": 78,
    "pricePaise": 7800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "चना दाल (बिना पॉलिश) (Chana Dal (Unpolished)) - Desi Split Grade-A। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_4",
    "name": "Roasted Chana (With Husk)",
    "nameHi": "भुना चना छिलके वाला",
    "category": "Pulses",
    "variety": "Pusa Roasted",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "भुना चना छिलके वाला (Roasted Chana (With Husk)) - Pusa Roasted। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_5",
    "name": "Roasted Chana Dal (Dalia Split)",
    "nameHi": "भुनी चना दाल (दलिया/फुटाना)",
    "category": "Pulses",
    "variety": "South Roasted Split",
    "priceRupees": 105,
    "pricePaise": 10500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "भुनी चना दाल (दलिया/फुटाना) (Roasted Chana Dal (Dalia Split)) - South Roasted Split। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_6",
    "name": "Green Chickpeas (Chholiya/Harbhara)",
    "nameHi": "हरा चना / छोलिया",
    "category": "Pulses",
    "variety": "Pusa Green 112",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "हरा चना / छोलिया (Green Chickpeas (Chholiya/Harbhara)) - Pusa Green 112। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_7",
    "name": "Organic Kala Chana",
    "nameHi": "ऑर्गेनिक काला चना",
    "category": "Pulses",
    "variety": "Certified NPOP Desi",
    "priceRupees": 88,
    "pricePaise": 8800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक काला चना (Organic Kala Chana) - Certified NPOP Desi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_8",
    "name": "JG-11 Desi Chana",
    "nameHi": "जेजी-11 देशी चना",
    "category": "Pulses",
    "variety": "Jawahar Gram 11",
    "priceRupees": 70,
    "pricePaise": 7000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "जेजी-11 देशी चना (JG-11 Desi Chana) - Jawahar Gram 11। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_9",
    "name": "Vishal Bold Chana",
    "nameHi": "विशाल चना (बड़ा दाना)",
    "category": "Pulses",
    "variety": "Phule G-87207",
    "priceRupees": 76,
    "pricePaise": 7600,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "विशाल चना (बड़ा दाना) (Vishal Bold Chana) - Phule G-87207। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_10",
    "name": "BGM 547 Chickpeas",
    "nameHi": "बीजीएम 547 चना",
    "category": "Pulses",
    "variety": "BGM-547 High Yield",
    "priceRupees": 72,
    "pricePaise": 7200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "बीजीएम 547 चना (BGM 547 Chickpeas) - BGM-547 High Yield। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_11",
    "name": "Toor Dal Unpolished (Arhar)",
    "nameHi": "अरहर दाल (अनपॉलिश्ड)",
    "category": "Pulses",
    "variety": "Desi Hand-Cleaned",
    "priceRupees": 145,
    "pricePaise": 14500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "अरहर दाल (अनपॉलिश्ड) (Toor Dal Unpolished (Arhar)) - Desi Hand-Cleaned। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_12",
    "name": "Desi Toor Dal (Fatka)",
    "nameHi": "फटका तूर दाल",
    "category": "Pulses",
    "variety": "Latur Fatka Process",
    "priceRupees": 155,
    "pricePaise": 15500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "फटका तूर दाल (Desi Toor Dal (Fatka)) - Latur Fatka Process। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_13",
    "name": "Toor Dal (Oily Polished)",
    "nameHi": "ऑयली तूर दाल",
    "category": "Pulses",
    "variety": "Gujarat Oily Toor",
    "priceRupees": 150,
    "pricePaise": 15000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "ऑयली तूर दाल (Toor Dal (Oily Polished)) - Gujarat Oily Toor। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_14",
    "name": "Whole Red Gram (Arhar Sabut)",
    "nameHi": "साबुत अरहर (तूर गोटा)",
    "category": "Pulses",
    "variety": "Asha ICPL 87119",
    "priceRupees": 98,
    "pricePaise": 9800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "साबुत अरहर (तूर गोटा) (Whole Red Gram (Arhar Sabut)) - Asha ICPL 87119। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_15",
    "name": "Organic Arhar Dal",
    "nameHi": "ऑर्गेनिक अरहर दाल",
    "category": "Pulses",
    "variety": "NPOP Organic Arhar",
    "priceRupees": 175,
    "pricePaise": 17500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक अरहर दाल (Organic Arhar Dal) - NPOP Organic Arhar। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_16",
    "name": "Maruti Toor Dal",
    "nameHi": "मारुति तूर दाल",
    "category": "Pulses",
    "variety": "ICP 8863 Maruti",
    "priceRupees": 148,
    "pricePaise": 14800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "मारुति तूर दाल (Maruti Toor Dal) - ICP 8863 Maruti। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_17",
    "name": "BDN-711 Arhar Dal",
    "nameHi": "बीडीएन-711 अरहर",
    "category": "Pulses",
    "variety": "BDN-711 Drought Hardy",
    "priceRupees": 142,
    "pricePaise": 14200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "बीडीएन-711 अरहर (BDN-711 Arhar Dal) - BDN-711 Drought Hardy। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_18",
    "name": "Latur Premium Toor",
    "nameHi": "लातूर प्रीमियम तूर दाल",
    "category": "Pulses",
    "variety": "Latur Special Grade 1",
    "priceRupees": 165,
    "pricePaise": 16500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "लातूर प्रीमियम तूर दाल (Latur Premium Toor) - Latur Special Grade 1। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_19",
    "name": "Gulbarga Red Toor",
    "nameHi": "गुलबर्गा लाल तूर (GI Tag)",
    "category": "Pulses",
    "variety": "Gulbarga GI Red",
    "priceRupees": 170,
    "pricePaise": 17000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "गुलबर्गा लाल तूर (GI Tag) (Gulbarga Red Toor) - Gulbarga GI Red। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_20",
    "name": "UP Desi Pigeon Pea",
    "nameHi": "देसी यूपी अरहर दाल",
    "category": "Pulses",
    "variety": "UP Narendra Arhar 1",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "देसी यूपी अरहर दाल (UP Desi Pigeon Pea) - UP Narendra Arhar 1। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_21",
    "name": "Green Moong Whole (Sabut)",
    "nameHi": "साबुत हरी मूंग दाल",
    "category": "Pulses",
    "variety": "Pusa Vishal Shiny",
    "priceRupees": 105,
    "pricePaise": 10500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "साबुत हरी मूंग दाल (Green Moong Whole (Sabut)) - Pusa Vishal Shiny। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_22",
    "name": "Moong Dal Split (Chilka)",
    "nameHi": "मूंग दाल छिलका",
    "category": "Pulses",
    "variety": "Cleaned Split Green",
    "priceRupees": 112,
    "pricePaise": 11200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "मूंग दाल छिलका (Moong Dal Split (Chilka)) - Cleaned Split Green। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_23",
    "name": "Moong Dal Yellow (Dhuli)",
    "nameHi": "धुली मूंग दाल (पीली)",
    "category": "Pulses",
    "variety": "Pusa 9531 Dhuli",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "धुली मूंग दाल (पीली) (Moong Dal Yellow (Dhuli)) - Pusa 9531 Dhuli। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_24",
    "name": "Moong Mogar (Polished Yellow)",
    "nameHi": "मूंग मोगर दाल",
    "category": "Pulses",
    "variety": "Premium Mogar",
    "priceRupees": 128,
    "pricePaise": 12800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "मूंग मोगर दाल (Moong Mogar (Polished Yellow)) - Premium Mogar। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_25",
    "name": "Organic Whole Green Moong",
    "nameHi": "ऑर्गेनिक साबुत मूंग",
    "category": "Pulses",
    "variety": "Certified Organic Moong",
    "priceRupees": 135,
    "pricePaise": 13500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक साबुत मूंग (Organic Whole Green Moong) - Certified Organic Moong। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_26",
    "name": "Samrat Moong Beans",
    "nameHi": "सम्राट मूंग दाल",
    "category": "Pulses",
    "variety": "PDM-139 Samrat",
    "priceRupees": 108,
    "pricePaise": 10800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "सम्राट मूंग दाल (Samrat Moong Beans) - PDM-139 Samrat। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_27",
    "name": "IPM-02-3 Green Moong",
    "nameHi": "आईपीएम 02-3 हरी मूंग",
    "category": "Pulses",
    "variety": "IPM 02-3 Bold Seed",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "आईपीएम 02-3 हरी मूंग (IPM-02-3 Green Moong) - IPM 02-3 Bold Seed। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_28",
    "name": "Small Green Sprouting Moong",
    "nameHi": "अंकुरण हरी मूंग",
    "category": "Pulses",
    "variety": "Desi Tiny Sprout Grade",
    "priceRupees": 115,
    "pricePaise": 11500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "अंकुरण हरी मूंग (Small Green Sprouting Moong) - Desi Tiny Sprout Grade। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_29",
    "name": "Shiny Chamki Moong",
    "nameHi": "चमकी हरी मूंग",
    "category": "Pulses",
    "variety": "Chamki Maharashtra",
    "priceRupees": 118,
    "pricePaise": 11800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "चमकी हरी मूंग (Shiny Chamki Moong) - Chamki Maharashtra। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_30",
    "name": "SML 668 Moong",
    "nameHi": "एसएमएल 668 मूंग दाल",
    "category": "Pulses",
    "variety": "SML 668 Punjab",
    "priceRupees": 106,
    "pricePaise": 10600,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "एसएमएल 668 मूंग दाल (SML 668 Moong) - SML 668 Punjab। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_31",
    "name": "Black Urad Whole (Sabut)",
    "nameHi": "साबुत काली उड़द दाल",
    "category": "Pulses",
    "variety": "Pant Urad 31 Bold",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "साबुत काली उड़द दाल (Black Urad Whole (Sabut)) - Pant Urad 31 Bold। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_32",
    "name": "Urad Dal Split (Chilka)",
    "nameHi": "उड़द दाल छिलका (काली/सफेद)",
    "category": "Pulses",
    "variety": "Shekhar-2 Split",
    "priceRupees": 118,
    "pricePaise": 11800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "उड़द दाल छिलका (काली/सफेद) (Urad Dal Split (Chilka)) - Shekhar-2 Split। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_33",
    "name": "Urad Dal White (Dhuli)",
    "nameHi": "धुली उड़द दाल (सफेद)",
    "category": "Pulses",
    "variety": "Macha Dhuli Super",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "धुली उड़द दाल (सफेद) (Urad Dal White (Dhuli)) - Macha Dhuli Super। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_34",
    "name": "Urad Gota (Whole White Dehusked)",
    "nameHi": "उड़द गोटा साबुत (सफेद)",
    "category": "Pulses",
    "variety": "Idli/Dosa Gota Grade",
    "priceRupees": 138,
    "pricePaise": 13800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "उड़द गोटा साबुत (सफेद) (Urad Gota (Whole White Dehusked)) - Idli/Dosa Gota Grade। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_35",
    "name": "Organic Black Gram (Urad)",
    "nameHi": "ऑर्गेनिक काली उड़द",
    "category": "Pulses",
    "variety": "Certified Organic Urad",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक काली उड़द (Organic Black Gram (Urad)) - Certified Organic Urad। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_36",
    "name": "T-9 Urad Dal",
    "nameHi": "टी-9 उड़द दाल",
    "category": "Pulses",
    "variety": "Type 9 Classic",
    "priceRupees": 112,
    "pricePaise": 11200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "टी-9 उड़द दाल (T-9 Urad Dal) - Type 9 Classic। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_37",
    "name": "Vamban Urad Dal",
    "nameHi": "वांबन उड़द दाल",
    "category": "Pulses",
    "variety": "Vamban 8 Tamil Nadu",
    "priceRupees": 115,
    "pricePaise": 11500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "वांबन उड़द दाल (Vamban Urad Dal) - Vamban 8 Tamil Nadu। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_38",
    "name": "LBG-20 Urad Beans",
    "nameHi": "एलपीजी 20 उड़द दाल",
    "category": "Pulses",
    "variety": "LBG-20 Coastal Andhra",
    "priceRupees": 114,
    "pricePaise": 11400,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "एलपीजी 20 उड़द दाल (LBG-20 Urad Beans) - LBG-20 Coastal Andhra। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_39",
    "name": "Uttarakhand Black Urad",
    "nameHi": "पहाड़ी काली उड़द",
    "category": "Pulses",
    "variety": "Pahadi Desi Organic",
    "priceRupees": 135,
    "pricePaise": 13500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "पहाड़ी काली उड़द (Uttarakhand Black Urad) - Pahadi Desi Organic। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_40",
    "name": "Mash Dal Special",
    "nameHi": "माश दाल स्पेशल",
    "category": "Pulses",
    "variety": "Special Makhani Mash",
    "priceRupees": 125,
    "pricePaise": 12500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "माश दाल स्पेशल (Mash Dal Special) - Special Makhani Mash। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_41",
    "name": "Masoor Whole Brown (Sabut Kali)",
    "nameHi": "साबुत भूरी/काली मसूर",
    "category": "Pulses",
    "variety": "Pusa Ageti 51",
    "priceRupees": 82,
    "pricePaise": 8200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "साबुत भूरी/काली मसूर (Masoor Whole Brown (Sabut Kali)) - Pusa Ageti 51। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_42",
    "name": "Masoor Dal Split (Lal Masoor)",
    "nameHi": "लाल मसूर दाल (धुली)",
    "category": "Pulses",
    "variety": "KLS 218 Red Lentil",
    "priceRupees": 92,
    "pricePaise": 9200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "लाल मसूर दाल (धुली) (Masoor Dal Split (Lal Masoor)) - KLS 218 Red Lentil। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_43",
    "name": "Malka Masoor (Bold Whole Red)",
    "nameHi": "मलका मसूर दाल",
    "category": "Pulses",
    "variety": "Desi Bold Malka",
    "priceRupees": 98,
    "pricePaise": 9800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "मलका मसूर दाल (Malka Masoor (Bold Whole Red)) - Desi Bold Malka। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_44",
    "name": "Organic Red Lentil Masoor",
    "nameHi": "ऑर्गेनिक लाल मसूर",
    "category": "Pulses",
    "variety": "Certified Organic Masoor",
    "priceRupees": 115,
    "pricePaise": 11500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक लाल मसूर (Organic Red Lentil Masoor) - Certified Organic Masoor। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_45",
    "name": "Small Brown Masoor (Chhoti)",
    "nameHi": "छोटी भूरी मसूर",
    "category": "Pulses",
    "variety": "Desi Tiny Lentil",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "छोटी भूरी मसूर (Small Brown Masoor (Chhoti)) - Desi Tiny Lentil। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_46",
    "name": "DPL 62 Masoor",
    "nameHi": "डीपीएल 62 मसूर दाल",
    "category": "Pulses",
    "variety": "DPL 62 Disease Hardy",
    "priceRupees": 88,
    "pricePaise": 8800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "डीपीएल 62 मसूर दाल (DPL 62 Masoor) - DPL 62 Disease Hardy। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_47",
    "name": "JL-3 Masoor Dal",
    "nameHi": "जेएल-3 मसूर दाल",
    "category": "Pulses",
    "variety": "Jawahar Lentil 3",
    "priceRupees": 84,
    "pricePaise": 8400,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "जेएल-3 मसूर दाल (JL-3 Masoor Dal) - Jawahar Lentil 3। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_48",
    "name": "Himalayan Brown Masoor",
    "nameHi": "हिमालयन भूरी मसूर",
    "category": "Pulses",
    "variety": "Garhwal Hill Lentil",
    "priceRupees": 105,
    "pricePaise": 10500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "हिमालयन भूरी मसूर (Himalayan Brown Masoor) - Garhwal Hill Lentil। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_49",
    "name": "Shivalik Bold Masoor",
    "nameHi": "शिवालिक मसूर दाल",
    "category": "Pulses",
    "variety": "Shivalik Big Grain",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "शिवालिक मसूर दाल (Shivalik Bold Masoor) - Shivalik Big Grain। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_50",
    "name": "Yellow Masoor Dal",
    "nameHi": "पीली मसूर दाल",
    "category": "Pulses",
    "variety": "Rare Yellow Masoor",
    "priceRupees": 96,
    "pricePaise": 9600,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "पीली मसूर दाल (Yellow Masoor Dal) - Rare Yellow Masoor। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_51",
    "name": "Kashmiri Red Rajma",
    "nameHi": "कश्मीरी लाल राजमा (छोटा)",
    "category": "Pulses",
    "variety": "Kashmir Valley Desi",
    "priceRupees": 165,
    "pricePaise": 16500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "कश्मीरी लाल राजमा (छोटा) (Kashmiri Red Rajma) - Kashmir Valley Desi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_52",
    "name": "Chitra Rajma (Spotted)",
    "nameHi": "चित्रा राजma (हिमाचली)",
    "category": "Pulses",
    "variety": "Chitra Cream Speckled",
    "priceRupees": 155,
    "pricePaise": 15500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "चित्रा राजma (हिमाचली) (Chitra Rajma (Spotted)) - Chitra Cream Speckled। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_53",
    "name": "Jammu Bhaderwah Rajma",
    "nameHi": "जम्मू भद्रवाह राजमा (GI Tag)",
    "category": "Pulses",
    "variety": "Bhaderwah Special GI",
    "priceRupees": 195,
    "pricePaise": 19500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "जम्मू भद्रवाह राजमा (GI Tag) (Jammu Bhaderwah Rajma) - Bhaderwah Special GI। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_54",
    "name": "Sharmili Dark Red Rajma",
    "nameHi": "शर्मीली लाल राजमा",
    "category": "Pulses",
    "variety": "Sharmili Deep Burgundy",
    "priceRupees": 145,
    "pricePaise": 14500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "शर्मीली लाल राजमा (Sharmili Dark Red Rajma) - Sharmili Deep Burgundy। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_55",
    "name": "Chakrata Pahadi Rajma",
    "nameHi": "चकराता पहाड़ी राजमा",
    "category": "Pulses",
    "variety": "Uttarakhand Chakrata",
    "priceRupees": 185,
    "pricePaise": 18500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "चकराता पहाड़ी राजमा (Chakrata Pahadi Rajma) - Uttarakhand Chakrata। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_56",
    "name": "White Rajma (Cannellini)",
    "nameHi": "सफेद राजमा (सफेद लोबिया बीन)",
    "category": "Pulses",
    "variety": "White Kidney Bean",
    "priceRupees": 160,
    "pricePaise": 16000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद राजमा (सफेद लोबिया बीन) (White Rajma (Cannellini)) - White Kidney Bean। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_57",
    "name": "Organic Kashmiri Rajma",
    "nameHi": "ऑर्गेनिक कश्मीरी राजमा",
    "category": "Pulses",
    "variety": "NPOP Organic Jammu",
    "priceRupees": 210,
    "pricePaise": 21000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक कश्मीरी राजमा (Organic Kashmiri Rajma) - NPOP Organic Jammu। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_58",
    "name": "Spotted Red Rajma",
    "nameHi": "लाल चित्तीदार राजमा",
    "category": "Pulses",
    "variety": "Joshimath Speckled",
    "priceRupees": 170,
    "pricePaise": 17000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "लाल चित्तीदार राजमा (Spotted Red Rajma) - Joshimath Speckled। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_59",
    "name": "Harsil Pahadi Rajma",
    "nameHi": "हर्षिल घाटी राजमा",
    "category": "Pulses",
    "variety": "Harsil Valley Rare",
    "priceRupees": 220,
    "pricePaise": 22000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "हर्षिल घाटी राजमा (Harsil Pahadi Rajma) - Harsil Valley Rare। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_60",
    "name": "Pusa Red Kidney Bean",
    "nameHi": "पूसा राजमा लाल",
    "category": "Pulses",
    "variety": "Pusa Parvati Bean",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा राजमा लाल (Pusa Red Kidney Bean) - Pusa Parvati Bean। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_61",
    "name": "Dried Green Peas (Sukha Matar)",
    "nameHi": "सूखे हरे मटर",
    "category": "Pulses",
    "variety": "Rachna Field Pea",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "सूखे हरे मटर (Dried Green Peas (Sukha Matar)) - Rachna Field Pea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_62",
    "name": "Dried White Peas (Safed Vatana)",
    "nameHi": "सफेद मटर (वटाना)",
    "category": "Pulses",
    "variety": "HFP 4 White Pea",
    "priceRupees": 58,
    "pricePaise": 5800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद मटर (वटाना) (Dried White Peas (Safed Vatana)) - HFP 4 White Pea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_63",
    "name": "Yellow Split Peas (Matar Dal)",
    "nameHi": "पीली मटर दाल",
    "category": "Pulses",
    "variety": "Split Dry Yellow Pea",
    "priceRupees": 62,
    "pricePaise": 6200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "पीली मटर दाल (Yellow Split Peas (Matar Dal)) - Split Dry Yellow Pea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_64",
    "name": "Organic Dried Peas",
    "nameHi": "ऑर्गेनिक सूखा हरा मटर",
    "category": "Pulses",
    "variety": "Certified Organic Pea",
    "priceRupees": 82,
    "pricePaise": 8200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक सूखा हरा मटर (Organic Dried Peas) - Certified Organic Pea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_65",
    "name": "Bold White Vatana",
    "nameHi": "बोल्ड सफेद वटाना",
    "category": "Pulses",
    "variety": "Mumbai Chaat Vatana",
    "priceRupees": 68,
    "pricePaise": 6800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "बोल्ड सफेद वटाना (Bold White Vatana) - Mumbai Chaat Vatana। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_66",
    "name": "IPFD 99-13 Field Pea",
    "nameHi": "आईपीएपीडी 99-13 मटर",
    "category": "Pulses",
    "variety": "IPFD 99-13",
    "priceRupees": 60,
    "pricePaise": 6000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "आईपीएपीडी 99-13 मटर (IPFD 99-13 Field Pea) - IPFD 99-13। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_67",
    "name": "Pusa Pragati Dry Pea",
    "nameHi": "पूसा प्रगति सूखा मटर",
    "category": "Pulses",
    "variety": "Pusa Pragati",
    "priceRupees": 72,
    "pricePaise": 7200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा प्रगति सूखा मटर (Pusa Pragati Dry Pea) - Pusa Pragati। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_68",
    "name": "Kalyanpur White Pea",
    "nameHi": "कल्याणपुर सफेद मटर",
    "category": "Pulses",
    "variety": "Kalyanpur Matar",
    "priceRupees": 56,
    "pricePaise": 5600,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "कल्याणपुर सफेद मटर (Kalyanpur White Pea) - Kalyanpur Matar। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_69",
    "name": "Black Kabuli Chana",
    "nameHi": "काला काबुली चना (दुर्लभ)",
    "category": "Pulses",
    "variety": "Rare Black Garbanzo",
    "priceRupees": 145,
    "pricePaise": 14500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "काला काबुली चना (दुर्लभ) (Black Kabuli Chana) - Rare Black Garbanzo। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_70",
    "name": "Himachali Kala Chana",
    "nameHi": "हिमाचली पहाड़ी काला चना",
    "category": "Pulses",
    "variety": "Kullu Valley Desi",
    "priceRupees": 92,
    "pricePaise": 9200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "हिमाचली पहाड़ी काला चना (Himachali Kala Chana) - Kullu Valley Desi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_71",
    "name": "White Lobia (Chawli / Rongi)",
    "nameHi": "सफेद लोबिया (काली आंख / चौली)",
    "category": "Pulses",
    "variety": "Pusa Komal White",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद लोबिया (काली आंख / चौली) (White Lobia (Chawli / Rongi)) - Pusa Komal White। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_72",
    "name": "Red Lobia (Lal Chawli)",
    "nameHi": "लाल लोबिया",
    "category": "Pulses",
    "variety": "Kerala Red Cowpea",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "लाल लोबिया (Red Lobia (Lal Chawli)) - Kerala Red Cowpea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_73",
    "name": "Brown Small Cowpea",
    "nameHi": "भूरी छोटी लोबिया",
    "category": "Pulses",
    "variety": "Desi Brown Cowpea",
    "priceRupees": 88,
    "pricePaise": 8800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "भूरी छोटी लोबिया (Brown Small Cowpea) - Desi Brown Cowpea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_74",
    "name": "Organic White Lobia",
    "nameHi": "ऑर्गेनिक सफेद लोबिया",
    "category": "Pulses",
    "variety": "Certified Organic Chawli",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक सफेद लोबिया (Organic White Lobia) - Certified Organic Chawli। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_75",
    "name": "Pusa Sukomal Cowpea",
    "nameHi": "पूसा सुकोमल लोबिया",
    "category": "Pulses",
    "variety": "Pusa Sukomal Dual",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा सुकोमल लोबिया (Pusa Sukomal Cowpea) - Pusa Sukomal Dual। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_76",
    "name": "Pusa Phalguni Cowpea",
    "nameHi": "पूसा फाल्गुनी लोबिया",
    "category": "Pulses",
    "variety": "Pusa Phalguni Dwarf",
    "priceRupees": 84,
    "pricePaise": 8400,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा फाल्गुनी लोबिया (Pusa Phalguni Cowpea) - Pusa Phalguni Dwarf। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_77",
    "name": "Golden Eye Cowpea",
    "nameHi": "गोल्डन आई लोबिया",
    "category": "Pulses",
    "variety": "Amber Cowpea",
    "priceRupees": 92,
    "pricePaise": 9200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "गोल्डन आई लोबिया (Golden Eye Cowpea) - Amber Cowpea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_78",
    "name": "Black Lobia (Kala Cowpea)",
    "nameHi": "काली लोबिया",
    "category": "Pulses",
    "variety": "Rare Black Cowpea",
    "priceRupees": 102,
    "pricePaise": 10200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "काली लोबिया (Black Lobia (Kala Cowpea)) - Rare Black Cowpea। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_79",
    "name": "Gujarat Chawli 3",
    "nameHi": "गुजरात चौली 3",
    "category": "Pulses",
    "variety": "GC-3 High Yield",
    "priceRupees": 86,
    "pricePaise": 8600,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "गुजरात चौली 3 (Gujarat Chawli 3) - GC-3 High Yield। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_80",
    "name": "Bundelkhand Red Lobia",
    "nameHi": "बुंदेलखंड लाल लोबिया",
    "category": "Pulses",
    "variety": "Bundelkhand Desi",
    "priceRupees": 90,
    "pricePaise": 9000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "बुंदेलखंड लाल लोबिया (Bundelkhand Red Lobia) - Bundelkhand Desi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_81",
    "name": "Whole Moth Beans (Matki)",
    "nameHi": "साबुत मोठ / मटकी",
    "category": "Pulses",
    "variety": "RMO-40 Bikaneri",
    "priceRupees": 88,
    "pricePaise": 8800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "साबुत मोठ / मटकी (Whole Moth Beans (Matki)) - RMO-40 Bikaneri। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_82",
    "name": "Moth Dal Split (Chilka)",
    "nameHi": "मोठ दाल छिलका",
    "category": "Pulses",
    "variety": "Split Marwar Moth",
    "priceRupees": 98,
    "pricePaise": 9800,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "मोठ दाल छिलका (Moth Dal Split (Chilka)) - Split Marwar Moth। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_83",
    "name": "Moth Mogar (Dhuli)",
    "nameHi": "मोठ मोगर दाल (धुली)",
    "category": "Pulses",
    "variety": "Rajasthan Bhujia Mogar",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "मोठ मोगर दाल (धुली) (Moth Mogar (Dhuli)) - Rajasthan Bhujia Mogar। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_84",
    "name": "Organic Moth Beans",
    "nameHi": "ऑर्गेनिक मोठ दाल",
    "category": "Pulses",
    "variety": "Certified Organic Matki",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक मोठ दाल (Organic Moth Beans) - Certified Organic Matki। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_85",
    "name": "RMO-225 Maru Moth",
    "nameHi": "आरएमओ-225 मरु मोठ",
    "category": "Pulses",
    "variety": "RMO-225 Drought Proof",
    "priceRupees": 92,
    "pricePaise": 9200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "आरएमओ-225 मरु मोठ (RMO-225 Maru Moth) - RMO-225 Drought Proof। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_86",
    "name": "Horse Gram Whole (Kulthi / Hulgah)",
    "nameHi": "साबुत कुलथी / हुलगा",
    "category": "Pulses",
    "variety": "CRIDA 18 Horsegram",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "साबुत कुलथी / हुलगा (Horse Gram Whole (Kulthi / Hulgah)) - CRIDA 18 Horsegram। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_87",
    "name": "Brown Horse Gram (Kulthi)",
    "nameHi": "भूरी कुलथी दाल",
    "category": "Pulses",
    "variety": "Desi Brown Kulthi",
    "priceRupees": 78,
    "pricePaise": 7800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "भूरी कुलथी दाल (Brown Horse Gram (Kulthi)) - Desi Brown Kulthi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_88",
    "name": "Black Horse Gram (Kala Kulthi)",
    "nameHi": "काली कुलथी दाल",
    "category": "Pulses",
    "variety": "Southern Black Kulthi",
    "priceRupees": 82,
    "pricePaise": 8200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "काली कुलथी दाल (Black Horse Gram (Kala Kulthi)) - Southern Black Kulthi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_89",
    "name": "Organic Kulthi Dal",
    "nameHi": "ऑर्गेनिक कुलथी दाल",
    "category": "Pulses",
    "variety": "Certified Organic Horsegram",
    "priceRupees": 98,
    "pricePaise": 9800,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक कुलथी दाल (Organic Kulthi Dal) - Certified Organic Horsegram। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_90",
    "name": "Himalayan Gahat Dal",
    "nameHi": "उत्तराखंडी गहत दाल (कुलथी)",
    "category": "Pulses",
    "variety": "Pahadi Gahat GI Special",
    "priceRupees": 115,
    "pricePaise": 11500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "उत्तराखंडी गहत दाल (कुलथी) (Himalayan Gahat Dal) - Pahadi Gahat GI Special। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_91",
    "name": "Yellow Soybean Whole",
    "nameHi": "पीला सोयाबीन (दाना)",
    "category": "Pulses",
    "variety": "JS-335 Madhya Pradesh",
    "priceRupees": 54,
    "pricePaise": 5400,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "पीला सोयाबीन (दाना) (Yellow Soybean Whole) - JS-335 Madhya Pradesh। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_92",
    "name": "Black Soybean (Bhatt Ki Dal)",
    "nameHi": "काला सोयाबीन (भट की दाल)",
    "category": "Pulses",
    "variety": "Kumaoni Bhatmash",
    "priceRupees": 92,
    "pricePaise": 9200,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "काला सोयाबीन (भट की दाल) (Black Soybean (Bhatt Ki Dal)) - Kumaoni Bhatmash। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_93",
    "name": "Organic Yellow Soybean",
    "nameHi": "ऑर्गेनिक पीला सोयाबीन",
    "category": "Pulses",
    "variety": "NPOP Non-GMO Soya",
    "priceRupees": 72,
    "pricePaise": 7200,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "ऑर्गेनिक पीला सोयाबीन (Organic Yellow Soybean) - NPOP Non-GMO Soya। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_94",
    "name": "JS-9560 Soybean",
    "nameHi": "जेएस-9560 सोयाबीन",
    "category": "Pulses",
    "variety": "JS-9560 Early Harvest",
    "priceRupees": 56,
    "pricePaise": 5600,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "जेएस-9560 सोयाबीन (JS-9560 Soybean) - JS-9560 Early Harvest। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_95",
    "name": "Val Dal / Field Beans Split (Kadvave)",
    "nameHi": "वाल दाल (कड़वे वाल)",
    "category": "Pulses",
    "variety": "Konkan Val Split",
    "priceRupees": 120,
    "pricePaise": 12000,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "वाल दाल (कड़वे वाल) (Val Dal / Field Beans Split (Kadvave)) - Konkan Val Split। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_96",
    "name": "Surti Papdi Lilva Beans",
    "nameHi": "सुरती पापड़ी लिलवा दाना",
    "category": "Pulses",
    "variety": "Surti Special Papdi",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "सुरती पापड़ी लिलवा दाना (Surti Papdi Lilva Beans) - Surti Special Papdi। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_97",
    "name": "Faba Bean / Bakla Dal",
    "nameHi": "बाकला दाल / फाबा बीन",
    "category": "Pulses",
    "variety": "Pusa Sumeet Dry Bean",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    "description": "बाकला दाल / फाबा बीन (Faba Bean / Bakla Dal) - Pusa Sumeet Dry Bean। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_98",
    "name": "Panchmel Dal Mix (5 Dal)",
    "nameHi": "पंचमेल दाल मिक्स (प्रीमियम)",
    "category": "Pulses",
    "variety": "5-Dal Royal Rajasthan",
    "priceRupees": 125,
    "pricePaise": 12500,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    "description": "पंचमेल दाल मिक्स (प्रीमियम) (Panchmel Dal Mix (5 Dal)) - 5-Dal Royal Rajasthan। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_99",
    "name": "Navratan Mix Dal (9 Lentils)",
    "nameHi": "नवरत्न मिक्स दाल",
    "category": "Pulses",
    "variety": "9-Pulses Protein Blend",
    "priceRupees": 135,
    "pricePaise": 13500,
    "unit": "kg",
    "grade": "प्रीमियम ग्रेड A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1589135233689-d49914b43729?auto=format&fit=crop&w=800&q=80",
    "description": "नवरत्न मिक्स दाल (Navratan Mix Dal (9 Lentils)) - 9-Pulses Protein Blend। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  },
  {
    "id": "pulse_100",
    "name": "Hand-Pounded Organic Toor Dal",
    "nameHi": "हाथ कुटी देसी अरहर दाल",
    "category": "Pulses",
    "variety": "Traditional Hath Kuti",
    "priceRupees": 180,
    "pricePaise": 18000,
    "unit": "kg",
    "grade": "उच्च गुणवत्ता ग्रेड A",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "हाथ कुटी देसी अरहर दाल (Hand-Pounded Organic Toor Dal) - Traditional Hath Kuti। उच्च प्रोटीन, शुद्ध एवं गैर-पॉलिश की हुई दाल।"
  }
];

// Backward compatibility alias for seeds if needed
export const SEEDS_CATALOG: CatalogCropItem[] = PULSES_CATALOG;

export const GRAINS_CATALOG: CatalogCropItem[] = [
  {
    "id": "grain_1",
    "name": "Sharbati Wheat (MP Sehore)",
    "nameHi": "शरबाती गेहूं (मध्य प्रदेश सीहोर)",
    "category": "Grains",
    "variety": "C-306 Golden",
    "priceRupees": 42,
    "pricePaise": 4200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "शरबाती गेहूं (मध्य प्रदेश सीहोर) (Sharbati Wheat (MP Sehore)) - C-306 Golden। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_2",
    "name": "Lokwan Wheat (Maharashtra)",
    "nameHi": "लोकवान गेहूं",
    "category": "Grains",
    "variety": "Lokwan Bold Grain",
    "priceRupees": 34,
    "pricePaise": 3400,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "लोकवान गेहूं (Lokwan Wheat (Maharashtra)) - Lokwan Bold Grain। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_3",
    "name": "Khapli / Emmer Wheat",
    "nameHi": "खपली गेहूं (डायबिटीज स्पेशल)",
    "category": "Grains",
    "variety": "DDK-1029 Ancient",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "खपली गेहूं (डायबिटीज स्पेशल) (Khapli / Emmer Wheat) - DDK-1029 Ancient। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_4",
    "name": "HD-2967 Wheat",
    "nameHi": "गेहूं HD-2967",
    "category": "Grains",
    "variety": "HD-2967 High Yield",
    "priceRupees": 30,
    "pricePaise": 3000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "गेहूं HD-2967 (HD-2967 Wheat) - HD-2967 High Yield। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_5",
    "name": "HD-3086 Wheat (Pusa Gautami)",
    "nameHi": "गेहूं पूसा गौतमी (HD-3086)",
    "category": "Grains",
    "variety": "HD-3086 Pusa",
    "priceRupees": 32,
    "pricePaise": 3200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "गेहूं पूसा गौतमी (HD-3086) (HD-3086 Wheat (Pusa Gautami)) - HD-3086 Pusa। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_6",
    "name": "Bansi Kathiya Wheat (Durum)",
    "nameHi": "बंशी काठिया गेहूं (ड्यूरम)",
    "category": "Grains",
    "variety": "HI-8498 Durum",
    "priceRupees": 40,
    "pricePaise": 4000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "बंशी काठिया गेहूं (ड्यूरम) (Bansi Kathiya Wheat (Durum)) - HI-8498 Durum। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_7",
    "name": "Black Wheat (Kala Gehu)",
    "nameHi": "काला गेहूं (एंटीऑक्सीडेंट युक्त)",
    "category": "Grains",
    "variety": "NABI Black Wheat",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "काला गेहूं (एंटीऑक्सीडेंट युक्त) (Black Wheat (Kala Gehu)) - NABI Black Wheat। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_8",
    "name": "Pusa Basmati 1121 Paddy/Rice",
    "nameHi": "पूसा बासमती 1121",
    "category": "Grains",
    "variety": "PB 1121 Extra Long",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा बासमती 1121 (Pusa Basmati 1121 Paddy/Rice) - PB 1121 Extra Long। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_9",
    "name": "Pusa Basmati 1509 Paddy/Rice",
    "nameHi": "पूसा बासमती 1509",
    "category": "Grains",
    "variety": "PB 1509 Early",
    "priceRupees": 82,
    "pricePaise": 8200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा बासमती 1509 (Pusa Basmati 1509 Paddy/Rice) - PB 1509 Early। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_10",
    "name": "Pusa Basmati 1718",
    "nameHi": "पूसा बासमती 1718",
    "category": "Grains",
    "variety": "PB 1718 Resistant",
    "priceRupees": 88,
    "pricePaise": 8800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "पूसा बासमती 1718 (Pusa Basmati 1718) - PB 1718 Resistant। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_11",
    "name": "Traditional Dehraduni Basmati",
    "nameHi": "देहरादूनी बासमती चावल",
    "category": "Grains",
    "variety": "Type 3 Heritage",
    "priceRupees": 140,
    "pricePaise": 14000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "देहरादूनी बासमती चावल (Traditional Dehraduni Basmati) - Type 3 Heritage। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_12",
    "name": "Govindobhog Rice (Bengal)",
    "nameHi": "गोविंदभोग खुशबूदार चावल",
    "category": "Grains",
    "variety": "Bengal Govindobhog GI",
    "priceRupees": 110,
    "pricePaise": 11000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "गोविंदभोग खुशबूदार चावल (Govindobhog Rice (Bengal)) - Bengal Govindobhog GI। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_13",
    "name": "Kalanamak Rice (Siddharthnagar)",
    "nameHi": "काला नमक चावल (बुद्ध का उपहार)",
    "category": "Grains",
    "variety": "KN-3 Kalanamak GI",
    "priceRupees": 135,
    "pricePaise": 13500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "काला नमक चावल (बुद्ध का उपहार) (Kalanamak Rice (Siddharthnagar)) - KN-3 Kalanamak GI। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_14",
    "name": "Sona Masoori Rice (Kurnool)",
    "nameHi": "सोना मसूरी चावल",
    "category": "Grains",
    "variety": "BPT 5204 Sona",
    "priceRupees": 58,
    "pricePaise": 5800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "सोना मसूरी चावल (Sona Masoori Rice (Kurnool)) - BPT 5204 Sona। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_15",
    "name": "Jeera Samba Rice (Seeraga Samba)",
    "nameHi": "सीरगा सांबा बिरयानी चावल",
    "category": "Grains",
    "variety": "Tamil Nadu Samba GI",
    "priceRupees": 115,
    "pricePaise": 11500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "सीरगा सांबा बिरयानी चावल (Jeera Samba Rice (Seeraga Samba)) - Tamil Nadu Samba GI। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_16",
    "name": "Kolam Rice (Wada Maharashtra)",
    "nameHi": "वाडा कोलम चावल",
    "category": "Grains",
    "variety": "Zini Wada Kolam GI",
    "priceRupees": 68,
    "pricePaise": 6800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "वाडा कोलम चावल (Kolam Rice (Wada Maharashtra)) - Zini Wada Kolam GI। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_17",
    "name": "Indrayani Rice (Maval Fragrant)",
    "nameHi": "इंद्रायणी सुगंधित चावल",
    "category": "Grains",
    "variety": "Indrayani Selection",
    "priceRupees": 62,
    "pricePaise": 6200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "इंद्रायणी सुगंधित चावल (Indrayani Rice (Maval Fragrant)) - Indrayani Selection। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_18",
    "name": "Red Rice (Matta Palakkadan)",
    "nameHi": "केरल मट्टा लाल चावल",
    "category": "Grains",
    "variety": "Palakkad Matta GI",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "केरल मट्टा लाल चावल (Red Rice (Matta Palakkadan)) - Palakkad Matta GI। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_19",
    "name": "Black Rice (Chak-Hao Manipur)",
    "nameHi": "मणिपुरी काला चावल (चाक-हाओ)",
    "category": "Grains",
    "variety": "Chak-Hao Black GI",
    "priceRupees": 190,
    "pricePaise": 19000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "मणिपुरी काला चावल (चाक-हाओ) (Black Rice (Chak-Hao Manipur)) - Chak-Hao Black GI। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_20",
    "name": "Brown Rice (Unpolished Basmati)",
    "nameHi": "ब्राउन राइस (अनपॉलिश्ड)",
    "category": "Grains",
    "variety": "PB 1121 Brown Whole",
    "priceRupees": 85,
    "pricePaise": 8500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "ब्राउन राइस (अनपॉलिश्ड) (Brown Rice (Unpolished Basmati)) - PB 1121 Brown Whole। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_21",
    "name": "Swarna Rice (IR-36)",
    "nameHi": "स्वर्णा चावल",
    "category": "Grains",
    "variety": "MTU 7029 Swarna",
    "priceRupees": 36,
    "pricePaise": 3600,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "स्वर्णा चावल (Swarna Rice (IR-36)) - MTU 7029 Swarna। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_22",
    "name": "IR-64 Raw Rice",
    "nameHi": "IR-64 सफेद चावल",
    "category": "Grains",
    "variety": "IR-64 Semi Dwarf",
    "priceRupees": 34,
    "pricePaise": 3400,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "IR-64 सफेद चावल (IR-64 Raw Rice) - IR-64 Semi Dwarf। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_23",
    "name": "Miniket Rice (Bengal)",
    "nameHi": "मिनिकिट चावल",
    "category": "Grains",
    "variety": "Shatabdi Miniket",
    "priceRupees": 44,
    "pricePaise": 4400,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "मिनिकिट चावल (Miniket Rice (Bengal)) - Shatabdi Miniket। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_24",
    "name": "Pearl Millet / Bajra (Desi)",
    "nameHi": "देसी बाजरा",
    "category": "Grains",
    "variety": "HHB 67 Improved",
    "priceRupees": 26,
    "pricePaise": 2600,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "देसी बाजरा (Pearl Millet / Bajra (Desi)) - HHB 67 Improved। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_25",
    "name": "Bajra Hybrid (Rajasthan)",
    "nameHi": "हाइब्रिड बाजरा",
    "category": "Grains",
    "variety": "ProAgro 9444",
    "priceRupees": 24,
    "pricePaise": 2400,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "हाइब्रिड बाजरा (Bajra Hybrid (Rajasthan)) - ProAgro 9444। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_26",
    "name": "Sorghum / Jowar (Maldandi White)",
    "nameHi": "मालदांडी ज्वार (सफेद)",
    "category": "Grains",
    "variety": "Maldandi M 35-1",
    "priceRupees": 48,
    "pricePaise": 4800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "मालदांडी ज्वार (सफेद) (Sorghum / Jowar (Maldandi White)) - Maldandi M 35-1। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_27",
    "name": "Sorghum / Jowar (Yellow Desi)",
    "nameHi": "पीली ज्वार",
    "category": "Grains",
    "variety": "Parbhani Moti",
    "priceRupees": 36,
    "pricePaise": 3600,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "पीली ज्वार (Sorghum / Jowar (Yellow Desi)) - Parbhani Moti। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_28",
    "name": "Finger Millet / Ragi (Mandua)",
    "nameHi": "रागी / मड़ुआ / नाचनी",
    "category": "Grains",
    "variety": "GPU 28 High Calcium",
    "priceRupees": 42,
    "pricePaise": 4200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "रागी / मड़ुआ / नाचनी (Finger Millet / Ragi (Mandua)) - GPU 28 High Calcium। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_29",
    "name": "Foxtail Millet / Kangni",
    "nameHi": "कंगनी / काकुन मिलेट",
    "category": "Grains",
    "variety": "SiA 3088 Foxtail",
    "priceRupees": 68,
    "pricePaise": 6800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "कंगनी / काकुन मिलेट (Foxtail Millet / Kangni) - SiA 3088 Foxtail। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_30",
    "name": "Barnyard Millet / Sanwa / Jhangora",
    "nameHi": "सांवा / झंगोरा मिलेट",
    "category": "Grains",
    "variety": "PRJ 1 Barnyard",
    "priceRupees": 75,
    "pricePaise": 7500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "सांवा / झंगोरा मिलेट (Barnyard Millet / Sanwa / Jhangora) - PRJ 1 Barnyard। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_31",
    "name": "Little Millet / Kutki",
    "nameHi": "कुटकी मिलेट",
    "category": "Grains",
    "variety": "JK 8 Little Millet",
    "priceRupees": 80,
    "pricePaise": 8000,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "कुटकी मिलेट (Little Millet / Kutki) - JK 8 Little Millet। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_32",
    "name": "Kodo Millet / Kodra",
    "nameHi": "कोदो मिलेट",
    "category": "Grains",
    "variety": "RBK 155 Kodo",
    "priceRupees": 78,
    "pricePaise": 7800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "कोदो मिलेट (Kodo Millet / Kodra) - RBK 155 Kodo। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_33",
    "name": "Proso Millet / Cheena",
    "nameHi": "चीना / वरी मिलेट",
    "category": "Grains",
    "variety": "TNAU Proso 202",
    "priceRupees": 72,
    "pricePaise": 7200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "चीना / वरी मिलेट (Proso Millet / Cheena) - TNAU Proso 202। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_34",
    "name": "Yellow Maize / Corn Grain",
    "nameHi": "पीला मक्का दाना",
    "category": "Grains",
    "variety": "Pioneer 3396 Maize",
    "priceRupees": 25,
    "pricePaise": 2500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "पीला मक्का दाना (Yellow Maize / Corn Grain) - Pioneer 3396 Maize। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_35",
    "name": "White Maize (Desi Makka)",
    "nameHi": "सफेद मक्का",
    "category": "Grains",
    "variety": "Ganga Safed 2",
    "priceRupees": 27,
    "pricePaise": 2700,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद मक्का (White Maize (Desi Makka)) - Ganga Safed 2। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_36",
    "name": "Sweet Corn Grain",
    "nameHi": "स्वीट कॉर्न दाना",
    "category": "Grains",
    "variety": "Sugar 75 Grain",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "स्वीट कॉर्न दाना (Sweet Corn Grain) - Sugar 75 Grain। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_37",
    "name": "Popcorn Maize Grain",
    "nameHi": "पॉपकॉर्न मक्का दाना",
    "category": "Grains",
    "variety": "Amber Popcorn",
    "priceRupees": 55,
    "pricePaise": 5500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "पॉपकॉर्न मक्का दाना (Popcorn Maize Grain) - Amber Popcorn। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_38",
    "name": "Barley / Jau (Six Row)",
    "nameHi": "जौ दाना (छह पंक्ति)",
    "category": "Grains",
    "variety": "RD 2035 Six Row",
    "priceRupees": 28,
    "pricePaise": 2800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "जौ दाना (छह पंक्ति) (Barley / Jau (Six Row)) - RD 2035 Six Row। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_39",
    "name": "Hullless Barley (Jau Chhilka Mukt)",
    "nameHi": "छिलका रहित जौ",
    "category": "Grains",
    "variety": "Karan 16 Hullless",
    "priceRupees": 38,
    "pricePaise": 3800,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "छिलका रहित जौ (Hullless Barley (Jau Chhilka Mukt)) - Karan 16 Hullless। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_40",
    "name": "Oats Grain / Jai",
    "nameHi": "जई दाना (होल ओट्स)",
    "category": "Grains",
    "variety": "Kent Oat Grain",
    "priceRupees": 52,
    "pricePaise": 5200,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "जई दाना (होल ओट्स) (Oats Grain / Jai) - Kent Oat Grain। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_41",
    "name": "Rye Grain",
    "nameHi": "राई अनाज (रई)",
    "category": "Grains",
    "variety": "Winter Rye Russian",
    "priceRupees": 65,
    "pricePaise": 6500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "राई अनाज (रई) (Rye Grain) - Winter Rye Russian। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_42",
    "name": "Buckwheat / Kuttu (Fagopyrum)",
    "nameHi": "कुट्टू दाना (साबुत)",
    "category": "Grains",
    "variety": "Shimla B1 Buckwheat",
    "priceRupees": 95,
    "pricePaise": 9500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "कुट्टू दाना (साबुत) (Buckwheat / Kuttu (Fagopyrum)) - Shimla B1 Buckwheat। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_43",
    "name": "Amaranth Grain / Rajgira / Ramdana",
    "nameHi": "राजगिरा / रामदाना",
    "category": "Grains",
    "variety": "Suvarna Amaranth",
    "priceRupees": 88,
    "pricePaise": 8800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "राजगिरा / रामदाना (Amaranth Grain / Rajgira / Ramdana) - Suvarna Amaranth। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_44",
    "name": "Quinoa Grain (Indian White)",
    "nameHi": "भारतीय सफेद क्विनोआ",
    "category": "Grains",
    "variety": "Himachal White Quinoa",
    "priceRupees": 130,
    "pricePaise": 13000,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "भारतीय सफेद क्विनोआ (Quinoa Grain (Indian White)) - Himachal White Quinoa। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_45",
    "name": "Flaxseed Grain / Alsi",
    "nameHi": "तीसी / अलसी दाना",
    "category": "Grains",
    "variety": "Garima High Lignan",
    "priceRupees": 72,
    "pricePaise": 7200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "तीसी / अलसी दाना (Flaxseed Grain / Alsi) - Garima High Lignan। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_46",
    "name": "Sesame / Til (White Desi)",
    "nameHi": "सफेद तिल",
    "category": "Grains",
    "variety": "RT 351 White Sesame",
    "priceRupees": 145,
    "pricePaise": 14500,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "सफेद तिल (Sesame / Til (White Desi)) - RT 351 White Sesame। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_47",
    "name": "Sesame / Til (Black Kala Til)",
    "nameHi": "काला तिल",
    "category": "Grains",
    "variety": "TKG 22 Black Sesame",
    "priceRupees": 165,
    "pricePaise": 16500,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "काला तिल (Sesame / Til (Black Kala Til)) - TKG 22 Black Sesame। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_48",
    "name": "Mustard Grain / Sarson (Pusa Bold)",
    "nameHi": "पीली सरसों दाना",
    "category": "Grains",
    "variety": "Pusa Bold 40% Oil",
    "priceRupees": 62,
    "pricePaise": 6200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "पीली सरसों दाना (Mustard Grain / Sarson (Pusa Bold)) - Pusa Bold 40% Oil। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_49",
    "name": "Black Mustard / Rai (Small)",
    "nameHi": "काली राई दाना",
    "category": "Grains",
    "variety": "Kranti Black Mustard",
    "priceRupees": 68,
    "pricePaise": 6800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 1,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "काली राई दाना (Black Mustard / Rai (Small)) - Kranti Black Mustard। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_50",
    "name": "Groundnut Pods / Mungfali (In Shell)",
    "nameHi": "साबुत मूंगफली (छिलके सहित)",
    "category": "Grains",
    "variety": "TAG 24 Trombay",
    "priceRupees": 64,
    "pricePaise": 6400,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627998670817-48f8bca15a4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80",
    "description": "साबुत मूंगफली (छिलके सहित) (Groundnut Pods / Mungfali (In Shell)) - TAG 24 Trombay। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_51",
    "name": "Soybean Grain (Yellow Grains)",
    "nameHi": "सोयाबीन दाना (फूड ग्रेड)",
    "category": "Grains",
    "variety": "JS-335 Cleaned",
    "priceRupees": 52,
    "pricePaise": 5200,
    "unit": "kg",
    "grade": "मंडी प्रमाणित ग्रेड A",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=800&q=80",
    "description": "सोयाबीन दाना (फूड ग्रेड) (Soybean Grain (Yellow Grains)) - JS-335 Cleaned। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  },
  {
    "id": "grain_52",
    "name": "Sunflower Seeds Grain / Surajmukhi",
    "nameHi": "सूरजमुखी दाना",
    "category": "Grains",
    "variety": "KBSH 44 Hybrid",
    "priceRupees": 58,
    "pricePaise": 5800,
    "unit": "kg",
    "grade": "उच्चतम श्रेणी A+",
    "isOrganic": 0,
    "photos": [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80"
    ],
    "thumbnail": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "sideLogo": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    "description": "सूरजमुखी दाना (Sunflower Seeds Grain / Surajmukhi) - KBSH 44 Hybrid। नमी नियंत्रित, स्वच्छ एवं उच्च पोषण मूल्य।"
  }
];

export const FULL_CROP_CATALOG: CatalogCropItem[] = [
  ...VEGETABLES_CATALOG,
  ...FRUITS_CATALOG,
  ...PULSES_CATALOG,
  ...GRAINS_CATALOG,
];

export const CATALOG_STATS = {
  vegetablesCount: 100,
  fruitsCount: 100,
  pulsesCount: 100,
  seedsCount: 100, // backward compatibility
  grainsCount: 52,
  totalCount: 352,
};

/**
 * Factory to create a fully-conforming CatalogCropItem for unlisted produce (not in 352 catalog)
 * strictly validating 2 to 6 photos.
 */
export function createCustomCatalogItem(params: {
  id?: string;
  name: string;
  nameHi?: string;
  category: 'Vegetables' | 'Fruits' | 'Pulses' | 'Grains' | 'Seeds';
  variety?: string;
  priceRupees: number;
  unit?: string;
  grade?: string;
  isOrganic?: number | boolean;
  photos: string[];
  description?: string;
  farmerId?: string;
  farmerName?: string;
  quantityKg?: number;
  location?: string;
}): CatalogCropItem {
  // Ensure valid photo set (2-6 photos)
  let cleanPhotos = Array.isArray(params.photos)
    ? params.photos.filter((p) => typeof p === 'string' && p.trim().length > 0)
    : [];

  if (cleanPhotos.length === 0) {
    cleanPhotos = [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ];
  } else if (cleanPhotos.length === 1) {
    cleanPhotos.push(cleanPhotos[0]);
  }

  // Cap at 6 photos
  cleanPhotos = cleanPhotos.slice(0, 6);

  const mainPhoto = cleanPhotos[0];
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
    grade: params.grade || 'उच्चतम श्रेणी A+',
    isOrganic: isOrg,
    photos: cleanPhotos,
    thumbnail: mainPhoto,
    sideLogo: mainPhoto,
    description:
      params.description ||
      `${hiName} (${engName}) - अनलिस्टेड फसल जो 352 कैटलॉग में नहीं है। किसान द्वारा 2-6 फोटो सहित सीधे पंजीकृत।`,
    isCustom: true,
    farmerId: params.farmerId,
    farmerName: params.farmerName,
    quantityKg: params.quantityKg,
    location: params.location,
  };
}

/**
 * Retrieve unlisted CatalogCropItem entries stored in client localStorage
 */
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

/**
 * Save or update an unlisted CatalogCropItem in client localStorage
 */
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

/**
 * Delete an unlisted CatalogCropItem from client localStorage
 */
export function deleteCustomCatalogItem(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getStoredCustomCatalogItems();
    const filtered = list.filter((c) => c.id !== id && `custom_${c.id}` !== id);
    localStorage.setItem('kb_custom_catalog_items', JSON.stringify(filtered));
  } catch (e) {}
}
