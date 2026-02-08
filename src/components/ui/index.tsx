import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <div 
      className={`glass-card p-6 animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '' }) => {
  return (
    <h2 className={`section-title ${className}`}>
      {children}
    </h2>
  );
};

interface TagProps {
  children: React.ReactNode;
  tooltip?: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, tooltip, className = '' }) => {
  return (
    <span 
      className={`tag ${className}`}
      title={tooltip}
    >
      {children}
    </span>
  );
};

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export const Textarea: React.FC<InputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '',
  rows = 6
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full glass-card p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none ${className}`}
    />
  );
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder,
  className = '' 
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`glass-card px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({ 
  value, 
  onChange, 
  min = 0,
  max = 100,
  step = 1,
  label,
  className = '' 
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm text-gray-300 mb-2">
          {label}: <span className="text-accent-blue">{value}</span>
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-dark-card rounded-lg appearance-none cursor-pointer accent-accent-blue"
      />
    </div>
  );
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className={`glass-card ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:bg-opacity-80 transition-all"
      >
        <span className="font-semibold text-lg">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

interface LoadingStepProps {
  text: string;
  completed: boolean;
  delay?: number;
}

export const LoadingStep: React.FC<LoadingStepProps> = ({ text, completed, delay = 0 }) => {
  return (
    <div 
      className="flex items-center space-x-3 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {completed ? (
        <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      )}
      <span className={completed ? 'text-gray-300' : 'text-white font-medium'}>{text}</span>
    </div>
  );
};
