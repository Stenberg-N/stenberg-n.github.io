export type Project = {
  title: string;
  slug: string;
  descriptionKey: string;
  techUsed: string[];
  coverImage: string;
  introImages: string[];
  allImages: string[];
  highlightImages?: string[] | null;
  imageTextsKey?: string | null;
  isWIP: boolean;
  isCurrent: boolean;
  repo: string;
  demoLink?: string | null;
  paragraphKey: string;
  featuresKey: string;
};

export type Alert = {
  id: number;
  isTimer: boolean;
  showButtons: boolean;
  message: string;
  link: string | null;
  onCancel: () => void;
};

export type ViewPort = {
  height: number;
  width: number;
};