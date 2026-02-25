
import React, { useState } from 'react';
import { WindowFrame } from '../components/WindowFrame';
import { Typewriter } from '../components/Typewriter';
import { ThemeColor } from '../types';
import { THEME_PALETTES } from '../constants';

interface Props {
  onBack: () => void;
  theme: ThemeColor;
}

type ContactPhase = 'IDLE' | 'SUCCESS';

export const Contact: React.FC<Props> = ({ onBack, theme }) => {
  const [phase, setPhase] = useState<ContactPhase>('IDLE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const palette = THEME_PALETTES[theme];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message. Please try again later.');
      }

      setPhase('SUCCESS');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className={`w-full h-screen ${palette.main} transition-colors duration-700 flex flex-col items-center justify-center p-4 relative`}
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)'
      }}
    >
       {phase === 'IDLE' ? (
           <WindowFrame className={`w-full max-w-lg ${palette.light} transition-colors duration-700 relative z-10 shadow-2xl`}>
             <h2 className={`text-lg md:text-xl mb-6 text-center tracking-widest border-b-4 border-black pb-4 ${palette.text}`}>CONTACT TRAINER</h2>
             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-[10px] mb-2 font-bold text-gray-800 tracking-wider">YOUR NAME</label>
                    <input 
                       required 
                       type="text" 
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       placeholder="KASH ETCHUM" 
                       className="w-full p-3 border-[2px] border-black bg-white text-[10px] md:text-xs focus:outline-none focus:ring-2 focus:ring-black shadow-[inset_2px_2px_0_rgba(0,0,0,0.1)]" 
                    />
                </div>
                <div>
                    <label className="block text-[10px] mb-2 font-bold text-gray-800 tracking-wider">EMAIL ADDRESS</label>
                    <input 
                       required 
                       type="email" 
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       placeholder="KASH@PALLET.COM" 
                       className="w-full p-3 border-[2px] border-black bg-white text-[10px] md:text-xs focus:outline-none focus:ring-2 focus:ring-black shadow-[inset_2px_2px_0_rgba(0,0,0,0.1)]" 
                    />
                </div>
                <div>
                    <label className="block text-[10px] mb-2 font-bold text-gray-800 tracking-wider">MESSAGE</label>
                    <textarea 
                       required 
                       name="message"
                       value={formData.message}
                       onChange={handleChange}
                       placeholder="I CHOOSE YOU!" 
                       className="w-full p-3 border-[2px] border-black bg-white text-[10px] md:text-xs h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black shadow-[inset_2px_2px_0_rgba(0,0,0,0.1)]" 
                    />
                </div>

                {error && (
                   <div className="bg-red-100 border-2 border-red-500 p-2 text-[10px] text-red-700 font-bold">
                       {error}
                   </div>
                )}

                <div className="flex justify-between mt-4">
                  <button 
                     type="button" 
                     onClick={onBack} 
                     disabled={isSubmitting}
                     className="bg-white px-6 py-3 border-[2px] border-black hover:bg-gray-200 text-[10px] md:text-xs shadow-[2px_2px_0_0_#000] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                  >
                     CANCEL
                  </button>
                  <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className={`${palette.button} text-white px-6 py-3 border-[2px] border-black ${palette.buttonHover} text-[10px] md:text-xs shadow-[2px_2px_0_0_#000] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 flex items-center gap-2`}
                  >
                     {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </button>
                </div>
             </form>
           </WindowFrame>
       ) : (
           <div className="w-full max-w-md flex flex-col gap-4 relative z-10 animate-in fade-in zoom-in duration-300">
              <WindowFrame className="bg-white relative shadow-2xl p-6 flex flex-col items-center">
                 <div className="mb-6">
                    {/* Stylized simple Diamond icon */}
                    <div className="w-16 h-16 rotate-45 border-[4px] border-black bg-gradient-to-b from-red-500 from-[50%] to-white to-[50.1%] relative">
                        <div className="w-[140%] h-[2px] bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                        <div className="w-4 h-4 bg-white border-[3px] border-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
                    </div>
                 </div>
                 <div className="text-[10px] md:text-sm leading-relaxed text-center mb-8">
                    <Typewriter text={"Gotcha! Your message was sent successfully!\n\nProfessor Mango will deliver it to the trainer."} speed={30} />
                 </div>
                 <button 
                    onClick={onBack} 
                    className={`w-full ${palette.dark} text-white px-6 py-3 border-[2px] border-black hover:opacity-90 active:translate-y-1 text-[10px] md:text-xs transition-all flex items-center justify-center gap-2`}
                 >
                    RETURN TO MENU <span className="animate-pulse">▶</span>
                 </button>
              </WindowFrame>
           </div>
       )}
    </div>
  );
};
