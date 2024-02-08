// // When html is loaded the page is ready to run
var cityInput = document.querySelector(".city-input")
var weather = document.querySelector(".weather-input");
var searchButton = document.querySelector(".search-button");
var currentWeatherDiv = document.querySelector(".current-weather");
var weatherCardsDiv = document.querySelector(".weather-cards");

// // API key for openweathermap
var API_KEY = "f2eb18881281555f09869f2032b44d6c";

// // Current weather function
// // URL needed to query the database of the OpenWeatherMap API
// // Store all of the retrieved data inside of a response object 
// // Log the queryURL and resulting object
// //search History stored in localStorage
// //clearing previous weather data

//HTML for the main weather card
function createWeatherCard(cityName, weatherItem, index) {
  console.log(weatherItem, "this is the weather item")
  if(index === 0) {
      return `<div class="details">
                  <h3>${cityName} (${weatherItem.dt_txt.split("")[0]})</h3>
                  <h4>Temprature:${(weatherItem.main.temprature - 273.15).toFixed(2)}°C</h4>
                  <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                  <h4>Humidity: ${weatherItem.main.humidity}</h4>
              </div>
              <div class="icon">
                  <img src="http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                  <h4>${weatherItem.weather[0].description}</h4>
              </div>`;

//HTML for the 5 day forcast card
  } else {

      return `<li class="card"> 
                  <h3>(${weatherItem.dt_txt.split("")[0]})</h3>
                  <img src="http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                  <h4>Temprature:${(weatherItem.main.temprature - 273.15).toFixed(2)}°C</h4>
                  <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                  <h4>Humidity: ${weatherItem.main.humidity}%</h4>
              </li>`;     
}}

function getWeatherDetails(cityName, lat, lon) {
  var WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
console.log(data, "this is get weather details")
//filter to only one forcast per day
      var fiveDayForcast = [data.list[0],data.list[8],data.list[16],data.list[24], data.list[32],data.list[39]]
      // var dailyForcast =[];
  
      // var fiveDayForcast = data.list.filter(forcast => {
      //     var forecastDate = new Date(forcast.dt-text).getDate();
      //     if(!dailyForcast.includes(forecastDate)) {
      //         return dailyForcast.push(forecastDate);
      //     }
      // });
    
//clearing previous weather data
      // cityInput.value = "";
      // currentWeatherDiv.innerHTML ="";
      // weatherCardsDiv.innerHTML = "";

//adding weather cards to the DOM
for (index = 0; index < fiveDayForcast.length; index++) {
  weatherItem = fiveDayForcast[index];
  if ((index === 0)) {
    currentWeatherDiv.insertAdjacentHTML(
      "beforeend",
      createWeatherCard(cityName, weatherItem, index)
    );
  } else {
    weatherCardsDiv.insertAdjacentHTML(
      "beforeend",
      createWeatherCard(cityName, weatherItem, index)
    );
  }
}
      // fiveDayForcast.forEach(weatherItem => {
      //     if(index=== 0) {
      //         weatherCardsDiv.insertAdjacentHTML("beforeend" , createWeatherCard(cityName, weatherItem, index));
      //     } else {
      //         weatherCardsDiv.insertAdjacentHTML("beforeend" , createWeatherCard(cityName, weatherItem, index)); 
      //     }   
      // });
  }).catch(() => {
      alert("ERROR!");
  });

}

// ENTER city name
function getCityCoordinates(e){
  e.preventDefault()

  // var cityName = form.value.trim();
  var cityName = "london"
  // if (!cityName) return; 
  var GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
  

//retreave weather information form the API's
  fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
      console.log(data, "this is get city coordinates")
      if(!data.length) return alert(`ERROR! No information found for ${cityName}`);
      var { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
      // console.log(data)
  }).catch(() => {
      alert("ERROR!");
  });
  // console.log(cityName)
}