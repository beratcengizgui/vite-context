
import { Genre } from "../enums/Genre/Genre";
import { Button } from "@mui/material";
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
    <div>
      <ul>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {genreEntries.slice(1, 7).map(([key, value]) => (
            <label key={key} style={{ marginLeft: "50px" }}>
              <Button
                color="warning"
                onClick={() => getGenreMovies(value as Genre)}
              >
                <strong>{GenreTranslations[value as Genre][language]}</strong>
              </Button>
            </label>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default GenreList;
