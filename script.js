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

        //TODO Convert Kelvin to Celcius
        let city = $("<h2>").text(response.city.name);
        let todayDate = $("<h3>").text(response.list[0].dt_txt).css("font-weight", "bold");
        let currentTemp = $("<p>").text("Current temperature: " + convertKelvinToCelcius(response.list[0].main.temp));
        let currentHumidity = $("<p>").text("Current humidity: " + response.list[0].main.humidity + "%");
        let currentWindSpeed = $("<p>").text("Current wind speed: " + response.list[0].wind.speed + "knots");
        
        $("#today").append(city);
        $("#today").append(todayDate);
        $("#today").append(currentTemp);
        $("#today").append(currentHumidity);
        $("#today").append(currentWindSpeed);

    }

    function convertKelvinToCelcius(kelvin) {
        celcius = kelvin - 273.15;
        return celcius.toPrecision(3) + "c";
    }

    


}

          // Function for current weather
         // Function for 5 day forecast
         // Validation - Valid city name?









// Event listeners
  $("#search-form").on("submit", getCoordinates);
