var apiKey = "835ac51cd6706255ca416c658e012750";

// Gets the Coordinates
//TODO Validation - What if user enters a city which doesn't exist?
function getCoordinates(event) {
    event.preventDefault();

    var city = $("#search-input").val().trim();
    var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=835ac51cd6706255ca416c658e012750"; 

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
        fiveDayForecast(response);
        createButton(response);

    });

    function currentWeather(response) {

        let city = $("<h2>").text(response.name);
        let todayDate = $("<h3>").text(response.list[0].dt_txt).css("font-weight", "bold");
        let currentTemp = $("<p>").text("Current temperature: " + convertKelvinToCelcius(response.list[0].main.temp));
        let currentHumidity = $("<p>").text("Current humidity: " + response.list[0].main.humidity + "%");
        let currentWindSpeed = $("<p>").text("Current wind speed: " + response.list[0].wind.speed + "mph");
        $("#today").css("display", "block");

        let currentWeatherArr = [];
        currentWeatherArr.push(city, todayDate, currentTemp, currentHumidity, currentWindSpeed);
        
        $("#today").append(currentWeatherArr);

    }

    function convertKelvinToCelcius(kelvin) {
        celcius = kelvin - 273.15;
        return celcius.toPrecision(2) + "c";
    }
            
    }


// TODO - Validation for City Names
// TODO - Saving to Local Storage
// TODO - FontAwesome Icon Logic

// Event listeners
  $("#search-form").on("submit", getCoordinates);



