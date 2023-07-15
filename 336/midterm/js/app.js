// api that are used here
const randomAPI = "https://csumb.space/cst/336/midterm/otterAirlines/api/destinationsAPI.php?city=random";
const citiesAPI = "https://csumb.space/cst/336/midterm/otterAirlines/api/citiesAPI.php?country=";
const cityInfoAPI = "https://csumb.space/cst/336/midterm/otterAirlines/api/destinationsAPI.php?city=";
const getFlightAPI = "https://csumb.space/cst/336/midterm/otterAirlines/api/flightStatusAPI.php?flight=";

const getRandom = async () => {
  let cityInfo = await (await fetch(randomAPI)).json();

  document.querySelector("#city-image").src = cityInfo.image;
  document.querySelector("#display-name").innerHTML = cityInfo.name;
  document.querySelector("#cost").innerHTML = `Roundtrip: $${cityInfo.flightPrice}`;

  cityInfo.departures.forEach(flight=> {
   document.querySelector("#display").innerHTML += `${flight}<br>`;
  });
};

const getCities = async () => {
  let country = document.querySelector("#drop-down-country").value;
  let cities = await (await fetch(citiesAPI + country)).json();

  let dropDownCity = document.querySelector("#drop-down-city");
  dropDownCity.innerHTML = "<option value='select'>Select</option>";

  cities.forEach(element => {
    dropDownCity.innerHTML += `<option value='${element.id}'>${element.name}`;
  });
};

const getCityInfo = async () => {
  let cityId = document.querySelector("#drop-down-city").value;

  if (cityId != "select") {
    document.querySelector("#display").innerHTML = `<img id='city-image' src=''>
                                                    <p id='display-name'></p>
                                                    <p id='cost'></p>`;
    let cityInfo = await (await fetch(cityInfoAPI + cityId)).json();
    
    document.querySelector("#city-image").src = cityInfo.image;
    document.querySelector("#display-name").innerHTML = cityInfo.name;
    document.querySelector("#cost").innerHTML = `Roundtrip: $${cityInfo.flightPrice}`;

    cityInfo.departures.forEach(flight=> {
     document.querySelector("#display").innerHTML += `${flight}<br>`;
    });
  }
};

const getFlight = async () => {
  let flightId = document.querySelector("#flight-num").value;
  let error = document.querySelector("#error");
  let status = document.querySelector("#status")

  if (flightId.length == 5) {
    error.innerHTML = "";
    status.innerHTML = "";
    let flightInfo = (await (await fetch(getFlightAPI + flightId)).json()).status;
    
    if (flightInfo == "Scheduled") {
      status.innerHTML = "Scheduled";
      status.style.background = "green";
    } else if (flightInfo == "Delayed") {
      status.innerHTML = "Delayed";
      status.style.background = "orange";
    } else if (flightInfo == "Departed") {
      status.innerHTML = "Departed";
      status.style.background = "blue";
    } else if (flightInfo == "Cancelled") {
      status.innerHTML = "Cancelled";
      status.style.background = "red";
    } else {
      status.innerHTML = "Nonexistent";
      status.style.background = "red";
    }

  } else {
    error.innerHTML = "Flight number must have five characters";
  }
};

getRandom();

document.querySelector("#drop-down-country").addEventListener("change", getCities);
document.querySelector("#drop-down-city").addEventListener("change", getCityInfo);
document.querySelector("#submit").addEventListener("click", getFlight);
