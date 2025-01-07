
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
  const { logout, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <button onClick={logout}>Logout</button>
  );
}