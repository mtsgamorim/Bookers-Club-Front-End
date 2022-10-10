import userFactory from "../../factory/userFactory";

const data = userFactory();

describe("Teste rotas login e cadastro", () => {
  it("Caso sucesso, cadastrar conta", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("input[type=text]").type(data.name);
    cy.get("input[type=url]").type(data.url);
    cy.get("input[type=email]").type(data.email);
    cy.get("input[type=password]").type(data.password);

    cy.intercept("POST", "https://bookers-club.herokuapp.com/sign-up").as(
      "post"
    );
    cy.contains("Cadastrar").click();
    cy.wait("@post");
    cy.url().should("equal", "http://localhost:3000/");
  });
  it("Caso sucesso, logar na conta", () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[type=email]").type(data.email);
    cy.get("input[type=password]").type(data.password);
    cy.intercept("POST", "https://bookers-club.herokuapp.com/sign-in").as(
      "post"
    );
    cy.contains("Entrar").click();
    cy.wait("@post");
    cy.url().should("equal", "http://localhost:3000/home");
  });
});
