"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _todolist = require("../model/todolist");

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route("/createtodo").get(function (req, res) {
  return res.render("createtodo");
}).post(async function (req, res) {
  await new _todolist2.default({ item: req.body.item }).save(function (error, success) {
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
  var allTodos = await _todolist2.default.find();
  var amountTodos = await _todolist2.default.find().skip((currentPage - 1) * items).limit(items).sort({ item: sorted });
  var pageCount = Math.ceil(allTodos.length / items);

  res.render("todolist", { amountTodos: amountTodos, pageCount: pageCount, currentPage: currentPage });
});

router.get("/delete/:id", async function (req, res) {
  await _todolist2.default.deleteOne({ _id: req.params.id });
  res.redirect("/todolist");
});

router.route("/update/:id").get(async function (req, res) {
  var update = await _todolist2.default.findById({ _id: req.params.id });
  res.render("edit", { update: update });
}).post(async function (req, res) {
  await _todolist2.default.updateOne({ _id: req.params.id }, { $set: { item: req.body.item } });
  res.redirect("/todolist");
});

module.exports = router;