
import React, { useState, useEffect } from 'react';
import { ScreenState, ThemeColor } from '../types';
import { WindowFrame } from '../components/WindowFrame';
import { PORTFOLIO_DATA, THEME_PALETTES } from '../constants';

interface Props {
  onSelect: (s: ScreenState) => void;
  theme: ThemeColor;
  onThemeChange: (t: ThemeColor) => void;
}

const MENU_ITEMS = [
  { label: "DEX", state: ScreenState.POKEDEX },
  { label: "TRAINER", state: ScreenState.TRAINER },
  { label: "PROF LAB", state: ScreenState.LAB },
  { label: "CONTACT", state: ScreenState.CONTACT },
  { label: "EXIT", state: ScreenState.START },
];

export const MainMenu: React.FC<Props> = ({ onSelect, theme, onThemeChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setSelectedIndex(p => (p > 0 ? p - 1 : MENU_ITEMS.length - 1));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(p => (p < MENU_ITEMS.length - 1 ? p + 1 : 0));
      } else if (e.key === 'Enter') {
        onSelect(MENU_ITEMS[selectedIndex].state);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onSelect]);

  return (
    <div 
      className={`w-full min-h-screen ${THEME_PALETTES[theme].main} flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between p-6 md:p-12 relative transition-colors duration-700 overflow-x-hidden`}
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)'
      }}
    >
      {/* Decorative Giant Background Graphic - Updated to Diamond Shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[800px] md:h-[800px] border-[20px] md:border-[40px] border-black/5 rotate-45 pointer-events-none z-0">
        <div className="w-[150%] h-[20px] md:h-[40px] bg-black/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
        <div className="w-24 h-24 md:w-64 md:h-64 border-[20px] md:border-[40px] border-black/5 bg-transparent z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Left side column: Content Section */}
      <div className="flex flex-col gap-6 md:gap-8 z-10 w-full max-w-lg self-center">
         
         {/* Quick Stats (visible on desktop to fill space) */}
         <div className="hidden md:block">
           <WindowFrame>
              <div className="text-[10px] md:text-xs space-y-2 font-bold tracking-widest">
                <div className="flex justify-between gap-8"><span className="text-gray-500">MAP</span><span>FOLIO HUB</span></div>
                <div className="flex justify-between gap-8"><span className="text-gray-500">TRAINER</span><span>{PORTFOLIO_DATA.name}</span></div>
                <div className="flex justify-between gap-8"><span className="text-gray-500">ID</span><span>{PORTFOLIO_DATA.id}</span></div>
                <div className="flex justify-between gap-8"><span className="text-gray-500">BADGES</span><span>{PORTFOLIO_DATA.badges.length}</span></div>
                <div className="flex justify-between gap-8"><span className="text-gray-500">TIME</span><span>{PORTFOLIO_DATA.playTime}</span></div>
              </div>
           </WindowFrame>
         </div>

         {/* Welcome & Theme Switcher */}
         <WindowFrame>
            <h2 className="mb-4 text-sm md:text-xl leading-relaxed flex items-center gap-2">
              <span className="animate-pulse text-red-500">▼</span> WELCOME TO THE REGION!
            </h2>
            <p className="leading-loose text-[10px] md:text-xs mb-6">
              This is a digital workspace showcasing projects, skills, and experiments. Use the menu to explore.
            </p>

            <div className="border-t-[2px] border-dotted border-gray-400 pt-4">
              <h3 className="text-[10px] mb-3 text-gray-500 font-bold">SELECT UI THEME:</h3>
              <div className="flex gap-4">
                 <button 
                   onClick={() => onThemeChange('WATER')}
                   className={`w-10 h-10 rounded-full border-[3px] border-black bg-blue-500 shadow-[2px_2px_0_0_#000] hover:-translate-y-1 transition-transform relative ${theme === 'WATER' ? 'ring-4 ring-blue-300 ring-offset-2 ring-offset-white' : ''}`}
                   title="Water Theme"
                 >
                   {theme === 'WATER' && <div className="absolute -top-3 -right-3 text-[10px] bg-white border border-black px-1 z-20">★</div>}
                 </button>
                 <button 
                   onClick={() => onThemeChange('FIRE')}
                   className={`w-10 h-10 rounded-full border-[3px] border-black bg-red-500 shadow-[2px_2px_0_0_#000] hover:-translate-y-1 transition-transform relative ${theme === 'FIRE' ? 'ring-4 ring-red-300 ring-offset-2 ring-offset-white' : ''}`}
                   title="Fire Theme"
                 >
                   {theme === 'FIRE' && <div className="absolute -top-3 -right-3 text-[10px] bg-white border border-black px-1 z-20">★</div>}
                 </button>
                 <button 
                   onClick={() => onThemeChange('GRASS')}
                   className={`w-10 h-10 rounded-full border-[3px] border-black bg-green-500 shadow-[2px_2px_0_0_#000] hover:-translate-y-1 transition-transform relative ${theme === 'GRASS' ? 'ring-4 ring-green-300 ring-offset-2 ring-offset-white' : ''}`}
                   title="Grass Theme"
                 >
                   {theme === 'GRASS' && <div className="absolute -top-3 -right-3 text-[10px] bg-white border border-black px-1 z-20">★</div>}
                 </button>
              </div>
            </div>
         </WindowFrame>
      </div>

      {/* Mobile-Only Spacer */}
      <div className="h-48 md:hidden shrink-0 pointer-events-none"></div>

      {/* Right side Menu: Nav Section */}
      <div className="z-20 w-full max-w-xs self-center">
        <WindowFrame>
          <ul className="flex flex-col gap-2">
            {MENU_ITEMS.map((item, idx) => (
              <li
                key={item.label}
                className={`flex items-center cursor-pointer p-4 rounded-sm transition-colors ${
                  selectedIndex === idx ? 'bg-gray-200 animate-pulse' : 'hover:bg-gray-100'
                }`}
                onClick={() => onSelect(item.state)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="w-6 shrink-0">{selectedIndex === idx ? '▶' : ''}</span>
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </WindowFrame>
      </div>
    </div>
  );
};
