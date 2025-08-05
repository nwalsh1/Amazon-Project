//Export cart
export const cart = [];

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
}