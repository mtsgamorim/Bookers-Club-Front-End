import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";

export default function SpecificBookPage() {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [book, setBook] = useState(undefined);
  const [idInDb, setIdInDb] = useState(null);
  const [review, setReview] = useState("");
  const [defaultImage, setDefaultImage] = useState(false);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const promise = axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBkIXX90DCfyRT2PMRj-dGqZGcVWY53Rww`
    );
    promise.then((res) => {
      setBook(res.data);
    });
    promise.catch((err) => {
      console.log("Erro");
    });

    const promise2 = axios.get(
      `https://bookers-club.herokuapp.com/book/${id}`,
      config
    );
    promise2.then((res) => {
      setIdInDb(res.data.id);
    });

    promise2.catch((err) => {
      console.log("Erro na requisição com a API");
    });
  }, []);

  function errorImage() {
    setDefaultImage(true);
  }

  function createBook() {
    const data = {
      bookId: id,
      title: book.volumeInfo.title,
      image: book.volumeInfo.imageLinks.thumbnail,
    };
    const promise = axios.post(
      "https://bookers-club.herokuapp.com/book",
      data,
      config
    );

    promise.then((res) => {
      setIdInDb(res.data.id);
    });
    promise.catch((err) => {
      console.log("Erro na requisição com a API");
    });
  }

  function deleteBook() {
    const promise = axios.delete(
      `https://bookers-club.herokuapp.com/book/${idInDb}`,
      config
    );
    promise.then((res) => {
      setIdInDb(null);
    });
    promise.catch((err) => {
      console.log("Erro na requisição com a API");
    });
  }

  function createReview(event) {
    event.preventDefault();
    const data = { review: review };
    const promise = axios.patch(
      `https://bookers-club.herokuapp.com/book/${idInDb}`,
      data,
      config
    );
    promise.then(() => {
      alert("Review cadastrado!");
      setReview("");
    });
    promise.catch((err) => {
      console.log(err);
    });
  }

  if (book === undefined) {
    return <></>;
  }

  return (
    <Container>
      <Header />
      <Content>
        <BookInfo>
          <h1>
            {undefined !== book.volumeInfo ? book.volumeInfo.title : <></>}
          </h1>
          {defaultImage === false ? (
            <img
              src={
                undefined !== book.volumeInfo.imageLinks ? (
                  book.volumeInfo.imageLinks.thumbnail
                ) : (
                  <span>Carregando</span>
                )
              }
              onError={errorImage}
            />
          ) : (
            <img src="https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg" />
          )}

          <h2>
            Autor(a): {undefined !== book ? book.volumeInfo.authors[0] : <></>}
          </h2>
          {idInDb ? (
            <Red>
              <h3>Desmarcar livro?</h3>{" "}
              <button onClick={deleteBook}>
                <p>Clique Aqui</p>
              </button>{" "}
            </Red>
          ) : (
            <Blue>
              <h3>Você ja leu esse livro?</h3>
              <button onClick={createBook}>
                <p>Clique Aqui</p>
              </button>
            </Blue>
          )}
        </BookInfo>
        <RightSide>
          <h1>Sinopse:</h1>
          <div
            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            style={styleHTML}
          ></div>
          <h2>Área de review: </h2>
          {idInDb ? (
            <ReviewArea>
              <form onSubmit={createReview}>
                <textarea
                  rows="8"
                  placeholder="Digite sua review! Sem Spoilers!!!"
                  type="text"
                  value={review}
                  required
                  maxLength="1000"
                  onChange={(e) => setReview(e.target.value)}
                />
                <button type="submit">
                  <span>Cadastrar Review</span>
                </button>
              </form>
            </ReviewArea>
          ) : (
            <h3>
              Você precisa ter lido este livro para fazer um review, caso já
              tenha lido, clique no botão ao lado!
            </h3>
          )}
        </RightSide>
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
`;

const RightSide = styled.div`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  margin-top: 70px;

  h1 {
    font-size: 30px;
    color: #e6d64b;
    font-weight: 700;
    margin-bottom: 12px;
    text-decoration: underline;
  }

  h2 {
    font-size: 26px;
    color: #e6d64b;
    font-weight: 700;
    margin-top: 20px;
    text-decoration: underline;
  }

  h3 {
    font-size: 22px;
    color: #e6d64b;
    font-weight: 400;
    margin-top: 20px;
  }
`;

const BookInfo = styled.div`
  width: 20%;
  height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;

  h1 {
    font-size: 26px;
    color: #e6d64b;
    font-weight: 700;
    margin-bottom: 12px;
  }

  img {
    width: 140px;
    height: 200px;
  }

  h2 {
    font-size: 18px;
    color: #e6d64b;
    font-weight: 400;
    margin-top: 12px;
  }

  h3 {
    font-size: 20px;
    color: #e6d64b;
    font-weight: 400;
    margin-top: 36px;
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

const Red = styled.div`
  button {
    background-color: red;
  }
`;

const Blue = styled.div`
  button {
    background-color: #006494;
  }
`;

const styleHTML = {
  color: "#e6d64b",
};

const ReviewArea = styled.div`
  width: 100%;
  textarea {
    width: 80%;
    margin-top: 10px;
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
