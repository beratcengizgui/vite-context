import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
  const { logout, isAuthenticated } = useAuth();
  let navigate = useNavigate();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <button onClick={logout}>Logout</button>
  );
}