import React from "react";
import UserCompanyArea from "../components/userPage/UserCompanyArea";
import UserNamesArea from "../components/userPage/UserNamesArea";
export const UserPage: React.FC = () => {
const [count, setCount] = React.useState(0);
  return (
    <div>
      <div style={{ display: "flex"}}>
        {/* <UserNamesArea /> */}
        <UserCompanyArea />
      </div>
    </div>
  );
};

export default UserPage;
