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
const fiveDayEL = document.querySelector(".fiveDay")
const weatherIconEl = document.querySelector(".weatherIcon");
const weatherDesEl = document.querySelector(".weatherDes");
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
      console.log(dataTwo)
      fiveDayInfo(dataTwo)
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
})


// loop through object and get data

const fiveDayInfo = (data) => {
  for (let day in data.daily){
    if (day > 0 && day < 6) {
    fiveDivs(data.daily[day])
    

    }

  }
}

// create div boxes

const fiveDivs = (day) => {
  console.log(day)

 const dayBox = document.createElement("div");
 const dayIcon = document.createElement("img");
 const dayDate = document.createElement("h6");
 const dayTemp = document.createElement("h6");
 const dayWind = document.createElement("h6");
 const dayHumidity = document.createElement("h6");

 fiveDayEL.append(dayBox)
 dayBox.appendChild(dayIcon)
 dayBox.appendChild(dayDate)
 dayBox.appendChild(dayTemp)
 dayBox.appendChild(dayWind)
 dayBox.appendChild(dayHumidity)

 dayIcon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
 let date = new Date(day.dt * 1000)
 dayDate.innerHTML = date.toDateString();
 dayTemp.innerHTML = `Temp: ${day.temp.day}`;
 dayWind.innerHTML = `Wind: ${day.wind_speed}`;
 dayHumidity.innerHTML = `Humidity: ${day.humidity}`;
}





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

// // save search to local storage

// let storedCity = JSON.parse(localStorage.getItem("storedCity"));

// if (storedCity !== null)
//   for (let i = 0; i < storedCity.length; i++) {
//     let listEl = document.createElement("li");
//     listEl.textContent = storedCity[i];
//     cityAppend.appendChild(listEl);
//   }
