const wrapper = document.querySelector("#wrapper"); 

function unhide(element) {
  element.classList.remove("hidden");
  element.classList.add("visible");
}

unhide(wrapper);
