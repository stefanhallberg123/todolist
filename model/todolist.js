const mongoose = require("mongoose");

const schemaToDoList = new mongoose.Schema({
  item: { type: String, required: true, minlength: 2 }
});

const ToDoList = mongoose.model("ToDoList", schemaToDoList);
module.exports = mongoose;
