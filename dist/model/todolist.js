"use strict";

var mongoose = require("mongoose");

var schemaToDoList = new mongoose.Schema({
  item: { type: String, required: true, minlength: 2 }
});

var ToDoList = mongoose.model("ToDoList", schemaToDoList);

module.exports = ToDoList;