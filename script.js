var apiKey = "835ac51cd6706255ca416c658e012750";

// Gets the Coordinates
//TODO Validation - What if user enters a city which doesn't exist?
function getCoordinates(event) {
    event.preventDefault();

    var city = $("#search-input").val().trim();
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=835ac51cd6706255ca416c658e012750"; 

    $.ajax( {
        url: geoURL,
        method: "GET"
      }).then(function(response) {
          
    console.log(response);

    var geoLocation = {
     lat: response[0].lat,
     lon: response[0].lon,
    }
    getWeather(geoLocation);
});
}

function getWeather(location) {

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+location.lat+"&lon="+location.lon+"&appid="+apiKey;

    $.ajax( {
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        currentWeather(response);

    });


    function currentWeather(response) {
        let currentTemp = $("<p>").text("Current temperature: " + response.list[0].main.temp);
        let currentHumidity = $("<p>").text("Current humidity: " + response.list[0].main.humidity);
        let currentWindSpeed = $("<p>").text("Current wind speed: " + response.list[0].wind.speed);

        $("#today").append(currentTemp);
        $("#today").append(currentHumidity);
        $("#today").append(currentWindSpeed);
    }

    function fiveDayForecast(response)
 {
    var day1 = { // an Array of objects? Or an object array?
        time:
        temp:
        humidity:
        windspeed:
    }
    }

 }         // Function for current weather
         // Function for 5 day forecast
         // Validation - Valid city name?


}








// Event listeners
  $("#search-form").on("submit", getCoordinates);
