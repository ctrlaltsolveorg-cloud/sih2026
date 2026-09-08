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

    // Stat Cards
    statMiddlemen: "बिचौलिया कमीशन",
    statMiddlemenDesc: "प्रत्यक्ष किसान एस्क्रौ",
    statCVGrading: "कंप्यूटर विज़न ग्रेडिंग",
    statCVGradingDesc: "FSSAI प्रमाणीकरण",
    statAIEngines: "स्मार्ट कृषि इंजन",
    statAIEnginesDesc: "न्यायसंगत मूल्य + रसद",
    statNoInternet: "बिना इंटरनेट सहायता",
    statNoInternetDesc: "कीपैड फोन सेवा",

    // Role Selector Header
    selectDashboardTitle: "उपयोगकर्ता डैशबोर्ड का चयन करें",
    integratedRolesCount: "6 एकीकृत भूमिकाएँ",

    // Role Subtitles
    roleFarmerSub: "न्यायसंगत मूल्य और IVR",
    roleFPOSub: "वर्चुअल लॉट एकत्रीकरण",
    roleBuyerSub: "थोक मांग एवं अनुबंध",
    roleHubSub: "CV ग्रेडिंग एवं QR",
    roleTransporterSub: "मार्ग अनुकूलन एवं OTP",
    roleAdminSub: "राष्ट्रीय मंडी शासन",

    // Helpline
    helplineText: "टोल-फ्री IVR वॉयस हेल्पलाइन: 1800-KISAN-AI (कीपैड फोन फसल पंजीकरण)",

    // Farmer Dashboard
    farmerWelcome: "नमस्ते",
    farmerSubtitle: "आपकी फसल सीधे सत्यापित खरीदारों को न्यायसंगत मूल्य पर बेची जाती है",
    farmerBadge: "प्रत्यक्ष किसान पोर्टल • 0% मध्यस्थ कमीशन",
    farmerAddNewCrop: "नयी फसल दर्ज करें",
    statEarnedIncome: "कुल प्रत्यक्ष अर्जित आय",
    statZeroCommission: "शून्य कमीशन",
    statActiveListings: "सक्रिय बाज़ार फसलें",
    statVerifiedByAI: "Fair Price AI द्वारा सत्यापित",
    statSmartContracts: "प्राप्त स्मार्ट अनुबंध",
    statEscrowProtected: "सुरक्षित एस्क्रौ भुगतान",
    ivrGuideHeader: "टोल-फ्री IVR वॉयस सेवा निर्देशिका (1800-KISAN-AI)",
    ivrGuideSub: "बिना इंटरनेट वाले साधारण कीपैड फोन से फसल दर्ज करने हेतु निःशुल्क हेल्पलाइन निर्देश",
    keypad1Title: "कीपैड बटन 1",
    keypad1Sub: "फसल बिक्री पंजीकरण",
    keypad1Desc: "टोल-फ्री नंबर पर 1 दबाकर अपनी फसल और मात्रा वॉयस मैसेज द्वारा दर्ज करें।",
    keypad2Title: "कीपैड बटन 2",
    keypad2Sub: "सद्य मंडी भाव (Agmarknet)",
    keypad2Desc: "टोल-फ्री नंबर पर 2 दबाकर अपने निकटतम मंडी का रीयल-टाइम AI न्यूनतम समर्थन मूल्य सुनें।",
    keypad3Title: "कीपैड बटन 3",
    keypad3Sub: "खाता शेष एवं एस्क्रौ स्टेटस",
    keypad3Desc: "टोल-फ्री नंबर पर 3 दबाकर अपने बैंक खाते और लंबित प्रत्यक्ष भुगतान की स्थिति जानें।",
    myRegisteredCrops: "आपकी पंजीकृत फसलें",
    agmarknetConnected: "एगमार्कनेट AI मंडी से जुड़ा",

    // FPO Dashboard
    fpoHeaderBadge: "एफपीओ वर्चुअल लॉट एकत्रीकरण केंद्र",
    fpoHeaderSub: "प्रबंधक: Sanjay Deshmukh • 142 सदस्य किसान एकत्रित (सामूहिक सौदेबाजी क्षमता)",
    fpoStatTotalSupply: "कुल एफपीओ एकत्रित आपूर्ति",
    fpoStatBargaining: "+42% बेहतर मूल्य सौदेबाज़ी",
    fpoStatVirtualLots: "सक्रिय वर्चुअल लॉट",
    fpoStatMembersIncluded: "86 सदस्य किसान शामिल हैं",
    fpoStatBuyerReqs: "संस्थागत मांग प्रस्ताव",
    fpoStatReadySupply: "प्रत्यक्ष आपूर्ति हेतु तैयार",
    fpoSectionVirtualLots: "वर्चुअल एकत्रित फसल लॉट",
    fpoSectionBuyerReqs: "थोक खरीदार मांग प्रस्ताव",
    fpoLockLotBtn: "लॉट सुरक्षित करें एवं मांग प्रस्ताव भेजें",
    fpoLotLockedStatus: "लॉट सुरक्षित एवं प्रेषित",
    fpoFulfilledPercent: "पूर्ति की गई मात्रा",
    fpoAcceptCommitmentBtn: "आपूर्ति प्रतिबद्धता स्वीकार करें",

    // Buyer Dashboard
    buyerHeaderBadge: "प्रत्यक्ष खरीदार पोर्टल",
    buyerWelcome: "नमस्ते",
    buyerHeaderSub: "कंप्यूटर विज़न प्रमाणित ताज़ी फसलें — बिचौलियों के बिना प्रत्यक्ष खरीद",
    buyerPostReqBtn: "+ थोक आवश्यकता प्रस्ताव भेजें",
    buyerStatTotalPurchase: "कुल खरीद मूल्य",
    buyerStatMandiSavings: "38% मंडी लागत बचत",
    buyerStatActiveOrders: "सक्रिय ऑर्डर",
    buyerStatGPSLogistics: "GPS लाइव रसद ट्रैकिंग",
    buyerStatRecurringContracts: "आवर्ती फार्म आपूर्ति अनुबंध",
    buyerStatFPOGuarantee: "सहयाद्री FPO गारंटीकृत",
    buyerActiveOrdersHeader: "आपके सक्रिय ऑर्डर एवं लाइव ट्रैकिंग",
    buyerRecurringContractsHeader: "आवर्ती फार्म आपूर्ति अनुबंध (स्मार्ट अनुबंध)",
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

    // Stat Cards
    statMiddlemen: "Middleman Commission",
    statMiddlemenDesc: "Direct Farmer Escrow",
    statCVGrading: "Computer Vision Grading",
    statCVGradingDesc: "FSSAI Certification",
    statAIEngines: "Smart Agri Engines",
    statAIEnginesDesc: "Fair Price + Logistics",
    statNoInternet: "No Internet Assistance",
    statNoInternetDesc: "Keypad Phone Service",

    // Role Selector Header
    selectDashboardTitle: "Select User Dashboard Persona",
    integratedRolesCount: "6 Integrated Roles",

    // Role Subtitles
    roleFarmerSub: "Fair Price & IVR",
    roleFPOSub: "Virtual Lot Aggregation",
    roleBuyerSub: "Bulk Demand & Contracts",
    roleHubSub: "CV Grading & QR",
    roleTransporterSub: "Route Optimization & OTP",
    roleAdminSub: "National Mandi Governance",

    // Helpline
    helplineText: "Toll-Free IVR Voice Helpline: 1800-KISAN-AI (Keypad Phone Crop Registration)",

    // Farmer Dashboard
    farmerWelcome: "Welcome",
    farmerSubtitle: "Your produce is listed directly to verified institutional buyers at fair prices.",
    farmerBadge: "Direct Farmer Portal • 0% Middleman Commission",
    farmerAddNewCrop: "+ Register New Crop",
    statEarnedIncome: "Total Direct Earned Income",
    statZeroCommission: "Zero Commission",
    statActiveListings: "Active Market Listings",
    statVerifiedByAI: "Verified by Fair Price AI",
    statSmartContracts: "Smart Contracts Executed",
    statEscrowProtected: "Protected Escrow Payment",
    ivrGuideHeader: "Toll-Free IVR Voice Service Directory (1800-KISAN-AI)",
    ivrGuideSub: "Helpline instructions for registering crops using standard keypad feature phones without internet",
    keypad1Title: "Keypad Button 1",
    keypad1Sub: "Crop Sale Registration",
    keypad1Desc: "Press 1 on toll-free call to record your crop type and quantity via voice message.",
    keypad2Title: "Keypad Button 2",
    keypad2Sub: "Live Mandi Rates (Agmarknet)",
    keypad2Desc: "Press 2 on toll-free call to hear real-time AI minimum support price for your nearest mandi.",
    keypad3Title: "Keypad Button 3",
    keypad3Sub: "Account Balance & Escrow Status",
    keypad3Desc: "Press 3 on toll-free call to check your bank account balance and pending payout status.",
    myRegisteredCrops: "Your Registered Crops",
    agmarknetConnected: "Agmarknet AI Mandi Connected",

    // FPO Dashboard
    fpoHeaderBadge: "FPO Virtual Lot Aggregation Center",
    fpoHeaderSub: "Manager: Sanjay Deshmukh • 142 Member Farmers Pooled (Collective Bargaining Power)",
    fpoStatTotalSupply: "Total FPO Aggregated Supply",
    fpoStatBargaining: "+42% Better Price Bargaining",
    fpoStatVirtualLots: "Active Virtual Lots",
    fpoStatMembersIncluded: "86 Member Farmers Included",
    fpoStatBuyerReqs: "Institutional Buyer Requests",
    fpoStatReadySupply: "Ready for Direct Supply",
    fpoSectionVirtualLots: "Virtual Aggregated Crop Lots",
    fpoSectionBuyerReqs: "Bulk Buyer Demand Requests",
    fpoLockLotBtn: "Lock Lot & Send Demand Offer",
    fpoLotLockedStatus: "Lot Secured & Dispatched",
    fpoFulfilledPercent: "Fulfilled Quantity",
    fpoAcceptCommitmentBtn: "Accept Supply Commitment",

    // Buyer Dashboard
    buyerHeaderBadge: "Direct Buyer Portal",
    buyerWelcome: "Welcome",
    buyerHeaderSub: "Computer Vision Certified Fresh Crops — Direct Purchase Without Middlemen",
    buyerPostReqBtn: "+ Post Bulk Demand Request",
    buyerStatTotalPurchase: "Total Purchase Value",
    buyerStatMandiSavings: "38% Mandi Cost Savings",
    buyerStatActiveOrders: "Active Orders",
    buyerStatGPSLogistics: "GPS Live Logistics Tracking",
    buyerStatRecurringContracts: "Recurring Farm Supply Contracts",
    buyerStatFPOGuarantee: "Sahyadri FPO Guaranteed",
    buyerActiveOrdersHeader: "Your Active Orders & Live Tracking",
    buyerRecurringContractsHeader: "Recurring Farm Supply Contracts (Smart Contracts)",
  }
};

