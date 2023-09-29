const { faker } = require("/node_modules/@faker-js/faker");

describe("Tests from the lecture on the application books list", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Successful login with a valid email and a valid password", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Login with or without email", () => {
    cy.login(null, "test");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Login with or without email", () => {
    cy.login("test@test.com", null);
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#pass")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });
});

describe("Additional tests on the application books list", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("bropet@mail.ru", "123");
  });

  it("Adding a book to your favorites list", () => {
    // cy.viewport(1366, 768);
    let book;
    book = {
      title: faker.company.catchPhraseAdjective(),
      description: faker.company.catchPhrase(),
      authors: faker.name.fullName(),
    };
    cy.addingABook(book);
    cy.contains("Favorites").click();
    cy.get("[class='mt-3']").should("be.visible");
    cy.get("[class='mt-3']").should("contain", book.title);
  });

  it("Deleting a book from the Favorites section", () => {
    // cy.viewport("iphone-x");
    let book;
    book = {
      title: faker.company.catchPhraseAdjective(),
      description: faker.company.catchPhrase(),
      authors: faker.name.fullName(),
    };
    cy.addingABook(book);
    cy.contains("Favorites").click();
    cy.get(
      "[class='container']:nth-child(2) a:last-child [class='card-footer'] [type='button']"
    ).click();
    cy.contains(book.title).should("not.exist");
    cy.contains("Books list").click();
    cy.wait(20000);
    cy.contains(book.title).within(() =>
      cy
        .get(".card-footer > .btn", { timeout: 10000 })
        .should("contain", "Add to favorite")
    );
  });

  it("Adding a book to the Favorites section from the list in your personal account", () => {
    // cy.viewport("iphone-7");
    let book;
    book = {
      title: faker.company.catchPhraseAdjective(),
      description: faker.company.catchPhrase(),
      authors: faker.name.fullName(),
    };
    cy.addingABookToARegularList(book);
    cy.contains(book.title)
      .should("be.visible")
      .within(() => cy.get("[type='button']").click({ force: true }));
    cy.contains(book.title).within(() =>
      cy
        .get("[class='card-footer'] button", { timeout: 10000 })
        .should("contain", "Delete from favorite")
    );
    cy.contains("Favorites").click();
    cy.contains(book.title).should("be.visible");
  });

  it("Viewing the contents of the book without registration", () => {
    // cy.viewport("samsung-note9");
    let book;
    book = {
      title: faker.company.catchPhraseAdjective(),
      description: faker.company.catchPhrase(),
      authors: faker.name.fullName(),
    };
    cy.addingABook(book);
    cy.contains("Log out").click();
    cy.contains(book.title).click();
    cy.wait(10000);
    cy.get("[class='row'] div h2").should("contain", book.title);
    cy.get("[class='mt-3 container'] div p:nth-child(2)").should(
      "contain",
      book.description
    );
    cy.get("[class='mt-3 container'] div p:nth-child(3)").should(
      "contain",
      book.authors
    );
  });
});
