import { elements } from "../support/elements";

describe("By default", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/").wait(2000);
  });

  it("should add svg in URL", () => {
    cy.url().should("include", "/svg/");
  });

  it("should open readme", () => {
    elements.aboutLink
      .should("have.css", "background-color")
      .and("eq", "rgb(239, 239, 239)");
    elements.code.should("length", 9).should("be.visible");
  });

  it("should not open editor", () => {
    elements.editorLink
      .should("have.css", "background-color")
      .and("eq", "rgba(0, 0, 0, 0.1)");
    elements.editor.should("length", 1).should("be.hidden");
  });
});
