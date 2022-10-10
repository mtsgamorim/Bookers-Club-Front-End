import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import logo from "../assets/images/bookers_club.png";

export default function RegisterPage() {
  const navigate = useNavigate();

  function redirect() {
    navigate("/");
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="logo" />
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
  margin-bottom: 100px;
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
