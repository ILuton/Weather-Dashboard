
const cityEl = document.querySelector(".city")
const tempData = document.querySelector(".tempData");
const windData = document.querySelector(".windData");
const humidityData = document.querySelector(".humidityData");
const uvIndexData = document.querySelector(".uvIndexData");
const cityInput = document.querySelector("#cityInput");
const citySearch = document.querySelector(".citySearch");
const units = document.querySelector("#unit");
const searchBtn = document.querySelector(".searchBtn");
const dayOneEL = document.querySelector(".dayOne");
const dayTwoEL = document.querySelector(".dayTwo");
const dayThreeEL = document.querySelector(".dayThree");
const dayFourEL = document.querySelector(".dayFour");
const dayFiveEL = document.querySelector(".dayFive");
const fiveDayEL = document.querySelector(".fiveDay").getElementsByTagName("div");


searchBtn.addEventListener("click", function () {


  const fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&appid=a215cfdcaaef2536002948ba6c285538";


  fetch(fiveDayApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {


        // get lat and long to use on second api call
        let latitude = data.city.coord.lat;
        let longitude = data.city.coord.lon;

        // populate searched cities name
        cityEl.textContent = data.city.name;
        

        // save searched cities to local storage and add to site
        localStorage.setItem("city",cityEl.textContent)
        let getCity = localStorage.getItem("city")
        let getCityEL = document.createElement("h2")

        getCityEL.textContent = getCity;

        citySearch.appendChild(getCityEL);


        const oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=a215cfdcaaef2536002948ba6c285538&units=" + units.value;


        fetch(oneCallApi)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataTwo) {
      
            //add current weather data to city box
            tempData.textContent = dataTwo.current.temp;
            windData.textContent = dataTwo.current.wind_speed;
            humidityData.textContent = dataTwo.current.humidity;
            uvIndexData.textContent = dataTwo.current.uvi;


            //populate 5 ay forcast data
            function dayOne () {

              dayOneEL.children[0].textContent = data.list[3].dt_txt
            
              dayOneEL.children[1].textContent = "Temp: " + dataTwo.daily[0].temp.day  
            
              dayOneEL.children[2].textContent = "Wind: " + dataTwo.daily[0].wind_speed
            
              dayOneEL.children[3].textContent = "Humidity: " + dataTwo.daily[0].humidity
            }

            function dayTwo () {

              dayTwoEL.children[0].textContent = data.list[11].dt_txt
            
              dayTwoEL.children[1].textContent = "Temp: " + dataTwo.daily[1].temp.day  
            
              dayTwoEL.children[2].textContent = "Wind: " + dataTwo.daily[1].wind_speed
            
              dayTwoEL.children[3].textContent = "Humidity: " + dataTwo.daily[1].humidity
            }

            function dayThree () {

              dayThreeEL.children[0].textContent = data.list[19].dt_txt
            
              dayThreeEL.children[1].textContent = "Temp: " + dataTwo.daily[2].temp.day  
            
              dayThreeEL.children[2].textContent = "Wind: " + dataTwo.daily[2].wind_speed
            
              dayThreeEL.children[3].textContent = "Humidity: " + dataTwo.daily[2].humidity
            }

            function dayFour () {

              dayFourEL.children[0].textContent = data.list[27].dt_txt
            
              dayFourEL.children[1].textContent = "Temp: " + dataTwo.daily[3].temp.day  
            
              dayFourEL.children[2].textContent = "Wind: " + dataTwo.daily[3].wind_speed
            
              dayFourEL.children[3].textContent = "Humidity: " + dataTwo.daily[3].humidity
            }

            function dayFive () {

              dayFiveEL.children[0].textContent = data.list[35].dt_txt
            
              dayFiveEL.children[1].textContent = "Temp: " + dataTwo.daily[4].temp.day  
            
              dayFiveEL.children[2].textContent = "Wind: " + dataTwo.daily[4].wind_speed
            
              dayFiveEL.children[3].textContent = "Humidity: " + dataTwo.daily[4].humidity
            }

            dayOne();
            dayTwo();
            dayThree();
            dayFour();
            dayFive();





          });
      });
});

// save search to local storage 

let getCity = localStorage.getItem("city")
        let getCityEL = document.createElement("h2")

        getCityEL.textContent = getCity;

        citySearch.appendChild(getCityEL);
        