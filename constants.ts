
import { Project, Badge, Experience, Education, Certification, Achievement, ThemeColor, ThemePalette } from './types';

export const THEME_PALETTES: Record<ThemeColor, ThemePalette> = {
  WATER: {
    main: 'bg-blue-600',
    light: 'bg-blue-100',
    dark: 'bg-slate-900',
    button: 'bg-blue-500',
    buttonHover: 'hover:bg-blue-600',
    text: 'text-blue-700'
  },
  FIRE: {
    main: 'bg-red-600',
    light: 'bg-red-100',
    dark: 'bg-neutral-900',
    button: 'bg-red-500',
    buttonHover: 'hover:bg-red-600',
    text: 'text-red-700'
  },
  GRASS: {
    main: 'bg-green-600',
    light: 'bg-green-100',
    dark: 'bg-stone-900',
    button: 'bg-green-500',
    buttonHover: 'hover:bg-green-600',
    text: 'text-green-700'
  }
};

export const PORTFOLIO_DATA = {
  name: "Ajit Kulkarni",
  class: "Software Developer / PKMN TRAINER",
  age: "21",
  playTime: "1337:00",
  id: "14006",
  bio: "A passionate developer traveling across the digital world to catch modern web frameworks , building reliable and interactive applications along the way. Focused on clean architecture, performance, and usability. Occasionally grinding side quests in games.",
  badges: [
    { name: "PYTHON", color: "bg-blue-900" },
    { name: "JS/TS", color: "bg-blue-700" },
    { name: "NODE.JS", color: "bg-blue-900" },
    { name: "GEN AI", color: "bg-purple-900" },
    { name: "Java", color: "bg-purple-700" },
    { name: "REACT JS", color: "bg-purple-500" },
    { name: "TAILWIND", color: "bg-teal-500" },

  ] as Badge[],
  projects: [
    {
      id: "001",
      name: "Quant analysis Platform",
      type: "FIRE / RealTime analysis",
      category: "RealTime analysis website",
      stack: ["Real-Time ticks", "PYTHON", "Streamlit", "VERCEL"],
      description: "Project is a Real-Time Quantitative Analytics Dashboard focused on crypto markets, designed to ingest live tick data, compute quantitative analytics, and display results interactively via Streamlit. It demonstrates how quantitative finance concepts (like pair trading statistics) can be built in a production-style real-time application.",
      link: "https://github.com/AjitKulkarni10/quant-analytics-platform",
      screenshots: [
        "/screenshots/Screenshot-2025-12-16-144139.png",
        "/screenshots/Screenshot-2025-12-16-144151.png",
        "/screenshots/Screenshot-2025-12-16-144200.png"
      ]
    },
    {
      id: "002",
      name: "Finlytics",
      type: "DARK / DATA",
      category: "DOCUMENT ANALYTICS",
      stack: ["REACT", "PYTHON", "RAG", "VECTOR SEARCH", "OLLAMA", "GEMINI", "REST API"],
      description: "An analytics platform that transforms uploaded documents into searchable knowledge, enabling summaries, sentiment insights, and interactive conversations over the content.",
      link: "https://github.com/AjitKulkarni10/finlytics_be",
      screenshots: [
        "/screenshots/Screenshot-2026-02-23-105130.png",
        "/screenshots/Screenshot-2026-02-23-105314.png",
        "/screenshots/Screenshot-2026-02-23-105334.png"
      ]
    },
    {
      id: "003",
      name: "Second Brain",
      type: "GRASS / CRUD",
      category: "Fullstack App",
      stack: ["REACT", "TYPESCRIPT", "NODE.JS", "EXPRESS", "MONGODB", "REST API", "TAILWIND"],
      description: "A personal knowledge manager designed to capture, organize, and share links and notes from across the web. Built using a scalable backend and a responsive interface for quick access and long-term use.",
      link: "https://github.com/AjitKulkarni10/SecondBrain",
      screenshots: [
        "/screenshots/Screenshot1.png",
        "/screenshots/Screenshot2.png",
        "/screenshots/Screenshot3.png"
      ]
    },
    {
      id: "004",
      name: "Craftify",
      type: "PSYCHIC / AI",
      category: "LEARNING PLATFORM",
      stack: ["REACT JS", "PYTHON", "NODE.JS", "OLLAMA", "YOUTUBE API", "REST API"],
      description: "An automated course-generation platform that converts user-defined topics into structured learning paths. Generates theory content, curated YouTube resources with transcripts, and follow-up quizzes to reinforce learning. and a Research Paper?",
      link: "https://github.com/AjitKulkarni10/Craftify",
      screenshots: [
        "/screenshots/c1.jpeg",
        "/screenshots/c2.jpeg",
        "/screenshots/c3.jpeg",
        "/screenshots/c4.jpeg"
      ]
    }
  ] as Project[],
  experience: [
    {
      role: "Freelancer",
      // company: "what company",
      period: "2022-2023",
      description: "Worked as a freelancer developing full stack applications and integrations. Caught good experience during this period."
    }
  ] as Experience[],
  education: [
    {
      degree: "B.Tech",
      school: "Vishwakarma Institutes of Information Technology",
      cgpa: "8.68"
    }
  ] as Education[],
  certifications: [
    {
      name: "IBM Data Science",
      issuer: "Coursera",
      year: "2023"
    },
    {
      name: "META Backend Technology",
      issuer: "Coursera",
      year: "2023"
    }
  ] as Certification[],
  achievements: [
    {
      title: "LEETCODE",
      value: "500+",
      description: "ALGORITHMS & DATA STRUCTURES SOLVED.",
      link: "https://leetcode.com/u/askulkarni10/"
    },
    {
      title: "GATE EXAM",
      value: "QUALIFIED",
      description: "For Computer Science(and IT) and DA."
    },
    {
      title: "HACKATHON Participation",
      value: "Runner-Up",
      description: "Multiple Hackathon Participations."
    },
    {
      title: "Debugging Survivor",
      value: "ACTIVE",
      description: "Solved “works on my machine” problems :)"
    }
  ] as Achievement[]
};
