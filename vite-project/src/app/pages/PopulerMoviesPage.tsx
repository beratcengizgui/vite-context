import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Badge, Pagination } from "@mui/material";
import httpClient from "../scripts/httpClient"; // Ensure you have the correct httpClient configuration
import { useNavigate } from "react-router-dom";

const TrendingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]); // State for filtered movies based on search query
  const [paginate, setPaginate] = useState<number>(1); // For pagination if needed
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query
  const navigate = useNavigate();

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter movies based on search query
    if (query.trim() === "") {
      setFilteredMovies(movies); // If search is empty, show all movies
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <MainContainer>
      <Header>
        <div
          style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}
        >
          <Badge
            color="error"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Badge>
        </div>
        <h1>Trending Movies</h1>
        <p>Discover the trending movies of the day.</p>
      </Header>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchWrapper>
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

const Header = styled.header`
  text-align: center;
  padding: 30px 20px;
  background-color: #1a1a1a;
  color: #f5c518;
  h1 {
    font-size: 36px;
    margin: 0;
  }
  p {
    font-size: 18px;
    margin-top: 10px;
    color: #ddd;
  }
`;

const SearchWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 80%;
  max-width: 600px;
  padding: 10px;
  font-size: 16px;
  background-color: #333;
  border: 1px solid #f5c518;
  border-radius: 5px;
  color: #fff;
  outline: none;
  ::placeholder {
    color: #aaa;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
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
