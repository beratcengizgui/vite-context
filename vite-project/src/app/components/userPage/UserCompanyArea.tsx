import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import styled from "styled-components";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieMainPage: React.FC = () => {
  const { movies, setPageNumber } = useUserContext();
  const [movieList, setMovieList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (movies) {
      setMovieList(movies.results);
      setPaginate(movies.total_pages);
    }
  }, [movies]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    setPageNumber(page);
  };

  return (
    <MainContainer>
      <Header>
        <h1>Movie Explorer</h1>
        <p>Discover the best movies, all in one place.</p>
      </Header>
      <PaginationWrapper>
        <Pagination
          count={paginate}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#f5c518", // Sayfa numaraları için renk
              backgroundColor: "#333", // Normal durum arka plan rengi
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#444", // Hover durumunda arka plan rengi
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#f5c518", // Ellipsis (3 nokta) için renk
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#f5c518", // Aktif sayfa için renk
              color: "#111", // Aktif sayfa numarasının rengi
              "&:hover": {
                backgroundColor: "#f5c518", // Hover durumunda aktif sayfa rengi
              },
            },
          }}
        />
      </PaginationWrapper>
      <MovieGrid>
        {movieList && movieList.length > 0 ? (
          movieList.map((movie: any, index: number) => (
            <MovieCard key={index} onClick={() => navigate(`/detail/${movie.id}`)}>
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
          <NoMoviesFound>No movies found</NoMoviesFound>
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

export default MovieMainPage;
