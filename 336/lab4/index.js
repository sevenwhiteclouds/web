const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/earth", async (req, res) => {
  let url = `https://api.unsplash.com/photos/random/
  ?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee
  0ce5cd86cd16e&featured=true&query=planet-earth`;
  let response = await fetch(url);
  let data = await response.json();
  let image = data.urls.small;
  res.render("earth", {"earthUrl": image});
});

app.listen(3000, ()=> {
  console.log("server started");
});
