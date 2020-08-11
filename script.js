$(document).ready(function () {
  $("#citySearch").on("click", function (event) {
    event.preventDefault();
    console.log("=============================");
    var city = $("#inputCity").val().trim().toLowerCase();
    console.log("This is the city searched: ", city);
    var fahrenheitUnits = "&units=imperial";
    var apiKey = "&appid=" + "834f6c40f1d6279c2ecf1aa03eab085f";
    var cityQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      fahrenheitUnits +
      apiKey;
    console.log("This will be the queryURL: ", cityQueryURL);

    $.ajax({
      url: cityQueryURL,
      method: "GET",
    }).then(function (response) {
      //should be able to pull weather conditions, temperature in F, humidity, and windspeed - will need another ajax call that uses lon and lat to search for UV index
      console.log("this is our response: ", response);
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      console.log("This is longitude: ", lon, "this is latitude: ", lat);
      var conditions = response.weather[0].description;
      var temp = response.main.temp;
      var humidity = response.main.humidity + "%";
      var windSpeed = response.wind.speed + " mph";
      console.log(
        "weather conditions: ",
        conditions,
        "temperature: ",
        temp,
        "humidity: ",
        humidity,
        "wind speed: ",
        windSpeed
      );
    });

    
  });
});