export const cropTranslations: Record<string, { hi: string; en: string }> = {
  // Grains & Cereals
  'मक्का': { hi: 'मक्का (स्वीट कॉर्न)', en: 'Maize (Corn)' },
  'मकई': { hi: 'मक्का', en: 'Corn / Maize' },
  'Corn': { hi: 'मक्का (स्वीट कॉर्न)', en: 'Sweet Corn' },
  'Maize': { hi: 'मक्का (स्वीट कॉर्न)', en: 'Fresh Maize (Corn)' },
  'Sweet Corn': { hi: 'मक्का (स्वीट कॉर्न)', en: 'Sweet Corn' },
  'makka': { hi: 'मक्का', en: 'Maize (Corn)' },
  'makkai': { hi: 'मक्का', en: 'Maize (Corn)' },
  'धान': { hi: 'धान', en: 'Paddy' },
  'चावल': { hi: 'बासमती चावल', en: 'Basmati Rice' },
  'Rice': { hi: 'चावल', en: 'Basmati Rice' },
  'Basmati Rice': { hi: 'बासमती प्रीमियम चावल', en: 'Premium Basmati Rice' },
  'गेहूं': { hi: 'शरबाती गेहूं', en: 'Sharbati Wheat' },
  'गेहूँ': { hi: 'शरबाती गेहूं', en: 'Sharbati Wheat' },
  'Wheat': { hi: 'गेहूं', en: 'Wheat' },
  'Sharbati Wheat': { hi: 'शरबाती गेहूं', en: 'Sharbati Wheat' },
  'ज्वार': { hi: 'ज्वार', en: 'Sorghum (Jowar)' },
  'बाजरा': { hi: 'बाजरा', en: 'Pearl Millet (Bajra)' },
  'जौ': { hi: 'जौ', en: 'Barley' },

  // Vegetables
  'टमाटर': { hi: 'ताज़ा टमाटर', en: 'Fresh Tomatoes' },
  'Tomatoes': { hi: 'टमाटर', en: 'Tomatoes' },
  'Fresh Tomatoes': { hi: 'ताज़ा टमाटर', en: 'Fresh Tomatoes' },
  'tamatar': { hi: 'टमाटर', en: 'Fresh Tomatoes' },
  'प्याज़': { hi: 'लाल प्याज', en: 'Red Onions' },
  'प्याज': { hi: 'लाल प्याज', en: 'Red Onions' },
  'Onions': { hi: 'प्याज', en: 'Red Onions' },
  'pyaaz': { hi: 'प्याज', en: 'Red Onions' },
  'आलू': { hi: 'ज्योति आलू', en: 'Jyoti Potatoes' },
  'Potatoes': { hi: 'आलू', en: 'Potatoes' },
  'aalu': { hi: 'आलू', en: 'Potatoes' },
  'alu': { hi: 'आलू', en: 'Potatoes' },
  'भिंडी': { hi: 'ताज़ा भिंडी', en: 'Fresh Okra (Ladyfinger)' },
  'Okra': { hi: 'भिंडी', en: 'Okra (Ladyfinger)' },
  'Ladyfinger': { hi: 'भिंडी', en: 'Ladyfinger' },
  'bhindi': { hi: 'भिंडी', en: 'Fresh Okra' },
  'बैंगन': { hi: 'देसी बैंगन', en: 'Fresh Eggplant (Brinjal)' },
  'Brinjal': { hi: 'बैंगन', en: 'Eggplant (Brinjal)' },
  'Eggplant': { hi: 'बैंगन', en: 'Eggplant (Brinjal)' },
  'baingan': { hi: 'बैंगन', en: 'Eggplant' },
  'फूलगोभी': { hi: 'ताज़ा फूलगोभी', en: 'Fresh Cauliflower' },
  'Cauliflower': { hi: 'फूलगोभी', en: 'Cauliflower' },
  'गोभी': { hi: 'फूलगोभी / पत्तागोभी', en: 'Cauliflower / Cabbage' },
  'gobi': { hi: 'गोभी', en: 'Cauliflower' },
  'पत्तागोभी': { hi: 'हरी पत्तागोभी', en: 'Fresh Cabbage' },
  'Cabbage': { hi: 'पत्तागोभी', en: 'Cabbage' },
  'मटर': { hi: 'हरी मटर', en: 'Green Peas' },
  'Peas': { hi: 'हरी मटर', en: 'Green Peas' },
  'matar': { hi: 'मटर', en: 'Green Peas' },
  'गाजर': { hi: 'देसी जैविक गाजर', en: 'Desi Organic Carrots' },
  'Carrot': { hi: 'गाजर', en: 'Carrots' },
  'Carrots': { hi: 'गाजर', en: 'Carrots' },
  'gajar': { hi: 'गाजर', en: 'Carrots' },
  'मूली': { hi: 'सफ़ेद मूली', en: 'Fresh Radish' },
  'Radish': { hi: 'मूली', en: 'Radish' },
  'mooli': { hi: 'मूली', en: 'Radish' },
  'शलजम': { hi: 'देसी शलजम', en: 'Fresh Turnip' },
  'शलगम': { hi: 'देसी शलजम', en: 'Fresh Turnip' },
  'Turnip': { hi: 'शलजम', en: 'Turnip' },
  'Turnips': { hi: 'शलजम', en: 'Turnips' },
  'turnip': { hi: 'शलजम', en: 'Turnip' },
  'turnips': { hi: 'शलजम', en: 'Turnips' },
  'shalgam': { hi: 'शलजम', en: 'Turnip' },
  'shaljam': { hi: 'शलजम', en: 'Turnip' },
  'चुकंदर': { hi: 'चुकंदर', en: 'Beetroot' },
  'Beetroot': { hi: 'चुकंदर', en: 'Beetroot' },
  'beetroot': { hi: 'चुकंदर', en: 'Beetroot' },
  'chukandar': { hi: 'चुकंदर', en: 'Beetroot' },
  'शकरकंद': { hi: 'मीठी शकरकंद', en: 'Sweet Potato' },
  'Sweet Potato': { hi: 'शकरकंद', en: 'Sweet Potato' },
  'shakarkand': { hi: 'शकरकंद', en: 'Sweet Potato' },
  'जिमीकंद': { hi: 'जिमीकंद (सूरन)', en: 'Elephant Foot Yam' },
  'सूरन': { hi: 'सूरन (जिमीकंद)', en: 'Elephant Foot Yam' },
  'Yam': { hi: 'जिमीकंद', en: 'Yam' },
  'Elephant Foot Yam': { hi: 'जिमीकंद (सूरन)', en: 'Elephant Foot Yam' },
  'jimikand': { hi: 'जिमीकंद', en: 'Yam' },
  'suran': { hi: 'सूरन', en: 'Yam' },
  'कटहल': { hi: 'देसी कटहल', en: 'Fresh Jackfruit' },
  'Jackfruit': { hi: 'कटहल', en: 'Jackfruit' },
  'kathal': { hi: 'कटहल', en: 'Jackfruit' },
  'सहजन': { hi: 'सहजन (मोरिंगा)', en: 'Drumstick (Moringa)' },
  'Drumstick': { hi: 'सहजन फली', en: 'Drumstick' },
  'Moringa': { hi: 'सहजन (मोरिंगा)', en: 'Moringa' },
  'sahjan': { hi: 'सहजन', en: 'Drumstick' },
  'गवार': { hi: 'गवार फली', en: 'Cluster Beans' },
  'Cluster Beans': { hi: 'गवार फली', en: 'Cluster Beans' },
  'gawar': { hi: 'गवार फली', en: 'Cluster Beans' },
  'अरबी': { hi: 'अरबी (कंद)', en: 'Taro Root (Arbi)' },
  'Taro Root': { hi: 'अरबी', en: 'Taro Root' },
  'Arbi': { hi: 'अरबी', en: 'Arbi' },
  'arbi': { hi: 'अरबी', en: 'Arbi' },
  'पेठा': { hi: 'पेठा (सफ़ेद कद्दू)', en: 'Ash Gourd' },
  'Ash Gourd': { hi: 'पेठा (सफ़ेद कद्दू)', en: 'Ash Gourd' },
  'petha': { hi: 'पेठा', en: 'Ash Gourd' },
  'कद्दू': { hi: 'मीठा कद्दू', en: 'Fresh Pumpkin' },
  'Pumpkin': { hi: 'कद्दू', en: 'Pumpkin' },
  'kaddu': { hi: 'कद्दू', en: 'Pumpkin' },
  'कुंदरू': { hi: 'ताज़ा कुंदरू', en: 'Ivy Gourd' },
  'Ivy Gourd': { hi: 'कुंदरू', en: 'Ivy Gourd' },
  'kundru': { hi: 'कुंदरू', en: 'Ivy Gourd' },
  'परवल': { hi: 'हरी परवल', en: 'Pointed Gourd (Parwal)' },
  'Pointed Gourd': { hi: 'परवल', en: 'Pointed Gourd' },
  'parwal': { hi: 'परवल', en: 'Pointed Gourd' },
  'तोरई': { hi: 'ताज़ा तोरई', en: 'Ridge Gourd / Sponge Gourd' },
  'Ridge Gourd': { hi: 'तोरई', en: 'Ridge Gourd' },
  'Sponge Gourd': { hi: 'तोरई', en: 'Sponge Gourd' },
  'torai': { hi: 'तोरई', en: 'Ridge Gourd' },
  'पुदीना': { hi: 'ताज़ा पुदीना', en: 'Fresh Mint' },
  'Mint': { hi: 'पुदीना', en: 'Mint' },
  'pudina': { hi: 'पुदीना', en: 'Mint' },
  'कढ़ी पत्ता': { hi: 'कढ़ी पत्ता', en: 'Curry Leaves' },
  'Curry Leaves': { hi: 'कढ़ी पत्ता', en: 'Curry Leaves' },
  'kadi patta': { hi: 'कढ़ी पत्ता', en: 'Curry Leaves' },
  'हरा प्याज': { hi: 'हरा प्याज', en: 'Spring Onion' },
  'Spring Onion': { hi: 'हरा प्याज', en: 'Spring Onion' },
  'hara pyaaz': { hi: 'हरा प्याज', en: 'Spring Onion' },
  'मेथी': { hi: 'हरी मेथी', en: 'Fenugreek Leaves (Methi)' },
  'Fenugreek': { hi: 'मेथी', en: 'Fenugreek' },
  'methi': { hi: 'मेथी', en: 'Fenugreek' },
  'गुड़': { hi: 'देसी गुड़', en: 'Organic Jaggery' },
  'Jaggery': { hi: 'गुड़', en: 'Jaggery' },
  'gud': { hi: 'गुड़', en: 'Jaggery' },
  'इमली': { hi: 'खट्टी इमली', en: 'Tamarind' },
  'Tamarind': { hi: 'इमली', en: 'Tamarind' },
  'imli': { hi: 'इमली', en: 'Tamarind' },
  'नारियल': { hi: 'ताज़ा नारियल', en: 'Fresh Coconut' },
  'Coconut': { hi: 'नारियल', en: 'Coconut' },
  'nariyal': { hi: 'नारियल', en: 'Coconut' },
  'अमरूद': { hi: 'मीठा अमरूद', en: 'Fresh Guava' },
  'Guava': { hi: 'अमरूद', en: 'Guava' },
  'amrood': { hi: 'अमरूद', en: 'Guava' },
  'संतरा': { hi: 'नागपुरी संतरा', en: 'Nagpur Oranges' },
  'Orange': { hi: 'संतरा', en: 'Orange' },
  'santra': { hi: 'संतरा', en: 'Orange' },
  'नींबू': { hi: 'कागज़ी नींबू', en: 'Fresh Lemon' },
  'Lemon': { hi: 'नींबू', en: 'Lemon' },
  'Lime': { hi: 'नींबू', en: 'Lime' },
  'nimbu': { hi: 'नींबू', en: 'Lemon' },
  'खरबूजा': { hi: 'मीठा खरबूजा', en: 'Muskmelon' },
  'Muskmelon': { hi: 'खरबूजा', en: 'Muskmelon' },
  'kharbuja': { hi: 'खरबूजा', en: 'Muskmelon' },
  'लौकी': { hi: 'ताज़ा लौकी', en: 'Bottle Gourd' },
  'Bottle Gourd': { hi: 'लौकी', en: 'Bottle Gourd' },
  'lauki': { hi: 'लौकी', en: 'Bottle Gourd' },
  'करेला': { hi: 'देसी करेला', en: 'Bitter Gourd' },
  'Bitter Gourd': { hi: 'करेला', en: 'Bitter Gourd' },
  'karela': { hi: 'करेला', en: 'Bitter Gourd' },
  'पालक': { hi: 'जैविक पालक', en: 'Organic Spinach' },
  'Spinach': { hi: 'पालक', en: 'Spinach' },
  'palak': { hi: 'पालक', en: 'Spinach' },
  'धनिया': { hi: 'ताज़ा हरी धनिया', en: 'Fresh Coriander' },
  'Coriander': { hi: 'धनिया', en: 'Coriander' },
  'dhaniya': { hi: 'धनिया', en: 'Coriander' },

  // Spices & Condiments
  'अदरक': { hi: 'देसी अदरक', en: 'Fresh Ginger' },
  'Ginger': { hi: 'अदरक', en: 'Ginger' },
  'adrak': { hi: 'अदरक', en: 'Ginger' },
  'लहसुन': { hi: 'देसी लहसुन', en: 'Garlic' },
  'Garlic': { hi: 'लहसुन', en: 'Garlic' },
  'lahsun': { hi: 'लहसुन', en: 'Garlic' },
  'हल्दी': { hi: 'जैविक कच्ची हल्दी', en: 'Organic Raw Turmeric' },
  'Turmeric': { hi: 'हल्दी', en: 'Turmeric' },
  'haldi': { hi: 'हल्दी', en: 'Turmeric' },
  'मिर्च': { hi: 'तीखी हरी मिर्च', en: 'Green Chilli' },
  'Chilli': { hi: 'मिर्च', en: 'Green Chilli' },
  'Chili': { hi: 'मिर्च', en: 'Green Chilli' },
  'mirch': { hi: 'मिर्च', en: 'Chilli' },
  'शिमला मिर्च': { hi: 'हरी शिमला मिर्च', en: 'Fresh Capsicum' },
  'Capsicum': { hi: 'शिमला मिर्च', en: 'Capsicum' },
  'जीरा': { hi: 'उूंझा जीरा', en: 'Cumin Seeds' },
  'Cumin': { hi: 'जीरा', en: 'Cumin' },

  // Fruits
  'सेब': { hi: 'हिमाचली सेब', en: 'Himachali Apples' },
  'Apple': { hi: 'सेब', en: 'Apples' },
  'Apples': { hi: 'सेब', en: 'Apples' },
  'seb': { hi: 'सेब', en: 'Apples' },
  'आम': { hi: 'अल्फांसो आम', en: 'Alphonso Mangoes' },
  'Mango': { hi: 'आम', en: 'Mangoes' },
  'Mangoes': { hi: 'आम', en: 'Mangoes' },
  'aam': { hi: 'आम', en: 'Mangoes' },
  'केला': { hi: 'भुसावल केला', en: 'Bhusawal Bananas' },
  'Banana': { hi: 'केला', en: 'Bananas' },
  'kela': { hi: 'केला', en: 'Bananas' },
  'अंगूर': { hi: 'नासिक काले अंगूर', en: 'Nashik Black Grapes' },
  'Grapes': { hi: 'अंगूर', en: 'Grapes' },
  'angoor': { hi: 'अंगूर', en: 'Grapes' },
  'अनार': { hi: 'सोलापुर भगवा अनार', en: 'Bhagwa Pomegranates' },
  'Pomegranate': { hi: 'अनार', en: 'Pomegranates' },
  'anar': { hi: 'अनार', en: 'Pomegranates' },
  'पपीता': { hi: 'मीठा रेड लेडी पपीता', en: 'Red Lady Papaya' },
  'Papaya': { hi: 'पपीता', en: 'Papaya' },
  'papita': { hi: 'पपीता', en: 'Papaya' },
  'तरबूज': { hi: 'मीठा तरबूज', en: 'Sweet Watermelon' },
  'Watermelon': { hi: 'तरबूज', en: 'Watermelon' },

  // Oilseeds & Cash Crops
  'मूंगफली': { hi: 'गुजरात मूंगफली', en: 'Peanuts (Groundnuts)' },
  'Peanuts': { hi: 'मूंगफली', en: 'Peanuts' },
  'Groundnut': { hi: 'मूंगफली', en: 'Groundnuts' },
  'mungfali': { hi: 'मूंगफली', en: 'Peanuts' },
  'सोयाबीन': { hi: 'पीला मालवा सोयाबीन', en: 'Yellow Soybean' },
  'Soybean': { hi: 'सोयाबीन', en: 'Soybean' },
  'सरसों': { hi: 'पीली राजस्थान सरसों', en: 'Yellow Mustard' },
  'Mustard': { hi: 'सरसों', en: 'Mustard' },
  'sarson': { hi: 'सरसों', en: 'Mustard' },
  'चना': { hi: 'काबोली चना', en: 'Kabuli Chickpeas' },
  'Chickpeas': { hi: 'चना', en: 'Chickpeas' },
  'chana': { hi: 'चना', en: 'Chickpeas' },
  'मखाना': { hi: 'दरभंगा मखाना', en: 'Darbhanga Fox Nuts (Makhana)' },
  'Makhana': { hi: 'मखाना', en: 'Fox Nuts (Makhana)' },
  'Fox Nuts': { hi: 'मखाना', en: 'Fox Nuts (Makhana)' },

  // Composite Names
  'ताज़ा हाइब्रिड टमाटर (Fresh Tomatoes)': { hi: 'ताज़ा हाइब्रिड टमाटर', en: 'Fresh Hybrid Tomatoes' },
  'नासिक हाइब्रिड टमाटर (ताज़ा टमाटर)': { hi: 'नासिक हाइब्रिड टमाटर', en: 'Nashik Hybrid Tomatoes' },
  'नासिक हाइब्रिड टमाटर (वर्चुअल पूल)': { hi: 'नासिक हाइब्रिड टमाटर (वर्चुअल पूल)', en: 'Nashik Hybrid Tomatoes (Virtual Pool)' },
  'लासलगांव लाल प्याज (थोक एकत्रीकरण)': { hi: 'लासलगांव लाल प्याज (थोक एकत्रीकरण)', en: 'Lasalgaon Red Onion (Bulk Aggregation)' },
  'लाल प्याज (Lasalgaon Red Onion)': { hi: 'लासलगांव लाल प्याज', en: 'Lasalgaon Red Onion' },
  'जैविक ज्योति आलू (Organic Potatoes)': { hi: 'जैविक ज्योति आलू', en: 'Organic Jyoti Potatoes' },
  'हरी शिमला मिर्च (Fresh Capsicum)': { hi: 'हरी शिमला मिर्च', en: 'Fresh Capsicum' },
  'शरबाती प्रीमियम गेहूं (Sharbati Wheat)': { hi: 'शरबाती प्रीमियम गेहूं', en: 'Premium Sharbati Wheat' },
  'देसी जैविक गाजर (Organic Carrots)': { hi: 'देसी जैविक गाजर', en: 'Organic Desi Carrots' },
  'Fresh Nashik Tomatoes': { hi: 'ताज़ा नासिक टमाटर', en: 'Fresh Nashik Tomatoes' },
  'Red Onions (Nashik Quality)': { hi: 'लाल नासिक प्याज़ (उत्कृष्ट)', en: 'Red Onions (Nashik Quality)' },
  'Organic Sharbati Wheat': { hi: 'जैविक शरबती गेहूँ', en: 'Organic Sharbati Wheat' },
  'Farm Fresh Potatoes (Jyoti)': { hi: 'ताज़ा खेत के आलू (ज्योति)', en: 'Farm Fresh Potatoes (Jyoti)' },
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
  'नासिक एग्रो-हब #04': { hi: 'नासिक एग्रो-हब #04', en: 'Nashik Agro-Hub #04' },
  'पुणे स्वॉरगेट वितरण हब': { hi: 'पुणे स्वॉरगेट वितरण हब', en: 'Pune Swargate Distribution Hub' },
  'मुंबई सेन्ट्रल कोल्ड स्टोर': { hi: 'मुंबई सेन्ट्रल कोल्ड स्टोर', en: 'Mumbai Central Cold Storage' },
  'अन्नपूर्णा पुणे संकलन हब': { hi: 'अन्नपूर्णा पुणे संकलन हब', en: 'Annapurna Pune Collection Hub' },
  'नासिक मंडी संकलन हब': { hi: 'नासिक मंडी संकलन हब', en: 'Nashik Mandi Collection Hub' },
};

