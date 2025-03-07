
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  level?: 'subtle' | 'medium' | 'heavy';
}

const GlassCard = ({
  children,
  className,
  hoverEffect = false,
  level = 'medium',
  ...props
}: GlassCardProps) => {
  const levelStyles = {
    subtle: 'bg-white/40 dark:bg-slate-800/40 backdrop-blur-xs border-white/10 dark:border-slate-700/30',
    medium: 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/40',
    heavy: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-white/30 dark:border-slate-700/50',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border shadow-sm transition-all duration-300',
        levelStyles[level],
        hoverEffect && 'hover:shadow-md hover:translate-y-[-2px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
