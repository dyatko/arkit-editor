export const elements = {
  get editor() {
    return cy.get(".react-monaco-editor-container");
  },
  get aboutLink() {
    return cy.get("footer a[target=about]");
  },
  get editorLink() {
    return cy.get("footer a[target=editor]");
  },
  get lastSection() {
    return cy.get("section:last-of-type");
  },
  get code() {
    return cy.get("code");
  }
};
