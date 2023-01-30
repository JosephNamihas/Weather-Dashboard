var apiKey = "835ac51cd6706255ca416c658e012750";


function getCoordinates(event) {
    event.preventDefault();

    var city = $("#search-input").val().trim();
    
    var GeoCodingQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=835ac51cd6706255ca416c658e012750"; 

    $.ajax( {
        url: GeoCodingQueryURL,
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

    var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+location.lat+"&lon="+location.lon+"&appid="+apiKey;

    $.ajax( {
        url: url,
        method: "GET"
    }).then(function(response) {
        console.log(response);

    });


}











   //TODO Add 2nd Location - How to add the 2nd geocoding URL?
   // Add query URLs to an Array?


   // -------------------  GETS FORECAST QUERY

    /*var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+londonGeoLocation.lat+"&lon="+londonGeoLocation.lon+"&appid="+apiKey;

    $.ajax( {
        url: forecastQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var date = response.list[0].dt_txt;
    
        var temp = $("<p>").text("Temp: " + response.list[0].main.temp);
        console.log(temp);
        var windSpeed = $("<p>").text("Wind Speed: " + response.list[0].wind.speed);
        var humidity = $("<p>").text("Humidity: " + response.list[0].main.humidity);


        var dailyWeatherWindow = $("#today").text("Todays weather in <cityName>." +date);
        dailyWeatherWindow.css({width: 50, height: 50, float: "right"})
        console.log(temp);
        $("#today").append(temp);
        $("#today").append(windSpeed);
        $("#today").append(humidity);
        

        var cityButton = $("<button>").text("Name of City");
        $("#search-form").append(cityButton);

    })
  });
  */
  


  $("#search-form").on("submit", getCoordinates);
