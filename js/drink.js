var pushButton = document.getElementById('button');
var recipie = document.getElementById('drinkRecipie');

//Button event that adds animations and gets the request function
pushButton.addEventListener('click', function(){
    $('#button').removeClass('shakeIt');
    $('#drinkRecipie').addClass('fadeIn');
    getDrink();
    $('#fullRecipie').remove();
});

//Request function
function getDrink(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/random.php', true);
    
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = request.responseText;
            var json = JSON.parse(resp);
            console.log(json);
            
            var drinks = json.drinks;

            var drink = drinks[0];

            $('#button').addClass('shakeIt');
        
            // $('#drinkRecipie .fullRecipie').remove();
            
            recipie.innerHTML += drinkTemplate(drink);
            
            $('#fullRecipie').slick({
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 4,
            });

        } else {
            // We reached our target server, but it returned an error
            
        }
    };
    
    request.onerror = function() {
        // There was a connection error of some sort
    };
    
    request.send();
}

function drinkTemplate(_obj){

    var ingredients = [];
    for(var i=1; i< 15; i++){

        var measure =  _obj['strMeasure' + i] + " " + _obj['strIngredient' + i];
        if(measure.length >= 1){
            ingredients.push(measure);
        }
        
    }
    var instructions = _obj.strInstructions;
    var list = ingredients.map(function(item){
        return `<li class="ingredient slide">${item}</li>`
    }).join("");
    return `<div id="fullRecipie">
        <img src="${_obj.strDrinkThumb}" class="drinkThumb" width="100px"/>
        <h2 class="drinkName slide">${_obj.strDrink}</h2>

        <ul class="list">
            ${list}
        </ul>

        <p class="instructions slide">
            ${instructions}
        </p>
    </div>`
}