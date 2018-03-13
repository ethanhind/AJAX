	var cars = ['Lamborghini', 'Ferrari', 'Porsche', 'McLaren'];


	function displayGif(){

		var gif = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=3qMoDv0k2f36ad2W6kGfMLQ1JLIYlj8k&limit=10&rating=pg";

		 $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		 	console.log(response);
			$("#carView").empty();
            for (var i = 0; i < response.data.length; i++){

            	var rating = response.data[i].rating;
                var imageUrl = response.data[i].images.fixed_height.url;
             	var imageStillUrl = response.data[i].images.fixed_height_still.url;

                var image = $("<img>");
                var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

                
                image.attr('src', imageStillUrl);
                image.attr('alt', 'gif');
                image.attr('data-state', 'still');
                image.attr('data-still', imageStillUrl);
                image.attr('data-animate', imageUrl);


                $('#carView').prepend(image, ratingText);
                checkState ();
            }
		 }); 
	} 

	function renderButtons(){ 

		$('#buttonsView').empty();

		for (var i = 0; i < cars.length; i++){

			var newButton = $('<button class="btn btn-info">')
			
		    newButton.addClass('car');  
		    newButton.attr('data-name', cars[i]); 
		    newButton.text(cars[i]); 
		    $('#buttonsView').append(newButton);
		}
	}

	$('#addCar').on('click', function(){

		var car = $('#car-input').val().trim();

		cars.push(car);
		
		renderButtons();

		return false;
	})


	$(document).on('click', '.car', displayGif);

	renderButtons();
