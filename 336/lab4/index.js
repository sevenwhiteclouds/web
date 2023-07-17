const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/earth", async (req, res) => {
  let image = (await (await fetch(`https://api.unsplash.com/photos/random/?client_id=eRwAda1bLblxTFcB2BzqAy_bD4IAbQIqxAKF4eyMAxA&featured=true&query=planet-earth`)).json()).urls.small;
  res.render("earth.ejs", {"earthUrl": image});
});

app.get("/mars", (req, res) => {
  res.render("mars.ejs");
});

app.get("/jupiter", (req, res) => {
  res.render("jupiter.ejs");
});

app.get("/saturn", (req, res) => {
  res.render("saturn.ejs");
});

app.get("/neptune", (req, res) => {
  res.render("neptune.ejs");
});

// repl
//app.listen(3000, ()=> {
//  console.log("server started");
//});

// local computer
app.listen(3000, "localhost", ()=> {
  console.log("server started");
});
