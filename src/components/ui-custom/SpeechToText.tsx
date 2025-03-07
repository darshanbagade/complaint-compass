
import React from 'react';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useAudioVisualization } from '@/hooks/useAudioVisualization';
import MicrophoneButton from './MicrophoneButton';
import TranscriptDisplay from './TranscriptDisplay';

interface SpeechToTextProps {
  onTranscript: (text: string) => void;
  language: string;
  className?: string;
}

const SpeechToText = ({ onTranscript, language, className }: SpeechToTextProps) => {
  const {
    isListening,
    isProcessing,
    transcript,
    startListening,
    stopListening
  } = useSpeechRecognition({ language, onTranscript });

  const { audioLevel } = useAudioVisualization(isListening);

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
        <MicrophoneButton
          isListening={isListening}
          audioLevel={audioLevel}
          onClick={toggleListening}
        />
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">
              {isListening ? "Recording..." : "Click to record"}
            </span>
            {isListening && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Languages className="h-3 w-3" />
            <span className="capitalize">{language}</span>
          </div>
        </div>
      </div>

      <TranscriptDisplay
        isListening={isListening}
        isProcessing={isProcessing}
        transcript={transcript}
      />
    </div>
  );
};

export default SpeechToText;
