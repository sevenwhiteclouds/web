document.querySelector("button").addEventListener("click", gradeQuiz);

var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  q4ChoicesArray = _.shuffle(q4ChoicesArray);

  for (let i = 0; i < q4ChoicesArray.length; i++) {
    document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id="${q4ChoicesArray[i]}"
      value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
  }
}

function isFormValid() {
  let isValid = true;
  if (document.querySelector("#q1").value == "") {
    isValid = false;
    document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
  }

  return isValid;
}

function rightAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
  document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";

  score += 10;
}

function wrongAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
  document.querySelector(`#q${index}Feedback`).className = "bg-danger text-white";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz() {
  document.querySelector("#validationFdbk").innerHTML = "";
  if (!isFormValid()) {
    return;
  }
  
  score = 0;
  let q1Response = document.querySelector("#q1").value.toLowerCase();
  let q2Response = document.querySelector("#q2").value;
  let q4Response = document.querySelector("input[name=q4]:checked").value;

  let q5Response = document.querySelector("#q5").value.toLowerCase();
  let q7Response = document.querySelector("#q7").value;
  let q8Response = document.querySelector("input[name=q8]:checked").value;
  let q9Response = document.querySelector("#q9").value.toLowerCase();
  let q10Response = document.querySelector("#q10").value;

  if (q1Response == "sacramento") {
    rightAnswer(1);
  } else {
    wrongAnswer(1);
  }

  if (q2Response == "mo") {
    rightAnswer(2);
  } else {
    wrongAnswer(2);
  }

  if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && 
     !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
  } else {
    wrongAnswer(3);
  }

  if (q4Response == "Rhode Island") {
    rightAnswer(4);
  } else {
    wrongAnswer(4);
  }

  if (q5Response == "pacific" || q5Response == "pacific ocean") {
    rightAnswer(5);
  } else {
    wrongAnswer(5);
  }

  if (document.querySelector("#Central").checked && document.querySelector("#Pacific").checked && 
      document.querySelector("#Eastern").checked && !document.querySelector("#MiddleEast").checked) {
    rightAnswer(6);
  } else {
    wrongAnswer(6);
  }

  if (q7Response == "Mexico") {
    rightAnswer(7);
  } else {
    wrongAnswer(7);
  }

  if (q8Response == "Nevada") {
    rightAnswer(8);
  } else {
    wrongAnswer(8);
  }

  if (q9Response == "48") {
    rightAnswer(9);
  } else {
    wrongAnswer(9);
  }

  if (q10Response == "Big Apple") {
    rightAnswer(10);
  } else {
    wrongAnswer(10);
  }

  let scoreInHTML = document.querySelector("#totalScore");
  scoreInHTML.removeAttribute('class');
  scoreInHTML.innerHTML = `Total Score: ${score}`;

  if (score >= 80) {
    scoreInHTML.classList.add("text-success");
  } else {
    scoreInHTML.classList.add("text-danger");
  }

  if (score > 80) {
    document.querySelector("#congrats").innerHTML = "Nice job! Your score is among the highest.";
  }

  document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
  localStorage.setItem("total_attempts", attempts);
}
