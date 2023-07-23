/// <reference types="Cypress" />
import HomePage from '../pageObjects/homePageObject';

describe('Shopping Cart Ecommerce Application Tests',() => {

    const websiteUrl = "https://react-shopping-cart-67954.firebaseapp.com/";
    const homePage = new HomePage();
    let productLength;
    let productTitle;
    let cartTitle;
    let price1;
    let price2;
    let subTotal;
    let initialQty;

    beforeEach(() => {
        cy.visit( websiteUrl );
    })

    it('Test that all products are displayed with their images, titles, and prices.', () => {
        // To verify that all products are visible
        homePage.getAllProduct().should( "have.length.gt", 0 );

        // To verify that each product should display an image, title and price
        homePage.getAllProduct().each(( item ) => {
            cy.wrap( item ).find(" .sc-124al1g-1 ").should( "be.visible" );
            cy.wrap( item ).find(" .sc-124al1g-4 ").should( "be.visible" );
            cy.wrap( item ).find(" .sc-124al1g-6 ").should( "be.visible" );
        });
    });

    it('Test that filtering by size works correctly and displays the expected number of products.',() => {
        const selectSize = "M";

        // click on size filter to select size
        homePage.getProductSize().contains(selectSize).click();

        // To check correct no of product displayed based on size selection
        homePage.getAllProduct().should("have.length.gt" , 0)
        .each((item) => {
            cy.wrap(item).find(".sc-124al1g-1");
        });

    });

    it('Test that multiple filters can be applied simultaneously and displays the expected number of products.',() => {
        const selectedSize1 = "XS";
        const selectedSize2 = "M";

        // click on size filter to select both sizes
        homePage.getProductSize().contains(selectedSize1).click();
        homePage.getProductSize().contains(selectedSize2).click();

        // To check correct no of product displayed based on both size selection
        homePage.getAllProduct().should("have.length.gt" , 0)
        .each((item) => {
            cy.wrap(item).find(".sc-124al1g-1");
        });
    });

    it('Test that filters can be cleared/reset, returning the product display to its default state.',() => {
        const selectedSize1 = "M";
        const selectedSize2 = "XXL";

        // click on size filter to select both sizes
        homePage.getProductSize().contains(selectedSize1).click();
        homePage.getProductSize().contains(selectedSize2).click();
        cy.wait(200);

        // click on again sizes for reset
        homePage.getProductSize().contains(selectedSize1).click();
        homePage.getProductSize().contains(selectedSize2).click()

        // To check all products are display again
        homePage.getAllProduct().should("have.length.gt", 0);

    });
    
    it('Test that the correct number of products are displayed based on the filters applied.',() => {
        const selectedSize = "XXL";

        // click on size filter to select both sizes
        homePage.getProductSize().contains(selectedSize).click().then((filterProduct)=>{
            productLength = filterProduct.length;
        }).then(()=> {
            homePage.getAllProduct().should("have.length",productLength)
        });
       
    });

    it('Test that clicking the "add to cart" button adds the product to the cart and the product in the cart matches the one added.',() => {
        // Click on first product add to cart button 
       homePage.getAllProduct().first().contains('Add to cart').click();

       // To get the product title 
        homePage.getAllProduct().first().each((elm) => {
            homePage.getProductTitle().first().then(function(title) {
                productTitle = title.text();
            })
        })

        // To check product is added to cart 
        homePage.getCartItem().should('have.length', 1);

        // To check the product in the cart should match the one which added
        homePage.getCartItem().each((el) => {
           homePage.getCartTitle().then(function(title) {
            cartTitle = title.text();
           })  
        }).then(() => {
            expect(productTitle).equal(cartTitle);
        })  

    });

    it('Test that the cart icon updates with the correct number of items when products are added to the cart.', () => {
         // Click on first product add to cart button 
         homePage.getAllProduct().first().contains('Add to cart').click();

         // To check that cart icon update with the correct number of items
         homePage.getCartIcon().contains('1');
    });

    it('Test that adding multiple items of the same product increases the quantity in the cart.',() => {
        let val;
         // add the first product twice
        cy.addProductTwice();

         // To check that cart icon update with the correct number of items
         homePage.getCartIcon().contains('2');

         homePage.getCartIcon().then(function(el){
             val =  parseInt(el.text());
         }).then(() => {
            cy.log('val', val);
         })

         // To check cart contain only one item with qty 2
         homePage.getCartItem().should('have.length', 1);

         homePage.getCartQuantity().then(function(qty) {
            const cartQty = qty.text();
            let cartVal = cartQty.substring(28);
            expect(parseInt(cartVal)).equal(val);
            
         })
    });
   
    it('Test that the cart subtotal is calculated accurately when multiple products are added.',() => {
        // Click on first and second product
        homePage.getProductTiles().eq(0).find('.sc-124al1g-0').contains('Add to cart').click();
        homePage.getCartCloseBtn().click();
        homePage.getProductTiles().eq(1).find('.sc-124al1g-0').contains('Add to cart').click();

        // To get the price of both the products
        
        homePage.getProductTiles().eq(0).find('.sc-124al1g-6').then((price) => {
            price1 = parseFloat(price.text().replace("$",""));
        })
        homePage.getProductTiles().eq(1).find('.sc-124al1g-6').then((price) => {
            price2 = parseFloat(price.text().replace("$",""));
        }).then(() => {
            subTotal = price1 + price2;
        })

        // To check cart subtotal displayed correct
        homePage.getCartPageSubtotal().then((total) => {
           const cartTotal = parseFloat(total.text().replace("$",""));
            expect(cartTotal).equal(subTotal);
        })

    });

    it('Test that users can update the quantity of items in the cart, and the displayed quantity matches the updates.',() => {
        // Click on first product add to cart button 
       homePage.getAllProduct().first().contains('Add to cart').click();

       homePage.getCartIcon().click();

        // To get the initial qty
       homePage.getCartQuantity().then(function(qty) {
        const cartQty = qty.text();
        initialQty = cartQty.substring(28);
        homePage.getCartQtyPlusBtn().contains('+').click();
     }).then(() => {

        // to check the updated qty is match the displayed qty
        homePage.getCartQuantity().then(function(updatedQty) {
            let updateQTY = updatedQty.text();
            let changeQty = updateQTY.substring(28);
            expect(parseInt(initialQty) + 1).equal(parseInt(changeQty));
        })
     });

    });

    it('Test that users can remove items from the cart and the removed items no longer appear in the cart.',() => {
        // Click on first product add to cart button 
        homePage.getAllProduct().first().contains('Add to cart').click();

        // Click on the cart icon
        homePage.getCartIcon().click();

        // Click on the close icon to delete the the product
        homePage.getDeleteProductCloseIcon().click();

        //To check after deleting cart item should not exist
        homePage.getCartItem().should("not.exist");
    });
})