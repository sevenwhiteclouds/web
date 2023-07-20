const wrapper = document.querySelector("#wrapper"); 
const squareDesc = document.getElementsByClassName("writer")

function unhide(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

unhide(wrapper);

for (let i = 0; i < squareDesc.length; i++) {
  squareDesc[i].addEventListener("mouseover", () => {
    squareDesc[i].style.backgroundColor = "#00000099";
    unhide(squareDesc[i]);
  });
}
