const haiku = require("haiku-random");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/api/haiku-image", async (req, res) => {
  let artURL = "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id";
  artData = (await (await fetch(artURL)).json()).data;

  let randomIndex = Math.floor((Math.random() * (11 - 0 + 1)));

  while (artData[randomIndex].image_id == null) {
    randomIndex = Math.floor((Math.random() * (11 - 0 + 1)));
  }

  let image = `https://www.artic.edu/iiif/2/${artData[randomIndex].image_id}/full/843,/0/default.jpg`;

  let size = 600;
  while (await (await fetch(image)).status == 403) {
    image = `https://www.artic.edu/iiif/2/${artData[randomIndex].image_id}/full/${size},/0/default.jpg`
    size -= 200
  }

  let data = {"image": image, "haiku": haiku.random()};
  res.send(data);
});

app.get("/writers", (req, res) => {
  res.render("writers.ejs", {nav1: "visible", 
                             nav2: "hidden",
                             nav3: "hidden",
                             nav4: "hidden",
                             nav5: "hidden",
                             script: "writers"});
});

app.get("/make", (req, res) => {
  res.render("make.ejs", {nav1: "hidden", 
                          nav2: "visible", 
                          nav3: "hidden", 
                          nav4: "hidden",
                          nav5: "hidden",
                          script: "make"});
});

app.get("/", (req, res) => {
  res.render("index.ejs", {nav1: "hidden", 
                           nav2: "hidden", 
                           nav3: "visible", 
                           nav4: "hidden",
                           nav5: "hidden",
                           script: "home"});
});

app.get("/history", (req, res) => {
  res.render("history.ejs", {nav1: "hidden", 
                             nav2: "hidden", 
                             nav3: "hidden", 
                             nav4: "visible",
                             nav5: "hidden",
                             script: "history"});
});

app.get("/inspiration", (req, res) => {
  res.render("inspiration.ejs", {nav1: "hidden",
                                 nav2: "hidden",
                                 nav3: "hidden",
                                 nav4: "hidden",
                                 nav5: "visible",
                                 script: "inspiration"});
});

// repl
app.listen(3000, () => {
  console.log("server started");
});

// local computer
//app.listen(3000, "localhost", () => {
//  console.log("server started");
//});
