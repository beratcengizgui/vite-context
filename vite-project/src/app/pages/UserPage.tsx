import React from "react";
import MovieDashboard from "../components/moviePages/MovieDashboard";
import styled from "styled-components";
export const UserPage: React.FC = () => {
  return (
    <div>
      <MainContainer>
        <MovieDashboard />
      </MainContainer>
    </div>
  );
};

export default UserPage;
const MainContainer = styled.div`
  font-family: "Arial", sans-serif;
  color: #fff;
  background-color: #121212;
  min-height: 100vh;
`;
