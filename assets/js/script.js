// Page is ready to run after html is loaded
$(document).ready(function(){

  // Search History search-input City Input             
  var searchedCities = [];
  
  // Stored cities click function
  $("#search-button").on("click", getSearchInput);
  $(document).on("click", ".selected", storedCities);
  
  // Call searchHistory function when the dashboard page loads
  searchHistory();
  
  // Stored cities in search history
  function storedCities() {
     
      var city = $(this)[0].innerHTML;
       getWeather(city);
      }
  
  // function to get user input/city
  function getSearchInput(event) {
      event.preventDefault();
      $("#previousSearches").empty();
      var city = $(".form-input").val(); 
      searchedCities.push(city);
      localStorage.setItem("cities", JSON.stringify(searchedCities));
      // New searched cities displayed
      var searchHistoryList = $("<div>").text(city).addClass("selected");
      $("#searchHistory").append(searchHistoryList);
      $("#search-Input").val("");
      getWeather(city);
  }
  
  //function to display cities stored in localStorage
  function searchHistory() {
      searchedCities = JSON.parse(localStorage.getItem("cities"));
      if (searchedCities === null) {
      searchedCities = [];
       }
      for (var i = 0; i < searchedCities.length; i++) {
          var displaySearchedCities = searchedCities[i];
          var searchHistoryList = $("<div>").text(displaySearchedCities).addClass("selected"); 
          $("#searchHistory").append(searchHistoryList);
      }
  }
   
  //WEATHER API //              
  
  //API key for openweathermap
  var apiKey = "1ff0f6823d723403dabe8415bdcb12e3";
  
  // Weather function
  function getWeather (city) {

  // URL needed to query the database 
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  
  // Run AJAX GET call 
       $.ajax({
          url: queryURL,
          method: "GET",
          dataType: "jsonp",
  // Store recieved data inside of a response object 
          success: function(response){
  // console.log the queryURL 
              console.log(queryURL);
              console.log(response);
  
                  // Recieve dates
                  function date_format(dt_string){
                      var date = new Date(dt_string.dt*1000);
                      return date.toDateString();
                  }
  
                  // temperature 
                  function temp_trans(input){
                      var temp =  "Temperature: " + (input.main.temp- 273.15).toFixed(2) + " °C ";
                      return temp;
                  }
          
 //Get rid of previous searches
   $("#previousSearches").empty();
  
   var holder= response.list[0];
 // CURRENT WEATHER //              
  
 //HTML for the main weather card
                          $(".currentCity").html("<h3>" + response.city.name + " " + date_format(holder) + "</h3>").append(
                              $('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@4x.png" +' "/>')); 
                          $(".humidity").text("Humidity: " + holder.main.humidity + " %");
                          $(".windSpeed").text("Wind Speed: " + holder.wind.speed + " mph");
                          $(".temperature").text(temp_trans(holder));
                           
  //HTML for the 5 day forcast card                                    
                      for(i=1; i<=5; i++){
                      holder= response.list[(i*8)-1];
                    
                      $("#"+ i + "dayForecast").text(date_format(holder));
                      $("#"+ i + "dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+holder.weather[0].icon+".png" +' "/>'));
                      $("#"+ i + "dayHumidity").text("Humidity: " + holder.main.humidity + " %");
                      $("#"+ i + "dayTemperature").text(temp_trans(holder));
                      $("#"+ i + "dayWindSpeed").text("Wind Speed: " + holder.wind.speed + " mph");
                      }
                }
          });           
  } 
  
  //Adding weather cards to the DOM
  function getUVindex(lat,long) {  
      var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
  
 //AJAX call 
      $.ajax({
          url: queryURL,
          method: "GET"
      })
         
      } 
  getWeather("London");
  }); 