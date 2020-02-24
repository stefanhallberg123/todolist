"use strict";

var express = require("express");
var mongoose = require("mongoose");
var ToDoList = require("./router/listRouter");
var path = require("path");
var config = require("./config/config");
var bodyParser = require("body-parser");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(ToDoList);

var port = process.env.PORT || 9696;

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(config.databaseURL, options).then(function () {
  app.listen(port);
  console.log("listening on " + port + " the coolest port in the world");
});

function ejs2html(_ref) {
  var path = _ref.path,
      outPath = _ref.outPath,
      data = _ref.data,
      options = _ref.options;

  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return false;
    }
    ejs.renderFile(path, data, options, function (err, html) {
      if (err) {
        console.log(err);
        return false;
      }
      fs.writeFile(outPath, html, function (err) {
        if (err) {
          console.log(err);
          return false;
        }
        return true;
      });
    });
  });
}

ejs2html({
  path: __dirname + "/views/index.ejs",
  outPath: __dirname + "/public/index.html"
});