
export enum ScreenState {
  START = 'START',
  MAIN = 'MAIN',
  POKEDEX = 'POKEDEX',
  TRAINER = 'TRAINER',
  LAB = 'LAB',
  CONTACT = 'CONTACT'
}

export type ThemeColor = 'WATER' | 'FIRE' | 'GRASS';

export interface ThemePalette {
  main: string;
  light: string;
  dark: string;
  button: string;
  buttonHover: string;
  text: string;
}

export interface Project {
  id: string;
  name: string;
  type?: string;
  description: string;
  link: string;
  category: string;
  loc?: string;
  size?: string;
  stack: string[];
  screenshots?: string[];
}

export interface Badge {
  name: string;
  color: string;
  id: number
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Experience {
  role: string;
  company?: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  cgpa: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Achievement {
  title: string;
  value: string | number;
  description: string;
  link?: string;
}
