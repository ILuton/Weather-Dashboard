
const tempData = document.querySelector(".tempData");
const windData = document.querySelector(".windData");
const humidityData = document.querySelector(".humidityData");
const uvIndexData = document.querySelector(".uvIndexData");

const oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=47.6080131&lon=-122.335167&exclude={part}&units=imperial&appid=a215cfdcaaef2536002948ba6c285538"
fetch(oneCallApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
       
        tempData.textContent = data.current.temp;
        windData.textContent = data.current.wind_speed;
        humidityData.textContent = data.current.humidity;
        uvIndexData.textContent = data.current.uvi;

        console.log(tempData)
      }
    );

  console.log(unit.value)