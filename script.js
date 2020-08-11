$(document).ready(function () {
  var todayDate = moment().format("MMMM Do YYYY");
  console.log("todays date: ", todayDate);

  var apiKey = "834f6c40f1d6279c2ecf1aa03eab085f";
  var fahrenheitUnits = "&units=imperial";
  var lon = "";
  var lat = "";

  $("#citySearch").on("click", function (event) {
    event.preventDefault();
    console.log("=============================");
    var city = $("#inputCity").val().trim().toLowerCase();
    console.log("This is the city searched: ", city);

    getCurrentWeather(city, fahrenheitUnits, apiKey);
  });

  function getCurrentWeather(city, fahrenheitUnits, apiKey) {
    var cityQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      fahrenheitUnits +
      "&appid=" +
      apiKey;
    console.log("This will be the queryURL: ", cityQueryURL);
    $.ajax({
      url: cityQueryURL,
      method: "GET",
    }).then(function (response) {
      //should be able to pull weather conditions, temperature in F, humidity, and windspeed - will need another ajax call that uses lon and lat to search for UV index
      console.log("this is our response: ", response);
      lon = response.coord.lon;
      lat = response.coord.lat;
      console.log("This is longitude: ", lon, "this is latitude: ", lat);
      var conditions = response.weather[0].description;
      var conditionsImg = response.weather[0].icon;
      var imgTag = $("<img>");
      imgTag.attr(
        "src",
        "http://openweathermap.org/img/wn/" + conditionsImg + "@2x.png"
      );
      imgTag.attr("style", "width:70%");
      var temp = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      var cityTitle = city.toUpperCase() + " - " + todayDate;
      $("#cityTitle").append(cityTitle);
      $(".imageIcon").append(imgTag);
      $("#temperature").append(" " + temp + " F");
      $("#humidity").append(" " + humidity + "%");
      $("#windspeed").append(" " + windSpeed + " mph");
      console.log(
        "weather conditions: ",
        conditions,
        "conditions image: ",
        conditionsImg,
        "temperature: ",
        temp,
        "humidity: ",
        humidity,
        "wind speed: ",
        windSpeed
      );
      getForecast();

      var cityArray = [];
      cityArray.push(localStorage.getItem("cityArray"));
      cityArray.push(city);
      localStorage.setItem("cityArray", cityArray);

      var cities = localStorage.getItem("cityArray");
      console.log("cities: ", cities);
    });
  }

  function getForecast() {
    var uvQueryURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      fahrenheitUnits +
      "&appid=" +
      apiKey;

    $.ajax({
      url: uvQueryURL,
      method: "GET",
    })
      .then(function (response) {
        console.log("forecast response: ", response);
        var daily = response.daily;
        console.log("daily: ", daily);
        $.each(daily, function (index, value) {
          console.log("index: ", index);
          console.log(value);

          if (index < 5) {
            var divCol = $("<div>");
            divCol.addClass("col-xs-2 m-2");
            $("#cardContainer").append(divCol);

            var divCard = $("<div>");
            divCard.addClass("card text-white bg-primary mb-3");
            divCard.attr("style", "width:10rem");
            $(divCol).append(divCard);

            var divCardTitle = $("<div>");
            divCardTitle.addClass("card-header");
            var date = moment()
              .add(index + 1, "days")
              .format("l");
            divCardTitle.text(date);
            divCard.append(divCardTitle);

            var divCardBody = $("<div>");
            divCardBody.addClass("card-body");
            $(divCard).append(divCardBody);

            var imageTag = $("<img>");
            imageTag.attr(
              "src",
              "http://openweathermap.org/img/wn/" +
                value.weather[0].icon +
                "@2x.png"
            );
            $(divCardBody).append(imageTag);

            var tempText = $("<p>");
            tempText.addClass("card-text");
            tempText.text("Temp: " + value.temp.day + " F");
            $(divCardBody).append(tempText);

            var humidityText = $("<p>");
            humidityText.addClass("card-text");
            humidityText.text("Humidity: " + value.humidity + "%");
            $(divCardBody).append(humidityText);
          }
        });
        var uvIndex = response.current.uvi;
        console.log("uv index: ", uvIndex);
        $("#UV-index").append(" " + uvIndex);
      })
      .catch(console.error);
  }
});
