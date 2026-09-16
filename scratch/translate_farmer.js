const fs = require('fs');
const path = require('path');

const targetPath = path.resolve('c:/Users/khush/Desktop/kisan/src/app/farmer/page.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

content = content.replace("setVariety(crop.variety || 'देसी / स्थानीय फसल (Local Harvest)');", "setVariety(crop.variety || 'Local Harvest');");
content = content.replace("setGrade(crop.grade || 'उच्चतम श्रेणी A+');", "setGrade(crop.grade || 'Grade A+');");
content = content.replace("alert(language === 'hi' ? 'अधिकतम 6 तस्वीरें ही जोड़ी जा सकती हैं' : 'Maximum 6 photos allowed');", "alert('Maximum 6 photos allowed');");
content = content.replace("? 'यह पोर्टल केवल पंजीकृत किसानों के लिए सुरक्षित है जहाँ वे अपनी फसलों को 2 से 6 तस्वीरों के साथ पंजीकृत करके सीधे खरीदारों तक पहुँचा सकते हैं।'", "? 'This portal is restricted to registered Farmers to list fresh produce with 2-6 photos and sell directly to buyers.'");
content = content.replace("? 'फसल जोड़ें (2 से 6 तस्वीरें अनिवार्य) और सीधे खरीदार पोर्टल (Buyer Desk) तक पहुँचाएं'", "? 'List fresh produce (2-6 photos mandatory) and sell directly to buyers.'");
content = content.replace("{/* Sub-Mode Operation Switcher: [➕ 1. नया जोड़ें] or [✏️ 2. अपडेट / संपादित करें] */}", "{/* Sub-Mode Operation Switcher: [➕ 1. Add New] or [✏️ 2. Update / Edit] */}");
content = content.replace(/\{language === 'hi' \? 'रद्द करें' : 'Cancel'\}/g, "'Cancel'");
content = content.replace("? (language === 'hi' ? 'अपडेट हो रहा है...' : 'Updating...')\n              : (language === 'hi' ? 'दर्ज हो रहा है...' : 'Publishing to Buyer...')}", "? 'Updating...'\n              : 'Publishing to Buyer...'}\n");
content = content.replace("{myListings.length} {language === 'hi' ? 'सक्रिय फसलें' : 'Active Crops'}", "{myListings.length} Active Crops");
content = content.replace("{language === 'hi' ? 'Bulma कार्ड्स' : 'Bulma Cards'}", "'Bulma Cards'");
content = content.replace("{language === 'hi' ? 'तालिका' : 'Table'}", "'Table'");
content = content.replace("{language === 'hi' ? 'अभी आपकी कोई फसल पंजीकृत नहीं है' : 'No produce registered yet'}", "'No produce registered yet'");
content = content.replace("? 'ऊपर दिए गए प्रविष्टि अनुभाग से अपनी फसल 2 से 6 तस्वीरों के साथ दर्ज करें।'", "? 'Register your produce with 2 to 6 photos from the produce entry section above.'");
content = content.replace("title={language === 'hi' ? 'फसल विवरण व फोटो अपडेट करें' : 'Edit / Update Crop'}", "title=\"Edit / Update Crop\"");
content = content.replace(/\{language === 'hi' \? 'श्रेणी \(Category\)' : 'Category'\}/g, "'Category'");
content = content.replace(/<option value="Vegetables">\{language === 'hi' \? 'सब्जियाँ \(Vegetables\)' : 'Vegetables'\}<\/option>/g, "<option value=\"Vegetables\">Vegetables</option>");
content = content.replace(/<option value="Fruits">\{language === 'hi' \? 'फल \(Fruits\)' : 'Fruits'\}<\/option>/g, "<option value=\"Fruits\">Fruits</option>");
content = content.replace(/<option value="Pulses">\{language === 'hi' \? 'दालें \/ दलहन \(Pulses\)' : 'Pulses'\}<\/option>/g, "<option value=\"Pulses\">Pulses</option>");
content = content.replace(/<option value="Grains">\{language === 'hi' \? 'अनाज \(Grains\)' : 'Grains'\}<\/option>/g, "<option value=\"Grains\">Grains</option>");
content = content.replace(/\{language === 'hi' \? 'फसल नाम' : 'Crop Name'\}/g, "'Crop Name'");
content = content.replace(/\{language === 'hi' \? 'गुणवत्ता ग्रेड \(Grade\)' : 'Quality Grade'\}/g, "'Quality Grade'");
content = content.replace(/<option value="उच्चतम श्रेणी A\+">उच्चतम श्रेणी A\+ \(Premium\)<\/option>/g, "<option value=\"Grade A+\">Grade A+ (Premium)</option>");
content = content.replace(/<option value="ग्रेड A">ग्रेड A \(Standard Market\)<\/option>/g, "<option value=\"Grade A\">Grade A (Standard Market)</option>");
content = content.replace(/<option value="ग्रेड B">ग्रेड B \(Bulk Commercial\)<\/option>/g, "<option value=\"Grade B\">Grade B (Bulk Commercial)</option>");
content = content.replace(/<option value="100% जैविक \(Organic Certified\)">100% जैविक \(Organic Certified\)<\/option>/g, "<option value=\"100% Organic Certified\">100% Organic Certified</option>");
content = content.replace("<span>{language === 'hi' ? 'यह फसल 100% प्राकृतिक/जैविक प्रमाणित है' : '100% Certified Organic produce'}</span>", "<span>100% Certified Organic produce</span>");
content = content.replace("? (language === 'hi' ? 'अपडेट हो रहा है...' : 'Updating...')\n                  : (language === 'hi' ? 'दर्ज हो रहा है...' : 'Publishing to Buyer...')}", "? 'Updating...'\n                  : 'Publishing to Buyer...'}\n");
content = content.replace("? `फसल अपडेट करें (${photos.length} फोटो) → खरीदार डेस्क पर अपडेट करें`", "? `Update Crop (${photos.length} photos) → Publish to Buyer Desk`");
content = content.replace("? `फसल दर्ज करें (${photos.length} फोटो) → खरीदार डेस्क भेजें`", "? `Register Crop (${photos.length} photos) → Send to Buyer Desk`");

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Final cleanups applied to farmer page!');
