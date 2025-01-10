
import styled from "styled-components";
import { useMovieContext } from "../../../contexts/MovieContext";
interface ISearchComponent {
  apiUrl: string;
}
const SearchComponent = (props: ISearchComponent) => {
  console.log('props',props)
  const { setSearch } = useMovieContext();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <SearchWrapper >
        <SearchInput
          type="text"
          placeholder="Search movies..."
          // value={search}
          onChange={handleSearchChange}
        />
      </SearchWrapper>
    </>
  );
};
export default SearchComponent;
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
