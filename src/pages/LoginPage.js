import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import logo from "../assets/images/bookers_club.png";

export default function LoginPage() {
  const navigate = useNavigate();

  function redirect() {
    navigate("/register");
  }

  return (
    <Container>
      <Content>
        <img src={logo} />
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
  margin-bottom: 200px;
  img {
    width: 280px;
    height: 280px;
  }
  div {
    cursor: pointer;
    p {
      font-size: 15px;
      color: #e6d64b;
      :hover {
        opacity: 0.7;
      }
      text-decoration: underline;
    }
  }
`;
