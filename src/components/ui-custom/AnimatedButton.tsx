
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'subtle' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  to,
  onClick,
  variant = 'default',
  size = 'md',
  icon = true,
  className,
}) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-primary/20 bg-transparent text-primary hover:bg-primary/5',
    subtle: 'bg-primary/10 text-primary hover:bg-primary/20',
    ghost: 'bg-transparent text-primary hover:bg-primary/5',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5 rounded-lg',
    md: 'px-4 py-2 rounded-lg',
    lg: 'text-lg px-6 py-3 rounded-xl',
  };

  const buttonClasses = cn(
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden group',
    variants[variant],
    sizes[size],
    className
  );

  const iconClasses = "transition-transform duration-300 group-hover:translate-x-1";

  const ButtonContent = () => (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <ArrowRight className={cn("ml-2 h-4 w-4", iconClasses)} />}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        <ButtonContent />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      <ButtonContent />
    </button>
  );
};

export default AnimatedButton;
