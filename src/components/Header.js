import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { name } = useContext(UserContext);
  const navigate = useNavigate();

  function redirect() {
    navigate("/home");
  }
  return (
    <Container>
      <h1 data-cy="returnHome" onClick={redirect}>
        Bookers Club
      </h1>
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
    cursor: pointer;
  }
  span {
    font-size: 20px;
    color: #e6d64b;
  }
`;
