import React, { useEffect, useState } from "react";
import { useMovieContext } from "../../contexts/MovieContext";
import styled from "styled-components";
import { Grid2, Pagination } from "@mui/material";
import MovieCard from "./MovieCard";
import GenreList from "../GenreList";
import SearchComponent from "../appFrame/components/SearchComponent";
const MovieDashboard: React.FC = () => {
  const { movies, setPageNumber } = useMovieContext();
  const [movieList, setMovieList] = useState<any[]>([]);
  const [paginate, setPaginate] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log("event", event);
    setCurrentPage(page);
    setPageNumber(page);
  };
  useEffect(() => {
    if (movies) {
      console.log("movies", movies);
      setMovieList(movies.results);
      setPaginate(movies.total_pages);
    }
  }, [movies]);
  return (
    <>
      <Grid2
        size={{ xs: 2, sm: 4, md: 12 }}
        display={"flex"}
        justifyContent={"center"}
      >
        <SearchComponent apiUrl="search/movie?" />
      </Grid2>
      <Grid2 size={{ xs: 2, sm: 4, md: 12 }}>
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
      </Grid2>
      <Grid2 size={{ xs: 5, sm: 2, md: 2 }}>
        <GenreList />
      </Grid2>
      <Grid2 container spacing={0}>
        {movieList.map((movie) => {
          return (
            <Grid2 size={{ xs: 12, sm: 2, md: 2 }}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                releaseDate={movie.release_date}
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                voteAverage={movie.vote_average}
              ></MovieCard>
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
};
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
export default MovieDashboard;
