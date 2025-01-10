import React, { createContext, useContext, useState, useEffect } from "react";
import { useHttpClient } from "./HttpClientContext";
import { useLanguage } from "../contexts/LanguageContext"; // DilContext'i import et
import { Genre } from "../enums/Genre/Genre";

interface IUserContext {
  movies: any;
  pageNumber: number;
  search: string | null;
  setMovies: (movies: any | null) => void;
  setPageNumber: (page: number) => void;
  setSearch: (search: string | null) => void;
  setGenre: (genre: string | Genre | null) => void;
}

const MovieContext = createContext<IUserContext | undefined>(undefined);

export const MovieContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<any | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [genre, setGenre] = useState<string | Genre | null>(null);
  const httpClient = useHttpClient();
  const { language } = useLanguage(); // Dil bilgisi burada alınır
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await httpClient.get(`/discover/movie`, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: language, // Dinamik dil bilgisi ekleniyor
            include_adult: false,
            include_video: false,
            page: pageNumber,
            sort_by: "popularity.desc",
            with_genres: genre, // Filtreleme yapılırsa genre da eklenebilir
          },
        });
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    if (!search) {
      fetchMovies();
    } else {
      httpClient
        .get(`search/movie?query=${search}&page=${pageNumber}`, {
          params: { 
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: language, // Dinamik dil bilgisi ekleniyor
            include_adult: false,
            include_video: false,
            page: pageNumber,
            sort_by: "popularity.desc",
            with_genres: genre, // Filtreleme yapılırsa genre da eklenebilir
           }, // Dil parametresi de eklendi
        })
        .then((response) => {
          setMovies(response.data);
        });
    }
  }, [pageNumber, search, genre, language]); // Dil, genre, pageNumber, ve search değiştikçe yeniden çağrılır

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        setPageNumber,
        setSearch,
        pageNumber,
        search,
        setGenre,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieContextProvider");
  }
  return context;
};
