const cityEl = document.querySelector(".city");
const tempData = document.querySelector(".tempData");
const tempDataMax = document.querySelector(".tempDataMax");
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
const fiveDayEL = document
  .querySelector(".fiveDay")
  .getElementsByTagName("div");
const weatherIconEl = document.querySelector(".weatherIcon");
const weatherDesEl = document.querySelector(".weatherDes");
const dayOneIconEL = document.querySelector(".dayOneIcon");
const dayTwoIconEL = document.querySelector(".dayTwoIcon");
const dayThreeIconEL = document.querySelector(".dayThreeIcon");
const dayFourIconEL = document.querySelector(".dayFourIcon");
const dayFiveIconEL = document.querySelector(".dayFiveIcon");
const dayOneDesEl = document.querySelector(".dayOneDes");
const dayTwoDesEl = document.querySelector(".dayTwoDes");
const dayThreeDesEl = document.querySelector(".dayThreeDes");
const dayFourDesEl = document.querySelector(".dayFourDes");
const dayFiveDesEl = document.querySelector(".dayFiveDes");
const stateInputEl = document.querySelector("#stateInput");
const cityAppend = document.querySelector(".cityAppend");
const cityEvent = document.querySelectorAll(".cityAppend li");
let cities = [];
let fiveDayApi;

// check to see if inputs have value then choose which search to call/ then calls call One
const fiveDayApiCallValues = (cityValue, stateValue) => {
  if (!cityValue) {
    return (cityEl.innerHTML = "Please Enter A City");
  } else if (cityValue && stateValue === "null") {
    fiveDayApi =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityValue +
      "&appid=a215cfdcaaef2536002948ba6c285538";
    callOne(fiveDayApi);
  } else {
    fiveDayApi =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityValue +
      ",US-" +
      stateValue.toUpperCase() +
      "&appid=a215cfdcaaef2536002948ba6c285538";
    callOne(fiveDayApi);
  }
};

// first Api call to get long and lat to get 5 day inormation/ then call call two
const callOne = (fiveDayApi) => {
  fetch(fiveDayApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cityEl.innerHTML = data.city.name;
      callTwo(data);
      return data;
    });
};

// second call to get 5 fay info
const callTwo = (data) => {
  let longitude = data.city.coord.lon;
  let latitude = data.city.coord.lat;

  const oneCallApi =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=a215cfdcaaef2536002948ba6c285538&units=" +
    units.value;

  fetch(oneCallApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataTwo) {
      //add current weather data to city box
      tempData.textContent = dataTwo.current.temp;
      tempDataMax.textContent = dataTwo.daily[0].temp.day;
      windData.textContent = dataTwo.current.wind_speed;
      humidityData.textContent = dataTwo.current.humidity;
      uvIndexData.textContent = dataTwo.current.uvi;
      let iconUrl = dataTwo.current.weather[0].icon;
      weatherIconEl.src = `https://openweathermap.org/img/wn/${iconUrl}@2x.png`;
      weatherDesEl.textContent =
        dataTwo.current.weather[0].description.toUpperCase();

      if (dataTwo.current.uvi < 2) {
        uvIndexData.style.backgroundColor = "green";
      } else if (dataTwo.current.uvi > 2 && dataTwo.current.uvi < 5) {
        uvIndexData.style.backgroundColor = "yellow";
      } else if (dataTwo.current.uvi > 5 && dataTwo.current.uvi < 7) {
        uvIndexData.style.backgroundColor = "orange";
      } else {
        uvIndexData.style.backgroundColor = "red";
      }
    });
};

// save information to local storage
const saveToLocal = (cityName) => {
  cityEl.textContent = cityName;

  let storedCity = JSON.parse(localStorage.getItem("storedCity"));

  if (storedCity !== null) {
    cities = storedCity;
  }

  cities.push(cityName);

  localStorage.setItem("storedCity", JSON.stringify(cities));
};


// initalize action 
searchBtn.addEventListener("click", function () {
  fiveDayApiCallValues(cityInput.value, stateInputEl.value);

  // saveToLocal(data.city.name);

  // while (cityAppend.hasChildNodes()) {
  //   cityAppend.removeChild(cityAppend.lastChild);
  // }

  // if (storedCity === null) {
  //   let listEl = document.createElement("li");
  //   listEl.textContent = cities;
  //   cityAppend.appendChild(listEl);
  // } else {
  //   for (let i = 0; i < cities.length; i++) {
  //     let listEl = document.createElement("li");
  //     listEl.textContent = storedCity[i];
  //     cityAppend.appendChild(listEl);
  //   }
  // }
});

