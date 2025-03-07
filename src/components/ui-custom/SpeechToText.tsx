
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader, AudioWaveform, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import GlassCard from './GlassCard';

interface SpeechToTextProps {
  onTranscript: (text: string) => void;
  language: string;
  className?: string;
}

const SpeechToText = ({ onTranscript, language, className }: SpeechToTextProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Speech recognition setup and cleanup
  useEffect(() => {
    // Initialize Web Speech API with language preference
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser");
      return;
    }
    
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    // Map our language codes to BCP 47 language tags that the Web Speech API expects
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
        // Don't show error for no speech, it's common
        return;
      }
      toast.error(`Error: ${event.error}`);
      stopListening();
    };
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [language]);
  
  // Setup audio visualization
  useEffect(() => {
    if (!isListening) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      return;
    }
    
    const setupAudioContext = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        
        // Fix: Create AudioContext properly
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const updateAudioLevel = () => {
          if (!analyserRef.current || !isListening) return;
          
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
          setAudioLevel(average / 128); // Normalize to 0-1
          
          if (isListening) {
            requestAnimationFrame(updateAudioLevel);
          }
        };
        
        updateAudioLevel();
      } catch (error) {
        console.error('Error accessing microphone:', error);
        toast.error('Could not access microphone');
        stopListening();
      }
    };
    
    setupAudioContext();
  }, [isListening]);
  
  const startListening = async () => {
    try {
      setIsListening(true);
      recognitionRef.current?.start();
      
      // Simulate AI processing after a brief delay
      setTimeout(() => {
        setIsProcessing(true);
        // Simulate processing completion
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
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  return (
    <div className={cn("relative space-y-3", className)}>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleListening}
          className={cn(
            "relative flex items-center justify-center h-12 w-12 rounded-full transition-all duration-300 shadow-sm",
            isListening 
              ? "bg-primary text-white shadow-md" 
              : "bg-secondary hover:bg-secondary/80"
          )}
          aria-label={isListening ? "Stop recording" : "Start recording"}
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
          
          {/* Audio visualization rings */}
          {isListening && audioLevel > 0.1 && (
            <>
              <span 
                className="absolute inset-0 rounded-full bg-primary/30 animate-ping" 
                style={{ 
                  animationDuration: '1.5s',
                  transform: `scale(${1 + audioLevel * 0.3})`,
                  opacity: 0.3 * audioLevel
                }}
              ></span>
              <span 
                className="absolute inset-0 rounded-full bg-primary/20" 
                style={{ 
                  transform: `scale(${1 + audioLevel * 0.5})`,
                  opacity: 0.2 * audioLevel
                }}
              ></span>
            </>
          )}
        </button>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">
              {isListening ? "Recording..." : "Click to record"}
            </span>
            {isListening && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Languages className="h-3 w-3" />
            <span className="capitalize">{language}</span>
          </div>
        </div>
      </div>
      
      {/* Transcript area with AI processing visualization */}
      {(isListening || transcript) && (
        <GlassCard 
          level="subtle" 
          className={cn(
            "p-3 transition-all duration-300 min-h-20",
            isProcessing && "border-primary/30"
          )}
        >
          {isProcessing && (
            <div className="flex justify-center items-center mb-2">
              <div className="relative">
                <Loader className="h-5 w-5 text-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                </div>
              </div>
              <span className="ml-2 text-sm text-primary font-medium">Processing speech...</span>
            </div>
          )}
          
          {isListening && !transcript && !isProcessing && (
            <div className="flex items-center justify-center h-10 gap-3">
              <AudioWaveform className="h-5 w-5 text-muted-foreground animate-pulse" />
              <span className="text-sm text-muted-foreground">Waiting for speech...</span>
            </div>
          )}
          
          {transcript && (
            <div className="text-sm leading-relaxed break-words">
              {transcript}
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
};

export default SpeechToText;
