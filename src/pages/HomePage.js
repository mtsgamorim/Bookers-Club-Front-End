import Header from "../components/Header";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { image, name } = useContext(UserContext);
  const navigate = useNavigate();

  function redirect() {
    navigate("/bookfinder");
  }

  return (
    <Container>
      <Header />
      <Content>
        <Profile>
          <img src={image} />
          <span>Nome: {name}</span>
          <span>Livros lidos: x</span>
          <h1>Deseja adicionar mais livros?</h1>
          <button onClick={redirect}>
            <p>Clique Aqui</p>
          </button>
        </Profile>
        <Border></Border>
        <Info>
          <Title>
            <h1>Livros lidos até hoje:</h1>
          </Title>
          <h2>Você ainda não marcou nenhum livro em nossa página 😔​</h2>
        </Info>
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  display: flex;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 400px;
  margin-top: 40px;
  margin-left: 10px;

  img {
    width: 130px;
    height: 130px;
    border-radius: 20px;
  }

  span {
    font-size: 20px;
    color: #e6d64b;
    margin-top: 10px;
  }

  h1 {
    font-size: 30px;
    color: #e6d64b;
    margin-top: 60px;
  }

  button {
    width: 200px;
    height: 50px;
    border-radius: 5px;
    border: 0px;
    background-color: #006494;
    margin-top: 20px;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
    p {
      font-size: 20px;
      font-weight: 700;
      color: #e6d64b;
      font-family: "Josefin Slab", serif;
    }
  }
`;

const Border = styled.div`
  height: 80vh;
  margin-top: 40px;
  width: 2px;
  background-color: black;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-top: 10px;
  h1 {
    font-size: 30px;
    color: #e6d64b;
    margin-top: 40px;
    font-weight: 700;
  }
  h2 {
    font-size: 20px;
    color: #e6d64b;
    margin-top: 40px;
    margin-left: 40px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
