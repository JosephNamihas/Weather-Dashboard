var apiKey = "835ac51cd6706255ca416c658e012750";

var londonGeoCodingQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=835ac51cd6706255ca416c658e012750";

var barcelonaGeoCodingQueryURL = "http://api.openweathermap.org/geo/1.0/direct?q=Barcelona&limit=5&appid=835ac51cd6706255ca416c658e012750";

// -------------------  GETS GEOLOCATION QUERY
$.ajax( {
    url: londonGeoCodingQueryURL,
    method: "GET"
  }).then(function(response) {
  
    console.log(response);

   var londonGeoLocation = {
    lat: response[0].lat,
    lon: response[0].lon,
   }

   //TODO Add 2nd Location - How to add the 2nd geocoding URL?


   // -------------------  GETS FORECAST QUERY


    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+londonGeoLocation.lat+"&lon="+londonGeoLocation.lon+"&appid="+apiKey;

    $.ajax( {
        url: forecastQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var date = response.list[0].dt_txt;
    
        var temp = response.list[0].main.temp;
        var windSpeed = response.list[0].wind.speed;
        var humidity = response.list[0].main.humidity;
    
        console.log("London: \n"+date+"\nTemp: "+temp+"\nWindspeed: "+windSpeed+"\nHumidity: "+humidity);
    })
  });


  // 