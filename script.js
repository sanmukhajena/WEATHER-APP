document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage= document.getElementById("error-message");
  const API_KEY = "cff2b9abf1aa812c12703da7ad505382"; //env variable

  getWeatherBtn.addEventListener('click', async () => {
    const city=cityInput.value.trim();
    if(!city) return;
    // it may throw an error
    // server / database is always in another location it takes time to respond
    try{
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    }catch(error){
      showError();
    }
  });

  async function fetchWeatherData(city){
    //get the data
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE",response);
    if(!response.ok){
      throw new Error("City not found");
    }
    const data = await response.json();
    // console.log("DATA",data);
    return data;
  }
  function displayWeatherData(data) {
    //display
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;

    // unlock the display
    weatherInfo.classList.remove("hidden"); // Show weather info
    errorMessage.classList.add("hidden"); // Hide error message

    temperatureDisplay.textContent = `Temperature : ${Math.round(main.temp)}°C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
  }
  function showError(){
    weatherInfo.classList.remove("hidden"); // Show weather info
    errorMessage.classList.remove("hidden"); // Show error message
  }
});