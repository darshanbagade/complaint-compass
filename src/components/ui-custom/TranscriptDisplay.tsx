
import React from 'react';
import { AudioWaveform, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from './GlassCard';

interface TranscriptDisplayProps {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  className?: string;
}

const TranscriptDisplay = ({ isListening, isProcessing, transcript, className }: TranscriptDisplayProps) => {
  if (!isListening && !transcript) return null;

  return (
    <GlassCard 
      level="subtle" 
      className={cn(
        "p-3 transition-all duration-300 min-h-20",
        isProcessing && "border-primary/30",
        className
      )}
    >
      {isProcessing && (
        <div className="flex justify-center items-center mb-2">
          <div className="relative">
            <Loader className="h-5 w-5 text-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-1.5 w-1.5 bg-primary rounded-full" />
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
  );
};

export default TranscriptDisplay;
