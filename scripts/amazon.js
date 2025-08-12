/*
Main Idea of Javascript
1. Save the data - information about our products
2. Generate the HTML
3. Make it interactive
*/

//save the information about our products in the JavaScript file using an array of objects
//structure needs to be the same so we can have modularity

//naming conflict, its hard to tell which variables have been made in other files
//const cart = [];


//import the variable cart and rename it to myCart
//import {cart as myCart} from '../data/cart.js'
import {cart, addToCart} from '../data/cart.js'
import {products} from '../data/products.js'
//imports need to be at the top, and to use modules we need live server - can't open html file directly

/* 
Alternate option for multiple imports from same file:
import * as cartModule from '../data/cart.js' - imports everything into object

cartModule.cart;
cartModule.addToCart('id');

*/
import {formatCurrency} from './utils/money.js';


let productsHTML = '';

products.forEach((product) =>{
  //accumulator pattern
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img
          class="product-image"
          src="${product.image}"
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars*10}.png"
        />
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>

      <div class="product-price">$${formatCurrency(product.priceCents)}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

//changes innerHTML so stays in this file
function updateCartQuantity(){
  let cartQuantity = 0;
    
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', ()=>{
    /*
    How do we know which product to add/

    Data Attribute
    - is just another HTML attribute 
    - it allows us to attach any information to an element
    - just an HTML attribute
    - have to start with data- (kebab case)
    */ 

    //gives us all data attributes attached to the button
    //converts kabab case to camel case
    //13h
    const { productId } = button.dataset;

    //split up code into smaller functions - better readability
    addToCart(productId);
    updateCartQuantity();

  });
});