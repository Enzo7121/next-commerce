import mock from '../../pages/product/mocks/default.json'

describe("Products", () => {
    it("deberia mostrar todos los productos", () => {
        cy.visit("/default")

        cy.get('[data-test-id="product"]').should("have.length", 12)
    });

    it("muestra un mensaje cuando no hay productos", () => {
        cy.visit("/empty")

        cy.get('[data-test-id="product"]').should("have.length", 0);

        cy.contains("No hay productos")
    })
}); 