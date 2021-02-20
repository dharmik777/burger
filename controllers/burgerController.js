var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create all our routes and set up logic within those routes where required.
router.get("/burger", function(req, res) {
  burger.all(function(data) {
    res.json({ burgers: data });
  });
});

// lines 20/23 are a little different then the cat
router.post("/burger", function(req, res) {
  burger.create([
    "burger_name"
  ], [
  req.body.name
  ], function(result) {
    // Send back the ID of the new quote
    // this was added 
    res.json ({id: result.insertID}); 
   });
});

router.put("/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.update({
    devoured: req.body.devour
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id});
    }
  });
});

router.delete("/burger/:id", function(req, res) {
  var condition = "id =  " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
