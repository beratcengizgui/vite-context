import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import styled from "styled-components";

const UserNamesArea: React.FC = () => {
  const { movies } = useUserContext();
  console.log("asd", movies);
  return (
    <UserNamesContainer>
      <UserNamesHeader>User Names</UserNamesHeader>
      {movies ? (
        movies
          .filter((x: any) => x.overview)
          .map((item: any, index: number) => (
            <UserCard key={index}>
              <UserName>{item.overview}</UserName>
            </UserCard>
          ))
      ) : (
        <NoUserMessage>No user found</NoUserMessage>
      )}
    </UserNamesContainer>
  );
};

// Styled Components
const UserNamesContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const UserNamesHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
  color: #333;
`;

const UserCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.p`
  font-size: 18px;
  color: #333;
  margin: 5px 0;
`;

const NoUserMessage = styled.h2`
  font-size: 18px;
  color: #ff6347;
  text-align: center;
`;

export default UserNamesArea;
