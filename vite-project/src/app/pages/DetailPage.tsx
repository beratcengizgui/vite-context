import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpClient from "../scripts/httpClient";
import '../styles/pages/DetailPage.css';
import { useLanguage } from "../contexts/LanguageContext";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [movieVideos, setMovieVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { language } = useLanguage(); // Dil bilgisi burada alınır
  useEffect(() => {
    const fetchMovieVideos = async (movieId: string) => {
      try {
        const response = await httpClient.get(`/movie/${movieId}/videos`,{
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: language, // Dinamik dil bilgisi ekleniyor
            include_adult: false,
            include_video: false,
            sort_by: "popularity.desc",
          },
        });
        setMovieVideos(response.data.results);
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get(`/movie/${id}`,{
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: language, // Dinamik dil bilgisi ekleniyor
            include_adult: false,
            include_video: false,
            sort_by: "popularity.desc",
          },
        });
        setMovieDetails(response.data);
        fetchMovieVideos(id as string);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id,language]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetails) {
    return <div>Movie not found.</div>;
  }

  const { title, overview, poster_path, release_date, vote_average, genres } = movieDetails;

  // Fragmanları bul ve fragmanı seç
  const trailer = movieVideos.find((video) => video.type === "Trailer" && video.site === "YouTube");

  return (
    <div className="detail-page">
      <div className="container">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="poster-image"
          />
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{title}</h1>
          <p className="release-date">{`Release Date: ${new Date(release_date).toLocaleDateString()}`}</p>
          <div className="genres">
            {genres &&
              genres.map((genre: any) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
          </div>
          <div className="rating">
            <p>{`Rating: ${vote_average}/10`}</p>
          </div>
          <div className="overview">
            <h3>Overview</h3>
            <p>{overview}</p>
          </div>
          {/* Fragman bölümü */}
          {trailer ? (
            <div className="movie-trailer">
              <h3>Trailer</h3>
              <iframe
                title="Movie Trailer"
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="trailer-video"
              />
            </div>
          ) : (
            <p className="no-trailer">No trailer available for this movie.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
