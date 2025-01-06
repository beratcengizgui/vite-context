import React from "react";
import UserCompanyArea from "../components/userPage/UserCompanyArea";
export const UserPage: React.FC = () => {
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
