import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA, THEME_PALETTES } from '../constants';
import { Message, ThemeColor } from '../types';
import { sendMessage } from '../services/ai';
import { WindowFrame } from '../components/WindowFrame';
import { Typewriter } from '../components/Typewriter';

interface Props {
  onBack: () => void;
  theme: ThemeColor;
}

export const ProfLab: React.FC<Props> = ({ onBack, theme }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: `Hello there! Welcome to the world of Development! My name is PROF. Mango! I can tell you all about ${PORTFOLIO_DATA.name}. What do you want to know?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const palette = THEME_PALETTES[theme];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessage(userMsg);
      // console.log(responseText)
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
       console.error(error);
       setMessages(prev => [...prev, { role: 'model', text: "Bzzt! Communication error! Check your connection to the PC network." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#F0F0F0] flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Header themed dynamically */}
      <div className={`${palette.main} transition-colors duration-700 border-b-[4px] border-black p-4 flex justify-between items-center z-10 shadow-md`}>
         <h2 className="text-white text-sm md:text-lg tracking-widest drop-shadow-[2px_2px_0_#000]">PROF. Mango'S LAB</h2>
         <button 
            onClick={onBack} 
            className="bg-white px-4 py-2 border-[2px] border-black text-[10px] hover:bg-gray-200 active:scale-95 transition-transform shadow-[2px_2px_0_0_#000]"
         >
            EXIT
         </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 z-10 pb-40">
        {messages.map((m, i) => (
           <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-3 max-w-[90%] md:max-w-[75%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                 
                 {/* Avatars */}
                 <div className={`w-10 h-10 border-[2px] border-black rounded flex items-center justify-center shrink-0 mb-2 shadow-[2px_2px_0_0_#000] text-lg ${m.role === 'model' ? 'bg-white' : palette.button}`}>
                    {m.role === 'model' ? '🤖' : '🧢'}
                 </div>
                 
                 <WindowFrame className={`${m.role === 'model' ? 'bg-white' : palette.light} w-full transition-colors`}>
                    <div className="text-[10px] md:text-xs leading-[2] tracking-wide whitespace-pre-wrap break-words overflow-wrap-anywhere">
                       {m.role === 'model' && i === messages.length - 1 && !isLoading ? (
                           <Typewriter text={m.text} speed={15} />
                       ) : (
                           m.text
                       )}
                    </div>
                 </WindowFrame>
                 
              </div>
           </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-end gap-3 max-w-[80%]">
              <div className="w-10 h-10 bg-white border-[2px] border-black rounded flex items-center justify-center shrink-0 mb-2 shadow-[2px_2px_0_0_#000] text-lg">🤖</div>
              <div className="bg-white p-3 border">
                <span className="text-[10px] animate-pulse">Computing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area - Custom Frame to avoid nested padding issues */}
      <div className="absolute bottom-0 w-full p-4 md:p-6 z-20 bg-gradient-to-t from-gray-300 to-transparent">
         <div className="w-full max-w-4xl mx-auto bg-white border-[4px] border-black rounded shadow-[6px_6px_0_0_rgba(0,0,0,0.8)] overflow-hidden flex">
            {/* Input Prefix Indicator */}
            <div className="bg-gray-200 px-4 flex items-center justify-center border-r-[4px] border-black text-black shrink-0">
               <span className="animate-pulse">▶</span>
            </div>

            {/* Main Input */}
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white outline-none p-4 text-[10px] md:text-xs uppercase placeholder-gray-400"
              placeholder="ASK PROF. Mango ABOUT THE DEV..."
              disabled={isLoading}
              autoFocus
              maxLength={100}
            />

            {/* Cleaner Chat Button */}
            <button
               onClick={handleSend}
               disabled={isLoading || !input.trim()}
               className={`px-6 md:px-10 border-l-[4px] border-black transition-all font-bold text-[10px] md:text-xs tracking-widest ${
                  !isLoading && input.trim() 
                  ? `${palette.button} text-white hover:opacity-90 active:translate-x-1` 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
               }`}
            >
               {isLoading ? '...' : 'SEND'}
            </button>
         </div>
      </div>
    </div>
  );
};
