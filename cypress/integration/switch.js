import { elements } from "../support/elements";

describe("Switching", () => {
  before(() => {
    cy.visit("http://localhost:1234/");
  });

  it("should switch to editor", () => {
    elements.editorLink.click();
    elements.editor.should("be.visible").then(() => {
      elements.code.should("be.hidden");
      elements.lastSection.get("img").should("be.visible");
    });
  });

  it("should switch back to readme", () => {
    elements.aboutLink.click();
    elements.code.should("be.visible").then(() => {
      elements.editor.should("be.hidden");
      elements.lastSection.get("img").should("be.hidden");
    });
  });
});
