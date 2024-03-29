import Header from "../components/Header";
import axios from "axios";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import IndividualBookHome from "../components/IndividualBookHome";

export default function HomePage() {
  const { image, name, token } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const promise = axios.get(
      "https://bookersclubmtsback.onrender.com/book",
      config
    );
    promise.then((res) => {
      setBooks(res.data);
    });
    promise.catch((err) => {
      console.log("Erro na requisição com a API");
    });
  }, []);

  function redirectToBookFinder() {
    navigate("/bookfinder");
  }

  function redirectToReview() {
    navigate("/reviews");
  }

  return (
    <Container>
      <Header />
      <Content>
        <Profile>
          <img src={image} alt="user" />
          <span>Nome: {name}</span>
          <span data-cy="booksCount">Livros lidos: {books.length}</span>
          <h1>Deseja adicionar mais livros?</h1>
          <button data-cy="bookfinder" onClick={redirectToBookFinder}>
            <p>Clique Aqui</p>
          </button>
          <h2>Deseja ver as reviews de livros de outros úsuarios?</h2>
          <button data-cy="review" onClick={redirectToReview}>
            <p>Clique Aqui</p>
          </button>
        </Profile>
        <Border></Border>
        <RightSide>
          <Title>
            <h1>Livros lidos até hoje:</h1>
          </Title>
          <Info>
            {books.length > 0 ? (
              books.map((book, index) => (
                <IndividualBookHome key={index} id={book.bookId} />
              ))
            ) : (
              <h2>Você ainda não marcou nenhum livro em nossa página 😔​</h2>
            )}
          </Info>
        </RightSide>
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 700px;
  margin-top: 40px;
  margin-left: 10px;
  @media (max-width: 800px) {
    width: 90%;
  }

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

  h2 {
    font-size: 22px;
    color: #e6d64b;
    margin-top: 30px;
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
  background-color: #e6d64b;

  @media (max-width: 800px) {
    display: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  @media (max-width: 800px) {
    width: 100%;
    align-items: center;
  }

  h2 {
    font-size: 20px;
    color: #e6d64b;
    margin-top: 40px;
  }
`;

const Title = styled.div`
  h1 {
    font-size: 30px;
    color: #e6d64b;
    margin-top: 40px;
    font-weight: 700;
    width: 300px;
    margin-left: 40px;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;
