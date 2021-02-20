var express = require("express");
var router = express.Router();
var burg = require ("../models/burger.js");

router.get("/", function (req, res){
   res.sendFile(path.join(__dirname, "public/index.html"));
});

router.get("/burgers", function (req, res) {
    burg.all(function(data){
        res.json({ burgers:data });
    });
});

router.post("/burgers", function (req, res){
    burg.insert([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result){
    });
});

router.put("/burgers/:id", function (req, res){
    var condition = "id = " + req.params.id;

    console.log ("condition", condition);

    burg.update({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.json({ id: req.params.id});
        }
    });
});

router.delete("/burgers/:id", function (req, res) {
    var condition = "data-id = " + req.params.id;

    burg.delete(condition, function(req, res){
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;