import React, { useEffect, useState } from "react";
import styled from "styled-components";
import httpClient from "../scripts/httpClient"; // Ensure you have the correct httpClient configuration
import { useNavigate } from "react-router-dom";

const TrendingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]); // State for filtered movies based on search query
  const [paginate, setPaginate] = useState<number>(1); // For pagination if needed
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query
  console.log('setSearchQuery',setSearchQuery,movies)
  const navigate = useNavigate();
    console.log('paginate', paginate,currentPage,searchQuery,setCurrentPage);
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await httpClient.get("/trending/movie/day", {
          params: {
            language: "en-US",
          },
        });
        setMovies(response.data.results);
        setFilteredMovies(response.data.results); // Initialize filteredMovies with all movies initially
        setPaginate(1); // Set pagination if applicable
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

 



  return (
    <MainContainer>
      <MovieGrid>
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie: any) => (
            <MovieCard
              key={movie.id}
              onClick={() => navigate(`/detail/${movie.id}`)}
            >
              <MoviePoster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieDetails>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <MovieFooter>
                  <span>⭐ {movie.vote_average}</span>
                  <span>📅 {movie.release_date}</span>
                </MovieFooter>
              </MovieDetails>
            </MovieCard>
          ))
        ) : (
          <NoMoviesFound>No trending movies found</NoMoviesFound>
        )}
      </MovieGrid>
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.div`
  font-family: "Arial", sans-serif;
  color: #fff;
  background-color: #121212;
  min-height: 100vh;
`;




const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const MovieCard = styled.div`
  background-color: #1c1c1c;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 3px solid #f5c518;
`;

const MovieDetails = styled.div`
  padding: 15px;
  h3 {
    font-size: 18px;
    margin: 0;
    color: #f5c518;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    font-size: 14px;
    color: #aaa;
    margin: 10px 0;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const MovieFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #777;
`;

const NoMoviesFound = styled.div`
  text-align: center;
  font-size: 18px;
  color: #f5c518;
  padding: 50px 0;
`;

export default TrendingMoviesPage;
