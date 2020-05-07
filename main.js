// Fetch information about the teddies from API //

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        var i;
        var i_max = response.length;
        console.log(i_max)
        let elt = index.getElementByClass('product-filter');
        
        for (i = 0; i <= i_max; i++){
            obj = response[i]["_id"];
            console.log(obj["name"]);
            
        elt.innerHTML = "<div class='product-info'><h6>"+obj["name"]+"</h6></div>";
        }
    }
};

request.open("GET", "http://localhost:3000/api/teddies");
request.send();

//Local storage

