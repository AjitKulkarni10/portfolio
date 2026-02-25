import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const WindowFrame: React.FC<Props> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border-[4px] border-black rounded p-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] ${
        onClick 
          ? 'cursor-pointer hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.8)] active:translate-y-[4px] active:shadow-none transition-all' 
          : ''
      } ${className}`}
    >
      <div className="border-[2px] border-black p-3 h-full bg-white relative">
        {children}
      </div>
    </div>
  );
};
