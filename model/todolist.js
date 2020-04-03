const mongoose = require("mongoose");

const schemaToDoList = new mongoose.Schema({
  item: { type: String, required: true, minlength: 2 }
});

const toDoList = mongoose.model("ToDoList", schemaToDoList);
module.exports = toDoList;
