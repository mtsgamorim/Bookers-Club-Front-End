import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import IndividualBookReviews from "../components/IndividualBookReviews";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const { token } = useContext(UserContext);

  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const promise = axios.get(
      "https://bookersclubmtsback.onrender.com/reviews",
      config
    );
    promise.then((res) => {
      setReviews(res.data);
    });
    promise.catch((err) => {
      console.log("Erro na requisição com a API");
    });
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <IndividualBookReviews
              key={index}
              review={review.review}
              userName={review.user.name}
              userImage={review.user.image}
              bookId={review.bookId}
            />
          ))
        ) : (
          <h1>Nenhum outro usuário publicou uma review 😔</h1>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Content = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  @media (max-width: 1000px) {
    width: 100%;
  }

  h1 {
    font-size: 20px;
    color: #e6d64b;
    margin-top: 40px;
  }
`;
