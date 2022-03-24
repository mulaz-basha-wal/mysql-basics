var express = require("express");
var router = express.Router();
const connector = require("../connect");

router.get("/createtable", function (req, res) {
  connector.query(
    "CREATE TABLE authors (id int, first_name VARCHAR(50), last_name VARCHAR(50), dob DATE, dod DATE);",
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});

router.post("/", (req, res) => {
  const { id, first_name, last_name, dob, dod } = req.body;
  const sql = `INSERT INTO authors VALUES( "${id}","${first_name}", "${last_name}","${dob}", "${dod}");`;
  console.log(sql);
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.get("/", (req, res) => {
  const sql = "select * from authors";
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.put("/:id", (req, res) => {
  const { first_name, last_name, dob, dod } = req.body;
  const sql = `update authors set first_name="${first_name}", last_name="${last_name}", dob="${dob}",dod="${dod}" where id="${req.params.id}";`;
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.delete("/:id", (req, res) => {
  const sql = `delete from authors where id="${req.params.id}";`;
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.delete("/delete/all", (req, res) => {
  const sql = "truncate table authors";
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});
module.exports = router;
