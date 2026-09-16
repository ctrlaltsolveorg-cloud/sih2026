/**
 * Meta WhatsApp Cloud API & Omnichannel Bot Client for KisanBandhan AI
 * SIH 2026 PS 26033 - Agricultural Disintermediation & IVR WhatsApp Assistant
 */

interface WhatsAppSendResult {
  success: boolean;
  messageId?: string;
  recipient?: string;
  isSimulated?: boolean;
  error?: string;
  previewMessage?: string;
}

const META_API_VERSION = 'v20.0';
const WHATSAPP_TOKEN = process.env.META_WHATSAPP_TOKEN || process.env.WHATSAPP_TOKEN || '';
const PHONE_NUMBER_ID = process.env.META_WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_NUMBER_ID || '';
export const META_VERIFY_TOKEN = process.env.META_WHATSAPP_VERIFY_TOKEN || 'kisanbandhan_meta_verify_token_2026';

/**
 * Format Indian phone numbers into international E.164 (e.g. 9823045678 -> 919823045678)
 */
export function formatToWhatsAppPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) return `91${cleaned}`;
  if (cleaned.length === 12 && cleaned.startsWith('91')) return cleaned;
  return cleaned.length > 10 ? cleaned : `91${cleaned}`;
}

/**
 * Send raw text message via Meta WhatsApp Cloud API
 */
export async function sendWhatsAppTextMessage(toPhone: string, textBody: string): Promise<WhatsAppSendResult> {
  const cleanPhone = formatToWhatsAppPhone(toPhone);

  // If live Meta credentials are present in env, dispatch live request to Meta Graph API
  if (WHATSAPP_TOKEN && PHONE_NUMBER_ID) {
    try {
      const response = await fetch(`https://graph.facebook.com/${META_API_VERSION}/${PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: cleanPhone,
          type: 'text',
          text: { preview_url: true, body: textBody },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn('Meta WhatsApp API Error:', data);
        return {
          success: false,
          error: data.error?.message || 'Failed to send WhatsApp message via Meta Cloud API',
          recipient: cleanPhone,
          previewMessage: textBody,
        };
      }

      return {
        success: true,
        messageId: data.messages?.[0]?.id || `wamid_${Date.now()}`,
        recipient: cleanPhone,
        isSimulated: false,
        previewMessage: textBody,
      };
    } catch (err: any) {
      console.error('Network error calling Meta WhatsApp API:', err);
    }
  }

  // Graceful Simulated Delivery (for Localhost development & hackathon demo without paid Meta account)
  return {
    success: true,
    messageId: `wamid_sim_${Date.now()}`,
    recipient: cleanPhone,
    isSimulated: true,
    previewMessage: textBody,
  };
}

/**
 * Send Formatted WhatsApp Order Status & Escrow Delivery Slip
 */
export async function sendWhatsAppOrderSlip(toPhone: string, order: {
  order_id: string;
  customer_name: string;
  product: string;
  quantity: string;
  status: string;
  delivery_otp?: string;
  total_amount?: string;
  farmer_name?: string;
  delivery_address?: string;
}): Promise<WhatsAppSendResult> {
  const message = [
    `🌾 *किसानबंधन (KissanBandhan)* • ऑर्डर स्थिति 🌾`,
    ``,
    `नमस्ते *${order.customer_name}* जी!`,
    `आपके ऑर्डर का ताज़ा विवरण नीचे दिया गया है:`,
    ``,
    `📋 *ऑर्डर ID:* \`${order.order_id}\``,
    `📦 *फसल / उत्पाद:* ${order.product}`,
    `⚖️ *मात्रा:* ${order.quantity}`,
    `🚚 *स्थिति (Status):* *${order.status}*`,
    order.delivery_otp ? `🔑 *डिलीवरी OTP:* \`${order.delivery_otp}\` *(कृपया माल मिलने पर ही दें)*` : '',
    order.total_amount ? `💰 *कुल राशि:* ${order.total_amount}` : '',
    order.farmer_name ? `🚜 *किसान:* ${order.farmer_name}` : '',
    order.delivery_address ? `📍 *डिलीवरी पता:* ${order.delivery_address}` : '',
    ``,
    `🔒 *एस्क्रौ सुरक्षा:* आपका भुगतान सुरक्षित बैंकिंग एस्क्रौ में सुरक्षित है।`,
    `📞 *सहायता हेल्पलाइन:* 1800-KISAN-AI (Toll-Free)`,
  ].filter(Boolean).join('\n');

  return sendWhatsAppTextMessage(toPhone, message);
}

/**
 * Send Formatted WhatsApp Crop Listing Confirmation to Farmer
 */
export async function sendWhatsAppFarmerListingSlip(farmerPhone: string, crop: {
  cropName: string;
  quantityKg: number;
  pricePerKg: number;
  mandiRate: number;
  grade: string;
}): Promise<WhatsAppSendResult> {
  const message = [
    `🚜 *किसानबंधन • फसल लिस्टिंग पुष्टि* 🚜`,
    ``,
    `बधाई हो किसान भाई! आपकी फसल डिजिटल बाज़ार में सफलतापूर्वक लिस्ट हो गई है:`,
    ``,
    `🌾 *फसल:* ${crop.cropName}`,
    `⚖️ *मात्रा:* ${crop.quantityKg} kg`,
    `💰 *आपका तय भाव:* ₹${crop.pricePerKg}/kg`,
    `📈 *मंडी औसत भाव:* ₹${crop.mandiRate}/kg`,
    `⭐ *गुणवत्ता ग्रेड:* ${crop.grade}`,
    ``,
    `✅ 0% बिचौलिया कटौती • सीधा खरीदार को प्रेषण।`,
    `जैसे ही कोई थोक खरीदार ऑर्डर करेगा, आपको SMS और WhatsApp पर सूचित किया जाएगा।`,
    ``,
    `📞 24/7 हेल्पलाइन: 1800-KISAN-AI`,
  ].join('\n');

  return sendWhatsAppTextMessage(farmerPhone, message);
}
