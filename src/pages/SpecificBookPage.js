import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";

export default function SpecificBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(undefined);

  useEffect(() => {
    const promise = axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBkIXX90DCfyRT2PMRj-dGqZGcVWY53Rww`
    );
    promise.then((res) => {
      setBook(res.data);
      console.log(res.data);
    });
    promise.catch((err) => {
      console.log("Erro");
    });
  }, []);

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
          <img
            src={
              undefined !== book.volumeInfo.imageLinks ? (
                book.volumeInfo.imageLinks.thumbnail
              ) : (
                <span>Carregando</span>
              )
            }
          />
          <h2>
            Author: {undefined !== book ? book.volumeInfo.authors[0] : <></>}
          </h2>
          <h3>Você ja leu esse livro?</h3>
          <button>
            <p>Clique Aqui</p>
          </button>
        </BookInfo>
        <RightSide>
          <h1>Sinopse:</h1>
          <div
            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
            style={styleHTML}
          ></div>
          <h2>Area de review: </h2>
          <h3>
            Você precisa ter lido este livro para fazer um review, caso já tenha
            lido, clique no botão ao lado!
          </h3>
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
  height: 400px;
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

const styleHTML = {
  color: "#e6d64b",
};
