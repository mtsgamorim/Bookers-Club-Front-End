import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import Header from "../components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import IndividualBook from "../components/IndividualBook";

export default function BookFinderPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  function findBooks(event) {
    event.preventDefault();
    const promise = axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&maxResults=20&key=AIzaSyBkIXX90DCfyRT2PMRj-dGqZGcVWY53Rww`
    );
    promise.then((res) => {
      setBooks(res.data.items);
    });
    promise.catch((err) => {
      console.log("Erro");
    });
  }

  return (
    <Container>
      <Header />
      <Form>
        <h1>Encontre seu livro!</h1>
        <form onSubmit={findBooks}>
          <div>
            <input
              placeholder="Nome ou escritor"
              type="text"
              value={search}
              required
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSearch size={20} />
            </button>
          </div>
        </form>
      </Form>
      <Content>
        {books.length > 0 ? (
          books.map((book, index) => (
            <IndividualBook
              key={index}
              id={book.id}
              name={book.volumeInfo.title}
              image={book.volumeInfo.imageLinks}
            />
          ))
        ) : (
          <span></span>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 30px;
    color: #e6d64b;
    margin-top: 10px;
    font-weight: 700;
  }
  input {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-top: 10px;
    height: 30px;
    border-radius: 5px;
    border: 0px;
    padding: 12px;
    ::placeholder {
      font-size: 20px;
      font-weight: 400;
      font-family: "Josefin Slab", serif;
    }
  }
  div {
    display: flex;
    align-items: center;
  }
  button {
    width: 30px;
    height: 30px;
    margin-left: 4px;
    margin-top: 10px;
    border-radius: 4px;
    background-color: #091640;
    border: 0;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
`;
