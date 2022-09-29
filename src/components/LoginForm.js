import axios from "axios";
import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, setImage, setName } = useContext(UserContext);

  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();

    const promise = axios.post("https://bookers-club.herokuapp.com/sign-in", {
      email,
      password,
    });

    promise.then((res) => {
      setToken(res.data.token);
      setImage(res.data.image);
      setName(res.data.name);

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
          placeholder="E-mail"
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
      font-family: "Josefin Slab", serif;
    }
  }
  button {
    width: 326px;
    height: 46px;
    border-radius: 5px;
    border: 0px;
    background-color: #006494;
    margin-bottom: 10px;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
    span {
      font-size: 20px;
      font-weight: 700;
      color: #e6d64b;
      font-family: "Josefin Slab", serif;
    }
  }
`;
