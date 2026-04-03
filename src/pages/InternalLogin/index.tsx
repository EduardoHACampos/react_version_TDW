import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiClientError } from "../../services/httpClient";
import { loginInternal } from "../../services/api";
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
      const { token, user } = await loginInternal(email, password);

      login(token, user);
      navigate("/internal/dashboard", { replace: true });
    } catch (err) {
      if (err instanceof ApiClientError && err.fieldErrors) {
        if (err.fieldErrors.email) {
          setError(`Email: ${err.fieldErrors.email}`);
        } else if (err.fieldErrors.password) {
          setError(`Password: ${err.fieldErrors.password}`);
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to sign in right now.");
      }
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
              autoComplete="email"
              disabled={isLoading}
              required
            />
          </S.InputGroup>

          <S.InputGroup>
            <label>Password</label>
            <S.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              disabled={isLoading}
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
