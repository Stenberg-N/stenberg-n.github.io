import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { fi } from './translations/fi';
import { en } from './translations/en';

type Language = 'en' | 'fi';
export type Translation = Record<string, string | string[] | Array<string[]>>;

const translations: Record<Language, Translation> = {
  en: en,
  fi: fi,
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

export const t = {
  subscribe: (run: (value: Translation) => void) => lang.subscribe((lang) => run(translations[lang]))
};