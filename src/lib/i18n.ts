export type Language = 'hi' | 'en';

export const translations = {
  hi: {
    // Navigation & General
    appName: "KisanBandhan AI",
    subTitle: "कृषि से सीधे खरीदार तक — बिना बिचौलियों के",
    tagline: "भारत का पहला AI संचालित प्रत्यक्ष कृषि बाज़ार और रसद मंच",
    navHome: "कृषि बाज़ार",
    navFarmer: "किसान पोर्टल",
    navFPO: "एफपीओ समूह",
    navBuyer: "प्रत्यक्ष खरीदार",
    navHub: "गुणवत्ता जाँच केंद्र",
    navTransporter: "परिवहन एवं रसद",
    navAdmin: "राष्ट्रीय मंडी शासन",
    cartTitle: "आपकी खरीदारी टोकरी",
    checkout: "सुरक्षित अनुबंध भुगतान",

    // Roles
    roleFarmer: "किसान पोर्टल",
    roleFPO: "एफपीओ समूह प्रबंधक",
    roleBuyer: "थोक एवं खुदरा खरीदार",
    roleHub: "माइक्रो-हब जाँच अधिकारी",
    roleTransporter: "रसद एवं परिवहन भागीदार",
    roleAdmin: "मंत्रालय एवं नीति प्रशासन",

    // Hero Section
    heroTitle: "किसानों की उपज का सीधा न्यायसंगत दाम, AI की शक्ति से",
    heroDesc: "बिचौलियों के बिना प्रत्यक्ष बिक्री, कंप्यूटर विज़न स्वचालित गुणवत्ता ग्रेडिंग, मांग पूर्वानुमान और 0% पोस्ट-हार्वेस्ट बर्बादी।",
    heroCTA: "ताज़ा फसलें देखें",
    ivrCTA: "फोन से बेचें (IVR वॉयस सेवा)",

    // Ticker
    liveMandiTicker: "सद्य मंडी भाव (एगमार्कनेट लाइव डेटा):",

    // Marketplace
    marketplaceTitle: "सत्यापित ताज़ा फसल बाज़ार",
    filterAll: "सभी फसलें",
    filterGradeA: "उच्चतम ग्रेड A / A+ केवल",
    filterOrganic: "जैविक फसलें केवल",
    pricePerKg: "प्रति किग्रा",
    availableQty: "उपलब्ध मात्रा",
    gradeLabel: "गुणवत्ता श्रेणी",
    locationLabel: "स्थान एवं संकलन हब",
    farmerLabel: "उत्पादक किसान / FPO",
    addToCart: "टोकरी में जोड़ें",
    buyNow: "अभी खरीदें",

    // Fair Price AI & IVR
    fairPriceHeader: "न्यायसंगत मूल्य AI — मंडी न्यूनतम समर्थन से बेहतर मूल्य",
    ivrHeader: "स्मार्टफोन नहीं? डायल करें 1800-KISAN-AI (फ़ोन कीपैड सेवा)",
    ivrSubtitle: "कीपैड बटन दबाएं या बोलकर फसल बेचें — तुरंत SMS पुष्टिकरण",
    press1: "1: टमाटर दर्ज करने हेतु",
    press2: "2: प्याज दर्ज करने हेतु",
    press3: "3: आलू दर्ज करने हेतु",
    simulatedCall: "कीपैड सेवा चलाएं",
    callSuccess: "SMS संदेश प्रेषित! आपकी फसल सफलता से दर्ज हो गई है।",

    // Cart Drawer
    cartEmpty: "आपकी टोकरी अभी खाली है",
    cartSubtotal: "उप-कुल राशि",
    logisticsFee: "स्मार्ट रसद एवं परिवहन शुल्क",
    gstTax: "जीएसटी (0% कृषि छूट)",
    totalAmount: "कुल भुगतेय राशि",
    proceedOrder: "स्मार्ट अनुबंध निष्पादित करें",

    // Hub CV Grading
    cvGradingTitle: "कंप्यूटर विज़न AI फसल गुणवत्ता परीक्षण",
    uploadPrompt: "फसल की फोटो अपलोड करें (या AI परीक्षण चलाएं)",
    aiAnalyzing: "AI गुणवत्ता विश्लेषण जारी है...",
    gradeResults: "गुणवत्ता परीक्षण परिणाम:",
    qrGenerated: "हब QR लेबल तैयार किया गया",

    // Common UI
    currencySymbol: "₹",
    paiseSuffix: "पैसे",
    statusAvailable: "उपलब्ध",
    statusPooled: "पूल किया गया",
    statusInTransit: "परिवहन में",
    statusDelivered: "सफलतापूर्वक हस्तांतरित",
  },
  en: {
    // Navigation & General
    appName: "KisanBandhan AI",
    subTitle: "Direct Farm-to-Buyer Platform — Zero Middlemen",
    tagline: "India's First AI-Powered Agri Supply Chain & Logistics Engine",
    navHome: "Marketplace",
    navFarmer: "Farmer Desk",
    navFPO: "FPO Aggregator",
    navBuyer: "Direct Buyer",
    navHub: "Hub Inspector",
    navTransporter: "Transporter Fleet",
    navAdmin: "National Governance",
    cartTitle: "Your Shopping Cart",
    checkout: "Proceed to Checkout",

    // Roles
    roleFarmer: "Farmer",
    roleFPO: "FPO Manager",
    roleBuyer: "Direct Buyer",
    roleHub: "Hub Operator",
    roleTransporter: "Transporter",
    roleAdmin: "Gov Admin",

    // Hero Section
    heroTitle: "Fair Prices for Farmers Powered by AI Transparency",
    heroDesc: "Direct disintermediation, computer vision grading, AI demand forecasting, and zero post-harvest food waste.",
    heroCTA: "Explore Produce",
    ivrCTA: "Sell via Phone (IVR Simulator)",

    // Ticker
    liveMandiTicker: "Live Mandi Prices (Agmarknet Realtime Feed):",

    // Marketplace
    marketplaceTitle: "Verified Fresh Produce Marketplace",
    filterAll: "All Crops",
    filterGradeA: "Grade A / A+ Only",
    filterOrganic: "Organic Only",
    pricePerKg: "per kg",
    availableQty: "Available Quantity",
    gradeLabel: "Quality Grade",
    locationLabel: "Location / Hub",
    farmerLabel: "Farmer / FPO",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",

    // Fair Price AI & IVR
    fairPriceHeader: "Fair Price AI Engine — Beyond Standard Mandi MSP",
    ivrHeader: "No Smartphone? Dial 1800-KISAN-AI (IVR Service)",
    ivrSubtitle: "Use keypad inputs or voice to list produce — Instant SMS Confirmation",
    press1: "1: Sell Tomatoes",
    press2: "2: Sell Onions",
    press3: "3: Sell Potatoes",
    simulatedCall: "Simulate Keypad Press",
    callSuccess: "SMS Sent! Produce registered successfully.",

    // Cart Drawer
    cartEmpty: "Your cart is currently empty",
    cartSubtotal: "Subtotal",
    logisticsFee: "Smart Logistics Fee",
    gstTax: "GST (0% Exempt Agri)",
    totalAmount: "Total Amount",
    proceedOrder: "Confirm Order Contract",

    // Hub CV Grading
    cvGradingTitle: "Computer Vision AI Quality Grading",
    uploadPrompt: "Upload produce photo (or run AI Simulation)",
    aiAnalyzing: "AI Model Analyzing Defect Ratio & Color Standard...",
    gradeResults: "Quality Inspection Result:",
    qrGenerated: "Hub QR Tag Generated",

    // Common UI
    currencySymbol: "₹",
    paiseSuffix: "paise",
    statusAvailable: "Available",
    statusPooled: "Pooled Lot",
    statusInTransit: "In Transit",
    statusDelivered: "Delivered",
  }
};

