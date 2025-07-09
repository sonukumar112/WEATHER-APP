const apikey = "Api Key";

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

      fetch(weatherUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          weatherReport(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    });
  }
});

function searchByCity() {
  var place = document.getElementById("input").value;
  if (!place) return;
  const searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;

  fetch(searchUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      weatherReport(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });

  document.getElementById("input").value = "";
}

function weatherReport(data) {
  if (!data) {
    console.error("No data received.");
    return;
  }

  const cityElement = document.getElementById("city");
  const temperatureElement = document.getElementById("temperature");
  const cloudsElement = document.getElementById("clouds");
  const imgElement = document.getElementById("img");

  const cityName = data.name + ", " + data.sys.country;
  const temperature = Math.floor(data.main.temp - 273) + " °C";
  const cloudDescription = data.weather && data.weather.length > 0 ? data.weather[0].description : "N/A";

  cityElement.innerText = cityName;
  temperatureElement.innerText = temperature;
  cloudsElement.innerText = cloudDescription;

  if (data.weather && data.weather.length > 0) {
    const icon1 = data.weather[0].icon;
    const iconurl = `https://api.openweathermap.org/img/w/${icon1}.png`;
    imgElement.src = iconurl;
  } else {
    imgElement.src = "";
  }
}
