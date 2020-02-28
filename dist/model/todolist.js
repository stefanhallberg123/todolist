"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemaToDoList = new _mongoose2.default.Schema({
  item: { type: String, required: true, minlength: 2 }
});

var ToDoList = _mongoose2.default.model("ToDoList", schemaToDoList);
exports.default = ToDoList;