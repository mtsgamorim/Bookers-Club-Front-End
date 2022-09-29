import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import logo from "../assets/images/bookers_club.png";

export default function Header() {
  const { name } = useContext(UserContext);
  return (
    <Container>
      <h1>Bookers Club</h1>
      <span>Bem vindo(a), {name}!</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  height: 70px;
  background-color: rgba(14, 30, 60);
  h1 {
    font-size: 30px;
    font-weight: 700;
    color: #e6d64b;
  }
  span {
    font-size: 20px;
    color: #e6d64b;
  }
`;
