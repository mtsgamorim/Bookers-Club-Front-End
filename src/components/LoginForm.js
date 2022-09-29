import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();

    const promise = axios.post("https://bookers-club.herokuapp.com/sign-in");

    promise.then((res) => {
      navigate("/home");
    });

    promise.catch((err) => {
      alert("DADOS INCORRETOS");
    });
  }

  return (
    <Container>
      <form onSubmit={login}>
        <input
          placeholder="E-Mail"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          <span>Entrar</span>
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  input {
    display: flex;
    flex-direction: column;
    width: 326px;
    height: 58px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 0px;
    padding: 12px;
    ::placeholder {
      font-size: 20px;
      font-weight: 400;
    }
  }
  button {
    width: 326px;
    height: 46px;
    border-radius: 5px;
    border: 0px;
    background-color: purple;
    margin-bottom: 10px;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
    span {
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
