import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Language = 'en' | 'fi'

const translations: Record<Language, Record<string, string | string[]>> = {
  en: {
    home: 'Home',
    projects: 'Projects',
    "project.finance-tracker.description": "A desktop and a web app for tracking, predicting, and visualizing finances.",
    "project.finance-tracker.demo": "Web demo",
    "project.finance-tracker.imagetexts": "Here one flaw can be seen in the X-axis, where the spacing and labels are inconsistent. Stems from the app struggling to draw the X-axis with lower amounts of data. The actual graph line is accurate.",
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
    "home.view-projects": "My projects",
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
    "projects.project.finance-tracker.paragraph": [
      "This was my first real project. The purpose behind this app was for it to be something I would personally use. Before this, I had only made simple stuff with Python like calculators, to-do lists, and basic CLI-based tools.",
      "This was supposed to be a simple tracking app for finances made with Python and a combination of Tkinter and the modernized customTkinter for the GUI, but I decided to jump into machine learning since it had been a couple of years since I last had worked with ML \
      and it was the next clear step for the app. When the app began to have functionality, I wanted to create an easy way to test it, so I decided to make a web app for it, which led me to learn some Django, JavaScript, CSS, and HTML. \
      I also needed a platform to host it on and found NorthFlank, where I needed to learn how their app deployment works.",
      "As I have continued to code, I have learned a lot along the way, and looking back at this app, naturally, I see there are many things I would do differently, and there are a lot of flaws in its code. \
      My plan was to come back and fix its code, but that would require me to quite frankly write everything from scratch, which has led me to make the decision, that I would create the app on another stack, using Tauri, Svelte.js and Python. \
      This also serves as a next step in my learning, where I need to figure out how I can combine Tauri's Rust backend with Python and make that work with the Svelte frontend."
    ],
    "projects.project.finance-tracker.variant": ["Desktop", "Web"],
  },
  fi: {
    home: 'Koti',
    projects: 'Projektit',
    "project.finance-tracker.description": "Työpöytä- ja verkkosovellus talousdatan seurantaan, ennustamiseen ja visualisointiin.",
    "project.finance-tracker.demo": "Verkkosovelluksen demo",
    "project.finance-tracker.imagetexts": "Tässä näkyy yksi ongelmista X-akselissa, missä jaotus ja aikaleimat ovat epäsäännölisiä. Johtuu siitä, että sovellus piirtää X-akselin huonosti, jos dataa on vähän. Itse kaavion käyrä on tarkka.",
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
    "home.view-projects": "Projektit",
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
    "projects.project.finance-tracker.paragraph": [
      "Tämä oli ensimmäinen kunnon projektini. Tarkoituksena oli tehdä sovellus, mitä itse olisin käyttänyt. Ennen tätä olin vain tehnyt yksinkertaisia asioita Pythonilla, kuten laskimia, to-do listoja ja CLI- tai komentorivi-pohjaisia työkaluja.",
      "Sovelluksen piti olla suhteellisen yksinkertainen sovellus talousdatan seuraamiseen, mikä olisi pohjautunut Pythoniin ja käyttänyt Pythonin omaa Tkinteriä ja modernimpaa versiota, customTkinteriä, käyttöliittymänään (GUI:na), mutta päätin sisällyttää koneoppimista tehdäkseni ennusteita datasta, \
      sillä se olisi ollut seuraava askel sovelluksen kehityksessä ja siitä oli useampi vuosi milloin viimeksi olin tehnyt jotain koneoppimismallien kanssa. Kun sovellus oli kehittynyt tarpeeksi, halusin että sovellusta voisi helposti testata ilman mitään sen suurempia, kuten lataamista yms., \
      joten päätin tehdä verkkosovelluksen siitä. Tämän kautta opin jonkin verran Djangoa, JavaScriptiä, CSS:ää ja HTML:ää. Tarvitsin myös jonkin alustan missä sovellus olisi pyörinyt ja löysin NorthFlankin, jossa minun piti opetella miten heidän sovelluksen käyttöönotto (deployment) tapahtuu.",
      "Olen oppinut paljon matkan varrella, kun olen jatkanut koodamista ja aika ajoin kun olen katsonut tätä projektia, huomaan miten nykyään tekisin monet asiat aivan erilailla, ja lisäksi miten projektin koodissa on paljon virheitä ja vikoja. Ajatuksenani oli ollut, että korjaisin koodin jossain kohtaa, \
      mutta tämä oikeastaan tarkoittaisi sitä, että kirjoittaisin kaiken koodin alusta, mikä sai minut ajattelemaan jos koko sovelluksen tekisi muulla stackillä, eli Tauri + Svelte.js + Python. Tämä olisi myös seuraava askel oppimisessani, sillä minun tulisi saada Python kommunikoimaan Taurin backendin \
      kanssa, mikä on Rustia."
    ],
    "projects.project.finance-tracker.variant": ["Työpöytä", "Verkko"],
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