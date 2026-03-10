import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Language = 'en' | 'fi'

const translations: Record<Language, Record<string, string | string[]>> = {
  en: {
    home: 'Home',
    projects: 'Projects',
    "project.finance-tracker.description": "A desktop and a web app for tracking, predicting, and visualizing finances.",
    "project.finance-tracker.demo": "Web app's demo",
    "project.finance-tracker.imagetexts": "",
    "project.waste-classifier.description": "A desktop app with an ML model for classifying waste.",
    "project.waste-classifier.imagetexts": "",
    "project.focusboard.description": "A note taking app that integrates a calendar and a timer.",
    "project.focusboard.imagetexts": ["Make notes, customize and order them to your liking and keep everything neat with tabs.", "Add a timer to alert you, and optionally a message.", "Keep track of your events with the calendar.", "Get an in-depth perspective of your events for a selected day."],
    "project.focusboard.imagenotes": "All of the vertical grid lines are not captured in the image.",
    "alert.message": "Continue to GitHub?",
    "alert.confirm": "Confirm",
    "alert.cancel": "Cancel",
    "alert.email": "Email copied!",
    "intro-title1": "Hello, I'm",
    "intro-title2": "Niko Stenberg",
    "intro-title3": "Aspiring ICT engineer",
    "intro-paragraph": "Passionate about systems, security, programming and everything in between, a full-stack or generalist of sorts. What can I say, I love computers.",
    "contact-location": "Finland, Tavastia Proper",
    "home.sub-content.knowledge.title": "What I know",
    "home.sub-content.working-on.title": "Currently working on",
    "home.networking-systems.title": "Networking & Systems administration",
    "home.programming-dev.title": "Programming & Development",
    "home.cybersec.title": "Cybersecurity",
    "home.3d-modeling-printing-embedded.title": "3D-modeling & printing + Embedded systems",
    "home.data-science-ml.title": "Data science & Machine learning",
    "home.networking-systems.description": ["Red Hat Enterprise Linux (RHEL) Sysadmin courses 1 & 2 (RH134, RH124)", "RHEL automation with Ansible (RH294)", "Cisco CCNA training"],
    "home.programming-dev.description": ["Languages: Python, Rust, JavaScript, Svelte", "Frameworks: Django, Tauri", "Learning: C#, PHP"],
    "home.cybersec.description": ["Cisco Ethical Hacking course", "NIXU challenges: Bad Memories, Phiscap", "Forensics challenge"],
    "home.d-modeling-printing-embedded.description": ["IoT and microcontrollers: Arduino & Raspberry Pi", "Blender", "Printed a vertical axis wind turbine"],
    "home.data-science-ml.description": ["Frameworks: Scikit-learn, Tensorflow & Keras, PyTorch, Optuna, XGBoost", "Finance tracker app with finance predictions", "Waste classifier app", "Trained models for tree specie recognition"],
  },
  fi: {
    home: 'Koti',
    projects: 'Projektit',
    "project.finance-tracker.description": "Työpöytä- ja verkkosovellus talousdatan seurantaan, ennustamiseen ja visualisointiin.",
    "project.finance-tracker.demo": "Verkkosovelluksen demo",
    "project.waste-classifier.description": "Työpöytäsovellus jätteen tunnistamiseen.",
    "project.focusboard.description": "Muistiinpanosovellus joka sisältää myös ajastimen ja kalenterin.",
    "project.focusboard.imagetexts": ["Luo muistiinpanoja, muokkaa ja järjestä ne mieluisiksi ja pidä kaikki järjestyksessä välilehtien avulla.", "Lisää ajastin hälyttämään sinua ja vaihtoehtoisesti kiinnitä viesti.", "Seuraa tapahtumiasi kalenterista.", "Näe tapahtumasi valitsemasta päivästäsi tarkemmin aikajana näkymällä."],
    "project.focusboard.imagenotes": "Jotkin pystyviivat näkyvät huonosti.",
    "alert.message": "Siirrytkö GitHubiin?",
    "alert.confirm": "Vahvista",
    "alert.cancel": "Peruuta",
    "alert.email": "Sähköpostiosoite kopioitu!",
    "intro-title1": "Hei! Olen",
    "intro-title2": "Niko Stenberg",
    "intro-title3": "Tuleva ICT-insinööri",
    "intro-paragraph": "Intohimoinen järjestelmistä, turvallisuudesta, ohjelmoinnista/koodaamisesta ja kaikesta muusta näiden väliltä, voisi kutsua 'Full-stack' tai 'generalist'. Tykkään tietokoneista.",
    "contact-location": "Suomi, Kanta-Häme",
    "home.sub-content.knowledge.title": "Mitä tiedän",
    "home.sub-content.working-on.title": "Tällä hetkellä työn alla",
    "home.networking-systems.title": "Tietoverkot & Järjestelmienhallinta",
    "home.programming-dev.title": "Ohjelmointi & Ohjelmistokehitys",
    "home.cybersec.title": "Kyberturvallisuus",
    "home.3d-modeling-printing-embedded.title": "3D-mallintaminen ja -tulostaminen + Sulautetut järjestelmät",
    "home.data-science-ml.title": "Datatiede & Koneoppiminen",
    "home.networking-systems.description": ["Red Hat Enterpise Linux (RHEL) järjestelmänhallinta kurssit 1 & 2 (RH134, RH124)", "RHEL automaatio Ansiblella (RH294)", "Cisco CCNA teoria"],
    "home.programming-dev.description": ["Kielet: Python, Rust, JavaScript, Svelte", "Kehykset/Frameworkit: Django, Tauri", "Oppimassa: C#, PHP"],
    "home.cybersec.description": ["Cisco Ethical Hacking -kurssi", "NIXU haasteet: Bad Memories, Phiscap", "Forensiikka haaste"],
    "home.d-modeling-printing-embedded.description": ["IoT ja mikrokontrollerit: Arduino & Raspberry Pi", "Blender", "Tulostanut pystyakselisen tuuliturbiinin"],
    "home.data-science-ml.description": ["Kehykset/Frameworkit: Scikit-learn, Tensorflow & Keras, PyTorch, Optuna, XGBoost", "Talousdatan seurantasovellus ennustuksilla", "Jätteen tunnistamisen sovellus", "Harjoittanut koneoppimismalleja puulajien tunnistamiseen"],
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

export const t = { subscribe: (run: (value: Record<string, string | string[]>) => void) => lang.subscribe((lang) => run(translations[lang])) };