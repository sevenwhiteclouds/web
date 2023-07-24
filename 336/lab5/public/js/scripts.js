let authorLinks = document.querySelectorAll("a");

for (authorLink of authorLinks) {
  authorLink.addEventListener("click", getAuthorInfo);
}

async function getAuthorInfo() {
  var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
  myModal.show();
  let url = `/api/author/${this.id}`;
  let response = await fetch(url);
  let data = await response.json();

  let authorInfo = document.querySelector("#authorInfo");
  authorInfo.innerHTML = `<h1>
                            ${data[0].firstName}
                            ${data[0].lastName}
                           </h1>`;
  authorInfo.innerHTML += `<img src="${data[0].portrait}" width="200"><br>`;
  authorInfo.innerHTML += `Born: ${data[0].dob}<br>
                           Died: ${data[0].dod}<br>
                           Sex: ${data[0].sex}<br>
                           Profession: ${data[0].profession}<br>
                           Country: ${data[0].country}<br>
                           Biography: ${data[0].biography}<br>`;
}
