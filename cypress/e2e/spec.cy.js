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

describe("Teste cadastrar livro", () => {
  it("Logar e registrar livro lido", () => {
    cy.get("[data-cy=bookfinder]").click();
    cy.get("[data-cy=search]").type("Harry Potter");
    cy.get("[data-cy=button]").click();

    cy.intercept(
      "GET",
      "https://bookers-club.herokuapp.com/book/28m7swEACAAJ"
    ).as("get");
    cy.intercept(
      "GET",
      "https://www.googleapis.com/books/v1/volumes/28m7swEACAAJ?key=AIzaSyBkIXX90DCfyRT2PMRj-dGqZGcVWY53Rww"
    ).as("getGoogle");
    cy.get("[data-cy=book]").eq(0).click();
    cy.wait("@get");
    cy.wait("@getGoogle");

    cy.contains("Clique Aqui").click();
    cy.get("[data-cy=returnHome]").click();
    cy.get("[data-cy=booksCount]").should("contain", "1");
  });
});

describe("Teste visualizar página de reviews", () => {
  it("Entrar na página", () => {
    cy.get("[data-cy=review]").click();
    cy.url().should("equal", "http://localhost:3000/reviews");
  });
});
