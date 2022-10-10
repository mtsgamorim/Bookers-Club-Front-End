import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IndividualBookReviews({
  review,
  userName,
  userImage,
  bookId,
}) {
  const [book, setBook] = useState(undefined);
  const [defaultImage, setDefaultImage] = useState(false);
  const navigate = useNavigate();

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
    <Container onClick={redirect}>
      <LeftSide>
        <img src={userImage} alt="user" />
        <h1>Usúario(a): {userName}</h1>
      </LeftSide>
      <Review>
        <h1>{undefined !== book.volumeInfo ? book.volumeInfo.title : <></>}</h1>
        <p>{review}</p>
      </Review>
      <RightSide>
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
            alt="book"
          />
        ) : (
          <img
            src="https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
            alt="book"
          />
        )}
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 12px;
  padding: 20px;
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const LeftSide = styled.div`
  width: 15%;
  word-break: break-word;
  @media (max-width: 1000px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    width: 180px;
    height: 180px;
  }
`;

const Review = styled.div`
  width: 50%;
  word-break: break-word;
  @media (max-width: 1000px) {
    width: 100%;
  }
  h1 {
    font-size: 30px;
    color: #e6d64b;
    font-weight: 700;
  }
  p {
    font-size: 22px;
    color: #e6d64b;
    font-weight: 400;
    margin-top: 16px;
  }
`;

const RightSide = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1000px) {
    display: none;
  }
  img {
    width: 160px;
    height: 240px;
  }
`;
