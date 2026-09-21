import { get } from "svelte/store";

import type { Project } from "./types"
import { lang, t } from './i18n/i18n';

export const projects: Project[] = [
  {
    title: "FinRadar",
    slug: "fin-radar",
    descriptionKey: "projects.project.fin-radar.description",
    techUsed: ["Tauri", "Rust", "Python", "TypeScript", "Svelte"],
    coverImage: "/images/fin-radar4.png",
    introImages: ["/images/fin-radar9.png", "/images/fin-radar4.png"],
    allImages: [
      "/images/fin-radar1.png",
      "/images/fin-radar2.png",
      "/images/fin-radar3.png",
      "/images/fin-radar4.png",
      "/images/fin-radar5.png",
      "/images/fin-radar6.png",
      "/images/fin-radar7.png",
      "/images/fin-radar8.png",
      "/images/fin-radar9.png",
      "/images/fin-radar10.png",
      "/images/fin-radar11.png",
    ],
    highlightImages: [
      "/images/fin-radar1.png",
      "/images/fin-radar3.png",
      "/images/fin-radar4.png",
      "/images/fin-radar6.png",
    ],

    imageTextsKey: "projects.project.fin-radar.imagetexts",
    isWIP: true,
    isCurrent: true,
    repo: "https://github.com/Stenberg-N/fin-radar",
    demoLink: null,
    paragraphKey: "projects.project.fin-radar.paragraph",
    featuresKey: "projects.project.fin-radar.features",
  },
  {
    title: "Finance Tracker",
    slug: "finance-tracker",
    descriptionKey: "projects.project.finance-tracker.description",
    techUsed: ["Python", "JavaScript", "Django", "Scikit-learn"],
    coverImage: "/images/web-finance-tracker1.png",
    introImages: ["/images/desktop-finance-tracker1.png", "/images/web-finance-tracker1.png"],
    allImages: [
      "/images/desktop-finance-tracker1.png",
      "/images/desktop-finance-tracker2.png",
      "/images/desktop-finance-tracker3.png",
      "/images/finance-tracker1.png",
      "/images/finance-tracker2.png",
      "/images/web-finance-tracker1.png",
      "/images/web-finance-tracker2.png",
      "/images/web-finance-tracker3.png",
      "/images/web-finance-tracker4.png",
      "/images/web-finance-tracker5.png",
      "/images/web-finance-tracker6.png",
      "/images/web-finance-tracker7.png",
    ],
    highlightImages: null,
    imageTextsKey: null,
    isWIP: false,
    isCurrent: false,
    repo: "https://github.com/Stenberg-N/finance-tracker",
    demoLink: "https://site--financetracker-app--kwlb8kg8h4nw.code.run/login/?next=/",
    paragraphKey: "projects.project.finance-tracker.paragraph",
    featuresKey: "projects.project.finance-tracker.features",
  },
  {
    title: "FocusBoard",
    slug: "focusboard",
    descriptionKey: "projects.project.focusboard.description",
    techUsed: ["Tauri", "Rust", "TypeScript", "Svelte"],
    coverImage: "/images/focusboard1.png",
    introImages: ["/images/focusboard3.png", "/images/focusboard1.png"],
    allImages: [
      "/images/focusboard1.png",
      "/images/focusboard2.png",
      "/images/focusboard3.png",
      "/images/focusboard4.png",
      "/images/focusboard5.png",
      "/images/focusboard6.png",
      "/images/focusboard7.png",
    ],
    highlightImages: null,
    imageTextsKey: null,
    isWIP: false,
    isCurrent: false,
    repo: "https://github.com/Stenberg-N/focusboard",
    demoLink: null,
    paragraphKey: "projects.project.focusboard.paragraph",
    featuresKey: "projects.project.focusboard.features",
  },
  {
    title: "Waste Classifier",
    slug: "waste-classifier",
    descriptionKey: "projects.project.waste-classifier.description",
    techUsed: ["Python", "PyTorch", "PyQt"],
    coverImage: "/images/waste-classifier4.png",
    introImages: ["/images/waste-classifier7.png"],
    allImages: [
      "/images/waste-classifier1.png",
      "/images/waste-classifier2.png",
      "/images/waste-classifier3.png",
      "/images/waste-classifier4.png",
      "/images/waste-classifier5.png",
      "/images/waste-classifier6.png",
      "/images/waste-classifier7.png",
      "/images/waste-classifier8.png",
    ],
    highlightImages: null,
    imageTextsKey: null,
    isWIP: false,
    isCurrent: false,
    repo: "https://github.com/Stenberg-N/waste-classification",
    demoLink: null,
    paragraphKey: "projects.project.waste-classifier.paragraph",
    featuresKey: "projects.project.waste-classifier.features",
  },
];

let imageNoteResolve: () => void;
const imageNotePromise = new Promise<void>((resolve) => {
  imageNoteResolve = resolve;
});

const updateImageNotes = async () => {
  await imageNotePromise;

  imageNotes.entries().forEach((entry) => {
    imageNotes.set(entry[0], get(t)[`projects.project.${entry[0].split("/")[2].slice(0, -5)}.imagenotes`] as string);
  });
};

lang.subscribe(updateImageNotes);

const createImageNotes = () => {
  const m = new Map([
    ["/images/waste-classifier3.png", get(t)["projects.project.waste-classifier.imagenotes"][0] as string],
    ["/images/focusboard5.png", get(t)["projects.project.focusboard.imagenotes"][0] as string],
    ["/images/finance-tracker2.png", get(t)["projects.project.finance-tracker.imagenotes"] as string],
  ]);

  imageNoteResolve();

  return m;
};

export const imageNotes = createImageNotes();