import React, { useState, useEffect } from 'react';

interface Props {
  text: string;
  speed?: number;
}

export const Typewriter: React.FC<Props> = ({ text, speed = 25 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const handleSkip = () => {
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
    }
  };

  return (
    <span onClick={handleSkip} className={isTyping ? "cursor-pointer" : ""}>
      {displayedText}
      {!isTyping && <span className="animate-pulse ml-2 inline-block">▼</span>}
    </span>
  );
};
