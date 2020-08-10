$(document).ready(function () {
  $("#citySearch").on("click", function (event) {
    event.preventDefault();
    console.log("=============================");
    var city = $("#inputCity").val().trim().toLowerCase();
    console.log("This is the city searched: ", city);
    var fahrenheitUnits = "&units=imperial";
    var apiKey = "&appid=" + "834f6c40f1d6279c2ecf1aa03eab085f";
    var queryURL =
      "api.openweathermap.org/data/2.5/weather?q=" +
      city +
      fahrenheitUnits +
      apiKey;
    console.log("This will be the queryURL: ", queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log("this is our response: ", response);
    });
  });
});
