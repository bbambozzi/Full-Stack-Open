const { checkPropTypes } = require("prop-types");

describe("Correct user login", () => {
  const userObject = {
    username: "testman",
    password: "testman",
    name: "testman",
  };
  beforeEach(() => {});
  it("posting user credentials", () => {
    cy.request("POST", "localhost:3003/api/tests/clear");
    cy.request("POST", "localhost:3003/api/users/", userObject);
  });
  it("show login is displayed when clicked", () => {
    cy.visit("localhost:3000");
    cy.contains("Show Login").click();
    cy.contains("Please, Log In!");
    cy.get('[data-testid="divThatHides"]');
  });
  it("user is able to log in correctly", () => {
    cy.visit("localhost:3000");
    cy.contains("Show Login").should("be.visible").click();
    cy.contains("Please, Log In!");
    cy.get("[data-testid='usernameInput']").type("testman");
    cy.get("[data-testid='passwordInput']").type("testman");
    cy.contains("Submit!").should("be.visible").click();
  });
  it("clears the logged in user", () => {
    cy.request("POST", "localhost:3003/api/tests/clear");
    cy.request("POST", "localhost:3003/api/users/", userObject);
  });
});
describe("when logged in", () => {
  beforeEach(() => {
    // logs in the user
    cy.visit("localhost:3000");
    cy.contains("Show Login").should("be.visible").click();
    cy.contains("Please, Log In!");
    cy.get("[data-testid='usernameInput']").type("testman");
    cy.get("[data-testid='passwordInput']").type("testman");
    cy.contains("Submit!").should("be.visible").click();
    cy.contains("button", "New Blog Form").should("be.visible").click();
  });
  it("can create a new blog", () => {
    cy.get("[data-testid='titleInput']").type("Why Testing is Important");
    cy.get("[data-testid='authorInput']").type("Mr. Testman");
    cy.get("[data-testid='urlInput']").type("www.testingappreciators.com");
    cy.contains("button", "Submit").should("be.visible").click();
    cy.contains("button", "show").should("be.visible").click();
    cy.contains("button", "Like!").should("be.visible").click();
  });
  it("can delete a new Blog", () => {
    cy.contains("button", "show").should("be.visible").click();
    cy.contains("button", "Remove").should("be.visible").click();
  });
  it("can create a new blog after deleting one!", () => {
    cy.get("[data-testid='titleInput']").type("Testing: The Final Chapter");
    cy.get("[data-testid='authorInput']").type("Dr. Testman");
    cy.get("[data-testid='urlInput']").type("www.testingrespecters.com");
    cy.contains("button", "Submit").should("be.visible").click();
    cy.contains("button", "show").should("be.visible").click();
  });
  it("can create another blog!", () => {
    cy.get("[data-testid='titleInput']").type("On Cypress");
    cy.get("[data-testid='authorInput']").type("Dr Joseph Rottmann");
    cy.get("[data-testid='urlInput']").type("www.docs.cypress.io");
    cy.contains("button", "Submit").click();
  });
  it("Can select the second blog", () => {
    cy.get("[data-testid='showContentButton']")
      .should("be.visible")
      .eq(1)
      .click();

    cy.get("[data-testid='likeButton']").should("be.visible").eq(1).click();
  });
  it("Most liked blog gets push upwards", () => {
    cy.get("[data-testid='blogDivContainer']").should(
      "contain",
      "Testing: The Final Chapter by Dr. Testman"
    );
  });
});
/*
  it("can create a new blog", () => {
    cy.contains("Show Login").should("be.visible").click();
    cy.contains("Please, Log In!");
    cy.get("[data-testid='usernameInput']").type("testman");
    cy.get("[data-testid='passwordInput']").type("testman");
    cy.contains("Submit!").should("be.visible").click();
    cy.get("button").contains("New Blog Form").should("be.visible").click();
    cy.get("[data-testid='titleInput']").type("Testing and its merits");
    cy.get("[data-testid='authorInput']").type("Mr Testman");
    cy.get("[data-testid='urlInput']").type("www.testingappreciators.com");
  });
  it("it can submit a new blog", () => {
    cy.get("button").should("be.visible").contains("Submit").click();
  });
  */
