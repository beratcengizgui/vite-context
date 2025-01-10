// enums/GenreTranslations.ts
import { Genre } from "./Genre";

export const GenreTranslations: Record<Genre, Record<string, string>> = {
  [Genre.ACTION]: { en: "Action", tr: "Aksiyon" },
  [Genre.COMEDY]: { en: "Comedy", tr: "Komedi" },
  [Genre.DRAMA]: { en: "Drama", tr: "Drama" },
  [Genre.HORROR]: { en: "Horror", tr: "Korku" },
  [Genre.ROMANCE]: { en: "Romance", tr: "Romantik" },
  [Genre.SCIENCE_FICTION]: { en: "Science Fiction", tr: "Bilim Kurgu" },
  [Genre.DOCUMENTARY]: { en: "Documentary", tr: "Belgesel" },
  [Genre.THRILLER]: { en: "Thriller", tr: "Gerilim" },
  [Genre.FANTASY]: { en: "Fantasy", tr: "Fantastik" },
};