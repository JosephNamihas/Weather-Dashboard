var apiKey = "835ac51cd6706255ca416c658e012750";


var searchButton = document.querySelector("#search-button"); // The button
var searchBox = document.querySelector("#search-box"); // The search bar
var todayWeather = document.querySelector("#today-weather"); // Today's weather


function getCoordinates(event) {
    event.preventDefault();

    var city = searchBox.value // Search Button Input
    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=835ac51cd6706255ca416c658e012750`; 

    $.ajax( {
        url: geoURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        var geoLocation = {
            lat: response[0].lat,
            lon: response[0].lon,
        }
        console.log(geoLocation);

        getWeather(geoLocation)
    });
}

function getWeather(location) {

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+location.lat+"&lon="+location.lon+"&appid="+apiKey;

    $.ajax( {
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        displayWeather(response);

    });
}

function displayWeather(response) {
    console.log(response.city.name)
    let city = $("<h2>").text(response.city.name);
    let todayDate = $("<h3>").text(response.list[0].dt_txt).css("font-weight", "bold");
    let currentTemp = $("<p>").text("Current temperature: " + convertTemp(response.list[0].main.temp) + "c");
    let currentHumidity = $("<p>").text("Current humidity: " + response.list[0].main.humidity + "%");
    let currentWindSpeed = $("<p>").text("Current wind speed: " + response.list[0].wind.speed + "mph");

    $("#today-weather").append(city, todayDate, currentTemp, currentHumidity, currentWindSpeed);
};

searchButton.addEventListener("click", getCoordinates); // 2nd argument must be function

const convertTemp = (weather) => {
    return (weather - 273.15).toFixed(2);
}



