// Variables
const url = 'http://localhost:3000/api/teddies/';
const parameters = new URLSearchParams(window.location.search)
const id = parameters.get("id") // extracts the id of the teddy we want from the URL of the page

const section = document.querySelector('section'); // Selects the div in which the section will be created by JS script 


// Fetch one teddy
const getOneTeddy = async (productUrl, productId) => {
    const response = await fetch(productUrl + productId); //Promise: the API URL must be retrieved
    return await response.json(); //Parse the response
}

// Display one product and the functionalities: customization option and add it to cart
const displayProduct = async () => {
    const data = await getOneTeddy(url, id); //Promise: the URL and the id must be retrieved to get the information from the API table
    renderTeddy(data); // the function renderTeddy is called with the constant data as parameter
    customizeYourTeddy(section, data.colors); // the function customizeYourTeddy is called with the constant section and data as parameters, to which is applied the colors setting
    addToCart(section, data);    // the function addToCart is called with section and data as parameters
}

// Display product data
function renderTeddy (productData) {// creates a div to be implemented into the HTML file
    section.innerHTML = `
    <div class="product-content">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <div class="product-information">
            <h1 class="product-title">${productData.name}</h1>
            <p class="price">${productData.price / 100} €</p>       
            <p class="description">${productData.description}</p>
        </div>
    </div>`;
}

// Product customization
function customizeYourTeddy (parentElt, productColors) { // creates a dropdown menu to pick the chosen color
    // Customization Options
    const label = document.createElement('label');
    const select = document.createElement('select');

    label.setAttribute('for', 'color-list');
    label.textContent = 'Couleurs disponibles : '
    select.id = "color-list";

    parentElt.appendChild(label); //Creates the label in HTML document
    parentElt.appendChild(select); //Creates the dropdown menu in HTML document

    // Creates an option for each color thanks to the forEach() method
    productColors.forEach(productColor => {
        const option = document.createElement('option');
        option.value = productColor;
        option.textContent = productColor
        select.appendChild(option);
    })

    // Fetch chosen color in the console.log
    select.addEventListener('change', (event) => {
        const colorChosen = event.target.value;
        console.log(colorChosen); 
    });
}
// Adds the product to cart
function addToCart (parentElt, productData) {
    // Creates the button to push data to cart
    const btn = document.createElement('div');
    const div = document.createElement('div');
    btn.innerHTML=`<div class="site-btn btn-line">Ajouter au panier</div>`
    div.classList.add('add-to-cart');
    parentElt.appendChild(div);    
    parentElt.appendChild(btn);

    // Values to push to local storage
    const product = [productData._id, productData.name, productData.price, productData.imageUrl];
    // Push onClick
    btn.addEventListener('click', () => {
        localStorage.setItem(productData.name, JSON.stringify(product));
        btn.classList.add('invisible')
        div.textContent = 'Le produit a été ajouté au panier !'
    })
}

displayProduct(); 