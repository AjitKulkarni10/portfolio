
import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA, THEME_PALETTES } from '../constants';
import { Typewriter } from '../components/Typewriter';
import { WindowFrame } from '../components/WindowFrame';
import { ThemeColor } from '../types';

interface Props {
  onBack: () => void;
  theme: ThemeColor;
}

export const Pokedex: React.FC<Props> = ({ onBack, theme }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [ssIdx, setSsIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const project = PORTFOLIO_DATA.projects[selectedIdx];
  const palette = THEME_PALETTES[theme];

  // Drag to resize state
  const [imageHeight, setImageHeight] = useState(35); // Initial height 35%
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Reset screenshot index when project changes
  useEffect(() => {
    setSsIdx(0);
  }, [selectedIdx]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const rect = containerRef.current.getBoundingClientRect();

      let newPercentage = ((clientY - rect.top) / rect.height) * 100;
      // Clamp between 20% and 65% to keep UI usable
      newPercentage = Math.max(20, Math.min(newPercentage, 65));

      setImageHeight(newPercentage);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    document.body.style.cursor = 'row-resize';
  };

  const nextScreenshot = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.screenshots) return;
    setSsIdx((p) => (p + 1) % project.screenshots!.length);
  };

  const prevScreenshot = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.screenshots) return;
    setSsIdx((p) => (p - 1 + project.screenshots!.length) % project.screenshots!.length);
  };

  const hasMultipleScreenshots = project.screenshots && project.screenshots.length > 1;
  const currentImage = project.screenshots ? project.screenshots[ssIdx] : `https://picsum.photos/seed/${project.id}/600/400`;

  return (
    <div className={`w-full h-screen ${palette.main} transition-colors duration-700 flex flex-col p-4 md:p-8 overflow-hidden`}>
      
      {/* Pokedex Header Lights */}
      <div className="flex items-center mb-4 md:mb-6 gap-6 shrink-0">
         <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-400 border-[4px] border-white shadow-[inset_0_-4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-2 left-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-200 opacity-80"></div>
         </div>
         <div className="flex gap-3 items-start">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-400 border-2 border-black"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-400 border-2 border-black"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-400 border-2 border-black"></div>
         </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        
        {/* Left Pane: Visuals & Data */}
        <div ref={containerRef} className="flex-1 flex flex-col min-h-0 overflow-hidden pr-2 pb-2 md:pb-0 md:pr-0 relative">
           
           {/* Image Frame - Height controlled by slider */}
           <div 
             style={{ height: `${imageHeight}%` }}
             className="bg-[#dedede] border-[6px] md:border-[10px] border-gray-300 border-b-[12px] md:border-b-[20px] rounded-lg rounded-bl-[1.5rem] md:rounded-bl-[3rem] p-2 shrink-0 flex flex-col items-center justify-center relative shadow-lg overflow-hidden"
           >
              <div className="absolute top-1 md:top-2 flex gap-4">
                 <div className="w-2 h-2 rounded-full bg-red-500 border border-black"></div>
                 <div className="w-2 h-2 rounded-full bg-red-500 border border-black"></div>
              </div>
              
              <div 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-full bg-[#111] border-[4px] border-gray-600 flex items-center justify-center overflow-hidden relative rounded-sm min-h-0 group cursor-zoom-in"
              >
                 <img 
                   src={currentImage} 
                   alt={project.name} 
                   className="opacity-70 object-cover w-full h-full pixelated mix-blend-screen transition-opacity duration-300" 
                 />

                 {/* Tap to see full image tag */}
                 <div className="absolute top-2 right-2 bg-yellow-400 border-2 border-black text-[7px] md:text-[8px] px-1 py-0.5 shadow-[2px_2px_0_0_#000] z-10 animate-pulse pointer-events-none text-black font-bold">
                    TAP TO SEE FULL IMAGE
                 </div>
                 
                 {/* Navigation Overlays for multi-screenshot */}
                 {hasMultipleScreenshots && (
                    <>
                      <button 
                        onClick={prevScreenshot}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-gray-200 border-[2px] border-black text-black text-[10px] md:text-xs flex items-center justify-center hover:bg-white active:translate-y-[calc(-50%+2px)] shadow-[2px_2px_0_0_#000] z-20"
                      >
                        ◀
                      </button>
                      <button 
                        onClick={nextScreenshot}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-gray-200 border-[2px] border-black text-black text-[10px] md:text-xs flex items-center justify-center hover:bg-white active:translate-y-[calc(-50%+2px)] shadow-[2px_2px_0_0_#000] z-20"
                      >
                        ▶
                      </button>
                      
                      {/* Page indicator */}
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[7px] md:text-[9px] px-2 py-0.5 border border-white/30 rounded">
                        IMAGE {ssIdx + 1}/{project.screenshots?.length}
                      </div>
                    </>
                 )}
              </div>
              
              <div className="absolute bottom-1 md:bottom-2 left-4 text-[8px] text-gray-500">
                  <div className="w-3 h-3 bg-red-500 rounded-full border border-black"></div>
              </div>
           </div>

           {/* Custom Slider / Resizer Handle */}
           <div 
             className="w-full h-6 shrink-0 flex items-center justify-center cursor-row-resize z-10 my-1 group touch-none"
             onMouseDown={startDrag}
             onTouchStart={startDrag}
           >
              <div className="w-16 md:w-24 h-4 md:h-5 bg-gray-400 border-[2px] border-black rounded-full flex items-center justify-center gap-1 group-hover:bg-gray-300 transition-colors shadow-[2px_2px_0_0_rgba(0,0,0,0.5)]">
                 <div className="w-1 h-2 bg-gray-600 rounded"></div>
                 <div className="w-1 h-2 bg-gray-600 rounded"></div>
                 <div className="w-1 h-2 bg-gray-600 rounded"></div>
              </div>
           </div>
           
           {/* Classic Text Data Screen - Automatically takes remaining height */}
           <div className="bg-[#4ade80] border-[4px] border-black p-3 md:p-4 flex-1 shrink-0 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] overflow-y-auto text-black flex flex-col min-h-0">
             
             {/* Header */}
             <div className="flex items-center gap-4 mb-2 md:mb-3 shrink-0">
                 <span className="text-[10px] md:text-xs font-bold tracking-widest">No.{project.id}</span>
                 <span className="text-xs md:text-sm font-bold tracking-widest">{project.name}</span>
             </div>

             {/* Category */}
             <div className="text-[10px] mb-2 pl-4 shrink-0">
                 {project.category}
             </div>

             {/* Stats (Height / Weight replacements) */}
             {(project.size && project.loc && <div className="flex flex-col ml-8 mb-2 md:mb-3 gap-1 shrink-0">
                 <div className="flex gap-4 text-[10px]">
                     <span className="w-8 tracking-wider text-gray-700">HT</span>
                     <span>{project.loc} LOC</span>
                 </div>
                 <div className="flex gap-4 text-[10px]">
                     <span className="w-8 tracking-wider text-gray-700">WT</span>
                     <span>{project.size}</span>
                 </div>
             </div>)}

             {/* Tech Stack */}
             <div className="mt-1 border-t-[2px] border-black border-dotted pt-2 shrink-0">
                 <span className="text-[8px] tracking-widest block mb-1 font-bold text-gray-700">TECH STACK:</span>
                 <div className="flex gap-2 text-[8px] flex-wrap">
                     {project.stack.map(tech => (
                         <span key={tech} className="bg-white border-[2px] border-black px-1.5 py-0.5 rounded-sm shadow-[2px_2px_0_0_#000] font-bold hover:-translate-y-1">
                             {tech}
                         </span>
                     ))}
                 </div>
             </div>

             {/* Description (Flavor text) */}
             <div className="text-[10px] leading-relaxed whitespace-pre-wrap mt-2 border-t-[2px] border-black border-dotted pt-2 md:pt-3 flex-1 min-h-[3rem]">
                 <Typewriter key={project.id} text={project.description} speed={15} />
             </div>
             
           </div>
           
        </div>

        {/* Right Pane: Navigation List */}
        <div className="w-full md:w-80 h-48 md:h-full bg-white border-[4px] border-black p-2 flex flex-col shrink-0">
           <div className="flex-1 overflow-y-auto space-y-2 pr-2">
             {PORTFOLIO_DATA.projects.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-3 md:p-4 border-b-2 border-gray-300 cursor-pointer flex items-center ${
                    selectedIdx === idx 
                      ? 'bg-blue-100 border-[2px] border-black text-black' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <span className={`w-6 shrink-0 ${palette.text}`}>
                      {selectedIdx === idx ? '●' : '○'}
                  </span>
                  <span className="text-xs truncate">{p.name}</span>
                </div>
             ))}
           </div>
           
           {/* Controls */}
           <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t-[4px] border-black flex justify-between gap-2">
              <button 
                onClick={onBack} 
                className="bg-gray-800 text-white px-4 py-2 md:py-3 text-[10px] hover:bg-black active:scale-95 transition-transform flex-1"
              >
                BACK
              </button>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className={`${palette.button} text-white px-4 py-2 md:py-3 text-[10px] ${palette.buttonHover} active:scale-95 transition-transform text-center flex items-center justify-center flex-1`}
              >
                VISIT
              </a>
           </div>
        </div>
        
      </div>

      {/* Full Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-auto"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <WindowFrame>
              <div className="relative flex flex-col">
                {/* Close Button */}
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="absolute -top-12 -right-2 bg-red-500 text-white border-[3px] border-black w-10 h-10 flex items-center justify-center hover:bg-red-600 active:translate-y-1 shadow-[4px_4px_0_0_#000] font-bold z-50"
                >
                  X
                </button>

                <div className="bg-black border-4 border-black overflow-hidden rounded-sm relative group">
                  <img 
                    src={currentImage} 
                    alt={project.name} 
                    className="w-full h-auto max-h-[75vh] object-contain"
                  />

                  {/* Modal Navigation Arrows */}
                  {hasMultipleScreenshots && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevScreenshot(e); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 border-2 border-white text-white flex items-center justify-center rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        ◀
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextScreenshot(e); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 border-2 border-white text-white flex items-center justify-center rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        ▶
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="text-[10px] md:text-xs font-bold bg-blue-100 border-2 border-black px-3 py-1 shadow-[2px_2px_0_0_#000]">
                      {project.name}
                    </div>
                  </div>
                  <div className="text-[8px] md:text-[10px] font-bold text-gray-500">
                    SCREENSHOT {ssIdx + 1} OF {project.screenshots?.length || 1}
                  </div>
                </div>

                {/* Thumbnail strip inside modal */}
                {hasMultipleScreenshots && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {project.screenshots?.map((ss, i) => (
                      <button
                        key={i}
                        onClick={() => setSsIdx(i)}
                        className={`w-16 h-12 shrink-0 border-2 ${ssIdx === i ? 'border-yellow-400 scale-110' : 'border-black opacity-50'} transition-all overflow-hidden bg-black`}
                      >
                        <img src={ss} className="w-full h-full object-cover pixelated" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </WindowFrame>
            <div className="mt-4 text-center text-white text-[10px] animate-bounce">
              TAP ANYWHERE OUTSIDE TO CLOSE
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
