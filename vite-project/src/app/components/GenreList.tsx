import { Genre } from "../enums/Genre/Genre";
import { Chip} from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";
import { useLanguage } from "../contexts/LanguageContext";
import { GenreTranslations } from "../enums/Genre/GenreTranslations";

const GenreList = () => {
  const { setGenre } = useMovieContext();
  const { language } = useLanguage();

  const genreEntries = Object.entries(Genre).filter(([key]) =>
    isNaN(Number(key))
  ); // Sayısal olmayan key'leri al

  const getGenreMovies = (value: string | Genre) => {
    setGenre(value);
  };

  return (
    <>
      {genreEntries.slice(1, 7).map(([key, value]) => (
        <Chip
        about={key}
          style={{marginTop:'10px', marginLeft:'10px'}}
          color="success"
          onClick={() => getGenreMovies(value as Genre)}
          label={GenreTranslations[value as Genre][language]}
        ></Chip>
      ))}
    </>
  );
};

export default GenreList;
