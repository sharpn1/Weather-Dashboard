// When html is loaded the page is ready to run
$(document).ready(function(){

// API key for openweathermap
var API_KEY = "f2eb18881281555f09869f2032b44d6c";
// Current weather function
function getWeather (city) {

    // Build the URL needed to query the database of the OpenWeatherMap API
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    // Run AJAX GET call to request the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "jsonp",
     // Store all of the retrieved data inside of a response object 
        success: function(response){
            // Log the queryURL and resulting object
            console.log(queryURL);
            console.log(response);

                // Retrieve dates
                function date_format(dt_string){
                    var date = new Date(dt_string.dt*1000);
                    return date.toDateString();
                }
// ENTER city name
//retreave weather information form the API's

//HTML for the main weather card
//HTML for the 5 day forcast card
//filter to only one forcast per day
//clearing previous weather data
//adding weather cards to the DOM
//search History stored in localStorage
}