import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function IndividualBookHome({ id }) {
  const navigate = useNavigate();
  const [defaultImage, setDefaultImage] = useState(false);
  const [book, setBook] = useState(undefined);

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
  }, []);

  function navigateToBookPage(id) {
    navigate(`/book/${id}`);
  }

  function errorImage() {
    setDefaultImage(true);
  }

  if (book === undefined) {
    return <></>;
  }

  return (
    <Book onClick={() => navigateToBookPage(id)}>
      <div>
        <h1>{undefined !== book.volumeInfo ? book.volumeInfo.title : <></>}</h1>
      </div>
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
    </Book>
  );
}

const Book = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 320px;
  border: 1px solid black;
  border-radius: 12px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: rgba(14, 30, 60);
  cursor: pointer;

  div {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
  }

  h1 {
    font-size: 20px;
    color: #e6d64b;
    font-weight: 400;
    margin-left: auto;
    margin-right: auto;
  }

  img {
    width: 65%;
    height: 70%;
    margin-left: auto;
    margin-right: auto;
  }
`;
