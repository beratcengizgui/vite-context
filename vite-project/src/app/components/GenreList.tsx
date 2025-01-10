import { Genre } from "../enums/Genre/Genre";
import { Chip } from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";
import { useLanguage } from "../contexts/LanguageContext";
import { GenreTranslations } from "../enums/Genre/GenreTranslations";
import { useState } from "react";

const GenreList = () => {
  const { setGenre } = useMovieContext();
  const { language } = useLanguage();
  const [selectedGenre, setSelectedGenre] = useState<any>(null);

  const genreEntries = Object.entries(Genre).filter(([key]) =>
    isNaN(Number(key))
  ); // Sayısal olmayan key'leri al

  const getGenreMovies = (value: string | Genre) => {
    setGenre(value);
    setSelectedGenre(value); // Seçili türü güncelle
  };

  return (
    <>
      {genreEntries.slice(1, 7).map(([key, value]) => (
        <Chip
          about={key}
          variant="outlined"
          key={key}
          style={{ marginTop: "10px", marginLeft: "10px", color:'white' }}
          color={selectedGenre === value ? "warning" : "default"} // Seçili olanı farklı renklendir
          onClick={() => getGenreMovies(value as Genre)}
          label={GenreTranslations[value as Genre][language]}
        />
      ))}
    </>
  );
};

export default GenreList;
