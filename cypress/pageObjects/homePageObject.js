class HomePage {
    getAllProduct() {
        return cy.get('.sc-uhudcz-0');
    }

    getProductSize() {
        return cy.get('.sc-bj2vay-1');
    }

    getCartItem() {
        return cy.get('.sc-11uohgb-0');
    }

    getProductTitle() {
        return cy.get('.sc-124al1g-4');
    }

    getProductPrice() {
        return cy.get('.sc-124al1g-6');
    }

    getCartTitle() {
        return cy.get('.sc-11uohgb-2');
    }

    getCartIcon() {
        return cy.get('.sc-1h98xa9-2');
    }

    getCartQuantity() {
        return cy.get('.sc-11uohgb-3');
    }

    getAddToCartBtn() {
        return cy.get('.sc-124al1g-0');
    }

    getProductTiles() {
        return cy.get('.sc-124al1g-2');
    }

    getCartCloseBtn() {
        return cy.get('.sc-1h98xa9-0');
    }

    getCartPageSubtotal() {
        return cy.get('.sc-1h98xa9-9.jzywDV');
    }

    getCartQtyPlusBtn() {
        return cy.get('.sc-11uohgb-6');
    }

    getDeleteProductCloseIcon() {
        return cy.get('.sc-11uohgb-5');
    }
}

export default HomePage;