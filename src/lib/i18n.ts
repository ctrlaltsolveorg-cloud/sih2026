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
