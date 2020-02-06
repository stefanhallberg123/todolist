const mongoose = require("mongoose");

const schemaToDoList = new mongoose.Schema ({
        item: String,

    });

 
const ToDoList = mongoose.model("ToDoList", schemaToDoList);

module.exports = ToDoList;