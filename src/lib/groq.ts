import Groq from 'groq-sdk';

const groqApiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || '';

let groqInstance: Groq | null = null;

export function getGroqClient(): Groq | null {
  if (!groqApiKey) {
    return null;
  }
  if (!groqInstance) {
    groqInstance = new Groq({ apiKey: groqApiKey });
  }
  return groqInstance;
}

export interface VoiceActionResult {
  action:
    | 'NAVIGATE'
    | 'SEARCH_CROP'
    | 'OPEN_CART'
    | 'CLOSE_CART'
    | 'CHECKOUT'
    | 'CHANGE_LANGUAGE'
    | 'CHANGE_THEME'
    | 'SCROLL'
    | 'CLICK_BUTTON'
    | 'ANSWER'
    | 'UNKNOWN';
  target?: string;
  parameter?: string;
  speechResponse: string;
  confidence: number;
  engineUsed: string;
}

const SYSTEM_INSTRUCTION = `You are KisanBandhan Autonomous Voice Agent for an Indian Agritech Platform.
The user speaks to you in Hindi, English, or mixed Hinglish.
Your job is to parse their voice command and decide the exact autonomous action to execute on the website.

Available Portals & Targets:
- /farmer (Kisaan portal, sell produce, list crops, check MSP)
- /buyer (Buyer marketplace, purchase bulk crops, see mandi rates)
- /fpo (FPO lot pooling, collective bidding)
- /hub (Quality inspection hub, optical scan grading)
- /transporter (Cold chain logistics, fleet tracking, delivery OTP)
- /admin (Government MSP surveillance, APMC stats)
- / (Home marketplace)

Actions to output in JSON:
1. "NAVIGATE": Set target to portal path (e.g. "/buyer", "/farmer", "/transporter", "/hub", "/fpo", "/admin", "/").
2. "SEARCH_CROP": Set parameter to the crop name in English (e.g. "Tomato", "Potato", "Onion", "Wheat", "Rice", "Chili", etc.).
3. "OPEN_CART": To open shopping cart drawer.
4. "CLOSE_CART": To close shopping cart drawer.
5. "CHECKOUT": To trigger order placement / checkout.
6. "CHANGE_LANGUAGE": Set parameter to language code ("hi", "en", "pa", "mr", "bn", "gu", "ta", "te").
7. "CHANGE_THEME": Set parameter to "dark" or "light".
8. "SCROLL": Set parameter to "up" or "down".
9. "CLICK_BUTTON": Set parameter to the button text to click.
10. "ANSWER": For general questions or mandi price queries.

Rules:
- Output strictly valid JSON with this structure:
{
  "action": string,
  "target": string (optional),
  "parameter": string (optional),
  "speechResponse": string (A warm, natural 1-sentence confirmation spoken to the user in Hindi/Hinglish),
  "confidence": number (between 0.8 and 1.0)
}`;

/**
 * Parses user voice text using Groq's high-speed LPU (Llama 3.3 / Llama 3.1)
 */
