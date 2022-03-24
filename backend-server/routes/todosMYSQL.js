var express = require("express");
var router = express.Router();
const connector = require("../connect");

router.get("/createtable", function (req, res) {
  connector.query(
    "CREATE TABLE todos (id int, item VARCHAR(20), status varchar(50))",
    function (err, results, fields) {
      res.json({ err, results, fields });
    }
  );
});

router.post("/", (req, res) => {
  const { id, item, status } = req.body;
  const sql = `INSERT INTO todos VALUES("${id}","${item}","${status}")`;
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.get("/", (req, res) => {
  const sql = "select * from todos";
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.put("/:id", (req, res) => {
  const { item, status } = req.body;
  const sql = `update todos set item="${item}", status="${status}" where id="${req.params.id}";`;
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.delete("/:id", (req, res) => {
  const sql = `delete from todos where id="${req.params.id}";`;
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});

router.delete("/delete/all", (req, res) => {
  const sql = "truncate table todos";
  connector.query(sql, (error, result, fields) => {
    res.json({ error, result, fields });
  });
});
module.exports = router;
