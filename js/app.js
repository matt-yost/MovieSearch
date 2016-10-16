(function() {
  'use strict';

  // Define url for GET Request
  var url = "http://www.omdbapi.com/?";
  var searchTitle, searchYear;

  // On form submit, capture user input and initiate GET request
  $("form").submit(function(e){
    e.preventDefault();
    searchTitle = $("#search").val();
    searchYear = $("#year").val();
    getOMDb();
  });

  // Send request to OMDb
  var getOMDb = function(){
    var options = {
      s: searchTitle,
      type: "movie",
      r: 'json'
    };

    $.get(url, options, displaySearch);
  };

  // Function that takes the results from OMDb and dynamically displays them
  var displaySearch = function(results){
    var displayMoviesHTML = "";

    // If there is a response loop through the results and display
    if(results.Response === "True"){
      $.each(results.Search, function(i, movie){
        displayMoviesHTML += "<li><div class='poster-wrap'>";

        // If the movie poster is not available, display the default placeholder. Otherwise, display poster
        if (movie.Poster === 'N/A') {
    			displayMoviesHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
    		} else {
    			displayMoviesHTML += "<img class='movie-poster' src='" + movie.Poster + "'>";
    		}

        displayMoviesHTML += "</div>";
        // Display title and year of release
        displayMoviesHTML += "<span class='movie-title'>" + movie.Title + "</span>";
        displayMoviesHTML += "<span class='movie-year'>" + movie.Year + "</span></li>";
      });
      // If there is no results, let the user know
    } else {
      displayMoviesHTML += "<li class='no-movies'>";
      displayMoviesHTML += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchTitle + "</li>";
    }
    $('#movies').html(displayMoviesHTML);
  };

// Don't even try it
}());
