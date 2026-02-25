import React, { useState , useEffect} from 'react';
import { ScreenState, ThemeColor } from './types';
import { StartScreen } from './views/StartScreen';
import { MainMenu } from './views/MainMenu';
import { TrainerCard } from './views/TrainerCard';
import { Pokedex } from './views/Pokedex';
import { ProfLab } from './views/ProfLab';
import { Contact } from './views/Contact';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>(ScreenState.START);
  const [theme, setTheme] = useState<ThemeColor>("WATER");

  const navigate = (next: ScreenState) => {
    window.history.pushState({ screen: next }, "" , `#${next}`);
    setScreen(next);
  };

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (e.state?.screen) {
        setScreen(e.state.screen);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div className="w-full min-h-screen text-black select-none">
      {screen === ScreenState.START && (
        <StartScreen onStart={() => navigate(ScreenState.MAIN)} />
      )}

      {screen === ScreenState.MAIN && (
        <MainMenu
          onSelect={navigate}         
          theme={theme}
          onThemeChange={setTheme}
        />
      )}

      {screen === ScreenState.POKEDEX && (
        <Pokedex
          onBack={() => window.history.back()}  
          theme={theme}
        />
      )}

      {screen === ScreenState.TRAINER && (
        <TrainerCard
          onBack={() => window.history.back()}
          theme={theme}
        />
      )}

      {screen === ScreenState.LAB && (
        <ProfLab
          onBack={() => window.history.back()}
          theme={theme}
        />
      )}

      {screen === ScreenState.CONTACT && (
        <Contact
          onBack={() => window.history.back()}
          theme={theme}
        />
      )}
    </div>
  );
}