export async function parseVoiceCommandWithGroq(
  text: string,
  currentRoute: string = '/'
): Promise<VoiceActionResult> {
  const client = getGroqClient();

  // If Groq API key is configured, use Groq LPU
  if (client) {
    const candidateModels = [
      'groq/compound-mini',
      'qwen/qwen3.8-27b',
      'groq/compound',
      'openai/gpt-oss-20b',
    ];

    for (const modelName of candidateModels) {
      try {
        const response = await client.chat.completions.create({
          model: modelName,
          messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            {
              role: 'user',
              content: `User Voice Command: "${text}"\nCurrent Page: ${currentRoute}\nReturn JSON:`,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1,
          max_tokens: 300,
        });

        const content = response.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return {
            action: parsed.action || 'UNKNOWN',
            target: parsed.target,
            parameter: parsed.parameter,
            speechResponse: parsed.speechResponse || 'Samajh gaya!',
            confidence: parsed.confidence || 0.98,
            engineUsed: `Groq LPU (${modelName})`,
          };
        }
      } catch (err: any) {
        console.warn(`Groq attempt with ${modelName} notice:`, err?.message || err);
      }
    }
  }

  // Robust Native Fallback Engine (Runs even without Groq API key)
  const lower = text.toLowerCase();

  // Navigation
  if (lower.includes('farmer') || lower.includes('kisaan') || lower.includes('kisan') || lower.includes('khet')) {
    return {
      action: 'NAVIGATE',
      target: '/farmer',
      speechResponse: 'Kisaan portal par le jaa rahe hain!',
      confidence: 0.98,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('buyer') || lower.includes('kharidaar') || lower.includes('mandi') || lower.includes('market') || lower.includes('bazaar')) {
    return {
      action: 'NAVIGATE',
      target: '/buyer',
      speechResponse: 'Kharidaar marketplace khol rahe hain!',
      confidence: 0.98,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('fpo') || lower.includes('group') || lower.includes('samuh') || lower.includes('lot')) {
    return {
      action: 'NAVIGATE',
      target: '/fpo',
      speechResponse: 'FPO Aggregator portal khol rahe hain!',
      confidence: 0.98,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('hub') || lower.includes('quality') || lower.includes('check') || lower.includes('grading') || lower.includes('godaam')) {
    return {
      action: 'NAVIGATE',
      target: '/hub',
      speechResponse: 'Hub Quality Inspection portal khol rahe hain!',
      confidence: 0.98,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('transporter') || lower.includes('truck') || lower.includes('gaadi') || lower.includes('logistics') || lower.includes('fleet')) {
    return {
      action: 'NAVIGATE',
      target: '/transporter',
      speechResponse: 'Transporter cold-chain tracking khol rahe hain!',
      confidence: 0.98,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('admin') || lower.includes('sarkar') || lower.includes('msp') || lower.includes('surveillance')) {
    return {
      action: 'NAVIGATE',
      target: '/admin',
      speechResponse: 'Government MSP surveillance khol rahe hain!',
      confidence: 0.98,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('home') || lower.includes('shuru') || lower.includes('main page')) {
    return {
      action: 'NAVIGATE',
      target: '/',
      speechResponse: 'Home page par chal rahe hain!',
      confidence: 0.98,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }

  // Cart
  if (lower.includes('cart kholo') || lower.includes('open cart') || lower.includes('tokri dikhao')) {
    return {
      action: 'OPEN_CART',
      speechResponse: 'Aapka cart khol diya gaya hai!',
      confidence: 0.99,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('cart band') || lower.includes('close cart')) {
    return {
      action: 'CLOSE_CART',
      speechResponse: 'Cart band kar diya gaya hai.',
      confidence: 0.99,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('checkout') || lower.includes('order book') || lower.includes('buy now')) {
    return {
      action: 'CHECKOUT',
      speechResponse: 'Checkout process start kar rahe hain!',
      confidence: 0.95,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }

  // Search
  if (lower.includes('search') || lower.includes('dhoondho') || lower.includes('khojo') || lower.includes('dikhao')) {
    const crop = text.replace(/(search|dhoondho|khojo|dikhao|karo|bhai|chahiye|crop|produce)/gi, '').trim();
    return {
      action: 'SEARCH_CROP',
      parameter: crop || 'Tomato',
      speechResponse: `${crop || 'Produce'} search kar diya gaya hai!`,
      confidence: 0.92,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }

  // Theme
  if (lower.includes('dark mode') || lower.includes('raat')) {
    return {
      action: 'CHANGE_THEME',
      parameter: 'dark',
      speechResponse: 'Dark mode on kar diya gaya hai.',
      confidence: 0.95,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('light mode') || lower.includes('din')) {
    return {
      action: 'CHANGE_THEME',
      parameter: 'light',
      speechResponse: 'Light mode on kar diya gaya hai.',
      confidence: 0.95,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }

  // Language
  if (lower.includes('hindi') || lower.includes('hindi me')) {
    return {
      action: 'CHANGE_LANGUAGE',
      parameter: 'hi',
      speechResponse: 'Bhasha Hindi kar di gayi hai.',
      confidence: 0.95,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }
  if (lower.includes('english') || lower.includes('angrezi')) {
    return {
      action: 'CHANGE_LANGUAGE',
      parameter: 'en',
      speechResponse: 'Language has been set to English.',
      confidence: 0.95,
      engineUsed: 'Kisan Native Intent Engine',
    };
  }

  // Fallback
  return {
    action: 'ANSWER',
    speechResponse: `Main samajh gaya: "${text}". Aap bol sakte hain: "Buyer portal jao", "Tomato search karo", ya "Cart kholo".`,
    confidence: 0.85,
    engineUsed: 'Kisan Native Intent Engine',
  };
}
