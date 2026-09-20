'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
      isFinal?: boolean;
    };
    length: number;
  };
}

/**
 * HolographicWaveRing:
 * Compact, ultra-clean HTML5 Canvas circular harmonic soundwave visualizer
 * matching the user's reference photo:
 * - Electric indigo, vivid violet, neon purple, cyan, and white harmonic ribbons
 * - Real-time audio reactivity via Web Audio API AnalyserNode (60/120 FPS)
 * - Sits exactly at button size (64px) without bulking or covering content
 * - Pure transparency (no mic logo, no inner circles, no texts, no popups)
 */
function HolographicWaveRing({
  isListening,
  isProcessing,
  isSpeaking,
  analyserRef,
  size = 64,
}: {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
  size: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let smoothedVol = 0;

    const render = () => {
      // Rotation & oscillation speed
      t += isProcessing ? 0.08 : isListening ? 0.038 : 0.02;

      // Real-time audio volume extraction from AnalyserNode
      let currentVol = 0;
      if (analyserRef.current && isListening) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        currentVol = Math.min(1.5, sum / (bufferLength * 36));
      }

      smoothedVol += (currentVol - smoothedVol) * 0.25;

      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      const width = size;
      const height = size;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseR = size * 0.36; // ~23px radius

      // Dynamic wave amplitude scaled precisely for 64px size
      const dynamicAmp = isListening
        ? 2.4 + smoothedVol * 5.5
        : isProcessing
        ? 4.5
        : isSpeaking
        ? 3.2
        : 1.6;

      // 4 Multi-layer harmonic sine ribbons matching user's reference photo
      const ribbons = [
        {
          color: 'rgba(99, 102, 241, 0.85)', // Electric Indigo
          freq1: 2,
          freq2: 4,
          speed1: 1.2,
          speed2: -1.0,
          amp1: dynamicAmp * 0.95,
          amp2: dynamicAmp * 0.5,
          phase: 0,
          lineWidth: 2.2,
          shadow: '#4f46e5',
          shadowBlur: 10,
        },
        {
          color: 'rgba(168, 85, 247, 0.9)', // Vivid Neon Violet
          freq1: 3,
          freq2: 2,
          speed1: -1.4,
          speed2: 1.1,
          amp1: dynamicAmp * 1.1,
          amp2: dynamicAmp * 0.6,
          phase: Math.PI / 2.5,
          lineWidth: 2.0,
          shadow: '#a855f7',
          shadowBlur: 12,
        },
        {
          color: 'rgba(56, 189, 248, 0.95)', // Electric Sky Blue / Cyan
          freq1: 3,
          freq2: 5,
          speed1: 1.7,
          speed2: -1.3,
          amp1: dynamicAmp * 0.8,
          amp2: dynamicAmp * 0.4,
          phase: Math.PI / 1.4,
          lineWidth: 1.6,
          shadow: '#38bdf8',
          shadowBlur: 9,
        },
        {
          color: 'rgba(255, 255, 255, 0.98)', // White Crest Highlight
          freq1: 2,
          freq2: 3,
          speed1: -1.1,
          speed2: 1.5,
          amp1: dynamicAmp * 0.7,
          amp2: dynamicAmp * 0.3,
          phase: Math.PI * 1.2,
          lineWidth: 1.2,
          shadow: '#ffffff',
          shadowBlur: 8,
        },
      ];

      ctx.globalCompositeOperation = 'screen';

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        const steps = 120;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.strokeStyle = ribbon.color;
        ctx.shadowColor = ribbon.shadow;
        ctx.shadowBlur = ribbon.shadowBlur;

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const wave1 = Math.sin(theta * ribbon.freq1 + t * ribbon.speed1 + ribbon.phase) * ribbon.amp1;
          const wave2 = Math.cos(theta * ribbon.freq2 + t * ribbon.speed2) * ribbon.amp2;
          const r = baseR + wave1 + wave2;

          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [size, isListening, isProcessing, isSpeaking, analyserRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className="pointer-events-none drop-shadow-[0_0_16px_rgba(139,92,246,0.6)]"
    />
  );
}

export default function VoiceAgent() {
  const pathname = usePathname();
  const { setIsCartOpen } = useCart();
  const { setLanguage } = useLanguage();
  const { setTheme } = useTheme();

  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.warn('Voice Agent Recognition event:', event?.error);
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      const cleaned = currentTranscript.trim();

      // Auto-trigger Groq Copilot on 800ms silence
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        if (cleaned) {
          dispatchToGroqCopilot(cleaned);
        }
      }, 800);
    };

    recognitionRef.current = recognition;

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, [pathname]);

  // Text-To-Speech (Speaks confirmation in natural voice)
  const speakText = useCallback((text: string, lang: string = 'hi-IN') => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.05;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.includes('hi') || v.name.toLowerCase().includes('india')
      );
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS error:', e);
    }
  }, []);

  // Dispatch voice command to Groq backend API
  const dispatchToGroqCopilot = async (spokenText: string) => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/v1/ai/voice-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          speechText: spokenText,
          currentRoute: pathname || '/',
        }),
      });

      const data = await res.json();
      if (data.success) {
        executeGroqAction(data);
      } else {
        speakText('Main samajh nahi paya, kripya dobara bolein.');
      }
    } catch (err) {
      console.warn('Groq dispatch notice:', err);
    } finally {
      setIsProcessing(false);
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }
  };

  // Execute the autonomous action returned by Groq LPU
  const executeGroqAction = (actionResult: any) => {
    const { action, target, parameter, speechResponse } = actionResult;

    if (speechResponse) {
      speakText(speechResponse);
    }

    switch (action) {
      case 'NAVIGATE':
        if (target) {
          setTimeout(() => {
            window.location.href = target;
          }, 800);
        }
        break;

      case 'SEARCH_CROP':
        const crop = parameter || 'Tomato';
        const searchInput = document.querySelector(
          'input[type="text"][placeholder*="Search"], input[type="search"], input[id*="search"]'
        ) as HTMLInputElement | null;

        if (searchInput) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          )?.set;
          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(searchInput, crop);
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            searchInput.dispatchEvent(new Event('change', { bubbles: true }));
            searchInput.focus();
          } else {
            searchInput.value = crop;
          }
          setTimeout(() => {
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 800);
        } else {
          setTimeout(() => {
            window.location.href = `/buyer`;
          }, 800);
        }
        break;

      case 'OPEN_CART':
        setIsCartOpen(true);
        break;

      case 'CLOSE_CART':
        setIsCartOpen(false);
        break;

      case 'CHECKOUT':
        setIsCartOpen(true);
        setTimeout(() => {
          const checkoutBtn = document.querySelector(
            'button[id*="checkout"], button[id*="order"]'
          ) as HTMLButtonElement | null;
          if (checkoutBtn) checkoutBtn.click();
        }, 600);
        break;

      case 'CHANGE_LANGUAGE':
        if (parameter) {
          setLanguage(parameter as any);
        }
        break;

      case 'CHANGE_THEME':
        if (parameter === 'dark' || parameter === 'light') {
          setTheme(parameter);
        }
        break;

      case 'SCROLL':
        if (parameter === 'up') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollBy({ top: 600, behavior: 'smooth' });
        }
        break;

      case 'CLICK_BUTTON':
        if (parameter) {
          const label = parameter.toLowerCase();
          const buttons = Array.from(document.querySelectorAll('button, a'));
          const targetBtn = buttons.find((btn) => {
            const content = (btn.textContent || btn.getAttribute('aria-label') || '').toLowerCase();
            return content.includes(label);
          }) as HTMLElement | null;

          if (targetBtn) {
            targetBtn.click();
          }
        }
        break;

      default:
        break;
    }
  };

  // Start listening and initialize Web Audio API Analyser
  const requestMicAndStart = async () => {
    // 1. Initialize real microphone stream & Web Audio API
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyser.smoothingTimeConstant = 0.8;
          source.connect(analyser);
          analyserRef.current = analyser;
        }
      } catch (err) {
        console.warn('Microphone permission request result:', err);
      }
    }

    // 2. Start Speech Recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      setTimeout(() => {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.warn('Recognition start notice:', err);
        }
      }, 50);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('Recognition stop notice:', err);
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* Compact, clean, 64px floating button - exact same position & size as before */}
      <button
        type="button"
        onClick={() => {
          if (isListening) {
            stopListening();
          } else {
            requestMicAndStart();
          }
        }}
        id="kisan-voice-copilot-btn"
        aria-label="Kisan Holographic Voice AI"
        title={isListening ? 'Listening... Tap to stop' : 'Tap to speak'}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-transform duration-200 active:scale-95 bg-transparent border-0 outline-none p-0 cursor-pointer focus:outline-none"
      >
        <HolographicWaveRing
          isListening={isListening}
          isProcessing={isProcessing}
          isSpeaking={isSpeaking}
          analyserRef={analyserRef}
          size={64}
        />
      </button>
    </div>
  );
}
