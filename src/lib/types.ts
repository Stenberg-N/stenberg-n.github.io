export type chosenImage = {
  id: number;
  image: string;
}

export type imageNote = {
  id: number;
  note: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  descriptionKey: string;
  tech: string[];
  picture: string;
  chosenImages: chosenImage[];
  imageNotes: imageNote[];
  imageTexts: string;
  demo: string;
  isWIP: boolean;
  isCurrent: boolean;
}