export const farmerTranslations: Record<string, { hi: string; en: string }> = {
  'रामेश्वर यादव': { hi: 'रामेश्वर यादव', en: 'Rameshwar Yadav' },
  'सहयाद्री किसान FPO समूह': { hi: 'सहयाद्री किसान FPO समूह', en: 'Sahyadri Farmers FPO Group' },
  'सहयाद्री किसान FPO': { hi: 'सहयाद्री किसान FPO', en: 'Sahyadri Farmers FPO' },
  'सुरेश पाटिल': { hi: 'सुरेश पाटिल', en: 'Suresh Patil' },
  'कविता चौधरी': { hi: 'कविता चौधरी', en: 'Kavita Choudhary' },
  'मालवा कृषक FPO': { hi: 'मालवा कृषक FPO', en: 'Malwa Krishak FPO' },
  'हनुमान सहाय': { hi: 'हनुमान सहाय', en: 'Hanuman Sahay' },
  'Ramesh Patil': { hi: 'रामेश पाटिल', en: 'Ramesh Patil' },
  'Harpreet Singh': { hi: 'हरप्रीत सिंह', en: 'Harpreet Singh' },
  'अन्नपूर्णा होटल एवं कैटरिंग सेवा': { hi: 'अन्नपूर्णा होटल एवं कैटरिंग सेवा', en: 'Annapurna Hotel & Catering Services' },
  'अन्नपूर्णा पुणे (खरीदार)': { hi: 'अन्नपूर्णा पुणे (खरीदार)', en: 'Annapurna Pune (Buyer)' },
  'मदर डेयरी एग्री': { hi: 'मदर डेयरी एग्री', en: 'Mother Dairy Agri' },
  'मदर डेयरी फ्रेश': { hi: 'मदर डेयरी फ्रेश', en: 'Mother Dairy Fresh' },
  'रिलायंस रिटेल एग्री': { hi: 'रिलायंस रिटेल एग्री', en: 'Reliance Retail Agri' },
  'रिलायंस रिटेल फूड्स': { hi: 'रिलायंस रिटेल फूड्स', en: 'Reliance Retail Foods' },
  'बिगबास्केट थोक खरीद': { hi: 'बिगबास्केट थोक खरीद', en: 'BigBasket Wholesale' },
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
  'उच्चतम श्रेणी A+': { hi: 'उच्चतम श्रेणी A+', en: 'Grade A+ Premium' },
  'श्रेणी A': { hi: 'श्रेणी A', en: 'Grade A' },
  'ग्रेड A+': { hi: 'ग्रेड A+', en: 'Grade A+' },
  'ग्रेड A': { hi: 'ग्रेड A', en: 'Grade A' },
  'निर्यात श्रेणी': { hi: 'निर्यात श्रेणी', en: 'Export Grade' },
  'Grade A Premium': { hi: 'ग्रेड A प्रीमियम', en: 'Grade A Premium' },
  'Grade A': { hi: 'ग्रेड A', en: 'Grade A' },
  'Grade A+ Export Quality': { hi: 'ग्रेड A+ निर्यात गुणवत्ता', en: 'Grade A+ Export Quality' },
  'Grade A Ultra': { hi: 'ग्रेड A अल्ट्रा', en: 'Grade A Ultra' },
  'Grade A+': { hi: 'ग्रेड A+', en: 'Grade A+' },
};

