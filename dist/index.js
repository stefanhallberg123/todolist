"use strict";

var express = require("express");
var mongoose = require("mongoose");
var ToDoList = require("./router/listRouter");
var path = require("path");
var config = require("./config/config");
var bodyParser = require("body-parser");

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