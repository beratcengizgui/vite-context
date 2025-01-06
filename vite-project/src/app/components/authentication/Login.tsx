import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Eğer kullanıcı zaten giriş yapmışsa, anasayfaya yönlendir
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === "admin" && password === "password") {
      login(username, password);
      navigate("/"); // Giriş başarılı, anasayfaya yönlendir
    } if (username === "emrah" && password === "emrah") {
      login(username, password);
      navigate("/"); // Giriş başarılı, anasayfaya yönlendir
    }else {
      setErrorMessage("Kullanıcı adı veya şifre yanlış.");
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <h2>Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <InputGroup>
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <LoginButton type="submit">Giriş Yap</LoginButton>
        </form>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const LoginForm = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box; /* Container içindeki padding'i doğru hesaplarken sorunu engeller */
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    color: #333;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box; /* Padding ve border'ı içerik alanına dahil eder */
  }

  input:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

export default LoginPage;
