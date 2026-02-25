
import React, { useState } from 'react';
import { PORTFOLIO_DATA, THEME_PALETTES } from '../constants';
import { WindowFrame } from '../components/WindowFrame';
import { ThemeColor } from '../types';

interface Props {
  onBack: () => void;
  theme: ThemeColor;
}

export const TrainerCard: React.FC<Props> = ({ onBack, theme }) => {
  const [activeTab, setActiveTab] = useState<'FRONT' | 'BACK' | 'RECORDS'>('FRONT');
  const palette = THEME_PALETTES[theme];

  return (
    <div 
      className={`w-full h-[100dvh] ${palette.main} transition-colors duration-700 flex flex-col items-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden relative`}
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)'
      }}
    >
       
       {/* Top spacer for perfect desktop centering (shrinks to 0 if content exceeds screen) */}
       <div className="hidden md:block flex-1 shrink-0 min-h-0"></div>

       {/* Card Container */}
       <WindowFrame className="w-full max-w-3xl bg-white mb-4 md:mb-6 min-h-[400px] md:min-h-[500px] flex flex-col shrink-0 relative z-10 shadow-2xl">
         
         {/* Top Header & Tabs */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-[3px] md:border-b-[4px] border-black pb-3 md:pb-4 mb-4 md:mb-6 gap-3 md:gap-4 shrink-0 w-full">
           <div className="max-w-full">
              <h1 className="text-lg sm:text-xl md:text-2xl tracking-wider mb-1 md:mb-2 break-words">TRAINER CARD</h1>
              <span className="text-gray-500 text-[10px] md:text-xs tracking-widest">ID No. {PORTFOLIO_DATA.id}</span>
           </div>

           {/* Tab Switcher */}
           <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] md:text-xs w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('FRONT')}
                className={`px-2.5 py-1.5 md:px-3 md:py-2 border-[2px] border-black transition-colors ${activeTab === 'FRONT' ? 'bg-black text-white shadow-none translate-y-[2px]' : 'bg-white text-black shadow-[2px_2px_0_0_#000] hover:bg-gray-100'}`}
              >
                FRONT
              </button>
              <button 
                onClick={() => setActiveTab('BACK')}
                className={`px-2.5 py-1.5 md:px-3 md:py-2 border-[2px] border-black transition-colors ${activeTab === 'BACK' ? 'bg-black text-white shadow-none translate-y-[2px]' : 'bg-white text-black shadow-[2px_2px_0_0_#000] hover:bg-gray-100'}`}
              >
                BACK
              </button>
              <button 
                onClick={() => setActiveTab('RECORDS')}
                className={`px-2.5 py-1.5 md:px-3 md:py-2 border-[2px] border-black transition-colors ${activeTab === 'RECORDS' ? 'bg-black text-white shadow-none translate-y-[2px]' : 'bg-yellow-400 text-black shadow-[2px_2px_0_0_#000] hover:bg-yellow-300'}`}
              >
                RECORDS
              </button>
           </div>
         </div>
         
         {/* Tab Content Area */}
         <div className="flex-1 w-full max-w-full">
           {activeTab === 'FRONT' && (
             /* FRONT TAB: Stats, Bio, Badges */
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 animate-[fadeIn_0.3s_ease-in-out] w-full">
                {/* Left Col: Stats & Bio */}
                <div className="space-y-5 md:space-y-6">
                  <div className="space-y-3 md:space-y-4 text-[10px] sm:text-xs md:text-sm">
                      <p className="flex justify-between gap-2 border-b-2 border-dotted border-gray-300 pb-1">
                          <span className="shrink-0">NAME</span> <span className="text-right break-words min-w-0">{PORTFOLIO_DATA.name}</span>
                      </p>
                      <p className="flex justify-between gap-2 border-b-2 border-dotted border-gray-300 pb-1">
                          <span className="shrink-0">AGE</span> <span className="text-right break-words min-w-0">{PORTFOLIO_DATA.age}</span>
                      </p>
                      <p className="flex justify-between gap-2 border-b-2 border-dotted border-gray-300 pb-1">
                          <span className="shrink-0">TIME</span> <span className="text-right break-words min-w-0">{PORTFOLIO_DATA.playTime}</span>
                      </p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 md:p-4 border-[2px] border-black rounded shadow-inner flex flex-col">
                     <p className="mb-2 md:mb-3 text-[10px] md:text-xs font-bold border-b border-black inline-block self-start">PROFILE</p>
                     <p className="text-[9px] sm:text-[10px] leading-loose break-words">{PORTFOLIO_DATA.bio}</p>
                     
                     {/* Reference to Prof Lab */}
                     <div className="mt-4 pt-3 border-t-[2px] border-dotted border-gray-400 bg-yellow-100 p-2 border-[2px] border-black rounded-sm shadow-[inset_1px_1px_0_rgba(255,255,255,0.8)]">
                        <p className="text-[8px] sm:text-[9px] text-gray-800 font-bold flex items-start gap-2 leading-relaxed">
                           <span className="text-red-600 animate-pulse mt-0.5">▶</span>
                           TIP: VISIT PROF. Mango IN THE "PROF LAB" TO ASK AI ANY QUESTIONS ABOUT THE TRAINER!
                        </p>
                     </div>
                  </div>
                </div>

                {/* Right Col: Badges */}
                <div className="flex flex-col h-full">
                  <p className="mb-3 md:mb-4 text-center text-[10px] sm:text-xs md:text-sm">BADGES ({PORTFOLIO_DATA.badges.length})</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 flex-1 content-start">
                    {PORTFOLIO_DATA.badges.map(b => (
                      <div 
                        key={b.name} 
                        className={`aspect-square sm:aspect-auto sm:h-16 md:h-18 border-[2px] md:border-[3px] border-black flex flex-col items-center justify-center p-1 sm:p-2 text-white shadow-[2px_2px_0_0_#000] md:shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#000] transition-transform ${b.color}`}
                      >
                        <span className="text-[7px] sm:text-[8px] md:text-[10px] text-center font-bold break-words w-full px-1">{b.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           )}

           {activeTab === 'BACK' && (
             /* BACK TAB: Experience, Education, Certifications */
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 animate-[fadeIn_0.3s_ease-in-out] w-full">
                
                {/* Left Col: Experience */}
                <div className="space-y-6">
                   <div className="bg-gray-100 p-3 md:p-4 border-[2px] border-black rounded shadow-inner h-full">
                      <p className="mb-3 md:mb-4 text-[10px] md:text-xs font-bold border-b border-black inline-block">EXPERIENCE</p>
                      <div className="space-y-5 md:space-y-6">
                        {PORTFOLIO_DATA.experience.map((exp, idx) => (
                          <div key={idx} className="text-[9px] sm:text-[10px] md:text-xs">
                            <div className="flex flex-col sm:flex-row sm:justify-between font-bold mb-1 gap-0.5 sm:gap-2">
                               <span className={`${palette.text} break-words`}>{exp.role}</span>
                               <span className="text-gray-500 shrink-0 text-[8px] sm:text-[10px]">{exp.period}</span>
                            </div>
                            <div className="text-black mb-1.5 md:mb-2 break-words">{exp.company}</div>
                            <div className="text-gray-600 leading-relaxed text-[8px] md:text-[10px] break-words">
                              {exp.description}
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Right Col: Education & Certs */}
                <div className="space-y-5 md:space-y-6 flex flex-col">
                   <div className="bg-gray-100 p-3 md:p-4 border-[2px] border-black rounded shadow-inner">
                      <p className="mb-3 md:mb-4 text-[10px] md:text-xs font-bold border-b border-black inline-block">EDUCATION</p>
                      <div className="space-y-3 md:space-y-4">
                        {PORTFOLIO_DATA.education.map((edu, idx) => (
                          <div key={idx} className="text-[9px] sm:text-[10px] md:text-xs">
                            <div className="flex flex-col sm:flex-row sm:justify-between font-bold mb-1 gap-0.5 sm:gap-2">
                               <span className={`${palette.text} break-words`}>{edu.degree}</span>
                               <span className="text-gray-500 shrink-0 text-[8px] sm:text-[10px]">{edu.cgpa}</span>
                            </div>
                            <div className="text-black break-words">{edu.school}</div>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="bg-gray-100 p-3 md:p-4 border-[2px] border-black rounded shadow-inner flex-1">
                      <p className="mb-3 md:mb-4 text-[10px] md:text-xs font-bold border-b border-black inline-block">CERTIFICATES</p>
                      <div className="space-y-3 md:space-y-4">
                        {PORTFOLIO_DATA.certifications.map((cert, idx) => (
                          <div key={idx} className="text-[9px] sm:text-[10px] md:text-xs">
                            <div className="flex flex-col sm:flex-row sm:justify-between font-bold mb-1 gap-0.5 sm:gap-2">
                               <span className={`${palette.text} break-words`}>{cert.name}</span>
                               <span className="text-gray-500 shrink-0 text-[8px] sm:text-[10px]">{cert.year}</span>
                            </div>
                            <div className="text-black break-words">{cert.issuer}</div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

             </div>
           )}

           {activeTab === 'RECORDS' && (
             /* RECORDS TAB: Hall of Fame / Special Achievements */
             <div className="animate-[fadeIn_0.3s_ease-in-out] w-full">
                <div className="bg-gray-100 p-3 sm:p-4 md:p-6 border-[2px] border-black rounded shadow-inner">
                   <p className="mb-4 md:mb-6 text-[10px] sm:text-xs md:text-sm font-bold border-b-[2px] border-black inline-block tracking-widest text-red-600">★ HALL OF FAME ★</p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                     {PORTFOLIO_DATA.achievements.map((ach, idx) => {
                       const content = (
                         <div className="flex flex-col h-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start border-b-[2px] border-dotted border-gray-300 pb-2 mb-2 gap-2">
                               <span className={`text-[9px] md:text-xs font-bold tracking-widest ${palette.text} break-words flex-1 min-w-0 uppercase`}>{ach.title}</span>
                               <span className="text-[10px] md:text-sm font-bold bg-yellow-300 px-1.5 py-0.5 md:px-2 md:py-1 border-[2px] border-black shadow-[2px_2px_0_0_#000] sm:rotate-2 shrink-0 self-start">{ach.value}</span>
                            </div>
                            <div className="text-[8px] md:text-[10px] text-gray-700 leading-relaxed mt-1 mb-3 break-words flex-1">
                               {ach.description}
                            </div>
                            {ach.link && (
                              <div className="text-[7px] md:text-[8px] font-bold text-right text-blue-600 mt-auto flex items-center justify-end gap-1">
                                 <span className="animate-pulse">▶</span> VISIT SITE
                              </div>
                            )}
                         </div>
                       );

                       return ach.link ? (
                         <a 
                           key={idx} 
                           href={ach.link} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="bg-white border-[2px] sm:border-[3px] border-black p-3 sm:p-4 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] md:shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] transition-all block group"
                         >
                           {content}
                         </a>
                       ) : (
                         <div 
                           key={idx} 
                           className="bg-white border-[2px] sm:border-[3px] border-black p-3 sm:p-4 shadow-[3px_3px_0_0_rgba(0,0,0,0.8)] md:shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] flex flex-col hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] transition-all block group"
                         >
                           {content}
                         </div>
                       );
                     })}
                   </div>

                </div>
             </div>
           )}
         </div>

       </WindowFrame>
       
       {/* Bottom Actions Container */}
       <div className="flex flex-wrap justify-center gap-3 sm:gap-4 relative z-10 shrink-0 w-full max-w-3xl">
         <a 
           href="https://drive.google.com/file/d/1Ckwu-Trlen4jdT58y1EXcpxvpDvgJmnF/view?usp=drive_link" 
           target="_blank" 
           rel="noopener noreferrer"
           className={`${palette.button} text-white border-[3px] md:border-[4px] border-black px-6 md:px-8 py-3 md:py-4 shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] active:translate-y-2 active:shadow-none transition-all text-[10px] md:text-xs flex items-center justify-center gap-2`}
         >
           <span className="animate-bounce mt-1">▼</span> RESUME 
         </a>
         <button 
           onClick={onBack} 
           className="bg-white border-[3px] md:border-[4px] border-black px-6 md:px-8 py-3 md:py-4 shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] active:translate-y-2 active:shadow-none transition-all text-[10px] md:text-xs"
         >
           CLOSE
         </button>
       </div>

       {/* Bottom spacer for perfect desktop centering */}
       <div className="hidden md:block flex-1 shrink-0 min-h-0"></div>

       {/* Simple inline keyframe for tab transition */}
       <style dangerouslySetInnerHTML={{__html: `
         @keyframes fadeIn {
           from { opacity: 0; transform: translateY(5px); }
           to { opacity: 1; transform: translateY(0); }
         }
       `}} />
    </div>
  );
};
