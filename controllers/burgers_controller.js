
const burger = require("../models/burger.js");
const express = require("express");
const app = express.Router();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/burgers", function (req, res) {
  burger.all(function (data) {
    res.json({ burgers: data });
  });
});

app.post("/burgers", function (req, res) {
  burger.insert([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function (result) {

    res.json(result);
  });
});

app.put("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id });
    }
  });
});

app.delete("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = app;