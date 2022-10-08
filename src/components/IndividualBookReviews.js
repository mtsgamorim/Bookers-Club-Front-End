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
      <Review>
        <h1>{undefined !== book.volumeInfo ? book.volumeInfo.title : <></>}</h1>
        <p>{review}</p>
      </Review>
      <RightSide onClick={redirect}>
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
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 12px;
  padding: 20px;
`;

const LeftSide = styled.div`
  width: 15%;
  word-break: break-word;
  img {
    width: 180px;
    height: 180px;
  }
`;

const Review = styled.div`
  width: 50%;
  word-break: break-word;
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
  img {
    width: 160px;
    height: 240px;
  }
`;
