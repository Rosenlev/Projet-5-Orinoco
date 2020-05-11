//Variables
const url= 'http://localhost:3000/api/teddies'

// Fetch information about the teddies from the API //
const getTeddies = async (url) => {
    const response = await fetch(url);
    return await response.json();
}


