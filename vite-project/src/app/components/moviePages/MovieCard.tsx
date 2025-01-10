import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MovieCardProps {
  id: number | string;
  title?: string;
  overview?: string;
  releaseDate?: string;
  posterPath?: string;
  voteAverage?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  overview,
  releaseDate,
  posterPath,
  voteAverage,
}) => {
  const Navigate = useNavigate();
  return (
    <MovieGrid
      onClick={() => {
        Navigate(`/detail/${id}`);
      }}
    >
      <MovieCardStyle>
        <MoviePoster
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
        />
        <MovieDetails>
          <h3>{title}</h3>
          <p>{overview}</p>
          <MovieFooter>
            <span>⭐ {voteAverage}</span>
            <span>📅 {releaseDate}</span>
          </MovieFooter>
        </MovieDetails>
      </MovieCardStyle>
    </MovieGrid>
  );
};

// Styled Components
const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  cursor: pointer;
`;

const MovieCardStyle = styled.div`
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

export default MovieCard;
