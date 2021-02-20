var express = require("express");
var PORT = process.env.PORT || 8000

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("All is well on http://localhost:" + PORT);
});

// done(?)