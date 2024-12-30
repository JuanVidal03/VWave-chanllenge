describe("Shipping labels", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("get all shipping labels", () => {
    cy.get(".shipping-labels-table").should("exist");
  });

  it("create a new shipping label successfully", () => {
    cy.get("input[name=shippingLabel]").type("Wiesenstraße 6, 04564 Böhlen, Saxony, Germany");
    cy.get("input[type=submit]").click();

    cy.intercept("POST", "http://localhost:8080/api/create-shipping-label").as("createShippingLabel");
    cy.wait("@createShippingLabel", { timeout: 13000 }).its("response.statusCode").should("eq", 201);

    cy.get(".Toastify__toast--success", { timeout: 10000 })
    .should("be.visible")
    .and("contain.text", "Shipping label created successfully!");    
  });
});
