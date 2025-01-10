import styled from "styled-components";
import { useMovieContext } from "../../../contexts/MovieContext";
interface ISearchComponent {
  apiUrl: string;
}
const SearchComponent = (props: ISearchComponent) => {
  console.log("props", props);
  const { setSearch } = useMovieContext();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <SearchInput
        style={{marginTop:'15px'}}
        type="text"
        placeholder="Search movies..."
        // value={search}
        onChange={handleSearchChange}
      />
    </>
  );
};
export default SearchComponent;

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
