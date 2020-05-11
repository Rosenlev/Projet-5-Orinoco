//Variables
const url= 'http://localhost:3000/api/teddies'

// Fetch information about the teddies from the API //

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        var i;
        var i_max = response.length;
        console.log(i_max)
        
        for (i = 0; i <= i_max; i++){
            obj = response[i]["_id"];
            console.log(obj["name"]);
            
        }
    }
};

request.open("GET", "http://localhost:3000/api/teddies");
request.send();

