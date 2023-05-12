const apiKey = "835ac51cd6706255ca416c658e012750";

var searchButton = document.querySelector("#search-button"); // The button
var searchBox = document.querySelector("#search-box"); // The search bar
var todayWeather = document.querySelector("#today-weather"); // Today's weather

var cityNameFooter = document.querySelector("#city-name-footer") // Displays City name in Footer


const getCoordinates = (event) => {
    event.preventDefault();

    var city = searchBox.value; // Search Button Input
    var geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`; 

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

const getWeather = (location) => {

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+location.lat+"&lon="+location.lon+"&appid="+apiKey;

    $.ajax( {
        url: forecastURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        displayWeather(response);

    });
}

const displayWeather = (response) => {
    // let city = $("<h2>").text(response.city.name);
    // let cityFooter = $("<li>").text(response.list[0].main.temp);
    let todayDate = $("<h3>").text(response.list[0].dt_txt).css("font-weight", "bold");
    let currentTemp = $("<li>").text(`Current temperature: ${convertTemp(response.list[0].main.temp)}c`);
    let currentHumidity = $("<li>").text(`Current humidity: ${response.list[0].main.humidity}%`);
    let currentWindSpeed = $("<li>").text(`Current wind speed: ${response.list[0].wind.speed}mph`);
    let chanceOfRain = $("<li>").text('Chance of Rain: ')
    
    // Remove element in jQuery
    $("#today-weather").text(`${response.city.name} - ${response.list[0].dt_txt}`);
    // $("#today-city").text(response.city.name);
    $("#today-list").append(currentTemp, currentHumidity, currentWindSpeed);
};

searchButton.addEventListener("click", getCoordinates);

const convertTemp = (weather) => {
    return (weather - 273.15).toFixed(2);
}

// Logos




