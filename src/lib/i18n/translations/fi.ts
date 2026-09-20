import type { Translation } from "../i18n";

export const fi: Translation = {
  "navigation.anchors.names": ["Koti", "Projektit", "Tietoa minusta"],
  "page-not-found": ["Jokin meni pieleen.", "Sivua ei löytynyt.", "Sivua jota etsit ei ole olemassa."],
  "button.confirm": "Vahvista",
  "button.cancel": "Peruuta",
  "button.close": "Sulje",
  
  // ALERTS
  "alert.message.github": "Siirrytkö GitHubiin?",
  "alert.message.linkedin": "Siirrytkö LinkedIniin?",
  "alert.message.demo": "Siirrytkö demoon?",
  "alert.message.dnv": "Siirrytkö DNV Cyber haasteisiin?",
  "alert.message.jamk": "Siirrytkö JAMKiin?",
  "alert.email": "Sähköpostiosoite kopioitu!",
  "alert.project-not-found": "Projektia ei voida avata!",

  // HOME PAGE
  "intro-titles": ["Hei! Olen", "Niko Stenberg", "Tuleva ICT-insinööri"],
  "intro-paragraph": "Intohimoinen järjestelmistä, tietoturvasta, ohjelmoinnista/koodaamisesta ja kaikesta muusta näiden väliltä, voisi kutsua 'Full-stack' tai 'generalist'. Tykkään tietokoneista.",
  "contact-location": "Suomi, Kanta-Häme",
  "home.view-projects": "Projektit",
  "home.knowledge.title": "Mitä tiedän",
  "home.working-on.title": "Tällä hetkellä työn alla",
  "home.paragraph.no-current-message": "No current project",
  "home.view-current-project": "Siirry projektiin",
  "home.networking-systems.title": "Tietoverkot & Järjestelmänhallinta",
  "home.programming-dev.title": "Ohjelmointi & Ohjelmistokehitys",
  "home.cybersec.title": "Kyberturvallisuus",
  "home.3d-modeling-printing-embedded.title": "3D-mallintaminen ja -tulostaminen + Sulautetut järjestelmät",
  "home.data-science-ml.title": "Datatiede & Koneoppiminen",
  "home.networking-systems.description": [
    "Red Hat Enterpise Linux (RHEL) järjestelmänhallinta kurssit 1 & 2 (RH134, RH124)",
    "RHEL automaatio Ansiblella (RH294)",
    "Cisco CCNA teoria",
    "Windows, Kali Linux, Red Hat Enterprise Linux"
  ],
  "home.programming-dev.description": [
    "Kielet: Python, Rust, JavaScript, TypeScript, SQL",
    "Kehykset: Django, Tauri, Node.js, Express.js, Svelte.js, React.js",
    "Työkalut: PowerShell, WireShark, Ansible, Oracle VirtualBox",
    "Tiedän perusteet: C#, PHP"
  ],
  "home.cybersec.description": [
    "Cisco Ethical Hacking -kurssi",
    "DNV Cyber haasteet: Bad Memories, Phiscap (aiemmin NIXU)",
    "Forensiikka haaste"
  ],
  "home.3d-modeling-printing-embedded.description": ["Arduino", "Blender", "Tulostanut pystyakselisen tuuliturbiinin"],
  "home.data-science-ml.description": [
    "Kehykset/Frameworkit: Scikit-learn, PyTorch, Tensorflow, Optuna, XGBoost",
    "Talousdatan seurantasovellus ennustuksilla",
    "Jätteen tunnistamisen sovellus",
    "Hyödynsin siirto-oppimista (engl. transfer learning) ImageNetillä koulutettuja malleja kuten ResNet50, VGGNet16/19, InceptionV3 ja Xception puulajien luokittelussa.",
  ],

  // PROJECTS
  "projects.project.repository": "Projektin repositorio",
  "projects.project.imagetitle": "Projektin kuvat",
  "projects.project-status.wip": "Työn alla",
  "projects.project-status.inactive": "Epäaktiivinen",
  "projects.project.demo.web": "Verkkosovellus demo",

  // FINANCE TRACKER
  "projects.project.finance-tracker.description": "Työpöytä- ja verkkosovellus talousdatan seurantaan, ennustamiseen ja visualisointiin.",
  "projects.project.finance-tracker.imagenotes": ["Tässä näkyy yksi ongelmista X-akselissa, missä jaotus ja aikaleimat ovat epäsäännölisiä. Johtuu siitä, että sovellus piirtää X-akselin huonosti, jos dataa on vähän."],
  "projects.project.finance-tracker.paragraph": [
    "Tämä projekti on henkilökohtainen talousdatan seurantasovellus, jolla voit käsitellä menojasi ja nähdä kuluttamistasi. Sovellus oli aluksi työpöytä sovellus, joka oli rakennettu Pythonilla (Tkinter + customTkinter), \
      mutta kehittyi myöhemmin verkkosovellukseksi käyttäen Djangoa.\
    ",
    "Parantaakseni saavutettavuutta, käytettävyyttä ja testaamista, laajensin projektia verkkotasolle. Se vaati minua oppimaan Djangon, frontendin perusteet (JavaScript, HTML, CSS) ja sovelluksen käyttöönoton (deployment) NorthFlankissä.",
    "Jälkeenpäin katsoen projektilla on rajoituksensa, erityisesti koodin rakenteen suhteen. Sen sijaan, että olisin päivittänyt sitä, päätin rakentaa sen uudelleen käyttäen modernimpaa koodipinoa, engl. stack, \
      (Tauri + Svelte) soveltaen oppimiani asioita paremmasta arkkitehtuurista ja koodamisen käytännöistä.\
    ",
    "Pääominaisuuksia sovelluksessa:",
  ],
  "projects.project.finance-tracker.features": [
    "Menojen seuranta ja kategoriointi",
    "Autentikaatio ja autorisaatio",
    "Koneoppimiskomponentti tulevien menojen ennustamiseen",
    "Data visualisaatioita",
  ],
  "projects.project.finance-tracker.variant": ["Työpöytä", "Verkko"],

  // WASTE CLASSIFIER
  "projects.project.waste-classifier.description": "Työpöytäsovellus jätteen tunnistamiseen.",
  "projects.project.waste-classifier.imagenotes": [
    "Tämä on 'sekaannusmatriisi' (engl. confusion matrix). Yleinen tapa arvioida koneoppimismallin tarkkuutta ja nähdä missä luokissa se suoriutuu ja missä ei. \
    Luokat ovat siis ennaltamääriteltyjä 'nimiä', johon malli luokittelee kuvan. Tässä luokat ovat eri jätetyyppejä, esim. muovi, paperi, lasi yms. \
    Miten taulukkoa tulkita yksinkertaistettuna on, kun X- ja Y-akselit kohtaavat samassa luokassa/nimessä, malli veikkasi oikein. Numero ruudussa edustaa yhtä kuvaa."
  ],
  "projects.project.waste-classifier.paragraph": [
    "Tämä projekti on kuvan luokittelu sovellus jätteen kategoriointiin käyttäen syvää oppimista. Tavoitteena oli kerrata koneoppimisen konsepteja ja laittaa ne käytäntöön käyttäen PyTorchia.",
    "Testailin joitakin malleja ja havaitsin, että DenseNet201 suoritui huomattavasti paremmin kuin MobileNet, saavuttaen tasaisen noin 97%:n tarkkuuden verrattuna MobileNetin 79-87%:iin.",
    "Sovellus käyttää PyQt-pohjaista käyttöliittymää.",
    "Yksi päähaasteista oli erottaa eri materiaalit toisistaan jotka olivat visuaalisesti samankaltaisia, esimerkiksi lasi, metalli ja kiiltävä muovi. Tämä toi esiin mallin yleistämisen, engl. generalization, rajat perustuen jätteiden pintojen ominaisuuksiin. \
      Tämän ratkaisemiseksi todennäköisesti vaadittaisiin edistyneempää ominaisuussuunnittelua tai datasetin parannuksia.\
    ",
    "Malli on harjoitettu hyödyntäen TrashNet datasettiä ja kaksivaiheista harjoitusmallia:",
  ],
  "projects.project.waste-classifier.features": [
    "Ensimmäinen harjoitusvaihe asettaa perustason mallille",
    "Hienosäätö harjoitteluvaiheessa käytetään hitaampaa oppimista parantaakseen mallin tarkkuutta",
  ],

  // FOCUSBOARD
  "projects.project.focusboard.description": "Muistiinpanosovellus joka sisältää myös ajastimen ja kalenterin.",
  "projects.project.focusboard.imagenotes": ["Jotkin pystyviivat näkyvät huonosti."],
  "projects.project.focusboard.paragraph": [
    "Tämä projekti on muistiinpano- ja tuottavuustyöpöytäsovellus, joka on rakennettu Taurilla ja Sveltellä. Tavoitteena oli rakentaa kevyt, yksityinen vaihtoehto olemassa oleville työkaluille.",
    "Valitsin Taurin Electronin ylitse sillä se ei paketoi, engl. bundle, kokonaista selainmoottoria ja sen sijaan käyttää käyttöjärjestelmän omaa natiivia WebViewiä, mikä vähentää resurssien käyttöä ja sovelluksen kokoa. Tämä päätös toi Rustin osaksi backendiä, joka edellytti esimerkiksi omistajuuden oppimista.",
    "Yksi päähaasteista oli komponenttien kanssa työskentely Sveltellä. Erityisesti muuttujien välittäminen pää- ja lapsikomponenttien välillä.",
    "Tämä projekti on osa laajempaa pyrkimystä rakentaa työkaluja, joita itse käytän aktiivisesti.",
    "Sovellus sisältää:",
  ],
  "projects.project.focusboard.features": [
    "Muistiinpanojen luonnin, järjestelemisen ja kustomoinnin",
    "Kalenterin ja ajastimen muokattavilla notifikaatioilla",
  ],

  // FINRADAR
  "projects.project.fin-radar.description": "Siistimpi, valmiimpi, parempi ja täysin uudelleenrakennettu versio ensimmäisestä projektistani talousdatan seurantaan. Yhdistää myös FocusBoardin itseensä.",
  "projects.project.fin-radar.imagetexts": [
    "Tunnistautuminen. Tietosi ovat tunnistautumisen takana.",
    "Kotisivusi ja valikko. Lisää tilitapahtumia ja hallitse dataasi.",
    "Taulukko tilitapahtumistasi. Selaa, lisää, muokkaa ja hae tapahtumiasi.",
    "Data visualisaatioita. Visualisoi dataasi kaavioilla."
  ],
  "projects.project.fin-radar.paragraph": [
    "Tämän projektin tarkoituksena on tuoda aikaisempia projektejani yhteen. Tämä yhdistää aikaisemman FocusBoard ja talousdatan seurantasovelluksen yhdeksi.",
    "Nykyiset sovelluksen toiminnot:",
  ],
  "projects.project.fin-radar.features": [
    "Kirjautuminen, tilinluonti ja -palautus",
    "Kotisivu",
    "Muistiinpanot",
    "Ajastimet",
    "Kalenteri",
    "Tilitapahtumien taulukko tapahtumien katsontaan, muokkaamiseen ja etsimiseen",
    "Kaksi lokalisaatiota: englanti ja suomi",
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
};