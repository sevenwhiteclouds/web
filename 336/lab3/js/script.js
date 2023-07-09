document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
  validateForm(event);
});

function validateForm(e) {
  let isValid = true;
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let repassword = document.querySelector("#repassword").value;
  if (username.length == 0) {
    document.querySelector("#usernameError").innerHTML = "Username Required!";
    isValid = false;
  }

  if (password.length == 0) {
    document.querySelector("#passwordError").innerHTML = "Password Required!";
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

async function checkUsername() {
  let username = document.querySelector("#username").value;
  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();
  let usernameError = document.querySelector("#usernameError");
  if (data.available) {
    usernameError.innerHTML = "Username available!";
    usernameError.style.color = "green";
  } else {
    usernameError.innerHTML = "Username not available!";
    usernameError.style.color = "red";
  }
}

async function displayCity() {
  //alert(document.querySelector("#zip").value);
  let zipCode = document.querySelector("#zip").value;
  let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
  let response = await fetch(url);
  let data = await response.json();
  //console.log(data);
  document.querySelector("#city").innerHTML = data.city;
  document.querySelector("#latitude").innerHTML = data.latitude;
  document.querySelector("#longitude").innerHTML = data.longitude;
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
