
const cityEl = document.querySelector(".city")
const tempData = document.querySelector(".tempData");
const windData = document.querySelector(".windData");
const humidityData = document.querySelector(".humidityData");
const uvIndexData = document.querySelector(".uvIndexData");
const cityInput = document.querySelector("#cityInput");
const units = document.querySelector("#unit");
const searchBtn = document.querySelector(".searchBtn");


searchBtn.addEventListener("click", function () {


  const oneCallApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=a215cfdcaaef2536002948ba6c285538&units=" + units.value;

  const fiveDayAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&appid=a215cfdcaaef2536002948ba6c285538";


  fetch(oneCallApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        
          cityEl.textContent = data.name;
          tempData.textContent = data.main.temp;
          windData.textContent = data.wind.speed;
          humidityData.textContent = data.main.humidity;
          uvIndexData.textContent = data.main.uvi;

        }
      );

  
  
      fetch(fiveDayAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (dataTwo) {
        console.log(dataTwo)

        }
      );
  
  });


console.log(units.value)