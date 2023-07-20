const haikuImageAPI = "/api/haiku-image";
const artImg = document.querySelector("#artImage");
const haiku = document.querySelector("#haiku");
const wrapper = document.querySelector("#wrapper"); 
const content = document.querySelector("#content"); 

async function getContent(element) {
  let serverData = await (await fetch(haikuImageAPI)).json();
  
  artImg.src = serverData.image
  element.classList.remove("hidden");
  element.classList.add("visible");

  serverData.haiku.forEach(element => {
    haiku.innerHTML += `${element}<br>`;
  });
}

getContent(wrapper);
