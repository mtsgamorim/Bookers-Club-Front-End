import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();

    const promise = axios.post("https://bookers-club.herokuapp.com/sign-up", {
      email,
      password,
      name,
      image,
    });

    promise.then((res) => {
      navigate("/");
    });

    promise.catch((err) => {
      alert("E-mail ja cadastrado");
    });
  }

  return (
    <Container>
      <form onSubmit={register}>
        <input
          placeholder="Primeiro Nome"
          type="text"
          value={name}
          maxlength="18"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="URL: Imagem de perfil"
          type="url"
          value={image}
          required
          onChange={(e) => setImage(e.target.value)}
        />
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
          <span>Cadastrar</span>
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