export const cropTranslations: Record<string, { hi: string; en: string }> = {
  // Landing Page Listings
  'ताज़ा हाइब्रिड टमाटर (Fresh Tomatoes)': { hi: 'ताज़ा हाइब्रिड टमाटर', en: 'Fresh Hybrid Tomatoes' },
  'लाल प्याज (Lasalgaon Red Onion)': { hi: 'लासलगांव लाल प्याज', en: 'Lasalgaon Red Onion' },
  'जैविक ज्योति आलू (Organic Potatoes)': { hi: 'जैविक ज्योति आलू', en: 'Organic Jyoti Potatoes' },
  'हरी शिमला मिर्च (Fresh Capsicum)': { hi: 'हरी शिमला मिर्च', en: 'Fresh Capsicum' },
  'शरबाती प्रीमियम गेहूं (Sharbati Wheat)': { hi: 'शरबाती प्रीमियम गेहूं', en: 'Premium Sharbati Wheat' },
  'देसी जैविक गाजर (Organic Carrots)': { hi: 'देसी जैविक गाजर', en: 'Organic Desi Carrots' },

  // English Key DB Listings
  'Fresh Nashik Tomatoes': { hi: 'ताज़ा नासिक टमाटर', en: 'Fresh Nashik Tomatoes' },
  'Red Onions (Nashik Quality)': { hi: 'लाल नासिक प्याज़ (उत्कृष्ट)', en: 'Red Onions (Nashik Quality)' },
  'Organic Sharbati Wheat': { hi: 'जैविक शरबती गेहूँ', en: 'Organic Sharbati Wheat' },
  'Farm Fresh Potatoes (Jyoti)': { hi: 'ताज़ा खेत के आलू (ज्योति)', en: 'Farm Fresh Potatoes (Jyoti)' },
  'Nashik Tomatoes (FPO Bulk Pool)': { hi: 'नासिक टमाटर (एफपीओ थोक पूल)', en: 'Nashik Tomatoes (FPO Bulk Pool)' },
  'Fresh Nashik Tomatoes (IVR Voice Listed)': { hi: 'नासिक टमाटर (IVR वॉयस सूचीबद्ध)', en: 'Fresh Nashik Tomatoes (IVR Voice Listed)' },
  'Nashik Tomatoes (IVR Voice Listed)': { hi: 'नासिक टमाटर (IVR वॉयस सूचीबद्ध)', en: 'Nashik Tomatoes (IVR Voice Listed)' },
  'Tomatoes': { hi: 'टमाटर', en: 'Tomatoes' },
  'Onions': { hi: 'प्याज़', en: 'Onions' },
  'Wheat': { hi: 'गेहूँ', en: 'Wheat' },
  'Potatoes': { hi: 'आलू', en: 'Potatoes' },
  'Tomato Grade A+': { hi: 'टमाटर (ग्रेड A+)', en: 'Tomato (Grade A+)' },
  'Onion Red Nashik': { hi: 'प्याज (लाल नासिक)', en: 'Onion (Red Nashik)' },
  'Sharbati Wheat': { hi: 'शरबती गेहूं', en: 'Sharbati Wheat' },
};