// AI Token Map for Word-by-Word Substring & Transliteration Translation
const tokenMap: Record<string, { hi: string; en: string }> = {
  'मक्का': { hi: 'मक्का', en: 'Maize (Corn)' },
  'मकई': { hi: 'मक्का', en: 'Corn / Maize' },
  'corn': { hi: 'मक्का', en: 'Corn' },
  'maize': { hi: 'मक्का', en: 'Maize' },
  'sweetcorn': { hi: 'स्वीट कॉर्न', en: 'Sweet Corn' },
  'makka': { hi: 'मक्का', en: 'Maize (Corn)' },
  'makkai': { hi: 'मक्का', en: 'Maize (Corn)' },
  'धान': { hi: 'धान', en: 'Paddy' },
  'चावल': { hi: 'चावल', en: 'Rice' },
  'paddy': { hi: 'धान', en: 'Paddy' },
  'rice': { hi: 'चावल', en: 'Rice' },
  'गेहूं': { hi: 'गेहूं', en: 'Wheat' },
  'गेहूँ': { hi: 'गेहूं', en: 'Wheat' },
  'wheat': { hi: 'गेहूं', en: 'Wheat' },
  'gehun': { hi: 'गेहूं', en: 'Wheat' },
  'टमाटर': { hi: 'टमाटर', en: 'Tomatoes' },
  'tomato': { hi: 'टमाटर', en: 'Tomato' },
  'tomatoes': { hi: 'टमाटर', en: 'Tomatoes' },
  'tamatar': { hi: 'टमाटर', en: 'Tomatoes' },
  'प्याज': { hi: 'प्याज', en: 'Onions' },
  'प्याज़': { hi: 'प्याज', en: 'Onions' },
  'onion': { hi: 'प्याज', en: 'Onion' },
  'onions': { hi: 'प्याज', en: 'Onions' },
  'pyaaz': { hi: 'प्याज', en: 'Onions' },
  'आलू': { hi: 'आलू', en: 'Potatoes' },
  'potato': { hi: 'आलू', en: 'Potato' },
  'potatoes': { hi: 'आलू', en: 'Potatoes' },
  'aalu': { hi: 'आलू', en: 'Potatoes' },
  'भिंडी': { hi: 'भिंडी', en: 'Okra (Ladyfinger)' },
  'okra': { hi: 'भिंडी', en: 'Okra' },
  'ladyfinger': { hi: 'भिंडी', en: 'Ladyfinger' },
  'bhindi': { hi: 'भिंडी', en: 'Okra' },
  'बैंगन': { hi: 'बैंगन', en: 'Eggplant (Brinjal)' },
  'brinjal': { hi: 'बैंगन', en: 'Brinjal' },
  'eggplant': { hi: 'बैंगन', en: 'Eggplant' },
  'baingan': { hi: 'बैंगन', en: 'Eggplant' },
  'गोभी': { hi: 'गोभी', en: 'Cauliflower' },
  'फूलगोभी': { hi: 'फूलगोभी', en: 'Cauliflower' },
  'cauliflower': { hi: 'फूलगोभी', en: 'Cauliflower' },
  'पत्तागोभी': { hi: 'पत्तागोभी', en: 'Cabbage' },
  'cabbage': { hi: 'पत्तागोभी', en: 'Cabbage' },
  'मटर': { hi: 'मटर', en: 'Peas' },
  'peas': { hi: 'मटर', en: 'Peas' },
  'matar': { hi: 'मटर', en: 'Peas' },
  'गाजर': { hi: 'गाजर', en: 'Carrot' },
  'carrot': { hi: 'गाजर', en: 'Carrot' },
  'carrots': { hi: 'गाजर', en: 'Carrots' },
  'gajar': { hi: 'गाजर', en: 'Carrot' },
  'मूली': { hi: 'मूली', en: 'Radish' },
  'radish': { hi: 'मूली', en: 'Radish' },
  'mooli': { hi: 'मूली', en: 'Radish' },
  'शलजम': { hi: 'शलजम', en: 'Turnip' },
  'शलगम': { hi: 'शलजम', en: 'Turnip' },
  'turnip': { hi: 'शलजम', en: 'Turnip' },
  'turnips': { hi: 'शलजम', en: 'Turnips' },
  'shalgam': { hi: 'शलजम', en: 'Turnip' },
  'shaljam': { hi: 'शलजम', en: 'Turnip' },
  'चुकंदर': { hi: 'चुकंदर', en: 'Beetroot' },
  'beetroot': { hi: 'चुकंदर', en: 'Beetroot' },
  'chukandar': { hi: 'चुकंदर', en: 'Beetroot' },
  'शकरकंद': { hi: 'शकरकंद', en: 'Sweet Potato' },
  'shakarkand': { hi: 'शकरकंद', en: 'Sweet Potato' },
  'जिमीकंद': { hi: 'जिमीकंद', en: 'Yam' },
  'सूरन': { hi: 'सूरन', en: 'Yam' },
  'yam': { hi: 'जिमीकंद', en: 'Yam' },
  'suran': { hi: 'सूरन', en: 'Yam' },
  'jimikand': { hi: 'जिमीकंद', en: 'Yam' },
  'कटहल': { hi: 'कटहल', en: 'Jackfruit' },
  'jackfruit': { hi: 'कटहल', en: 'Jackfruit' },
  'kathal': { hi: 'कटहल', en: 'Jackfruit' },
  'सहजन': { hi: 'सहजन', en: 'Drumstick' },
  'drumstick': { hi: 'सहजन', en: 'Drumstick' },
  'moringa': { hi: 'सहजन', en: 'Moringa' },
  'sahjan': { hi: 'सहजन', en: 'Drumstick' },
  'गवार': { hi: 'गवार', en: 'Cluster Beans' },
  'gawar': { hi: 'गवार', en: 'Cluster Beans' },
  'अरबी': { hi: 'अरबी', en: 'Arbi' },
  'arbi': { hi: 'अरबी', en: 'Arbi' },
  'पेठा': { hi: 'पेठा', en: 'Ash Gourd' },
  'petha': { hi: 'पेठा', en: 'Ash Gourd' },
  'कद्दू': { hi: 'कद्दू', en: 'Pumpkin' },
  'pumpkin': { hi: 'कद्दू', en: 'Pumpkin' },
  'kaddu': { hi: 'कद्दू', en: 'Pumpkin' },
  'कुंदरू': { hi: 'कुंदरू', en: 'Ivy Gourd' },
  'kundru': { hi: 'कुंदरू', en: 'Ivy Gourd' },
  'परवल': { hi: 'परवल', en: 'Pointed Gourd' },
  'parwal': { hi: 'परवल', en: 'Pointed Gourd' },
  'तोरई': { hi: 'तोरई', en: 'Ridge Gourd' },
  'torai': { hi: 'तोरई', en: 'Ridge Gourd' },
  'पुदीना': { hi: 'पुदीना', en: 'Mint' },
  'mint': { hi: 'पुदीना', en: 'Mint' },
  'pudina': { hi: 'पुदीना', en: 'Mint' },
  'कढ़ी': { hi: 'कढ़ी पत्ता', en: 'Curry Leaves' },
  'मेथी': { hi: 'मेथी', en: 'Fenugreek' },
  'methi': { hi: 'मेथी', en: 'Fenugreek' },
  'गुड़': { hi: 'गुड़', en: 'Jaggery' },
  'jaggery': { hi: 'गुड़', en: 'Jaggery' },
  'gud': { hi: 'गुड़', en: 'Jaggery' },
  'इमली': { hi: 'इमली', en: 'Tamarind' },
  'tamarind': { hi: 'इमली', en: 'Tamarind' },
  'imli': { hi: 'इमली', en: 'Tamarind' },
  'नारियल': { hi: 'नारियल', en: 'Coconut' },
  'coconut': { hi: 'नारियल', en: 'Coconut' },
  'nariyal': { hi: 'नारियल', en: 'Coconut' },
  'अमरूद': { hi: 'अमरूद', en: 'Guava' },
  'guava': { hi: 'अमरूद', en: 'Guava' },
  'amrood': { hi: 'अमरूद', en: 'Guava' },
  'संतरा': { hi: 'संतरा', en: 'Orange' },
  'orange': { hi: 'संतरा', en: 'Orange' },
  'santra': { hi: 'संतरा', en: 'Orange' },
  'नींबू': { hi: 'नींबू', en: 'Lemon' },
  'lemon': { hi: 'नींबू', en: 'Lemon' },
  'lime': { hi: 'नींबू', en: 'Lime' },
  'nimbu': { hi: 'नींबू', en: 'Lemon' },
  'खरबूजा': { hi: 'खरबूजा', en: 'Muskmelon' },
  'muskmelon': { hi: 'खरबूजा', en: 'Muskmelon' },
  'kharbuja': { hi: 'खरबूजा', en: 'Muskmelon' },
  'gourd': { hi: 'लौकी', en: 'Gourd' },
  'लौकी': { hi: 'लौकी', en: 'Bottle Gourd' },
  'lauki': { hi: 'लौकी', en: 'Bottle Gourd' },
  'करेला': { hi: 'करेला', en: 'Bitter Gourd' },
  'karela': { hi: 'करेला', en: 'Bitter Gourd' },
  'पालक': { hi: 'पालक', en: 'Spinach' },
  'spinach': { hi: 'पालक', en: 'Spinach' },
  'palak': { hi: 'पालक', en: 'Spinach' },
  'धनिया': { hi: 'धनिया', en: 'Coriander' },
  'coriander': { hi: 'धनिया', en: 'Coriander' },
  'dhaniya': { hi: 'धनिया', en: 'Coriander' },
  'अदरक': { hi: 'अदरक', en: 'Ginger' },
  'ginger': { hi: 'अदरक', en: 'Ginger' },
  'adrak': { hi: 'अदरक', en: 'Ginger' },
  'लहसुन': { hi: 'लहसुन', en: 'Garlic' },
  'garlic': { hi: 'लहसुन', en: 'Garlic' },
  'lahsun': { hi: 'लहसुन', en: 'Garlic' },
  'हल्दी': { hi: 'हल्दी', en: 'Turmeric' },
  'turmeric': { hi: 'हल्दी', en: 'Turmeric' },
  'haldi': { hi: 'हल्दी', en: 'Turmeric' },
  'मिर्च': { hi: 'मिर्च', en: 'Chilli' },
  'chilli': { hi: 'मिर्च', en: 'Chilli' },
  'chili': { hi: 'मिर्च', en: 'Chili' },
  'mirch': { hi: 'मिर्च', en: 'Chilli' },
  'शिमला': { hi: 'शिमला मिर्च', en: 'Capsicum' },
  'capsicum': { hi: 'शिमला मिर्च', en: 'Capsicum' },
  'सेब': { hi: 'सेब', en: 'Apples' },
  'apple': { hi: 'सेब', en: 'Apple' },
  'apples': { hi: 'सेब', en: 'Apples' },
  'seb': { hi: 'सेब', en: 'Apples' },
  'आम': { hi: 'आम', en: 'Mangoes' },
  'mango': { hi: 'आम', en: 'Mango' },
  'mangoes': { hi: 'आम', en: 'Mangoes' },
  'aam': { hi: 'आम', en: 'Mangoes' },
  'केला': { hi: 'केला', en: 'Bananas' },
  'banana': { hi: 'केला', en: 'Banana' },
  'bananas': { hi: 'केला', en: 'Bananas' },
  'kela': { hi: 'केला', en: 'Bananas' },
  'अंगूर': { hi: 'अंगूर', en: 'Grapes' },
  'grapes': { hi: 'अंगूर', en: 'Grapes' },
  'angoor': { hi: 'अंगूर', en: 'Grapes' },
  'अनार': { hi: 'अनार', en: 'Pomegranate' },
  'pomegranate': { hi: 'अनार', en: 'Pomegranate' },
  'anar': { hi: 'अनार', en: 'Pomegranate' },
  'पपीता': { hi: 'पपीता', en: 'Papaya' },
  'papaya': { hi: 'पपीता', en: 'Papaya' },
  'papita': { hi: 'पपीता', en: 'Papaya' },
  'सोयाबीन': { hi: 'सोयाबीन', en: 'Soybean' },
  'soybean': { hi: 'सोयाबीन', en: 'Soybean' },
  'सरसों': { hi: 'सरसों', en: 'Mustard' },
  'mustard': { hi: 'सरसों', en: 'Mustard' },
  'sarson': { hi: 'सरसों', en: 'Mustard' },
  'चना': { hi: 'चना', en: 'Chickpeas' },
  'chickpeas': { hi: 'चना', en: 'Chickpeas' },
  'chana': { hi: 'चना', en: 'Chickpeas' },
  'मूंगफली': { hi: 'मूंगफली', en: 'Peanuts' },
  'peanuts': { hi: 'मूंगफली', en: 'Peanuts' },
  'mungfali': { hi: 'मूंगफली', en: 'Peanuts' },
  'मखाना': { hi: 'मखाना', en: 'Fox Nuts (Makhana)' },
  'makhana': { hi: 'मखाना', en: 'Fox Nuts (Makhana)' },
  'ताज़ा': { hi: 'ताज़ा', en: 'Fresh' },
  'fresh': { hi: 'ताज़ा', en: 'Fresh' },
  'जैविक': { hi: 'जैविक', en: 'Organic' },
  'organic': { hi: 'जैविक', en: 'Organic' },
  'देसी': { hi: 'देसी', en: 'Desi' },
  'desi': { hi: 'देसी', en: 'Desi' },
  'हाइब्रिड': { hi: 'हाइब्रिड', en: 'Hybrid' },
  'hybrid': { hi: 'हाइब्रिड', en: 'Hybrid' },
};

