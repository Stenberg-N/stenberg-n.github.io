import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Language = 'en' | 'fi'

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    projects: 'Projects',
    "project.finance-tracker.description": "A desktop and a web app for tracking, predicting, and visualizing finances.",
    "project.focusboard.description": "A note taking app that integrates a calendar and a timer.",
    "project.waste-classifier.description": "A desktop app with an ML model for classifying waste.",
    "project.finance-tracker.demo": "Web app's demo",
    "alert.message": "Continue to GitHub?",
    "alert.confirm": "Confirm",
    "alert.cancel": "Cancel",
    "alert.email": "Email copied!"
  },
  fi: {
    home: 'Koti',
    projects: 'Projektit',
    "project.finance-tracker.description": "Työpöytä- ja verkkosovellus talousdatan seurantaan, ennustamiseen ja visualisointiin.",
    "project.focusboard.description": "Muistiinpanosovellus joka sisältää myös ajastimen ja kalenterin.",
    "project.waste-classifier.description": "Työpöytäsovellus jätteen tunnistamiseen.",
    "project.finance-tracker.demo": "Verkkosovelluksen demo",
    "alert.message": "Siirrytkö GitHubiin?",
    "alert.confirm": "Vahvista",
    "alert.cancel": "Peruuta",
    "alert.email": "Sähköpostiosoite kopioitu!"
  }
};

const isValidLanguage = (lang: string): lang is Language => ['en', 'fi'].includes(lang);

const getInitialLanguage = (): Language => {
  if (browser) {
    const saved = localStorage.getItem('lang');
    if (saved && isValidLanguage(saved)) return saved;
  }

  const userLanguage = navigator.language.split('-')[0];
  return isValidLanguage(userLanguage) ? userLanguage : 'en';
};

const createI18nStore = () => {
  const { subscribe, set, update } = writable<Language>(getInitialLanguage());

  return { subscribe, set: (lang: Language) => { localStorage.setItem('lang', lang); set(lang); }, update };
};

export const lang = createI18nStore();

export const t = { subscribe: (run: (value: Record<string, string>) => void) => lang.subscribe((lang) => run(translations[lang])) };