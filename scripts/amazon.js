/*
Main Idea of Javascript
1. Save the data - information about our products
2. Generate the HTML
3. Make it interactive
*/

//save the information about our products in the JavaScript file using an array of objects
//structure needs to be the same so we can have modularity

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

      <div class="product-price">$${(product.priceCents/100).toFixed(2)}</div>

      <div class="product-quantity-container">
        <select class="js-quantity-selecto-${product.id}">
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

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

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
    const productId = button.dataset.productId;

    let matchingItem;

    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });
    const selectedQuantity = Number(document.querySelector(`.js-quantity-selecto-${productId}`).value);

    if(matchingItem){
      matchingItem.quantity += selectedQuantity;
    }else{
      cart.push({
        productId: productId,
        quantity: selectedQuantity
      });
    }

    let cartQuantity = 0;
    
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});