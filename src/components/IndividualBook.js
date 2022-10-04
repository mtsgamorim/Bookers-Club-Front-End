import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function IndividualBook({ id, name, image }) {
  const navigate = useNavigate();

  function navigateToBookPage(id) {
    navigate(`/book/${id}`);
  }

  return (
    <Book onClick={() => navigateToBookPage(id)}>
      <div>
        <h1>{name}</h1>
      </div>
      <img
        src={undefined !== image ? image.thumbnail : <span>Carregando</span>}
      />
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
