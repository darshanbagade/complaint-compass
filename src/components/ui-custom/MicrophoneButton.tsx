
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicrophoneButtonProps {
  isListening: boolean;
  audioLevel: number;
  onClick: () => void;
  className?: string;
}

const MicrophoneButton = ({ isListening, audioLevel, onClick, className }: MicrophoneButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center h-12 w-12 rounded-full transition-all duration-300 shadow-sm",
        isListening 
          ? "bg-primary text-white shadow-md" 
          : "bg-secondary hover:bg-secondary/80",
        className
      )}
      aria-label={isListening ? "Stop recording" : "Start recording"}
    >
      {isListening ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
      
      {isListening && audioLevel > 0.1 && (
        <>
          <span 
            className="absolute inset-0 rounded-full bg-primary/30 animate-ping" 
            style={{ 
              animationDuration: '1.5s',
              transform: `scale(${1 + audioLevel * 0.3})`,
              opacity: 0.3 * audioLevel
            }}
          />
          <span 
            className="absolute inset-0 rounded-full bg-primary/20" 
            style={{ 
              transform: `scale(${1 + audioLevel * 0.5})`,
              opacity: 0.2 * audioLevel
            }}
          />
        </>
      )}
    </button>
  );
};

export default MicrophoneButton;
