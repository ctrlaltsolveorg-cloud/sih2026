import { NextResponse } from 'next/server';
import { parseVoiceCommandWithGroq, getGroqClient } from '@/lib/groq';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Case 1: Audio file upload (Direct Mic Recording to Groq Whisper)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const audioFile = formData.get('audio') as File | null;
      const currentRoute = (formData.get('currentRoute') as string) || '/';

      if (!audioFile) {
        return NextResponse.json({ success: false, message: 'No audio file provided' }, { status: 400 });
      }

      const groq = getGroqClient();
      let transcribedText = '';

      if (groq) {
        try {
          const transcription = await groq.audio.transcriptions.create({
            file: audioFile,
            model: 'whisper-large-v3-turbo',
            response_format: 'text',
          });
          transcribedText = typeof transcription === 'string' ? transcription : (transcription as any).text || '';
        } catch (whisperErr: any) {
          console.warn('Groq Whisper transcription notice:', whisperErr?.message || whisperErr);
        }
      }

      if (!transcribedText) {
        return NextResponse.json({
          success: false,
          message: 'Could not transcribe audio. Please ensure GROQ_API_KEY is configured.',
        });
      }

      // Now pass transcribed text to Groq Llama 3.3 function caller
      const actionResult = await parseVoiceCommandWithGroq(transcribedText, currentRoute);

      return NextResponse.json({
        success: true,
        transcribedText,
        ...actionResult,
      });
    }

    // Case 2: JSON payload with speech text
    const { speechText, currentRoute = '/' } = await request.json();

    if (!speechText || typeof speechText !== 'string' || !speechText.trim()) {
      return NextResponse.json({ success: false, message: 'speechText is required' }, { status: 400 });
    }

    const actionResult = await parseVoiceCommandWithGroq(speechText.trim(), currentRoute);

    return NextResponse.json({
      success: true,
      transcribedText: speechText.trim(),
      ...actionResult,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
