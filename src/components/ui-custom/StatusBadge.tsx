
import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';

type StatusType = 'pending' | 'inProgress' | 'resolved' | 'escalated';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
  size = 'md',
}) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          icon: Clock,
          animation: 'animate-pulse-soft',
        };
      case 'inProgress':
        return {
          label: 'In Progress',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          icon: RefreshCw,
          animation: 'animate-spin',
          animationDuration: 'duration-[3s]',
        };
      case 'resolved':
        return {
          label: 'Resolved',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          icon: CheckCircle2,
          animation: '',
        };
      case 'escalated':
        return {
          label: 'Escalated',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: AlertTriangle,
          animation: 'animate-pulse',
        };
      default:
        return {
          label: 'Unknown',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          icon: Clock,
          animation: '',
        };
    }
  };

  const { label, bgColor, textColor, borderColor, icon: Icon, animation, animationDuration } = getStatusConfig(status);

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        bgColor,
        textColor,
        borderColor,
        sizeStyles[size],
        className
      )}
    >
      {showIcon && (
        <Icon 
          className={cn(
            iconSizes[size], 
            animation,
            animationDuration
          )} 
        />
      )}
      {label}
    </span>
  );
};

export default StatusBadge;
