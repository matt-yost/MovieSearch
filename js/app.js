(function() {
  'use strict';

  $(".description").hide();

  // Define url for GET Request
  var url = "http://www.omdbapi.com/?";
  var searchTitle, searchYear,userSelectedTitle, userSelectedYear;

  // On form submit, capture user input and initiate GET request
  $("form").submit(function(e){
    e.preventDefault();
    searchTitle = $("#search").val();
    searchYear = $("#year").val();
    getMovies();
  });

  // Send request to OMDb for movies to display
  var getMovies = function(){
    var options = {
      s: searchTitle,
      y: searchYear,
      type: "movie",
      r: 'json'
    };

    $.get(url, options, displaySearch);
  };

  // Function that takes the results from OMDb and dynamically displays them
  var displaySearch = function(results){
    var html = "";

    // If there is a response loop through the results and display
    if(results.Response === "True"){
      $.each(results.Search, function(i, movie){
        html += "<li><div class='poster-wrap'>";

        // If the movie poster is not available, display the default placeholder. Otherwise, display poster and link to IMDB
        if (movie.Poster === 'N/A') {
    			html += "<i class='material-icons poster-placeholder'>crop_original</i>";
    		} else {
    			html += "<a href='http://www.imdb.com/title/" + movie.imdbID + "'>" + "<img class='movie-poster' src='" + movie.Poster + "'>";
    		}

        html += "</a></div>";
        // Display title and year of release
        html += "<span class='movie-title'>" + movie.Title + "</span>";
        html += "<span class='movie-year'>" + movie.Year + "</span>";
        html += "<button type='button' class='description-button'>Description</button></li>";
      });
      // If there is no results, let the user know
    } else {
      html += "<li class='no-movies'>";
      html += "<i class='material-icons icon-help'>help_outline</i>No movies found that match: " + searchTitle + "</li>";
    }
    $("#movies").html(html);
  };

  // When a description button is clicked, gather information to send request
  $("body").on("click", ".description-button", function(){
    userSelectedTitle = $(this).prev().prev().text();
    userSelectedYear = $(this).prev().text();

    getDescription();
  });

  // Send request to OMDb to show descripton of movie selected
  var getDescription = function(){
    var options = {
      t: userSelectedTitle,
      y: userSelectedYear,
      plot: "full",
      type: "movie",
      r: "json"
    }

    $.get(url, options, displayDescription);
  };

  // Dynamically display description results
  var displayDescription = function(results){
    $(".main-content").hide();
    $(".description").show();
    var html = "";
    html += "<div class='description'><div class='title-bar'><a href='index.html'><p id='search-link'>Search results</p></a>";
    html += "<h1 id='description-movie-title'>" + results.Title + "(" + results.Year + ")" + "</h1>";
    html += "<p id='imdb-rating'>IMDB Rating: " + results.imdbRating + "</p></div>";
    html += "<div class='content-bar'>";

    if(results.Poster === "N/A"){
      html += "<p id='movie-poster'>Poster not available</p>";
    } else {
      html += "<img id='movie-poster' src='" + results.Poster + "'/>";
    }

    html += "<h3 id='plot-synopsis'>Plot Synopsis:</h3>";
    html += "<p id='plot-syn-text'>" + results.Plot + "</p>";
    html += "<a id='view-on-imdb' href='http://www.imdb.com/title/" + results.imdbID + "'>View on IMDB</a></div></div>";

    $(".description").html(html);
  }


// Do not type below here
}());
