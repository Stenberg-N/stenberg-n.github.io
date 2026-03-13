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
    "project.waste-classifier.imagetexts": "This is a confusion matrix. It is used to get insights into how well the model makes predictions and in what labels it excels at, and where not. To put this simply, when the X- and Y-axes match on the same label, the model got the prediction right. \
    A number represent one image",
    "project.focusboard.description": "A note taking app that integrates a calendar and a timer.",
    "project.focusboard.imagetexts": ["Make notes, customize and order them to your liking and keep everything neat with tabs.", "Add a timer to alert you, and optionally a message.", "Keep track of your events with the calendar.", "Get an in-depth perspective of your events for a selected day."],
    "project.focusboard.imagenotes": "All of the vertical grid lines are not captured in the image.",

    // ALERTS
    "alert.message.github": "Continue to GitHub?",
    "alert.message.demo": "Continue to demo?",
    "alert.message.nixu": "Continue to NIXU?",
    "alert.message.jamk": "Continue to JAMK?",
    "alert.confirm": "Confirm",
    "alert.cancel": "Cancel",
    "alert.email": "Email copied!",

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
    "home.programming-dev.description": ["Languages: Python, Rust, JavaScript, Svelte", "Frameworks: Django, Tauri", "Learning: C#, PHP"],
    "home.cybersec.description": ["Cisco Ethical Hacking course", "NIXU challenges: Bad Memories, Phiscap", "Forensics challenge"],
    "home.d-modeling-printing-embedded.description": ["IoT and microcontrollers: Arduino & Raspberry Pi", "Blender", "Printed a vertical axis wind turbine"],
    "home.data-science-ml.description": ["Frameworks: Scikit-learn, Tensorflow & Keras, PyTorch, Optuna, XGBoost", "Finance tracker app with finance predictions", "Waste classifier app", "Trained models for tree specie recognition"],

    // PROJECTS
    "projects.project.imagetitle": "Project Images",
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
    "projects.project.waste-classifier.paragraph": [
      "This was my second project. The main reason for me to create this app was to bring back some concepts of ML and try refresh my memory. I had previous experience from a few years (in ~2024) back when I had coursework, where I needed to find the best model to classify tree species. \
      Some of the models were VGGNet19 and 16, Inception, Xception, and ResNet and I used the TensorFlow Keras as the framework. But with this project I needed to use PyTorch and so I just jumped straight into it. Since it had been a long time since I last did anything with classifiers, \
      and it was my first time using PyTorch, I relied a lot on other people's work. I did implement Optuna myself, since I had recently worked with it.",
      "I wanted to use PyQt as my frontend so I went with that. I trained my own models and used the TrashNet dataset for training. I split the training to two stages, where the first stage was for training the model fast and getting the foundation up, \
      and then the second stage for fine tuning and slower learning. I used MobileNetV4 initially, but switched to DenseNet201 since it was performing a lot better. MobileNetV4 is meant to be lightweight and compact, which is why I initially chose it, and is aimed for mobile devices. \
      I was averaging around 79-87% accuracy with MobileNet, but got consistent results around 97% with DenseNet.",
      "I would have liked to learn techniques on how to tackle machine vision to differentiate surfaces that share similar features, like gloss, reflectivity and so on, for example metal vs. glass vs. glossy plastic, since this was one of the main issues I think I had with the MobileNet model, \
      where it repeatedly mistook these materials between each other, but found it extremely difficult, so I moved on to my other project."
    ],
    "projects.project.focusboard.paragraph": [
      "This is my third ever project. I was interested in how some companies like Discord create their apps so I began investigating and found out they use something called Electron, which I didn't know anything about at that point in time. I found out that it uses a browser engine (Chromium) to render the app's UI, \
      but runs natively like a desktop app. I explored other options and stumbled across Tauri, which uses Rust, and I had been curious about Rust so I chose this to run my next app, which was a note-taking/productivity-ish app. Tauri is used similarly to Electron, but doesn't use a full browser engine to render the app, \
      but instead uses the operating system's native WebView (e.g. WebView2 on Windows and WKWebView on macOS).", "Next, I needed to choose the frontend and I had heard great things about Svelte.js and its performance so I went with that. As I have been working on this project, I have fallen in love with Tauri and Svelte, \
      even though Rust is very different and a lot more difficult of a language when compared to others. I wouldn't say because its inherently difficult, but there are things and concepts that no other language really has, for example ownership.", "The motivation behind this app is the same as with my Finance Tracker, \
      I am building this for myself. I know there are many options out there, like Microsoft's own app bundle (includes a calendar, to-do list, etc.), Obsidian, and Google NotebookLM, but by having my own application I get privacy and the ability to control everything, so if I am not the biggest fan of some feature, \
      I can change and tweak it."
    ],
  },
  fi: {
    home: 'Koti',
    projects: 'Projektit',
    "project.finance-tracker.description": "Työpöytä- ja verkkosovellus talousdatan seurantaan, ennustamiseen ja visualisointiin.",
    "project.finance-tracker.demo": "Verkkosovelluksen demo",
    "project.finance-tracker.imagetexts": "Tässä näkyy yksi ongelmista X-akselissa, missä jaotus ja aikaleimat ovat epäsäännölisiä. Johtuu siitä, että sovellus piirtää X-akselin huonosti, jos dataa on vähän. Itse kaavion käyrä on tarkka.",
    "project.waste-classifier.description": "Työpöytäsovellus jätteen tunnistamiseen.",
    "project.waste-classifier.imagetexts": "Tämä on 'sekaannusmatriisi' (engl. confusion matrix). Yleinen tapa arvioida koneoppimismallin tarkkuutta ja nähdä missä luokissa se suoriutuu ja missä ei. Luokat ovat siis ennaltamääriteltyjä 'nimiä', johon malli luokittelee kuvan. \
      Tässä luokat ovat eri jätetyyppejä, esim. muovi, paperi, lasi yms. Miten taulukkoa tulkita yksinkertaistettuna on, kun X- ja Y- akselit kohtaavat samassa neliössä, malli veikkasi oikein. Numero ruudussa edustaa yhtä kuvaa.",
    "project.focusboard.description": "Muistiinpanosovellus joka sisältää myös ajastimen ja kalenterin.",
    "project.focusboard.imagetexts": ["Luo muistiinpanoja, muokkaa ja järjestä ne mieluisiksi ja pidä kaikki järjestyksessä välilehtien avulla.", "Lisää ajastin hälyttämään sinua ja vaihtoehtoisesti kiinnitä viesti.", "Seuraa tapahtumiasi kalenterista.", "Näe tapahtumasi valitsemasta päivästäsi tarkemmin aikajana näkymällä."],
    "project.focusboard.imagenotes": "Jotkin pystyviivat näkyvät huonosti.",
    
    // ALERTS
    "alert.message.github": "Siirrytkö GitHubiin?",
    "alert.message.demo": "Siirrytkö demoon?",
    "alert.message.nixu": "Siirrytkö NIXUun?",
    "alert.message.jamk": "Siirrytkö JAMKiin?",
    "alert.confirm": "Vahvista",
    "alert.cancel": "Peruuta",
    "alert.email": "Sähköpostiosoite kopioitu!",

    // MAIN PAGE
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

    // PROJECTS
    "projects.project.imagetitle": "Projektin kuvat",
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
    "projects.project.waste-classifier.paragraph": [
      "Tämä oli minun toinen projekti. Ensisijainen syy miksi tein tämän sovelluksen oli, koska halusin virkistää muistiani liittyen koneoppimiseen. Minulla oli aikaisempaa kokemusta parin vuoden takaa (noin 2024), jolloin minulla oli kursseja jossa minun piti löytää paras koneoppimismalli puulajien \
      tunnistamiseen. Malleja joita käytin oli muun muassa VGGNet19 ja 16, Inception, Xception ja Resnet, ja kehyksenä (frameworkinä) käytin TensorFlow Keras:ia. Tässä projektissa minun kuitenkin tuli käyttää PyTorchia ja en kauheasti valmistellut vaan hyppäsin suoraan asiaan. \
      Koska siitä oli jonkin verran aikaa kun olin tehnyt mitään luokittelijoiden (classifier) kanssa ja, kun tämä oli ensimmäinen kerta kun käytän PyTorchia, seurasin paljolti muiden ihmisten töitä. Optunan kylläkin implementoin itse, kun olin hetkittäin juuri työskennellyt sen kanssa.",
      "Halusin käyttää PyQt:ta sovelluksen käyttöliittymänä (GUI), joten menin sillä. Harjotin omat mallini ja käytin TrashNet datasettiä harjottamisessa. Jaoin harjoituksen kahteen vaiheeseen/osaan, missä ensimmäinen oli harjoittaakseen mallia nopeasti ja rakentaa pohja sille, jonka jälkeen \
      vaihe 2. oli hienosäätöä ja hitaampaa oppimista. Käytin MobileNetV4 aluksi, mutta vaihdoin DenseNet201:een, sillä se suoriutui huomattavasti paremmin. MobileNetin tarkoituksena on olla kevyt, joka oli syy miksi valitsin sen, ja se on tarkoitettu mobiililaitteille. Tulokseni pyöri 79-87% tarkkuuden \
      välillä MobileNetillä, mutta sain säännöllisesti 97% ympyröissä DenseNetillä eri testeissä.",
      "Olisin halunnut oppia eri tekniikoita, miten saada konenäkö erottamaan eri pintoja joilla on samankaltaisia ominaisuuksia, kuten kiilto ja heijastuskyky, esimerkiksi metalli vs. lasi vs. kiiltävä muovi, sillä tämä oli mielestäni yksi ongelmista mikä minulla tuli vastaan MobileNetillä. Mallini säännöllisesti \
      ei osannut erottaa metallia, lasia ja muovia toisistaan. Tämä kuitenkin oli hyvin vaikeaa, joten jatkoin seuraavaan projektiini."
    ],
    "projects.project.focusboard.paragraph": [
      "Tämä on kolmas projektini, mitä olen tehnyt. Olin kiinnostunut miten yritykset kuten Discord tekevät sovelluksensa, joten selvitin sen ja löysin, että he käyttävät Electronia, mistä en tiennyt mitään. Perehdyin Electroniin ja opin, että se käyttää selainmoottori (browser engine) Chromiumia renderöidäkseen sovelluksen \
      käyttöliittymän, mutta sovellus samaan aikaan toimii kuten mikä tahansa muu työpöytäsovellus. Tutustuin muihin vaihtoehtoihin ja törmäsin Tauriin joka käyttää Rustia kielenään, ja olin ollut hyvin kiinnostunut Rustista niin valitsin tämän sovellukseni pohjaksi, mikä oli pääasiassa muistiinpano-/tuottavuussovellus. \
      Tauria käytetään samaan kuin Electronia, mutta se ei käytä kokonaista selainmoottoria sovelluksen renderöimiseksi, vaan käyttöjärjestelmän omaa WebView:iä (Windowsissa WebView2 ja macOS:ssä WKWebView).", "Seuraavaksi minun tuli valita frontend sovellukseni ja olin kuullut paljon hyvää Svelte.js:stä ja sen suorituskyvystä, \
      joten valitsin sen. Sen kauemmin olen työstänyt tätä projektia, sen enemmän olen tykästynyt Tauriin ja Svelteen, vaikkakin Rust on jokseenkin erilainen ja huomattavasti vaikeampi kieli verrattuna muihin. En sanoisi, että Rust itsessään on mitenkään vaikeaa, mutta Rustissa on erilaisia asioita ja konsepteja joita ei muissa \
      kielissä oikeastaan ole, kuten omistajuus.", "Syy sovelluksen kehittämiselle on ollut sama kuin minun talousdatan seurantasovelluksellakin, eli teen sovellusta omaan käyttöön. Tiedän, että on useita eri vaihtoehtoja olemassa kuten Microsoftin omat (sisältää kalenterin, to-do listan yms.), Obsidian ja Googlen NotebookLM, \
      mutta oma sovellus antaa minulle yksityisyyttä ja kyvyn hallita asioita. Esimerkiksi, jos edellämainituissa sovelluksissa olisi jokin ominaisuus, josta en ole kauhean innoissani, voin muuttaa sitä."
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