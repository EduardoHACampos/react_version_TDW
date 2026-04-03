/*
 Refactored InternalLogin to use the AuthContext for state management instead of manual localStorage manipulation.

 InternalLogin refatorado para usar o AuthContext para o gerenciamento de estado em vez da manipulação manual do localStorage.
*/

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./styles";
import blackhandLogo from "../../assets/blackhand_logo_white.webp";

const InternalLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials.");
      }

      login(data.token, data.user);
      navigate("/studio/dashboard"); 
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.LoginContainer>
      <S.LoginBox>
        <S.Logo src={blackhandLogo} alt="Blackhand Studio" />
        <S.Subtitle>Internal Access</S.Subtitle>
        
        <S.Form onSubmit={handleLogin}>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          
          <S.InputGroup>
            <label>Email</label>
            <S.Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <label>Password</label>
            <S.Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </S.InputGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </S.SubmitButton>
        </S.Form>
      </S.LoginBox>
    </S.LoginContainer>
  );
};

export default InternalLogin;