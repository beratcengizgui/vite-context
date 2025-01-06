import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserPage from "../pages/UserPage";
import ImagePage from "../pages/ImagePage";
import LoginPage from "../components/authentication/Login";
import TodoApp from "../components/userPage/TodoApp";
import DetailPage from "../pages/DetailPage";

const MyRouter: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log('MyRouter', isAuthenticated, loading);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />} />
        <Route path="/images" element={isAuthenticated ? <ImagePage /> : <Navigate to="/login" />} />
        <Route path="/detail/:id" element={isAuthenticated ? <DetailPage /> : <Navigate to="/login" />} />
        <Route path="/todos" element={isAuthenticated ? <TodoApp /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default MyRouter;
