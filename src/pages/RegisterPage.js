import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  function redirect() {
    navigate("/");
  }

  return (
    <Container>
      <Content>
        <h1>LOGO</h1>
        <RegisterForm />
        <div onClick={redirect}>
          <p>Já possui conta? Conecte-se!</p>
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
