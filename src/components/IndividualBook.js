import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function IndividualBook({ id, name, image }) {
  const navigate = useNavigate();
  const [defaultImage, setDefaultImage] = useState(false);

  function navigateToBookPage(id) {
    navigate(`/book/${id}`);
  }

  function errorImage() {
    setDefaultImage(true);
  }

  return (
    <Book data-cy="book" onClick={() => navigateToBookPage(id)}>
      <div>
        <h1>{name}</h1>
      </div>
      {defaultImage === false ? (
        <img
          src={undefined !== image ? image.thumbnail : <span>Carregando</span>}
          onError={errorImage}
        />
      ) : (
        <img src="https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg" />
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
  margin-right: 10px;
  margin-bottom: 20px;
  background-color: rgba(14, 30, 60);
  cursor: pointer;

  div {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  h1 {
    font-size: 18px;
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
    margin-top: 10px;
  }
`;
