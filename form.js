

//Variables form
const form = document.querySelector('form'); // Binds the form section to the js

const containNumber = /[0-9]/;
const regexEmail = /.+@.+\..+/;
const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!"{}_"]/;

const isNotEmpty = value => value !== "" ? true : false; // Checks the field is not empty
const isLongEnough = value => value.length >= 2 ? true : false; // Check there is enough characters
const doNotContainNumber = value => !value.match(containNumber) ? true : false; // Checks there's no number
const doNotContainSpecialCharacter = value => !value.match(specialCharacter) ? true : false; // Checks there's no special character
const isValidEmail = (value) => value.match(regexEmail) ? true : false; // Checks the input is in the right format
const isValidInput = (value) => isNotEmpty(value) && isLongEnough(value) && doNotContainNumber(value) && doNotContainSpecialCharacter(value);// renvoie true si toutes les conditions sont vérifiées

// Form parts
const firstName = form.elements.firstName;
const lastName = form.elements.lastName;
const address = form.elements.address;
const city = form.elements.city;
const email = form.elements.email;
const btn = document.getElementById('site-btn');

const firstNameErrorMessage = document.getElementById('firstNameErrorMessage')
const lastNameErrorMessage = document.getElementById('lastNameErrorMessage')
const addressErrorMessage = document.getElementById('addressErrorMessage')
const cityErrorMessage = document.getElementById('cityErrorMessage')
const emailErrorMessage = document.getElementById('emailErrorMessage')

// Checks user inputs
const formValidate = () => {
        if (isValidInput(firstName.value)) { 
            firstNameErrorMessage.textContent = ""; 
    
        } else {
            firstNameErrorMessage.textContent = "Veuillez renseigner votre prénom"
            firstName.focus();
            return false;
        }
    
        if(isValidInput(lastName.value)) {
            lastNameErrorMessage.textContent = "";
    
        } else {
            lastNameErrorMessage.textContent = "Veuillez renseigner votre nom"
            lastName.focus();
            return false;
        }
    
        if(isNotEmpty(address.value) && isLongEnough(address.value)) {
            addressErrorMessage.textContent = "";
    
        } else {
            addressErrorMessage.textContent = "Veuillez renseigner votre adresse"
            address.focus();
            return false;
        }
    
        if (isValidInput(city.value)) {
            cityErrorMessage.textContent = "";
    
        } else {
            cityErrorMessage.textContent = "Veuillez renseigner votre ville";
            city.focus();
            return false;
        }
    
        if (isValidEmail(email.value)) {
            emailErrorMessage.textContent = "";
    
        } else {
            emailErrorMessage.textContent = "Veuillez renseigner une adresse e-mail valide"
            email.focus();
            return false;
        }
    
        return cartInformation.contact = { // If every input is valid, sends the objects to cartInformation
                                firstName: firstName.value,
                                lastName: lastName.value,
                                address: address.value,
                                city: city.value,
                                email: email.value
                            }
}



// Send data to API
const postData = async (method, url, dataElt) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method,
        body: JSON.stringify(dataElt)
    })
    return await response.json();
}

btn.addEventListener("click", async (event) => {
    event.preventDefault(); 
    const validForm = formValidate(); // Validates form
    if (validForm !== false ) {
        const response = await postData('POST', 'http://localhost:3000/api/teddies/order', cartInformation); // Sends data to server    
        window.location = `checkout.html?id=${response.orderId}&price=${totalPrice}&user=${firstName.value}`; // Sends to checkout page
    }
})