export const locationTranslations: Record<string, { hi: string; en: string }> = {
  'नासिक मंडी हब (महाराष्ट्र)': { hi: 'नासिक मंडी हब (महाराष्ट्र)', en: 'Nashik Mandi Hub (Maharashtra)' },
  'लासलगांव संकलन केंद्र': { hi: 'लासलगांव संकलन केंद्र', en: 'Lasalgaon Collection Center' },
  'इन्दौर (मध्य प्रदेश)': { hi: 'इन्दौर (मध्य प्रदेश)', en: 'Indore (Madhya Pradesh)' },
  'पुणे ग्रामीण हब': { hi: 'पुणे ग्रामीण हब', en: 'Pune Rural Hub' },
  'उज्जैन (मध्य प्रदेश)': { hi: 'उज्जैन (मध्य प्रदेश)', en: 'Ujjain (Madhya Pradesh)' },
  'जयपुर (राजस्थान)': { hi: 'जयपुर (राजस्थान)', en: 'Jaipur (Rajasthan)' },
  'Pimplgaon Mandi Hub': { hi: 'पिंपलगांव मंडी हब', en: 'Pimplgaon Mandi Hub' },
  'Lasalgaon Cold Storage': { hi: 'लासलगांव कोल्ड स्टोरेज', en: 'Lasalgaon Cold Storage' },
  'Khanna Grain Mandi': { hi: 'खन्ना अनाज मंडी', en: 'Khanna Grain Mandi' },
  'Nashik Central Hub': { hi: 'नासिक सेंट्रल हब', en: 'Nashik Central Hub' },
};