export function getLocalizedCropName(name: string, lang: Language): string {
  if (!name) return name;
  const trimmed = name.trim();

  // 1. Direct exact match in dictionary
  if (cropTranslations[trimmed]) {
    return cropTranslations[trimmed][lang];
  }

  // 2. Case-insensitive exact match
  const lower = trimmed.toLowerCase();
  for (const key of Object.keys(cropTranslations)) {
    if (key.toLowerCase() === lower) {
      return cropTranslations[key][lang];
    }
  }

  // 3. Substring match for multi-word crop names (e.g., "नासिक मक्का", "ताज़ा मक्का")
  for (const [key, val] of Object.entries(cropTranslations)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      if (lang === 'en' && /[\u0900-\u097F]/.test(trimmed)) {
        // If text is in Hindi Devanagari script and target language is English
        return val.en;
      }
      if (lang === 'hi' && !/[\u0900-\u097F]/.test(trimmed)) {
        // If text is in English script and target language is Hindi
        return val.hi;
      }
    }
  }

  // 4. Token-by-token AI translation / Transliteration
  const words = trimmed.split(/\s+/);
  let hasTranslatedToken = false;
  const translatedTokens = words.map((w) => {
    const cleanWord = w.replace(/[^a-zA-Z\u0900-\u097F]/g, '').toLowerCase();
    if (tokenMap[cleanWord]) {
      hasTranslatedToken = true;
      return tokenMap[cleanWord][lang];
    }
    return w;
  });

  if (hasTranslatedToken) {
    return translatedTokens.join(' ');
  }

  // 5. Automatic AI Fallback Cleaner for bracketed names e.g. "ताज़ा हाइब्रिड टमाटर (Fresh Tomatoes)"
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
  if (!loc) return loc;
  if (locationTranslations[loc]) {
    return locationTranslations[loc][lang];
  }
  return loc;
}

export function getLocalizedFarmer(farmer: string, lang: Language): string {
  if (!farmer) return farmer;
  if (farmerTranslations[farmer]) {
    return farmerTranslations[farmer][lang];
  }
  return farmer;
}

export function getLocalizedCategory(cat: string, lang: Language): string {
  if (!cat) return cat;
  if (categoryTranslations[cat]) {
    return categoryTranslations[cat][lang];
  }
  return cat;
}

export function getLocalizedGrade(grade: string, lang: Language): string {
  if (!grade) return grade;
  if (gradeTranslations[grade]) {
    return gradeTranslations[grade][lang];
  }
  return grade;
}

