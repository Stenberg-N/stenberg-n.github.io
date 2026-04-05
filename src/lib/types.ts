export type chosenImage = {
  id: number;
  image: string;
}

export type imageNote = {
  id: number;
  note: string;
}

export type allPicture = {
  id: number;
  pic: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  descriptionKey: string;
  tech: string[];
  picture: string;
  allPictures: allPicture[];
  chosenImages: chosenImage[];
  imageNotes: imageNote[];
  imageTexts: string;
  demo: string;
  isWIP: boolean;
  isCurrent: boolean;
}

export type Alert = {
  id: number;
  isTimer: boolean;
  showButtons: boolean;
  message: string;
  link: string | null;
  onCancel: () => void;
}