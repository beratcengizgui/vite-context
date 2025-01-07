
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

export const Logout = () => {
  const { logout, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <Button onClick={logout}>Logout</Button>
  );
}