//           //populate 5 ay forcast data

//           function dayOne() {
//             dayOneEL.children[2].textContent = data.list[3].dt_txt.substring(
//               0,
//               10
//             );

//             dayOneEL.children[3].textContent =
//               "Temp: " + dataTwo.daily[0].temp.day;

//             dayOneEL.children[4].textContent =
//               "Wind: " + dataTwo.daily[0].wind_speed;

//             dayOneEL.children[5].textContent =
//               "Humidity: " + dataTwo.daily[0].humidity;

//             let dayOneIconCode = dataTwo.daily[1].weather[0].icon;

//             dayOneIconEL.src = `https://openweathermap.org/img/wn/${dayOneIconCode}@2x.png`;

//             dayOneDesEl.textContent =
//               dataTwo.daily[1].weather[0].description.toUpperCase();
//           }

//           function dayTwo() {
//             dayTwoEL.children[2].textContent = data.list[11].dt_txt.substring(
//               0,
//               10
//             );

//             dayTwoEL.children[3].textContent =
//               "Temp: " + dataTwo.daily[1].temp.day;

//             dayTwoEL.children[4].textContent =
//               "Wind: " + dataTwo.daily[1].wind_speed;

//             dayTwoEL.children[5].textContent =
//               "Humidity: " + dataTwo.daily[1].humidity;

//             let dayTwoIconCode = dataTwo.daily[2].weather[0].icon;

//             dayTwoIconEL.src = `https://openweathermap.org/img/wn/${dayTwoIconCode}@2x.png`;

//             dayTwoDesEl.textContent =
//               dataTwo.daily[2].weather[0].description.toUpperCase();
//           }

//           function dayThree() {
//             dayThreeEL.children[2].textContent = data.list[19].dt_txt.substring(
//               0,
//               10
//             );

//             dayThreeEL.children[3].textContent =
//               "Temp: " + dataTwo.daily[2].temp.day;

//             dayThreeEL.children[4].textContent =
//               "Wind: " + dataTwo.daily[2].wind_speed;

//             dayThreeEL.children[5].textContent =
//               "Humidity: " + dataTwo.daily[2].humidity;

//             let dayThreeIconCode = dataTwo.daily[3].weather[0].icon;

//             dayThreeIconEL.src = `https://openweathermap.org/img/wn/${dayThreeIconCode}@2x.png`;

//             dayThreeDesEl.textContent =
//               dataTwo.daily[3].weather[0].description.toUpperCase();
//           }

//           function dayFour() {
//             dayFourEL.children[2].textContent = data.list[27].dt_txt.substring(
//               0,
//               10
//             );

//             dayFourEL.children[3].textContent =
//               "Temp: " + dataTwo.daily[3].temp.day;

//             dayFourEL.children[4].textContent =
//               "Wind: " + dataTwo.daily[3].wind_speed;

//             dayFourEL.children[5].textContent =
//               "Humidity: " + dataTwo.daily[3].humidity;

//             let dayFourIconCode = dataTwo.daily[4].weather[0].icon;

//             dayFourIconEL.src = `https://openweathermap.org/img/wn/${dayFourIconCode}@2x.png`;

//             dayFourDesEl.textContent =
//               dataTwo.daily[4].weather[0].description.toUpperCase();
//           }

//           function dayFive() {
//             dayFiveEL.children[2].textContent = data.list[35].dt_txt.substring(
//               0,
//               10
//             );

//             dayFiveEL.children[3].textContent =
//               "Temp: " + dataTwo.daily[4].temp.day;

//             dayFiveEL.children[4].textContent =
//               "Wind: " + dataTwo.daily[4].wind_speed;

//             dayFiveEL.children[5].textContent =
//               "Humidity: " + dataTwo.daily[4].humidity;

//             let dayFiveIconCode = dataTwo.daily[5].weather[0].icon;

//             dayFiveIconEL.src = `https://openweathermap.org/img/wn/${dayFiveIconCode}@2x.png`;

//             dayFiveDesEl.textContent =
//               dataTwo.daily[5].weather[0].description.toUpperCase();
//           }

//           dayOne();
//           dayTwo();
//           dayThree();
//           dayFour();
//           dayFive();

//           console.log(dataTwo);
//           console.log(data);
//         });
//     });
// ;

// // save search to local storage

// let storedCity = JSON.parse(localStorage.getItem("storedCity"));

// if (storedCity !== null)
//   for (let i = 0; i < storedCity.length; i++) {
//     let listEl = document.createElement("li");
//     listEl.textContent = storedCity[i];
//     cityAppend.appendChild(listEl);
//   }
