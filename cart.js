//Variables
const cart = document.querySelector('#cart'); // Binds the cart section to the js
const cartTotal = document.getElementById('cart-total'); //Binds the data to HTML table (h3 to total price)

const cartInformation = { //Creates an empty array for the elements "contact" and "products", to be filled with data 
    contact: {},
    products: []
}

let totalPrice = 0;


// Retrieves elements from localStorage
const getCart = async (index) => {
    return await JSON.parse(localStorage.getItem(localStorage.key(index)))
}

// Display the products in the cart
const displayCart = async () => {
    if(localStorage.length > 0) { 
        for (let i = 0; i < localStorage.length; i++) { // Browses each item in the local storage
        const product = await getCart(i) // Fetches the information stored in localStorage thanks to the getCart function
        const teddyId = product[0]; // Stores product id
        const teddyName = product[1]; // Stores product name
        const teddyPrice = product[2] / 100; // Stores product price
        const teddyImg = product[3]; // Stores product image
        cartInformation.products.push(teddyId); // Pushes id product to the cartInformation table products section 

        renderCart(teddyName, teddyPrice, teddyImg) // Allows the products to be displayed

        const remove = document.querySelectorAll('.remove')[i]; 
        const article = document.querySelectorAll('article')[i];

        deleteCart(remove, article, teddyName) 
        }
    } else {
        cart.textContent = 'Votre panier est vide.';
        form.classList.add('invisible')
    }   
}
// Allows the product to be displayed binding API data to HTML document
const renderCart = (productName, productPrice, imgUrl) => {
    //Displays the product in the cart
    const article = document.createElement('article');
    article.innerHTML = `
    <div class="product-information">
    <p class="product-title">${productName}</p>
    <img src="${imgUrl}">
    <p class="price">${productPrice} €</p>
    <div class="remove"><button class="site-btn btn-line">Supprimer</button></div>
    </div>`
    cart.insertBefore(article, cartTotal); // Inserts article before cartTotal
    
    totalPrice += productPrice; //Creates the real total price 
    cartTotal.textContent = `Total : ${totalPrice}€`; //Displays total price on the webpage
}
//Deletes an element from cart when you click on it
const deleteCart = (removeElt, container, productName) => {
    removeElt.addEventListener('click', async () => {//Listens to the the event "click"
        await localStorage.removeItem(productName);// Deletes item from local storage
        container.remove(); //Deletes item from DOM
        location.reload(true); //Reloads the page automatically
    })
}
displayCart();