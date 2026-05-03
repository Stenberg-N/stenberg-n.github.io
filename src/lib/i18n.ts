import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Language = 'en' | 'fi'

const translations: Record<Language, Record<string, string | string[]>> = {
  en: {
    "navigation.anchors.names": ["Home", "Projects", "About me"],
    "page-not-found": ["Something went wrong.", "Page not found.", "The page you are looking for does not exist."],
  
    "project.finance-tracker.description": "My first project. A desktop and a web app for tracking, predicting, and visualizing finances.",
    "project.finance-tracker.demo": "Web demo",
    "project.finance-tracker.imagenotes": "Here one flaw can be seen in the X-axis, where the spacing and labels are inconsistent. Stems from the app struggling to draw the X-axis with lower amounts of data.",

    "project.waste-classifier.description": "A desktop app with an ML model for classifying waste.",
    "project.waste-classifier.imagenotes": "This is a confusion matrix. It is used to get insights into how well the model makes predictions and in what labels it excels at, and where not. To put this simply, when the X- and Y-axes match on the same label, the model got the prediction right. \
    A number represent one image.",

    "project.focusboard.description": "A note taking app that integrates a calendar and a timer.",
    "project.focusboard.imagetexts": ["Make notes, customize and order them to your liking and keep everything neat with tabs.", "Add a timer to alert you, and optionally a message.", "Keep track of your events with the calendar.", "Get an in-depth perspective of your events for a selected day."],
    "project.focusboard.imagenotes": "All of the vertical grid lines might not be captured in the image.",

    "project.fin-radar.description": "A polished, completely redone version of my first project, the finance tracker. Also integrates FocusBoard.",
    "project.fin-radar.imagetexts": ["Your data is behind authentication.", "Your home page and menu. Add transactions and control your data.", "Table of your transactions. View, add, edit and search your transactions.", "Visualize your data."],

    // ALERTS
    "alert.message.github": "Continue to GitHub?",
    "alert.message.demo": "Continue to demo?",
    "alert.message.nixu": "Continue to NIXU?",
    "alert.message.jamk": "Continue to JAMK?",
    "alert.confirm": "Confirm",
    "alert.cancel": "Cancel",
    "alert.email": "Email copied!",
    "alert.project-not-found": "Project unable to be opened!",

    // MAIN PAGE
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
    "home.programming-dev.description": ["Languages: Python, Rust, JavaScript, Svelte.js", "Frameworks: Django, Tauri", "Know the basics: React.js, C#, PHP, Node.js"],
    "home.cybersec.description": ["Cisco Ethical Hacking course", "NIXU challenges: Bad Memories, Phiscap", "Forensics challenge"],
    "home.d-modeling-printing-embedded.description": ["IoT and microcontrollers: Arduino & Raspberry Pi", "Blender", "Printed a vertical axis wind turbine"],
    "home.data-science-ml.description": ["Frameworks: Scikit-learn, Tensorflow & Keras, PyTorch, Optuna, XGBoost", "Finance tracker app with finance predictions", "Waste classifier app", "Trained models for tree specie recognition"],

    // PROJECTS
    "projects.project.repository": "Project repository",
    "projects.project.imagetitle": "Project Images",
    "projects.project.finance-tracker.paragraph": [
      "This project is a personal finance tracking application designed for managing expenses and analyzing spending patterns. It started as a desktop application built with Python (Tkinter + customTkinter) and later evolved into a web application using Django.",
      "Key features the app includes:",
      "• Expense tracking and categorization",
      "• Authentication and authorization",
      "• A machine learning component for predicting future expenses",
      "• Data visualizations",
      "To improve accessability, usability, and testing, I extended the project into a web app, which required learning Django, frontend basics (JavaScript, HTML, CSS), and deploying the appliaction using NorthFlank.",
      "Looking back, the project has its limitations, especially in code structure. Instead of patching it, I decided to rebuild it using a more modern stack (Tauri + Svelte), while applying what I have learned about cleaner architecture and better coding practices."
    ],
    "projects.project.finance-tracker.variant": ["Desktop", "Web"],
    "projects.project.waste-classifier.paragraph": [
      "This project is an image classification application for sorting waste into categories using deep learning. The goal was to revisit machine learning concepts and apply them in a practical setting using PyTorch.",
      "The model was trained on the TrashNet dataset using a two-stage training approach:",
      "• Initial training phase to establish baseline performance",
      "• Fine-tuning phase with slower learning for improved accuracy",
      "I experimented with some models and found that DenseNet201 significantly outperformed MobileNet, achieving a consistent accuracy around 97%, compared to 79% - 87% with MobileNet.",
      "The application includes a PyQt-based interface for interacting with the classifier.",
      "One of the main challenges was distinguishing between visually similar materials (e.g. glass, metal, and glossy plastic), which exposed limitations in the model's ability to generalize based on surface properties. To address this, it would likely require more advanced feature engineering or dataset improvements."
    ],
    "projects.project.focusboard.paragraph": [
      "This project is a desktop note-taking and productivity application built with Tauri and Svelte. The goal was to create a lightweight, private alternative to existing tools while maintaining full control over features and data.",
      "The application includes:",
      "• Note creation, organization, and customization",
      "• Calendar and a timer with customizable notifications",
      "I chose Tauri over Electron since it doesn't bundle a full browser engine and instead uses the operating system's native WebView, which reduces resource usage and application size. This decision also introduced Rust into the backend, which required learning concepts such as ownership.",
      "One of the main challenges was working with components in Svelte, especially how to pass variables between the parent and child components.",
      "This project is part of a broader effort to build tools I actively use myself."
    ],
    "projects.project.fin-radar.paragraph": [
      "This project's aim is to bring together my past projects. It combines the finance tracker and FocusBoard applications into one.",
      "The current functions of the app:",
      "• Account registration, login, and recovery",
      "• Home page",
      "• Transactions table to view, edit, and search transactions",
      "• Two localizations: English and Finnish",
    ],

    // ABOUT ME
    "about-me.hobbies.titles": ["Mountain biking", "3D modeling & printing", "Programming"],
    "about-me.hobbies.paragraphs": [
      "Mountain biking is my way of staying active. I enjoy the technical skill and logical decisions you need on the trails.",
      "I design and 3D print my own small projects, bringing solutions to my needs.",
      "In my free time, I build programs for my needs. I always try to think of different options for my problem and and choose the most effective one in relation to the added complexity."
    ],
  },
  fi: {
    "navigation.anchors.names": ["Koti", "Projektit", "Tietoa minusta"],
    "page-not-found": ["Jokin meni pieleen.", "Sivua ei löytynyt.", "Sivua jota etsit ei ole olemassa."],

    "project.finance-tracker.description": "Työpöytä- ja verkkosovellus talousdatan seurantaan, ennustamiseen ja visualisointiin.",
    "project.finance-tracker.demo": "Verkkosovelluksen demo",
    "project.finance-tracker.imagenotes": "Tässä näkyy yksi ongelmista X-akselissa, missä jaotus ja aikaleimat ovat epäsäännölisiä. Johtuu siitä, että sovellus piirtää X-akselin huonosti, jos dataa on vähän.",

    "project.waste-classifier.description": "Työpöytäsovellus jätteen tunnistamiseen.",
    "project.waste-classifier.imagenotes": "Tämä on 'sekaannusmatriisi' (engl. confusion matrix). Yleinen tapa arvioida koneoppimismallin tarkkuutta ja nähdä missä luokissa se suoriutuu ja missä ei. Luokat ovat siis ennaltamääriteltyjä 'nimiä', johon malli luokittelee kuvan. \
      Tässä luokat ovat eri jätetyyppejä, esim. muovi, paperi, lasi yms. Miten taulukkoa tulkita yksinkertaistettuna on, kun X- ja Y-akselit kohtaavat samassa luokassa/nimessä, malli veikkasi oikein. Numero ruudussa edustaa yhtä kuvaa.",

      "project.focusboard.description": "Muistiinpanosovellus joka sisältää myös ajastimen ja kalenterin.",
    "project.focusboard.imagetexts": ["Luo muistiinpanoja, muokkaa ja järjestä ne mieluisiksi ja pidä kaikki järjestyksessä välilehtien avulla.", "Lisää ajastin hälyttämään sinua ja vaihtoehtoisesti kiinnitä viesti.", "Seuraa tapahtumiasi kalenterista.", "Näe tapahtumasi valitsemasta päivästäsi tarkemmin aikajana näkymällä."],
    "project.focusboard.imagenotes": "Jotkin pystyviivat näkyvät huonosti.",

    "project.fin-radar.description": "Siistimpi, valmiimpi, parempi ja täysin uudelleenrakennettu versio ensimmäisestä projektistani talousdatan seurantaan. Yhdistää myös FocusBoardin itseensä.",
    "project.fin-radar.imagetexts": ["Tietosi ovat tunnistautumisen takana.", "Kotisivusi ja valikko. Lisää tilitapahtumia ja hallitse dataasi.", "Taulukko tilitapahtumistasi. Selaa, lisää, muokkaa ja hae tapahtumiasi.", "Visualisoi dataasi."],
    
    // ALERTS
    "alert.message.github": "Siirrytkö GitHubiin?",
    "alert.message.demo": "Siirrytkö demoon?",
    "alert.message.nixu": "Siirrytkö NIXUun?",
    "alert.message.jamk": "Siirrytkö JAMKiin?",
    "alert.confirm": "Vahvista",
    "alert.cancel": "Peruuta",
    "alert.email": "Sähköpostiosoite kopioitu!",
    "alert.project-not-found": "Projektia ei voida avata!",

    // MAIN PAGE
    "intro-title1": "Hei! Olen",
    "intro-title2": "Niko Stenberg",
    "intro-title3": "Tuleva ICT-insinööri",
    "intro-paragraph": "Intohimoinen järjestelmistä, tietoturvasta, ohjelmoinnista/koodaamisesta ja kaikesta muusta näiden väliltä, voisi kutsua 'Full-stack' tai 'generalist'. Tykkään tietokoneista.",
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
    "home.programming-dev.description": ["Kielet: Python, Rust, JavaScript, Svelte.js", "Kehykset/Frameworkit: Django, Tauri", "Tiedän perusteet: React.js, C#, PHP, Node.js"],
    "home.cybersec.description": ["Cisco Ethical Hacking -kurssi", "NIXU haasteet: Bad Memories, Phiscap", "Forensiikka haaste"],
    "home.d-modeling-printing-embedded.description": ["IoT ja mikrokontrollerit: Arduino & Raspberry Pi", "Blender", "Tulostanut pystyakselisen tuuliturbiinin"],
    "home.data-science-ml.description": ["Kehykset/Frameworkit: Scikit-learn, Tensorflow & Keras, PyTorch, Optuna, XGBoost", "Talousdatan seurantasovellus ennustuksilla", "Jätteen tunnistamisen sovellus", "Harjoittanut koneoppimismalleja puulajien tunnistamiseen"],

    // PROJECTS
    "projects.project.repository": "Projektin arkisto (engl. repository)",
    "projects.project.imagetitle": "Projektin kuvat",
    "projects.project.finance-tracker.paragraph": [
      "Tämä projekti on henkilökohtainen talousdatan seurantasovellus, jolla voit käsitellä menojasi ja nähdä kuluttamistasi. Sovellus oli aluksi työpöytä sovellus, joka oli rakennettu Pythonilla (Tkinter + customTkinter), mutta kehittyi myöhemmin verkkosovellukseksi käyttäen Djangoa.",
      "Pääominaisuuksia sovelluksessa:",
      "• Menojen seuranta ja kategoriointi",
      "• Autentikaatio ja autorisaatio",
      "• Koneoppimiskomponentti tulevien menojen ennustamiseen",
      "• Data visualisaatioita",
      "Parantaakseni saavutettavuutta, käytettävyyttä ja testaamista, laajensin projektia verkkotasolle. Se vaati minua oppimaan Djangon, frontendin perusteet (JavaScript, HTML, CSS) ja sovelluksen käyttöönoton (deployment) NorthFlankissä.",
      "Jälkeenpäin katsoen projektilla on rajoituksensa, erityisesti koodin rakenteen suhteen. Sen sijaan, että olisin päivittänyt sitä, päätin rakentaa sen uudelleen käyttäen modernimpaa koodipinoa, engl. stack, (Tauri + Svelte) soveltaen oppimiani asioita paremmasta arkkitehtuurista ja koodamisen käytännöistä."
    ],
    "projects.project.finance-tracker.variant": ["Työpöytä", "Verkko"],
    "projects.project.waste-classifier.paragraph": [
      "Tämä projekti on kuvan luokittelu sovellus jätteen kategoriointiin käyttäen syvää oppimista. Tavoitteena oli kerrata koneoppimisen konsepteja ja laittaa ne käytäntöön käyttäen PyTorchia.",
      "Malli on harjoitettu hyödyntäen TrashNet datasettiä ja kaksivaiheista harjoitusmallia:",
      "• Ensimmäinen harjoitusvaihe asettaa perustason mallille",
      "• Hienosäätö harjoitteluvaiheessa käytetään hitaampaa oppimista parantaakseen mallin tarkkuutta",
      "Testailin joitakin malleja ja havaitsin, että DenseNet201 suoritui huomattavasti paremmin kuin MobileNet, saavuttaen tasaisen noin 97%:n tarkkuuden verrattuna MobileNetin 79-87%:iin.",
      "Sovellus käyttää PyQt-pohjaista käyttöliittymää.",
      "Yksi päähaasteista oli erottaa eri materiaalit toisistaan jotka olivat visuaalisesti samankaltaisia, esimerkiksi lasi, metalli ja kiiltävä muovi. Tämä toi esiin mallin yleistämisen, engl. generalization, rajat perustuen jätteiden pintojen ominaisuuksiin. Tämän ratkaisemiseksi todennäköisesti vaadittaisiin edistyneempää ominaisuussuunnittelua tai datasetin parannuksia."
    ],
    "projects.project.focusboard.paragraph": [
      "Tämä projekti on muistiinpano- ja tuottavuustyöpöytäsovellus, joka on rakennettu Taurilla ja Sveltellä. Tavoitteena oli rakentaa kevyt, yksityinen vaihtoehto olemassa oleville työkaluille.",
      "Sovellus sisältää:",
      "• Muistiinpanojen luonnin, järjestelemisen ja kustomoinnin",
      "• Kalenterin ja ajastimen muokattavilla notifikaatioilla",
      "Valitsin Taurin Electronin ylitse sillä se ei paketoi, engl. bundle, kokonaista selainmoottoria ja sen sijaan käyttää käyttöjärjestelmän omaa natiivia WebViewiä, mikä vähentää resurssien käyttöä ja sovelluksen kokoa. Tämä päätös toi Rustin osaksi backendiä, joka edellytti esimerkiksi omistajuuden oppimista.",
      "Yksi päähaasteista oli komponenttien kanssa työskentely Sveltellä. Erityisesti muuttujien välittäminen pää- ja lapsikomponenttien välillä.",
      "Tämä projekti on osa laajempaa pyrkimystä rakentaa työkaluja, joita itse käytän aktiivisesti."
    ],
    "projects.project.fin-radar.paragraph": [
      "Tämän projektin tarkoituksena on tuoda aikaisempia projektejani yhteen. Tämä yhdistää aikaisemman FocusBoard ja talousdatan seurantasovelluksen yhdeksi.",
      "Nykyiset sovelluksen toiminnot",
      "• Kirjautuminen, tilinluonti ja -palautus",
      "• Kotisivu",
      "• Tilitapahtumien taulukko tapahtumien katsontaan, muokkaamiseen ja etsimiseen",
      "• Kaksi lokalisaatiota: englanti ja suomi",
    ],

    // ABOUT ME
    "about-me.paragraph": [
      "Olen ICT-insinööriopiskelija, joka nauttii asioiden rakentamisesta sekä ruudulla että sen ulkopuolella. Vietän paljon aikaa maastopyöräilessä sekä 3D-suunnittelussa ja -tulostamisessa, kun minulla on jokin idea.",
      "Tykkään työskennellä käytännönläheisten ideoiden parissa. Erityisesti sellaisten, joissa voin siirtyä ideasta johonkin konkreettiseen asiaan, olipa se ohjelmisto tai fyysinen esine."
    ],
    "about-me.hobbies.titles": ["Maastopyöräily", "3D-mallentaminen & -tulostaminen", "Ohjelmointi"],
    "about-me.hobbies.paragraphs": [
      "Maastopyöräily on tapani pysyä aktiivisena. Nautin teknisen taidon ja loogisten päätöksien yhdistelmästä poluilla.",
      "Suunnittelen ja 3D-tulostan omia pieniä projekteja, tuoden ratkaisuja tarpeisiini.",
      "Vapaa-ajallani koodaan sovelluksia omiin tarpeisiini. Yritän aina miettiä eri vaihtoehtoja ongelmaani ja valita tehokkaimman niistä suhteessa lisättyyn kompleksisuuteen."
    ],
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