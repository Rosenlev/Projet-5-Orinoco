// Variables
const url= 'http://localhost:3000/api/teddies'

// Fetch information about the teddies from the API //
const getTeddies = async (url) => { 
    const response = await fetch(url); //Promise: the API URL must be retrieved
    return await response.json(); //Parse the response
}

// Display all the products on the index page
const displayProducts = async () => {
    const products = await getTeddies(url)
    products.forEach(product => { //Array ForEach() Method
    renderProduct(product.name, product._id, product.imageUrl, product.price); //Creates an array, calls the function
    });
}

//Call function displayProducts
displayProducts();

// Display one product thanks to the function renderProduct
function renderProduct (productName, productId, productImg, productPrice) {//defines the function
    const products = document.querySelector('#product-item');  // Selects the div in which the section will be created by JS script 
    const section = document.createElement('section');
    section.innerHTML = `<img alt="${productName}" src="${productImg}">
    <h6 class="product-title">${productName}</h6>
    <p class="price">${productPrice / 100} € </p>
    <button class="site-btn btn-line" type="button"><a href="product.html?id=${productId}">Sélectionner</a></button>
    `
    products.appendChild(section); // Creates a section in the div product-item for each product   
}
