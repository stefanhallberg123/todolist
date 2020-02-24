"use strict";

var express = require("express");
var ToDoList = require("../model/todolist");

var router = express.Router();

router.route("/createtodo").get(function (req, res) {
  return res.render("createtodo");
}).post(async function (req, res) {
  await new ToDoList({ item: req.body.item }).save(function (error, success) {
    if (error) {
      console.log(error);
      res.send(error._message);
    } else {
      res.redirect("/todolist");
    }
  });
});

router.get("/todolist", async function (req, res) {
  var sorted = req.query.sort;

  var currentPage = req.query.page || 1;
  var items = 5;
  var allTodos = await ToDoList.find();
  var amountTodos = await ToDoList.find().skip((currentPage - 1) * items).limit(items).sort({ item: sorted });
  var pageCount = Math.ceil(allTodos.length / items);

  res.render("todolist", { amountTodos: amountTodos, pageCount: pageCount, currentPage: currentPage });
});

router.get("/delete/:id", async function (req, res) {
  await ToDoList.deleteOne({ _id: req.params.id });
  res.redirect("/todolist");
});

router.route("/update/:id").get(async function (req, res) {
  var update = await ToDoList.findById({ _id: req.params.id });
  res.render("edit", { update: update });
}).post(async function (req, res) {
  await ToDoList.updateOne({ _id: req.params.id }, { $set: { item: req.body.item } });
  res.redirect("/todolist");
});

module.exports = router;