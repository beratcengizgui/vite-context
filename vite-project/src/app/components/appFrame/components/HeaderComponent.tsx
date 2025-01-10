import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
interface HeaderComponent {
    headerName : string
}
const HeaderComponent = (props : HeaderComponent) => {
    const navigate = useNavigate();
    return <Header>
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
        <h1>{props.headerName}</h1>
        {/* <p>Discover the trending movies of the day.</p> */}
      </Header>
};
export default HeaderComponent;
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