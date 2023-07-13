const body = document.querySelector("body");

const validForecast = async (lat, lon) => {
  let forecast = 0;

  try {
    let forecastURL = (await (await fetch(`https://api.weather.gov/points/${lat},${lon}`)).json()).properties.forecast;
    forecast = (await (await fetch(forecastURL)).json()).properties.periods;
  } catch (e) {
    return false;
  }

  return forecast;
};

const initWeather = async () => {
  body.innerHTML = "<p>Loading...</p>";

  let ip = (await (await fetch("https://api.ipify.org?format=json")).json()).ip;
  let ipInfo = await (await fetch(`https://ipapi.co/${ip}/json/`)).json();

  let forecast = await validForecast(ipInfo.latitude, ipInfo.longitude);

  if (!forecast) {
    blurSearch();
  } else {
    body.removeAttribute("id");
    main(forecast, ipInfo.city);
  }
};

const setWeatherIcon = (name, cast, weatherImg) => {
  if (name.includes("ight")) {
    if (cast.includes("rain") || cast.includes("Rain")) {
      weatherImg.src="img/rain-night.png";
    } else if (cast.includes("Wind") || cast.includes("wind")) {
      weatherImg.src="img/night-wind.png";
    } else if (cast.includes("storm") || cast.includes("Storm")) {
      weatherImg.src="img/storm-night.png";
    } else {
      weatherImg.src="img/night.png";
    }
  } else {
    if (cast.includes("cloudy") || cast.includes("Cloudy")) {
      weatherImg.src="img/day-cloudy.png";
    } else if (cast.includes("storm") || cast.includes("Storm")) {
      weatherImg.src="img/day-storm.png";
    } else if (cast.includes("rain") || cast.includes("Rain")) {
      weatherImg.src="img/rain.png";
    } else if (cast.includes("wind") || cast.includes("Wind")) {
      weatherImg.src="img/day-wind.png";
    } else {
      weatherImg.src="img/sunny.png";
    }
  }
};

const blurSearch = () => {
  body.setAttribute("id", "center-body");
  body.innerHTML = `<input type='number' id='blur-search' name='search-box' placeholder='Enter a zip code...'>
                    <p id='alert'></p>`;
  let textBox = document.querySelector("#blur-search");
  textBox.focus();

  textBox.addEventListener("keyup", validZip);
};

const validZip = async (key) => {
  let alertMessage = document.querySelector("#alert");
  let textBox = document.querySelector("#blur-search");
  let value = 0;

  if (key.key == "Enter") {
    value = textBox.value;
    textBox.value = "";

    let latLon = await getLatLon(value);

    if (!latLon) {
      alertMessage.innerHTML = "Not a valid zip code!";
      setTimeout(() => alertMessage.innerHTML = "", 2200);
    } else {
      let forecast = await validForecast(latLon[0], latLon[1]);

      if (!forecast) {
        console.log("error");
      } else {
        body.removeAttribute("id");
        main(forecast, latLon[2]);
      }
    }
  }
};

const getLatLon = async zip => {
  if (zip.length != 5) {
    return false;
  }

  let getLocation = await (await fetch(`https://api.zippopotam.us/us/${zip}`));

  if (!getLocation.ok) {
    return false;
  } else {
    let resolve = (await getLocation.json()).places[0];
    let latLon = [];
    latLon.push(resolve.latitude);
    latLon.push(resolve.longitude);
    latLon.push(resolve["place name"]);
    
    return latLon;
  }
};

const main = (forecast, city) => {
  let weather = `<div id="wrapper">
      <header>
        <div id="app-name">Weather</div>
        <div id="location-wrapper">
          <img src="img/location.png" id="location-logo">
          <div id="location-text"></div>
        </div>
        <div id="search">
          <img src="img/search.png" id="search-logo">
          <p>Search Your Location<p>
        </div>
      </header>

      <main>
        <div id="day-temp">
          <p id="degree-number"></p>
          <img src="img/rain.png" id="weather-img">
        </div>
      </main>

      <footer>
        <div id="prev">
          <img src="img/left.png" id="arrow-left">
          <p>Previous</p>
        </div>

        <div id="current-day">
          <p id="day-date">22</p>
          <p id="day-month">FEB</p>
        </div>

        <div id="next">
          <p>Next</p>
          <img src="img/right.png" id="arrow-right">
        </div>
      </footer>
    </div>`;

  body.innerHTML = weather;

  let locationText = document.querySelector("#location-text");
  let degreeNumber = document.querySelector("#degree-number");
  let dayMonth = document.querySelector("#day-month");
  let dayDate = document.querySelector("#day-date");
  let weatherImg = document.querySelector("#weather-img");
  let search = document.querySelector("#search");
  let prev = document.querySelector("#prev");
  let next = document.querySelector("#next");

  let i = 0
  let date = new Date(forecast[i].startTime);

  locationText.innerHTML = city;
  degreeNumber.innerHTML = forecast[i].temperature + "°";
  dayMonth.innerHTML = date.toLocaleString("en-US", {month: "short"});
  dayDate.innerHTML = date.getDate();

  setWeatherIcon(forecast[i].name, forecast[i].shortForecast, weatherImg);

  search.addEventListener("click", blurSearch);

  prev.addEventListener("click", click => {
    if (i != 0) {
      if (i == 1) {
        i--;
      } else {
        i = i - 2;
      }
    }

    date = new Date(forecast[i].startTime);
    degreeNumber.innerHTML = forecast[i].temperature + "°";
    dayMonth.innerHTML = date.toLocaleString("en-US", {month: "short"});
    dayDate.innerHTML = date.getDate();
    setWeatherIcon(forecast[i].name, forecast[i].shortForecast, weatherImg);
  });

  next.addEventListener("click", click => {
    if (i != forecast.length - 1) {
      if (forecast[i].name.includes("ight")) {
        i++;
      } else {
        i = i + 2;
      }
    }

    date = new Date(forecast[i].startTime);
    degreeNumber.innerHTML = forecast[i].temperature + "°";
    dayMonth.innerHTML = date.toLocaleString("en-US", {month: "short"});
    dayDate.innerHTML = date.getDate();
    setWeatherIcon(forecast[i].name, forecast[i].shortForecast, weatherImg);
  });
};

initWeather();
