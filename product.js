// API URL
const url = 'http://localhost:3000/api/teddies/';

// Fetch the ID parameter from the API URL
const parameters = new URLSearchParams(window.location.search)
const id = parameters.get("id")

const section = document.querySelector('section'); 


// Fetch one teddy
const getOneTeddy = async (productUrl, productId) => {
    const response = await fetch(productUrl + productId);
    return await response.json();
}

// Display one product
const displayProduct = async () => {
    const data = await getOneTeddy(url, id);
    renderTeddy(data);
    customizeYourTeddy(section, data.colors);
    addToCart(section, data);    
}

// Display product data
function renderTeddy (productData) {
    section.innerHTML = `
    <div class="product-content">
        <img src="${productData.imageUrl}" alt="${productData.name}">
        <div class="product-information">
            <h2 class="product-title">${productData.name}</h2>
            <p class="price">${productData.price / 1000} €</p>       
            <p class="description">${productData.description}</p>
        </div>
    </div>`;
}

// Product customization
function customizeYourTeddy (parentElt, productColors) {
    // Customization Options
    const label = document.createElement('label');
    const select = document.createElement('select');

    label.setAttribute('for', 'color-list');
    label.textContent = 'Couleurs disponibles : '
    select.id = "color-list";

    parentElt.appendChild(label);
    parentElt.appendChild(select);

    // Creates an option for each color thanks to the forEach() method
    productColors.forEach(productColor => {
        const option = document.createElement('option');
        option.value = productColor;
        option.textContent = productColor
        select.appendChild(option);
    })

    // Fetch chosen color in the console.log
    select.addEventListener('change', (e) => {
        colorChosen = e.target.value;
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