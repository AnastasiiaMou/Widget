function displayDateTime() {
  const dateTime = new Date();
  const options = { weekday: "long", hour: "numeric", minute: "numeric" };
  const formattedDateTime = dateTime.toLocaleDateString("en-US", options);
  document.getElementById("datetime").textContent = formattedDateTime;
}

function searchCity(event) {
  event.preventDefault();
  const cityName = document.getElementById("cityInput").value;
  document.getElementById("result").textContent = cityName;

  // Weather API
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      let temperature = Math.round(response.data.main.temp);
      let city = response.data.name;
      let message = `It is ${temperature}°C in ${city}.`;
      let h1 = document.querySelector("h1");
      h1.innerHTML = message;
      document.getElementById("tempValue").textContent = temperature;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function convertTemperature() {
  const tempValueElement = document.getElementById("tempValue");
  const unitToggleElement = document.getElementById("unitToggle");
  const currentTemp = parseFloat(tempValueElement.textContent);

  if (unitToggleElement.textContent === "°C") {
    const fahrenheitTemp = (currentTemp * 9) / 5 + 32;
    tempValueElement.textContent = fahrenheitTemp.toFixed(2);
    unitToggleElement.textContent = "°F";
  } else {
    const celsiusTemp = ((currentTemp - 32) * 5) / 9;
    tempValueElement.textContent = celsiusTemp.toFixed(2);
    unitToggleElement.textContent = "°C";
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", displayDateTime);
document.getElementById("searchForm").addEventListener("submit", searchCity);
document
  .getElementById("unitToggle")
  .addEventListener("click", convertTemperature);
