/// <reference types="cypress"/>

context("Home Page Loads", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000", () => {});
  });

  it("should find home page", () => {
    cy.get("h2").contains("Reddityi");
  });
});