export const farmerTranslations: Record<string, { hi: string; en: string }> = {
  'रामेश्वर यादव': { hi: 'रामेश्वर यादव', en: 'Rameshwar Yadav' },
  'सहयाद्री किसान FPO समूह': { hi: 'सहयाद्री किसान FPO समूह', en: 'Sahyadri Farmers FPO Group' },
  'सुरेश पाटिल': { hi: 'सुरेश पाटिल', en: 'Suresh Patil' },
  'कविता चौधरी': { hi: 'कविता चौधरी', en: 'Kavita Choudhary' },
  'मालवा कृषक FPO': { hi: 'मालवा कृषक FPO', en: 'Malwa Krishak FPO' },
  'हनुमान सहाय': { hi: 'हनुमान सहाय', en: 'Hanuman Sahay' },
  'Ramesh Patil': { hi: 'रामेश पाटिल', en: 'Ramesh Patil' },
  'Harpreet Singh': { hi: 'हरप्रीत सिंह', en: 'Harpreet Singh' },
};

export const categoryTranslations: Record<string, { hi: string; en: string }> = {
  'सब्जियाँ': { hi: 'सब्जियाँ', en: 'Vegetables' },
  'कंदमूल': { hi: 'कंदमूल', en: 'Root Crops' },
  'अनाज': { hi: 'अनाज', en: 'Grains' },
  'Vegetables': { hi: 'सब्जियाँ', en: 'Vegetables' },
  'Fruits': { hi: 'फल', en: 'Fruits' },
  'Grains': { hi: 'अनाज', en: 'Grains' },
  'Pulses': { hi: 'दालें', en: 'Pulses' },
  'Spices': { hi: 'मसाले', en: 'Spices' },
  'All': { hi: 'सभी', en: 'All' },
};

export const gradeTranslations: Record<string, { hi: string; en: string }> = {
  'ग्रेड A+': { hi: 'ग्रेड A+', en: 'Grade A+' },
  'ग्रेड A': { hi: 'ग्रेड A', en: 'Grade A' },
  'निर्यात श्रेणी': { hi: 'निर्यात श्रेणी', en: 'Export Grade' },
  'Grade A Premium': { hi: 'ग्रेड A प्रीमियम', en: 'Grade A Premium' },
  'Grade A': { hi: 'ग्रेड A', en: 'Grade A' },
  'Grade A+ Export Quality': { hi: 'ग्रेड A+ निर्यात गुणवत्ता', en: 'Grade A+ Export Quality' },
  'Grade A Ultra': { hi: 'ग्रेड A अल्ट्रा', en: 'Grade A Ultra' },
  'Grade A+': { hi: 'ग्रेड A+', en: 'Grade A+' },
};

export function getLocalizedCropName(name: string, lang: Language): string {
  if (cropTranslations[name]) {
    return cropTranslations[name][lang];
  }
  // Automatic AI fallback cleaner for bracketed names e.g. "ताज़ा हाइब्रिड टमाटर (Fresh Tomatoes)"
  if (lang === 'en') {
    const bracketMatch = name.match(/\(([^)]+)\)/);
    if (bracketMatch && bracketMatch[1]) {
      return bracketMatch[1].trim();
    }
  } else if (lang === 'hi') {
    const cleaned = name.replace(/\([^)]*\)/g, '').trim();
    if (cleaned.length > 0) return cleaned;
  }
  return name;
}

export function getLocalizedLocation(loc: string, lang: Language): string {
  if (locationTranslations[loc]) {
    return locationTranslations[loc][lang];
  }
  return loc;
}

export function getLocalizedFarmer(farmer: string, lang: Language): string {
  if (farmerTranslations[farmer]) {
    return farmerTranslations[farmer][lang];
  }
  return farmer;
}

export function getLocalizedCategory(cat: string, lang: Language): string {
  if (categoryTranslations[cat]) {
    return categoryTranslations[cat][lang];
  }
  return cat;
}

export function getLocalizedGrade(grade: string, lang: Language): string {
  if (gradeTranslations[grade]) {
    return gradeTranslations[grade][lang];
  }
  return grade;
}
