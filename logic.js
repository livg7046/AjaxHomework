$(document).ready(function() {

// Global Variables -----------
var buttons = ["cat", "dog", "bird"]


// FUNCTIONS -------------------

function init(){
    renderButtons();
    
}

function renderButtons() {
    $("#my-buttons").empty();
    $("#animal-input").val('');
    
    $.each(buttons, function(i, button) {
        var animalButton = $("<button class='btn btn-info'>");
        animalButton.attr("data-animal", button);
        animalButton.text(button);
        $("#my-buttons").append(animalButton);
    });

    $("button").click(function(event) {
        event.preventDefault();
        $("#gifs").empty();
        console.log("hello");
        let thisAnimal = $(this).attr("data-animal");
        console.log(thisAnimal);
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + thisAnimal + "&api_key=3oGkXtgKjCdvt2GeSxkkEezxdVWa8BwS&limit=10"
        
        $.ajax({
            url: giphyURL,
            method: "GET"
          })
        .then(function(response) {
            var results = response.data;
            $.each(results, function(i, result) {
                var animalImage = $("<img class='card-img-top gif'>");
                animalImage.attr("src", result.images.fixed_height_still.url);
                animalImage.attr("data-still", result.images.fixed_height_still.url);
                animalImage.attr("data-animate", result.images.fixed_height.url);
               
                var p = $("<p class='card-text'>").text("Rating: " + result.rating);
                var card = $("<div class='card'>");
                var cardBody = $("<div class='card-body'>");
                $(cardBody).append(p)
                $(card).append(animalImage);
                $(card).append(cardBody);
                
                $("#gifs").append(card);
                                
            });

            $(".gif").click(function() {
                var state = $(this).attr("data-state");
               
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
          
        });
      });
}


$("#input-form").submit(function(event) {
    event.preventDefault();
    let animal = $("#animal-input").val().trim();
    buttons.push(animal);
    console.log(buttons);
    renderButtons(); 
});


       



init();
console.log(buttons);

});