/*navbar*/
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

/*cart*/
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.shopcart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () => {
    cart.classList.add('active');
}

closeCart.onclick = () => {
    cart.classList.remove('active');
}

/*cart working*/
if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-qty')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }

    var addCart = document.getElementsByClassName('cart')
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked)
    }
}
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal();
}

function addCartClicked(event){
    var button = event.target
    var shopProduct = button.parentElement
    var title = shopProduct.parentElement.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.parentElement.getElementsByClassName('price')[0].innerText;
    var productImg = shopProduct.parentElement.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title) {
            alert('you already have add this item to cart')
            return;
        }
    }
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-qty">
                            </div>
                            <i class="far fa-trash cart-remove"></i>
                        </div>`
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-qty')[0].addEventListener('change', quantityChanged)

}

function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-qty')[0];
        var price = priceElement? 
        parseInt(priceElement.innerText.replace('$', '')):0
        var quantity = quantityElement?
        quantityElement.value:1
        total = total + price * quantity;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    }
}

