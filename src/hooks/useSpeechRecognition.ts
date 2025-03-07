
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface UseSpeechRecognitionProps {
  language: string;
  onTranscript: (text: string) => void;
}

export const useSpeechRecognition = ({ language, onTranscript }: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser");
      return;
    }
    
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    const languageMap: Record<string, string> = {
      english: 'en-US',
      hindi: 'hi-IN',
      spanish: 'es-ES',
      french: 'fr-FR',
      german: 'de-DE',
      chinese: 'zh-CN',
      arabic: 'ar-SA',
    };
    
    recognitionRef.current.lang = languageMap[language] || 'en-US';
    
    recognitionRef.current.onresult = (event: any) => {
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      setTranscript(currentTranscript);
      onTranscript(currentTranscript);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'no-speech') {
        return;
      }
      toast.error(`Error: ${event.error}`);
      stopListening();
    };
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, onTranscript]);

  const startListening = async () => {
    try {
      setIsListening(true);
      recognitionRef.current?.start();
      
      setTimeout(() => {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
        }, 1500);
      }, 500);
      
    } catch (error) {
      console.error('Failed to start listening:', error);
      toast.error('Failed to start speech recognition');
      setIsListening(false);
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsProcessing(false);
  };

  return {
    isListening,
    isProcessing,
    transcript,
    startListening,
    stopListening
  };
};
