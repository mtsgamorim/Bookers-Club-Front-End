import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function IndividualBookReviews({
  review,
  userName,
  userImage,
  bookId,
}) {
  const [book, setBook] = useState(undefined);
  const { token } = useContext(UserContext);
  const [defaultImage, setDefaultImage] = useState(false);
  const navigate = useNavigate();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const promise = axios.get(
      `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBkIXX90DCfyRT2PMRj-dGqZGcVWY53Rww`
    );
    promise.then((res) => {
      setBook(res.data);
    });
    promise.catch((err) => {
      console.log("Erro");
    });
  }, []);

  function errorImage() {
    setDefaultImage(true);
  }

  function redirect() {
    navigate(`/book/${bookId}`);
  }

  if (book === undefined) {
    return <></>;
  }

  return (
    <Container>
      <LeftSide>
        <img src={userImage} />
        <h1>Usúario(a): {userName}</h1>
      </LeftSide>
      <Content>
        <h1>{undefined !== book.volumeInfo ? book.volumeInfo.title : <></>}</h1>
        <div>
          <p>{review}</p>
        </div>
      </Content>
      <ImageBook onClick={redirect}>
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
      </ImageBook>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  border-radius: 20px;
  display: flex;
  border: 1px solid black;
  padding-right: 20px;
  padding-left: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  img {
    width: 180px;
    height: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  div {
    width: 99%;
  }
  h1 {
    font-size: 24px;
    color: #e6d64b;
    font-weight: 700;
  }
  p {
    font-size: 24px;
    color: #e6d64b;
    margin-top: 10px;
  }
`;

const ImageBook = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
