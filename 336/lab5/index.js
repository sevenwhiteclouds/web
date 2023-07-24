const express = require("express");
const app = express();
const pool = require("./dbPool.js");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let sqlCat = `SELECT DISTINCT category FROM q_quotes ORDER BY category`;
  let sqlAuthors = `SELECT authorId, firstName, lastName
                    FROM q_authors
                    ORDER BY lastName`;

  let rowsAuthors = await executeSQL(sqlAuthors);
  let rowsCat = await executeSQL(sqlCat);
  res.render("index.ejs", {"authors": rowsAuthors,
                           "cats": rowsCat});
});

app.get("/dbTest", async function(req, res){
  let sql = "SELECT * FROM q_quotes";
  let rows = await executeSQL(sql);
  res.send(rows);
});

app.get("/searchByKeyword", async (req, res) => {
  let userKeyword = req.query.keyword;

  let sql = `SELECT quote, authorId, firstName, lastName
             FROM q_quotes
             NATURAL JOIN q_authors
             WHERE quote LIKE ?`;

  let params = [`%${userKeyword}%`];
  let rows = await executeSQL(sql, params);

  res.render("results", {"quotes": rows});
});

app.get("/searchByAuthor", async (req, res) => {
  let userAuthorId = req.query.authorId;
  let sql = `SELECT quote, authorId, firstName, lastName
             FROM q_quotes
             NATURAL JOIN q_authors
             WHERE authorId = ?`;

  let params = [userAuthorId];
  let rows = await executeSQL(sql, params);

  res.render("results", {"quotes": rows});
});

app.get("/searchByCat", async (req, res) => {
  let userCatId = req.query.catId;
  let sql = `SELECT quote, authorId, firstName, lastName
             FROM q_quotes
             NATURAL JOIN q_authors
             WHERE category = ?`;

  let params = [userCatId];
  let rows = await executeSQL(sql, params);

  res.render("results", {"quotes": rows});
});

app.get("/searchByLikes", async (req, res) => {
  let start = req.query.start;
  let end = req.query.end;
  let sql = `SELECT quote, authorId, firstName, lastName
             FROM q_quotes
             NATURAL JOIN q_authors
             WHERE likes BETWEEN ? AND ?`;

  let params = [start, end];
  let rows = await executeSQL(sql, params);

  res.render("results", {"quotes": rows});
});

app.get("/api/author/:id", async (req, res) => {
  let authorId = req.params.id;
  let sql = `SELECT * 
             FROM q_authors
             WHERE authorId = ?`;
  let rows = await executeSQL(sql, [authorId]);
  res.send(rows)
});

//functions
async function executeSQL(sql, params){
return new Promise (function(resolve, reject) {
  pool.query(sql, params, function (err, rows, fields) {
    if (err) throw err;
    resolve(rows);
  });
});
}

// local computer
app.listen(3000, "localhost", () => {
  console.log("server started on localhost");
});

// repl
//app.listen(3000, () => {
//  console.log("server started");
//});
