(function() {
  'use strict';

  $(".description").hide();

  // Define url for GET Request and global variables
  var url = "http://www.omdbapi.com/?";
  var searchTitle, searchYear,userSelectedTitle, userSelectedYear;

  // On form submit, capture user input and initiate GET request
  $("body").on("submit", "form", function(e){
    $(".description").hide();
    $(".main-content").fadeIn();
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
  var displaySearch = function(res){
    var html = "";

    // If there is a response loop through the results and display
    if(res.Response === "True"){
      $.each(res.Search, function(i, movie){
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

    // update HTML with response
    $("#movies").html(html);
  };

  // When a description button is clicked, send request with for the title that the user clicked
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
    };

    $.get(url, options, displayDescription);
  };

  // Dynamically display description response
  var displayDescription = function(res){
    $(".main-content").hide();
    $(".description").fadeIn();
    var html = "";
    html += "<div class='description'><div class='title-bar'><a href='index.html'><p id='search-link'>New Search</p></a>";
    html += "<h1 id='description-movie-title'>" + res.Title + "(" + res.Year + ")" + "</h1>";
    html += "<p id='imdb-rating'>IMDB Rating: " + res.imdbRating + "</p></div>";
    html += "<div class='content-bar'>";

    // If there is no poster then tell the user.
    if(res.Poster === "N/A"){
      html += "<p id='movie-poster'>Poster not available</p>";
    } else {
      html += "<img id='movie-poster' src='" + res.Poster + "'/>";
    }

    // Display plot and link to IMDb page
    html += "<h3 id='plot-synopsis'>Plot Synopsis:</h3>";
    html += "<p id='plot-syn-text'>" + res.Plot + "</p>";
    html += "<a id='view-on-imdb' href='http://www.imdb.com/title/" + res.imdbID + "'>View on IMDB</a></div></div>";

    // Update HTML with response
    $(".description").html(html);
  };


// Don't
}());
