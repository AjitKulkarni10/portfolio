
import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

interface Props {
  onStart: () => void;
}

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden" onClick={onStart}>
       
       {/* Scrolling background effect simulation */}
       <div className="absolute inset-0 opacity-[0.03]" style={{
           backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)'
       }}></div>

       <div className="z-10 text-center flex flex-col items-center justify-center mt-[-5vh]">
          
          {/* Animated Stylized Capture Diamond */}
          <div className="relative mb-12 animate-float">
            <div className="w-32 h-32 md:w-48 md:h-48 rotate-45 border-[8px] border-black bg-gradient-to-b from-red-500 from-[50%] to-white to-[50.1%] flex items-center justify-center shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
                <div className="w-[140%] h-2 md:h-[8px] bg-black absolute top-1/2 -translate-y-1/2 -rotate-45"></div>
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white border-[6px] md:border-[8px] border-black rounded-sm relative z-10 shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2)] flex items-center justify-center">
                    <div className="w-3 h-3 md:w-5 md:h-5 border-[2px] border-black rounded-sm bg-gray-100"></div>
                </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl text-black drop-shadow-[4px_4px_0_rgba(156,163,175,1)] leading-[1.5] mb-12">
            POKéPORTFOLIO<br/>
            <span className="text-xl md:text-3xl text-red-600 drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">VERSION 0.12</span>
          </h1>
          
          <div className="animate-pulse flex flex-col items-center gap-4 bg-black text-white px-8 py-4 border-[4px] border-gray-400 rounded-sm hover:bg-gray-800 transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
             <span className="text-lg md:text-xl">PRESS START</span>
          </div>
          <span className="text-[10px] text-gray-500 tracking-widest mt-4">(OR CLICK ANYWHERE)</span>
       </div>
       
       <div className="absolute bottom-7 text-[10px] text-gray-400">
         © {new Date().getFullYear()} to whom it may concern
       </div>
    </div>
  );
};
