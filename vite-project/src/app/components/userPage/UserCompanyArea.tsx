import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import styled from "styled-components";
import { Pagination } from "@mui/material";
import { Route, useNavigate } from "react-router-dom";

const MovieMainPage: React.FC = () => {
  const { movies, setPageNumber } = useUserContext();
  const [movieList, setMovieList] = React.useState<any[]>([]);
  const [paginate, setPaginate] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate(); // Yönlendirme yapmak için useNavigate hook'u
  useEffect(() => {
    console.log("movies", movies);
    if (movies) {
      setMovieList(movies.results);
      setPaginate(movies.total_pages);
    }
  }, [movies]);
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setPageNumber(page);
    console.log('page',page)
  };
  return (
    <MainContainer>
       <Pagination
        count={paginate}       // Toplam sayfa sayısı
        page={currentPage}       // Şu anki sayfa
        onChange={handlePageChange} // Sayfa değişimi işlemi
        style={{backgroundColor: 'white'}}
      />
      {/* <HeaderSection>
        <HeroText>
          <h1>Welcome to the Movie World</h1>
          <p>Explore the latest movies and shows right here!</p>
          <Pagination color="primary" style={{backgroundColor:'white'}} count={paginate} />
        </HeroText>
      </HeaderSection> */}
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
                  <span>Rating: {movie.vote_average}</span>
                  <span>Release: {movie.release_date}</span>
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
  background-color: #111;
`;

const HeaderSection = styled.section`
  position: relative;
  height: 300px;
  background-color: #000;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
`;

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  color: #fff;
  transform: translateY(-50%);
  h1 {
    font-size: 50px;
    font-weight: bold;
    margin: 0;
  }
  p {
    font-size: 22px;
  }
`;

const MovieGrid = styled.div`
  cursor: pointer; /* Fare işaretçisini pointer (el işareti) yapar */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const MovieCard = styled.div`
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-bottom: 2px solid #007bff;
`;

const MovieDetails = styled.div`
  padding: 15px;
  h3 {
    margin: 0;
    font-size: 22px;
    color: #fff;
  }
  p {
    font-size: 14px;
    color: #bbb;
    margin: 10px 0;
  }
`;

const MovieFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #007bff;
  padding-top: 10px;
`;

const NoMoviesFound = styled.div`
  text-align: center;
  font-size: 18px;
  color: #ff6347;
`;

export default MovieMainPage;
