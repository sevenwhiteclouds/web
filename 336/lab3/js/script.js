document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", async () => {
  let suggestHTML = document.querySelector("#passwordError");
  let password = await (await fetch("https://csumb.space/api/suggestedPassword.php?length=8")).json();
  suggestHTML.innerHTML = `Suggested password: ${password.password}`;
  suggestHTML.removeAttribute("class");
});

document.querySelector("#signupForm").addEventListener("submit", function(event) {
  validateForm(event);
});

states();

function validateForm(e) {
  let isValid = true;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let repassword = document.querySelector("#repassword").value;
  if (username.length == 0) {
    let usernameError = document.querySelector("#usernameError");
    usernameError.removeAttribute("class");
    usernameError.innerHTML = "Username Required!";
    usernameError.classList.add("text-danger");
    isValid = false;
  }

  if (password.length < 6) {
    let passwordError = document.querySelector("#passwordError");
    passwordError.classList.add("text-danger");
    passwordError.innerHTML = "Password must be at least 6 characters!";
    isValid = false;
  }

  if (password != repassword) {
    document.querySelector("#repasswordError").innerHTML = "Password must match!";
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();
  }
}

async function states() {
  let stateHTML = document.querySelector("#state");
  let states = await (await fetch("https://csumb.space/api/allStatesAPI.php")).json();
  states.forEach((state) => {stateHTML.innerHTML += `<option value="${state.usps}">${state.state}</option>`});
}

async function checkUsername() {
  let username = document.querySelector("#username").value;
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();
  let usernameError = document.querySelector("#usernameError");
  usernameError.removeAttribute("class");
  if (data.available) {
    usernameError.innerHTML = "Username available!";
    usernameError.classList.add("text-success");
  } else {
    usernameError.innerHTML = "Username not available!";
    usernameError.classList.add("text-danger");
  }
}

async function displayCity() {
  let zipCode = document.querySelector("#zip").value;
  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
  let response = await fetch(url);
  let data = await response.json();
  if (data != false) {
    document.querySelector("#zipError").innerHTML = "";
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
  } else {
    document.querySelector("#zipError").innerHTML = "Zip code not found.";
    document.querySelector("#city").innerHTML = "";
    document.querySelector("#latitude").innerHTML = "";
    document.querySelector("#longitude").innerHTML = "";
  }
}

async function displayCounties() {
  let state = document.querySelector("#state").value;
  let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
  let response = await fetch(url);
  let data = await response.json();
  let countyList = document.querySelector("#county");
  countyList.innerHTML = "<option> Select County </option>";
  for (let i = 0; i < data.length; i++) {
    countyList.innerHTML += `<option> ${data[i].county} </option>`;
  }
}
