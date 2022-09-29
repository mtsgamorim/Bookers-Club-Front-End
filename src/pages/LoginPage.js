import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  function redirect() {
    navigate("/register");
  }

  return (
    <Container>
      <Content>
        <h1>LOGO</h1>
        <LoginForm />
        <div onClick={redirect}>
          <p>Ainda não possui conta? Cadastre-se</p>
        </div>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    cursor: pointer;
    p {
      font-size: 15px;
      color: green;
      :hover {
        opacity: 0.7;
      }
      text-decoration: underline;
    }
  }
`;
