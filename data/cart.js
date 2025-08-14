//Export cart
export let cart = JSON.parse(localStorage.getItem('cart')) || 

[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', //use the ID to find the product info, just need to save this, dedupe/normalizing the data
  quantity: 2
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


//13m
let timeout;

//challenge exercise:
function challenge(productId){
    //update quantity based off of selector value
    const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
    //add a message when clicking add to cart
    //13j
    const addMessageElement = document.querySelector(`.js-added-to-cart-${productId}`);
    //13k
    addMessageElement.classList.add('visible-add');

    //13m
     clearTimeout(timeout);
    //13l
    timeout = setTimeout(() => {
      addMessageElement.classList.remove('visible-add');
    },2000)
    return quantity
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  //module
  const quantity = challenge(productId);
  

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      //used the shortcut instead of productId : productId
      productId,
      quantity
    });
  }

  saveToStorage();
}

export function removeFromCart(productId){
  /**
   * Steps:
   * 1. Create a new array
   * 2. Loop through the cart
   * 3. Add each product to the new array exept for this productId
  */

  //1
  const newCart = [];
  //2
  cart.forEach((cartItem) => {
    //3 
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}