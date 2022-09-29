import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <h1>Logo</h1>
      <span>Bem vindo fulano!</span>
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
  span {
    font-size: 20px;
    color: #e6d64b;
  }
`;
