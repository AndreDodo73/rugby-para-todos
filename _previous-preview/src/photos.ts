import corrida from "./assets/photos/corrida.jpg";
import grupo from "./assets/photos/grupo.jpg";
import jogo from "./assets/photos/jogo.jpg";
import roda from "./assets/photos/roda.jpg";
import conversa from "./assets/photos/conversa.jpg";
import medalhas from "./assets/photos/medalhas.jpg";
import portal from "./assets/photos/portal.jpg";
import tres from "./assets/photos/tres.jpg";
import fila from "./assets/photos/fila.jpg";
import trofeu from "./assets/photos/trofeu.jpg";
import palco from "./assets/photos/palco.jpg";

export type PhotoId =
  | "corrida"
  | "grupo"
  | "jogo"
  | "roda"
  | "conversa"
  | "medalhas"
  | "portal"
  | "tres"
  | "fila"
  | "trofeu"
  | "palco";

export type Photo = {
  id: PhotoId;
  src: string;
  w: number;
  h: number;
};

export const photos: Record<PhotoId, Photo> = {
  corrida: { id: "corrida", src: corrida, w: 1600, h: 1066 },
  grupo: { id: "grupo", src: grupo, w: 1800, h: 859 },
  jogo: { id: "jogo", src: jogo, w: 1600, h: 1067 },
  roda: { id: "roda", src: roda, w: 1548, h: 1032 },
  conversa: { id: "conversa", src: conversa, w: 1548, h: 867 },
  medalhas: { id: "medalhas", src: medalhas, w: 1400, h: 1400 },
  portal: { id: "portal", src: portal, w: 1600, h: 1066 },
  tres: { id: "tres", src: tres, w: 1050, h: 1400 },
  fila: { id: "fila", src: fila, w: 1800, h: 1200 },
  trofeu: { id: "trofeu", src: trofeu, w: 1500, h: 940 },
  palco: { id: "palco", src: palco, w: 1400, h: 935 },
};

export const galleryOrder = [
  "corrida",
  "grupo",
  "portal",
  "tres",
  "medalhas",
  "fila",
  "jogo",
  "trofeu",
  "palco",
] as const;

export type GalleryId = (typeof galleryOrder)[number];
